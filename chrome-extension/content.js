// Create a JSON object
const data = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

// Send a message to content.js
// Listen for messages from background.js
console.log("data");
//add onclick add event listener


window.onload = function() {
 
  document.addEventListener('click', event => {
    // get the element that was clicked
    const clickedElement = event.target;
  
    // check if the element has the class name we're looking for
    if (clickedElement.classList.contains('class-col-list-but-id')) {
      // add your onclick event code here
      console.log(clickedElement.getAttribute("data-name-product"));
      chrome.runtime.sendMessage({ "product-name":clickedElement.getAttribute("data-name-product") });
    }
  });

};


  // Send the JSON object to the background script
  //
  
