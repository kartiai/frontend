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

    const element = document.getElementById("myBtn");
    element.addEventListener("click", function(element) {
        console.log(element);
        chrome.runtime.sendMessage({ data });
    });
};

  
  // Send the JSON object to the background script
  //
  
