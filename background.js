// Event listener for the extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Perform actions when the extension is first installed
    console.log('Extension installed');
  } else if (details.reason === 'update') {
    // Perform actions when the extension is updated
    console.log('Extension updated');
  }
});

// // Event listener for incoming messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Perform actions based on the message received
  console.log('Message received:', message);

//   // Send a response back if needed
  sendResponse('Message received');
});

// // Event listener for browser action click
chrome.action.onClicked.addListener((tab) => {
  // Perform actions when the extension's browser action is clicked
  console.log('Browser action clicked');
});





chrome.tabs.onActivated.addListener((activeInfo) => {
  
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }
    

    const url = tab.url;
    console.log('111');
    if (url.includes('ebgames.com.au/product')) {
      
      chrome.action.setIcon({ path: 'icons/222.png' });
      
    } else {
      chrome.action.setIcon({ path: 'icons/111.png' });  
    }
  });
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Make sure the status is "complete" to ensure the page has finished loading
  // if (changeInfo.status === "complete") {
    // const url = tab.url;
    
    if (tab&&tab.url.includes('ebgames.com.au/product')) {
      
      chrome.action.setIcon({ path: 'icons/222.png' });
      
    } else {
      chrome.action.setIcon({ path: 'icons/111.png' });  
    }
  // }
});







