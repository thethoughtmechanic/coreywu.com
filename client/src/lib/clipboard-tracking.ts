
export interface ClipboardTrackingOptions {
  trackSelection?: boolean;
  trackSpecificElements?: string[];
  minSelectionLength?: number;
}

export class ClipboardTracker {
  private options: ClipboardTrackingOptions;
  
  constructor(options: ClipboardTrackingOptions = {}) {
    this.options = {
      trackSelection: true,
      minSelectionLength: 10,
      ...options
    };
    
    this.init();
  }
  
  private init() {
    // Track copy events
    document.addEventListener('copy', this.handleCopy.bind(this));
    
    // Track text selection (potential copy intent)
    if (this.options.trackSelection) {
      document.addEventListener('mouseup', this.handleSelection.bind(this));
      document.addEventListener('keyup', this.handleSelection.bind(this));
    }
    
    // Track keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboard.bind(this));
  }
  
  private handleCopy(event: ClipboardEvent) {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';
    
    if (selectedText.length > 0) {
      const element = this.getSelectedElement();
      const context = this.getElementContext(element);
      
      this.trackCopyEvent({
        text: selectedText.substring(0, 100), // Limit for privacy
        textLength: selectedText.length,
        source: 'copy_event',
        elementType: element?.tagName?.toLowerCase() || 'unknown',
        context: context,
        page: window.location.pathname
      });
    }
  }
  
  private handleSelection(event: Event) {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';
    
    if (selectedText.length >= (this.options.minSelectionLength || 10)) {
      const element = this.getSelectedElement();
      const context = this.getElementContext(element);
      
      this.trackSelectionEvent({
        textLength: selectedText.length,
        elementType: element?.tagName?.toLowerCase() || 'unknown',
        context: context,
        page: window.location.pathname
      });
    }
  }
  
  private handleKeyboard(event: KeyboardEvent) {
    // Track Ctrl+C / Cmd+C
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      const selection = window.getSelection();
      const selectedText = selection?.toString() || '';
      
      if (selectedText.length > 0) {
        this.trackCopyEvent({
          text: selectedText.substring(0, 100),
          textLength: selectedText.length,
          source: 'keyboard_shortcut',
          elementType: this.getSelectedElement()?.tagName?.toLowerCase() || 'unknown',
          context: this.getElementContext(this.getSelectedElement()),
          page: window.location.pathname
        });
      }
    }
    
    // Track Ctrl+A (select all - potential copy intent)
    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
      this.trackEvent('select_all', {
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  private getSelectedElement(): Element | null {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE 
        ? range.commonAncestorContainer as Element
        : range.commonAncestorContainer.parentElement;
    }
    return null;
  }
  
  private getElementContext(element: Element | null): string {
    if (!element) return 'unknown';
    
    // Check for specific content types
    if (element.closest('[data-content-type]')) {
      return element.closest('[data-content-type]')?.getAttribute('data-content-type') || 'unknown';
    }
    
    // Check for common content areas
    if (element.closest('article')) return 'article';
    if (element.closest('.thought-card')) return 'thought-card';
    if (element.closest('.experiment-card')) return 'experiment-card';
    if (element.closest('blockquote')) return 'quote';
    if (element.closest('code, pre')) return 'code';
    if (element.closest('h1, h2, h3, h4, h5, h6')) return 'heading';
    if (element.closest('p')) return 'paragraph';
    
    return 'general';
  }
  
  private trackCopyEvent(data: any) {
    this.trackEvent('content_copy', data);
  }
  
  private trackSelectionEvent(data: any) {
    this.trackEvent('content_selection', data);
  }
  
  private trackEvent(eventName: string, data: any) {
    // GA4 tracking
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, {
        ...data,
        event_category: 'content_sharing',
        event_label: `${eventName}: ${data.context || 'unknown'}`
      });
    }
    
    // Umami tracking
    if ((window as any).umamiTrack) {
      (window as any).umamiTrack(eventName, data);
    }
    
    console.log(`Clipboard tracking: ${eventName}`, data);
  }
  
  // Method to track specific elements
  trackElement(selector: string, label?: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.setAttribute('data-content-type', label || selector);
    });
  }
  
  // Method to get copy statistics
  getCopyStats() {
    // This would integrate with your analytics to retrieve copy statistics
    return {
      totalCopies: 0,
      popularContent: [],
      copyTrends: []
    };
  }
}

// Initialize clipboard tracking
export const initClipboardTracking = (options?: ClipboardTrackingOptions) => {
  return new ClipboardTracker(options);
};
