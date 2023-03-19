
/* Retrieve any previously set cookie and send to content script */


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

fetch('http://localhost:5000/allsites').then(r => r.text()).then(list_items_server => {

       console.log(list_items_server);
       list_items_server = JSON.parse(list_items_server);
    
       
                // Listen for messages from the content script
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

                
                     for(let link=0;link<list_items_server.length;link++){
                        console.log(request['product-name'],request,list_items_server[link]+request['product-name']);
                        fetch(list_items_server[link]+request['product-name']).then(r => r.text()).then(result => {
                            // Result now contains the response text, do what you want...
                    
                            let all_items_content_page = ConvertStringToHTML(result);
                    
                            let all_items_list = all_items_content_page.querySelectorAll('div#card_grid > div.card-item');
                            console.log(all_items_list);
                            let products = [];
                            for(let i = 0; i < all_items_list.length; i++){
                                try {
                                let title = all_items_list[i].querySelector('h2.card-v2-title.card-v2-fashion-title.card-v2-title-wrapper').textContent;
                                let price = all_items_list[i].querySelector('p.product-new-price').innerHTML;
                                let img = all_items_list[i].querySelector('.card-v2-thumb-inner > img').src;
                                products.push({title,price,img});
                                }catch(err) {
                                    console.log(err);
                                }
                            }
                            console.log(products);
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
                        
                        })
                }
            });
      
});

