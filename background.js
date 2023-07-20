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








