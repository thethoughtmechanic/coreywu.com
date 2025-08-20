
// Google Analytics 4 Configuration and Custom Event Tracking
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Initialize GA4 - Replace GA_MEASUREMENT_ID with your actual measurement ID
gtag('config', 'G-D6J7FXCJBZ', {
  page_title: document.title,
  page_location: window.location.href
});

// Custom event tracking functions
window.trackEmailClick = function(source) {
  gtag('event', 'contact_email_click', {
    source_page: source,
    contact_method: 'email',
    email_address: 'coreydavidwu@gmail.com',
    event_category: 'contact',
    event_label: `Email click from ${source}`
  });
  
  console.log(`Email click tracked from: ${source}`);
};

window.trackNavigationClick = function(section, fromPage) {
  gtag('event', 'navigation_click', {
    section_name: section,
    source_page: fromPage,
    event_category: 'navigation'
  });
};

window.trackCardInteraction = function(cardType, cardTitle, page) {
  gtag('event', 'card_interaction', {
    card_type: cardType,
    card_title: cardTitle,
    source_page: page,
    event_category: 'content_engagement'
  });
};

window.trackPaintSplatterTrigger = function(elementType, page) {
  gtag('event', 'paint_splatter_trigger', {
    element_type: elementType,
    source_page: page,
    event_category: 'ui_interaction'
  });
};

window.trackSystemPromptHover = function(role, page) {
  gtag('event', 'system_prompt_hover', {
    role: role,
    source_page: page,
    event_category: 'content_engagement'
  });
};

window.trackSectionView = function(sectionName) {
  gtag('event', 'section_view', {
    section_name: sectionName,
    event_category: 'page_engagement'
  });
};

window.trackAudioPlay = function(songTitle, songIndex, page) {
  gtag('event', 'audio_play', {
    song_title: songTitle,
    song_index: songIndex,
    source_page: page,
    event_category: 'audio_engagement',
    event_label: `Audio play: ${songTitle}`
  });
  
  console.log(`Audio play tracked: ${songTitle} on ${page}`);
};

window.trackAudioPause = function(songTitle, currentTime, page) {
  gtag('event', 'audio_pause', {
    song_title: songTitle,
    current_time: Math.round(currentTime),
    source_page: page,
    event_category: 'audio_engagement',
    event_label: `Audio pause: ${songTitle} at ${Math.round(currentTime)}s`
  });
};

window.trackAudioComplete = function(songTitle, page) {
  gtag('event', 'audio_complete', {
    song_title: songTitle,
    source_page: page,
    event_category: 'audio_engagement',
    event_label: `Audio completed: ${songTitle}`
  });
};
