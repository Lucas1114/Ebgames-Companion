
  // content.js

// Send a message to the background script to trigger the notification
function checkConditionsAndSendMessage() {
    // Replace this condition with your desired logic to trigger the notification
    const shouldShowNotification = true;
  
    if (shouldShowNotification) {
      chrome.runtime.sendMessage({ action: "showNotification", title: "Hello from Extension!", message: "This notification was triggered automatically." });
    }
  }
  
  // Call the function on page load
  checkConditionsAndSendMessage();
  