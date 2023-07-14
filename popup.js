let scrapeEmails = document.getElementById('scrapeEmails');
let list = document.getElementById('emailList');

// var bkg = chrome.extension.getBackgroundPage();
// var console = chrome.extension.getBackgroundPage().console;



// Add an event listener to the button

  


  



function getName() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    const url = tab.url;

    //need more if else for console

    if(url.includes("ebgames.com.au/product")){

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractContent
      }, function(result) {
        const gameName = result[0].result;
        // Sending a message to the background script
        // chrome.runtime.sendMessage(text);
        alert(gameName);
        return gameName;
      });

    }else{
      alert("Game Score is only effective on a certain game page of ebgames.com.au.")
    }
    
  });
}



function extractContent() {

  const h1 = document.querySelector('div.product-header h1');
  //add judge null, and if it is in the correct page, how to let chrome extension detected the qualified page then execute the program
  const text = h1.childNodes[0].textContent;

  return text;
  
}


function getGameScore(url, className) {
  return fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const gameScoreElement = doc.getElementsByClassName(className);
        

        if(gameScoreElement.length === 0){
          alert("No score until game release")
          // alert(doc.getElementsByClassName('countdown_msg')[0].textContent);

        }else{
          const gameScore = gameScoreElement[0].textContent;
          chrome.runtime.sendMessage(gameScore);
          alert(gameScore);

        }
        
      })
      .catch(error => {
        console.error('Error fetching webpage:', error);
      });
}







scrapeEmails.addEventListener("click",async()=>{
    
    // const gameName = getName();

    const gameUrlOfMetacritic = 'https://www.metacritic.com/game/playstation-5/ea-sports-fc-24'
    // const gameUrlOfMetacritic = 'https://www.metacritic.com/game/playstation-5/god-of-war-ragnarok'
    const userScoreClassNameOfMetacritic ='metascore_w user large game positive'

    //assemble url
    //deal new game without info

    getGameScore(gameUrlOfMetacritic,userScoreClassNameOfMetacritic);
    
    

    

    
    
    // const scriptContent =getWebpageScript(url);

    

    //use the game name to make up of the new url, retrive the info of this url

    

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