
let list = document.getElementById('score');

chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{


  const gameName = document.createElement('div');
  gameName.id='gameName';
  gameName.textContent = request.gameName;
  // game.appendChild(gameName);
  list.appendChild(gameName);

  const platform = document.createElement('div');
  platform.id = 'platform';
  platform.textContent = request.platform;
  // game.appendChild(platform);
  list.appendChild(platform);

  // list.appendChild(game);



  const info = document.createElement('div');
  info.id = 'info';

  const gameScore = document.createElement('span');
  gameScore.id='gameScore';
  const gameScore_text = request.gameScore
  gameScore.textContent = gameScore_text;

  if(gameScore_text=="Not Released"){
  
    gameScore.style.backgroundColor = 'black';
    gameScore.style.fontSize = '16px';

    
  }else{
    const gameScoreNumber = parseFloat(gameScore_text);
    let circleColor = 'green';
    if(gameScoreNumber < 7.5 && gameScoreNumber >= 5.0){
      circleColor = 'orange';
    }else if(gameScoreNumber < 5.0){
      circleColor ='red';
    };
    
    gameScore.style.fontSize = '16px';
    gameScore.style.backgroundColor = circleColor;
  }

  info.appendChild(gameScore);
  
  // Create a button element
  const userReview = document.createElement('button');
  userReview.id = 'userReview';
  userReview.textContent = "User Reviews";

  // Add a click event listener to the button
  userReview.addEventListener("click", function() {
    // Open a website in a new tab or window
    window.open(request.url+'/user-reviews');
  });
  // Append the link to a container element
  info.appendChild(userReview);

  list.appendChild(info);

});



document.addEventListener("DOMContentLoaded", function () {
  // Trigger the function when the popup is opened
  myFunction();
});


  

async function myFunction(){

  getGameInfo().then(result => {
    var gameInfo = result;
    
    if(gameInfo===null)
    {
      msg("Game Score is only effective on a certain game page of ebgames.com.au.", "");
    }
    else
    {
      const gameName = gameInfo[0].replace(/\u00F6/g, "o").replace(' (preowned)', "").replace(' Day One Edition',"").replace(' - Deluxe Edition',"");
      var platform = gameInfo[1].toString();

      if(platform==="Nintendo Switch"){
        platform = "switch"
      }
      else{
        platform = gameInfo[1].replace(/ /g, "-").toLowerCase();
      }
      
      const gameUrlOfMetacritic = 'https://www.metacritic.com/game/'+platform+'/'+gameName.replace(/:/g, "").replace(/ /g, "-").replace("'","").toLowerCase();
      
      chrome.runtime.sendMessage(gameUrlOfMetacritic);
       
      // judge not released vs not found
      // https://www.ebgames.com.au/product/ps4/215556-zombie-vikings-ragnarok-edition-preowned
      

      //assemble url
      //deal new game without info
      
      getScore(gameUrlOfMetacritic,gameName,gameInfo[1].toString());

    }
  });

    // const scriptContent =getWebpageScript(url);
    //use the game name to make up of the new url, retrive the info of this url
    //get the score from the info(RegEx???)
    //place the score on the 
    //multiple game website, attache link url
}



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


async function getScore(url,gameName,platform) {
  return fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const gameScoreElement = doc.getElementsByClassName('metascore_w user large game');
        let gameScore;
        
        if(gameScoreElement.length === 0){
          gameScore = "Not Released";
          
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
            args:[gameScore,url,gameName,platform]            
        });
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
}



async function msg(gameScore){
      let [tab] = await chrome.tabs.query({
        active:true, currentWindow: true
      });

      
      chrome.scripting.executeScript({
          target:{tabId:tab.id},
          func:sendResult,
          args:[gameScore]            
      });
}

function sendResult(gameScore,url,gameName,platform){
  chrome.runtime.sendMessage({gameScore,url,gameName,platform});
}






