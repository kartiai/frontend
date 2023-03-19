let products = [
];

function getDataAll() {
  fetch('/profile/data?firma=all&username=luciangeorge06@yahoo.com')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      products = data;
      generateList();
      // Do something with the data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

function getDataEmag() {
fetch('/profile/data?firma=emag&username=luciangeorge06@yahoo.com')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    products = data;
    generateList();
    // Do something with the data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
}

function getDataPCgarage() {
  fetch('/profile/data?firma=pcgarage&username=luciangeorge06@yahoo.com')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      products = data;
      generateList();
      // Do something with the data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

function generateList(){
  document.getElementById("product-list-tag-id").innerHTML = '';
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
                <a href="#" class="btn btn-primary class-col-list-but-id" id="compare_data-ida1321" data-bs-toggle="modal" data-name-product="${product.name}" data-bs-target="#exampleModal">Compare</a>
            </div>
            </div>
            </div>


            `;

            document.getElementById("product-list-tag-id").innerHTML +=cards_boots;
}
}

getDataAll();
