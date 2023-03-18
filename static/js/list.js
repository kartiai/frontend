const products = [
    {
      name: "T-Shirt",
      price: 20.99,
      description: "A comfortable and stylish t-shirt made from 100% cotton.",
      image: "https://example.com/tshirt.jpg"
    },
    {
      name: "Jeans",
      price: 39.99,
      description: "High-quality denim jeans with a slim fit and five-pocket styling.",
      image: "https://example.com/jeans.jpg"
    },
    {
      name: "Hoodie",
      price: 29.99,
      description: "A cozy hoodie made from a soft and warm cotton blend.",
      image: "https://example.com/hoodie.jpg"
    },
    {
      name: "Sneakers",
      price: 59.99,
      description: "Stylish sneakers with a cushioned sole and breathable mesh upper.",
      image: "https://example.com/sneakers.jpg"
    }
];


function getDataAll(event){
  if (event.type === 'click'){
   fetch('/profile/data?firma=all')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Do something with the data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
  }
}

function getDataEmag(event){
  if (event.type === 'click'){
   fetch('/profile/data?firma=emag')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Do something with the data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
  }
}


for (let i = 0; i < products.length; i++) {
    const product = products[i];
    let cards_boots=`
    <div class=" col-md-4" style="margin-top: 25px;">
            <div class="card " >
            <img class="card-img-top" src=${product.image} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <a href="#" class="btn btn-primary">${product.price}</a>
                <a href="#" class="btn btn-primary" id="compare_data-ida1321" data-bs-toggle="modal" data-bs-target="#exampleModal">Compare</a>
            </div>
            </div>
            </div>
            

            `;

            document.getElementById("product-list-tag-id").innerHTML +=cards_boots;
}
