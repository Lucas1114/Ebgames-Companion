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
  sendResponse(message);
});

// // Event listener for browser action click
chrome.action.onClicked.addListener((tab) => {
  // Perform actions when the extension's browser action is clicked
  console.log('Browser action clicked');
});





chrome.tabs.onActivated.addListener((activeInfo) => {

  chrome.scripting.executeScript({
    target: { tabId: activeInfo.tabId },
    files: ['content.js']
  }, function(result) {
    if (typeof result !== 'undefined' && result[0].result!=null && result[0].result[2]=='Video Games') {
      
      console.log(888)
      chrome.action.setIcon({ path: 'icons/g16.png' });
    
    }
    else {
      chrome.action.setIcon({ path: 'icons/b16.png' });
    } 
  })
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  }, function(result) {
    console.log(result)
    if (typeof result !== 'undefined' && result[0].result!=null && result[0].result[2]=='Video Games') {
      
      console.log(888)
      chrome.action.setIcon({ path: 'icons/g16.png' });
    
    }
    else {
      console.log(999)
      chrome.action.setIcon({ path: 'icons/b16.png' });
    } 
  })
  
});









