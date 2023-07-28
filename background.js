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


  // const tabId = activeInfo.tabId;

  chrome.scripting.executeScript({
    target: { tabId: activeInfo.tabId },
    // function: extractContent()
    files: ['content.js']
  }, function(result) {
    console.log(result)
    gameInfo = result[0].result;  
    console.log(gameInfo)
    if(gameInfo && gameInfo[2]=='Video Games'){
      console.log(888)
      chrome.action.setIcon({ path: 'icons/222.png' });
    
    }
    else {
      console.log(999)
      chrome.action.setIcon({ path: 'icons/111.png' });  
    } 
  })

  
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  aaa();

  // getGameInfo(tabId,tab.url).then(result => {
  //   var gameInfo = result;
    
  //   if(gameInfo && gameInfo[2]!='Video Games'){
  //     chrome.action.setIcon({ path: 'icons/222.png' });

  //   }
  //   else {
  //     chrome.action.setIcon({ path: 'icons/111.png' });  
  //   }
  // })

    // if (tab&&tab.url.includes('ebgames.com.au/product')) {
    //   chrome.action.setIcon({ path: 'icons/222.png' });
      
    // } else {
    //   chrome.action.setIcon({ path: 'icons/111.png' });  
    // }
  // }
});


async function aaa(){
  getGameInfo().then(result => {
    var gameInfo = result;
    console.log(777)
    
    if(gameInfo && gameInfo[2]!='Video Games'){
      chrome.action.setIcon({ path: 'icons/222.png' });

    }
    else {
      chrome.action.setIcon({ path: 'icons/111.png' });  
    }
  })

 }

function getGameInfo() {
  var gameInfo=111;
  
  return new Promise((resolve,reject)=>{

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      const url = tab.url;
      chrome.runtime.sendMessage(tab.id);
      //need more if else for console
  
      if(url.includes("ebgames.com.au/product")){
  
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: extractContent
        }, function(result) {
          console.log(555)
          gameInfo = result[0].result;
          console.log(666)
          resolve(gameInfo);
        });
      } 
      else{
        resolve(null);
      }    
    });
  })
}


// function getGameInfo(id,url) {
//   var gameInfo=111;
//   console.log(id);
  
//   return new Promise((resolve,reject)=>{

//     // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     //   const tab = tabs[0];
//     //   const url = tab.url;
      
//       //need more if else for console
      
      
//       if(url.includes("ebgames.com.au/product")){
        
  
//         chrome.scripting.executeScript({
//           target: { tabId: id },
//           function: extractContent
//         }, function(result) {
//           console.log(555)
//           console.log(result)
//           gameInfo = result[0].result;
//           console.log(666)
//           resolve(gameInfo);
//         });
//       } 
//       else{
        
//         resolve(null);
//       }    
//     // });
//   })
// }

function extractContent() {
  console.log(222)

  let gameInfo =[];
  //add judge null, and if it is in the correct page, how to let chrome extension detected the qualified page then execute the program
  const gameName = document.querySelector('div.product-header h1').childNodes[0].textContent;
  const platform = document.getElementsByClassName('product-breadcrumb-item')[3].textContent;
  const category = document.getElementsByClassName('product-breadcrumb-item')[2].textContent;
 
  
  gameInfo.push(gameName.trim());
  gameInfo.push(platform.trim());
  gameInfo.push(category.trim());

  return gameInfo;
  
}




