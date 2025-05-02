// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'download') {
      // Determine file extension based on URL (very basic check)
      const extension = request.url.endsWith('.mp4') ? '.mp4' : '.jpg';
      chrome.downloads.download({
        url: request.url,
        filename: 'instagram_media_' + Date.now() + extension,
        saveAs: true
      });
    }
  });
  