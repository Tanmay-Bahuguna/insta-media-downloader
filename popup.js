// popup.js
document.getElementById('download-posts').addEventListener('click', () => {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Execute a script in the active tab to get media elements and download them
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          // Find all video and image elements on the page
          const mediaElements = document.querySelectorAll('video, img');
          mediaElements.forEach((element) => {
            let url = element.src;
            if (url) {
              // Send a message to trigger a download for each media element
              chrome.runtime.sendMessage({ action: 'download', url: url });
            }
          });
        }
      });
    });
  });
  