let scrapeEmails = document.getElementById('scrapeEmails');
let list = document.getElementById('emailList');

// var bkg = chrome.extension.getBackgroundPage();
// var console = chrome.extension.getBackgroundPage().console;



// Add an event listener to the button

  
// Function to get the text from the active tab
function getTextFromPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getPageText
      }, function(result) {
        const text = result[0].result;
        // chrome.extension.getBackgroundPage().console.log('foo');
        console.log("111111adfasdf");
        // Sending a message to the background script
        chrome.runtime.sendMessage(result);

        alert(text);
      });
    });
  }
  
  // Function injected into the page to retrieve its text content
  function getPageText() {
    return document.documentElement.innerText;
  }


  function getName() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractContent
      }, function(result) {
        
        // Sending a message to the background script
        chrome.runtime.sendMessage(result[0].result);
        // alert(text);
      });
    });
  }
  


  function extractContent() {

    const h1 = document.querySelector('div.product-header h1');
    //add judge null, and if it is in the correct page, how to let chrome extension detected the qualified page then execute the program
    const text = h1.childNodes[0].textContent;

    return text;
    
  }





  
  function getURL(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        const tabId = activeTab.id;
        const tabUrl = activeTab.url;

        fetch(tabUrl)
        .then(response => response.text())
        .then(data => {
            // Process the retrieved data
            alert(data);
        })
        .catch(error => {
            // Handle any errors that occur during the request
            alert(error);
        });
    });
  }



scrapeEmails.addEventListener("click",async()=>{
    // let [tab] = await chrome.tabs.query({
    //     active:true, currentWindow: true
    // });

    // chrome.scripting.executeScript({
    //     target:{tabId:tab.id},
    //     func:scrapeEmailsFromPage,
    // });

    // chrome.tabs.create({ url: 'https://www.example.com' });

    //get the name of game
    // alert('111');
    // console.log('111');

    // getTextFromPage();
    getName();
    
    

    //use the game name to make up of the new url, retrive the info of this url

    // fetch('https://www.google.com')
    //     .then(response => response.text())
    //     .then(data => {
    //         // Process the retrieved data
    //         alert(data);
    //     })
    //     .catch(error => {
    //         // Handle any errors that occur during the request
    //         alert(error);
    //     });

    //get the score from the info(RegEx???)




    //place the score on the 

    //multiple game website, attache link url
})




/*
function scrapeEmailsFromPage(){
    
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

    
    let emails = document.body.innerHTML.match(emailRegEx);
   
    chrome.runtime.sendMessage({emails});
    

}

*/