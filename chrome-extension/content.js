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

  const element = document.getElementById("compare_data-ida1321");  
  element.addEventListener("click", function(event) {
    const clickedElement = event.target;
    chrome.runtime.sendMessage({ "product-name":clickedElement.getAttribute("data-name-product") });
  });
};


  // Send the JSON object to the background script
  //
  
