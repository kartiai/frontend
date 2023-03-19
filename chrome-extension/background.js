
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
let entire_list=[];
fetch('http://localhost:5000/allsites').then(r => r.text()).then(list_items_server => {

       console.log(list_items_server);
       list_items_server = JSON.parse(list_items_server);
    
       
                // Listen for messages from the content script
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

                
                     for(let link=0;link<list_items_server.length;link++){
                        console.log(list_items_server[link]);
                        console.log(request['product-name'],request,list_items_server[link][0]+request['product-name']);
                        fetch(list_items_server[link][0]+request['product-name']).then(r => r.text()).then(result => {
                            // Result now contains the response text, do what you want...
                    
                            let all_items_content_page = ConvertStringToHTML(result);
                    
                            let all_items_list = all_items_content_page.querySelectorAll(list_items_server[link][2]);
                            console.log(all_items_list);
                            entire_list.push(all_items_list);
                           /* let products = [];
                            for(let i = 0; i < all_items_list.length; i++){
                                try {
                                let title = all_items_list[i].querySelector(list_items_server[link][1]).innerHTML;
                                let price = all_items_list[i].querySelector(list_items_server[link][2]).innerHTML;
                                let img = all_items_list[i].querySelector(list_items_server[link][3]).src;
                                products.push({title,price,img});
                                }catch(err) {
                                    console.log(err);
                                }
                            }*/
                           // console.log(products);
                            const url = 'http://localhost:5000/add/product';
                            console.log(entire_list);
                            fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({"products":entire_list})
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
                let entire_list=[];
            });
      
});

