function extractContent() {
  

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


chrome.runtime.sendMessage(extractContent());

  