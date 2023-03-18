// Listen for messages from the content script
/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    if (request.data) {
      // Handle the JSON object
      const name = request.data.name;
      const email = request.data.email;
      console.log(name, email);
    }
  });
  */
/* Retrieve any previously set cookie and send to content script */

// Send a message to content.js
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "Hello from background.js!"}, function(response) {
      console.log(response);
    });
  });
  
/*
let data = [
    {
        "cards_container":"div#card_grid",
        "card":"div.card-item"
    }

];

let ConvertStringToHTML = function (str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
 };

fetch('https://www.emag.ro/search/').then(r => r.text()).then(list_items_server => {

        // Create a data object
    const data_send = {
        message: 'Hello from the background script!'
    };
    

    fetch('https://www.emag.ro/search/cos+depozitare').then(r => r.text()).then(result => {
        // Result now contains the response text, do what you want...

        let all_items_content_page = ConvertStringToHTML(result);

        let all_items_list = all_items_content_page.querySelectorAll('div#card_grid > div.card-item');
        console.log(all_items_list);
        let products = [];
        for(let i = 0; i < all_items_list.length; i++){
            try {
               let title = all_items_list[i].querySelector('a.card-v2-title.semibold.mrg-btm-xxs.js-product-url').textContent;
               let price = all_items_list[i].querySelector('p.product-new-price').innerHTML;
               let img = all_items_list[i].querySelector('.card-v2-thumb-inner > img').src;
               products.push({title,price,img});
            }catch(err) {
                console.log(err);
              }
        }

        const url = 'http://localhost:5000/add/product';
        
        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"products":products})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
        console.log(products);
    })
})

*/