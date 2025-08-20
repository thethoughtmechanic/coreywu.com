
// Umami Analytics Configuration
(function() {
  // Create Umami script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.setAttribute('data-website-id', 'd5d838bf-8992-4996-9b41-e83e73687550');
  document.head.appendChild(script);

  // Custom event tracking functions for Umami
  window.umamiTrack = function(eventName, eventData = {}) {
    if (window.umami) {
      window.umami.track(eventName, eventData);
      console.log(`Umami event tracked: ${eventName}`, eventData);
    }
  };

  // Dual tracking functions that send to both GA4 and Umami
  window.trackEmailClickDual = function(source) {
    // GA4 tracking (existing)
    window.trackEmailClick(source);
    
    // Umami tracking
    window.umamiTrack('email_click', {
      source_page: source,
      contact_method: 'email',
      email_address: 'coreydavidwu@gmail.com'
    });
  };

  window.trackNavigationClickDual = function(section, fromPage) {
    // GA4 tracking (existing)
    window.trackNavigationClick(section, fromPage);
    
    // Umami tracking
    window.umamiTrack('navigation_click', {
      section_name: section,
      source_page: fromPage
    });
  };

  window.trackCardInteractionDual = function(cardType, cardTitle, page) {
    // GA4 tracking (existing)
    window.trackCardInteraction(cardType, cardTitle, page);
    
    // Umami tracking
    window.umamiTrack('card_interaction', {
      card_type: cardType,
      card_title: cardTitle,
      source_page: page
    });
  };

  window.trackPaintSplatterTriggerDual = function(elementType, page) {
    // GA4 tracking (existing)
    window.trackPaintSplatterTrigger(elementType, page);
    
    // Umami tracking
    window.umamiTrack('paint_splatter_trigger', {
      element_type: elementType,
      source_page: page
    });
  };

  window.trackSystemPromptHoverDual = function(role, page) {
    // GA4 tracking (existing)
    window.trackSystemPromptHover(role, page);
    
    // Umami tracking
    window.umamiTrack('system_prompt_hover', {
      role: role,
      source_page: page
    });
  };

  window.trackSectionViewDual = function(sectionName) {
    // GA4 tracking (existing)
    window.trackSectionView(sectionName);
    
    // Umami tracking
    window.umamiTrack('section_view', {
      section_name: sectionName
    });
  };

  window.trackAudioPlayDual = function(songTitle, songIndex, page) {
    // GA4 tracking (existing)
    window.trackAudioPlay(songTitle, songIndex, page);
    
    // Umami tracking
    window.umamiTrack('audio_play', {
      song_title: songTitle,
      song_index: songIndex,
      source_page: page
    });
  };

  window.trackAudioPauseDual = function(songTitle, currentTime, page) {
    // GA4 tracking (existing)
    window.trackAudioPause(songTitle, currentTime, page);
    
    // Umami tracking
    window.umamiTrack('audio_pause', {
      song_title: songTitle,
      current_time: Math.round(currentTime)
    });
  };

  window.trackAudioCompleteDual = function(songTitle, page) {
    // GA4 tracking (existing)
    window.trackAudioComplete(songTitle, page);
    
    // Umami tracking
    window.umamiTrack('audio_complete', {
      song_title: songTitle,
      source_page: page
    });
  };
})();
