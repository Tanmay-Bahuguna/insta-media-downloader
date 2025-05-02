// content.js
(function() {
    const BUTTON_CLASS = 'insta-download-btn';
  
    console.log('[InstaDL] content.js loaded');
  
    function getUrl(el) {
      if (el.tagName === 'VIDEO') {
        return el.currentSrc || el.src;
      }
      if (el.tagName === 'IMG') {
        return el.src;
      }
      return null;
    }
  
    function inject() {
      console.log('[InstaDL] inject() running');
      document.querySelectorAll('video, img').forEach(el => {
        if (el.parentElement.querySelector(`.${BUTTON_CLASS}`)) return;
        const url = getUrl(el);
        if (!url) return;
  
        // make sure parent is positioned
        const parent = el.parentElement;
        if (getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }
  
        // create button
        const btn = document.createElement('button');
        btn.className = BUTTON_CLASS;
        btn.textContent = '↓';
        Object.assign(btn.style, {
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          padding: '2px 6px',
          fontSize: '14px',
          background: 'rgba(56,151,240,0.8)',
          color: '#fff',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          zIndex: 9999,
        });
        btn.addEventListener('click', e => {
          e.stopPropagation(); e.preventDefault();
          console.log('[InstaDL] Downloading:', url);
          chrome.runtime.sendMessage({ action: 'download', url });
        });
  
        parent.appendChild(btn);
        console.log('[InstaDL] Button added for', url);
      });
    }
  
    window.addEventListener('load', inject);
    new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
  })();
  