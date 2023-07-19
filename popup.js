let getGameScore = document.getElementById('getGameScore');
let list = document.getElementById('score');



chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{

  let gameScore = request.gameScore;
  let url = request.url;


  // Create a button element
  const button = document.createElement('button');
  button.textContent = gameScore;

  // Add a click event listener to the button
  button.addEventListener("click", function() {
    // Open a website in a new tab or window
    window.open(url+'/user-reviews');
  });


  // Append the link to a container element
  list.appendChild(button);






  // let li1 = document.createElement('li');
  // li1.innerText = gameScore;
  // list.appendChild(li1);

  // let li2 = document.createElement('li');
  // li2.innerText = url+'/user-reviews'
  // list.appendChild(li2);
      
});

getGameScore.addEventListener("click",async()=>{

  getGameInfo().then(result => {
    var gameInfo = result;
    
    if(gameInfo===null)
    {
      alert("Game Score is only effective on a certain game page of ebgames.com.au.")
    }
    else
    {
      const gameName = gameInfo[0].replace(/ /g, "-").replace(/:/g, "").replace(/\u00F6/g, "o").replace('-(preowned)', "").toLowerCase();
      var platform = gameInfo[1].toString();

      if(platform==="Nintendo Switch"){
        platform = "switch"
      }
      else{
        platform = gameInfo[1].replace(/ /g, "-").toLowerCase();
      }
      
      const gameUrlOfMetacritic = 'https://www.metacritic.com/game/'+platform+'/'+gameName;
      
      chrome.runtime.sendMessage(gameUrlOfMetacritic);

      // const gameUrlOfMetacritic = 'https://www.metacritic.com/game/playstation-5/ea-sports-fc-24'
      // const gameUrlOfMetacritic = 'https://www.metacritic.com/game/playstation-5/god-of-war-ragnarok'
      const userScoreClassNameOfMetacritic ='metascore_w user large game'

      //assemble url
      //deal new game without info
      
      getScore(gameUrlOfMetacritic,userScoreClassNameOfMetacritic);

    }
  });

    // const scriptContent =getWebpageScript(url);
    //use the game name to make up of the new url, retrive the info of this url
    //get the score from the info(RegEx???)
    //place the score on the 
    //multiple game website, attache link url
})



function getGameInfo() {
  var gameInfo=111;
  
  return new Promise((resolve,reject)=>{

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      const url = tab.url;
      
      //need more if else for console
  
      if(url.includes("ebgames.com.au/product")){
  
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: extractContent
        }, function(result) {
          gameInfo = result[0].result;
          resolve(gameInfo);
          // Sending a message to the background script
          // chrome.runtime.sendMessage(gameInfo);
        });
      } 
      else{
        resolve(null);
      }    
    });
  })
}



function extractContent() {

  let gameInfo =[];
  //add judge null, and if it is in the correct page, how to let chrome extension detected the qualified page then execute the program
  const gameName = document.querySelector('div.product-header h1').childNodes[0].textContent;
  const platform = document.getElementsByClassName('product-breadcrumb-item')[3].textContent;
  
  gameInfo.push(gameName.trim());
  gameInfo.push(platform.trim());

  return gameInfo;
  
}


async function getScore(url, className) {
  return fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const gameScoreElement = doc.getElementsByClassName(className);
        let gameScore;
        
        if(gameScoreElement.length === 0){
          gameScore = "No score until game release"
          
        }else{
          gameScore = gameScoreElement[0].textContent;
          
        }  
        return gameScore;
        
      })
      .then(async(gameScore) =>{
        let [tab] = await chrome.tabs.query({
          active:true, currentWindow: true
        });
    
        chrome.scripting.executeScript({
            target:{tabId:tab.id},
            func:sendResult,
            args:[gameScore,url]            
        });

      })
      
      .catch(error => {
        console.error('An error occurred:', error);
      });
}



function sendResult(gameScore,url){
  chrome.runtime.sendMessage({gameScore,url});
  // chrome.runtime.sendMessage(12345);
}







