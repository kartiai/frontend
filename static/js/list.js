let products = [
];

function getDataAll(a) {
  fetch('/profile/data?firma=all&username=' + a)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      products = data;
      generateList();
      // Do something with the data
      console.log(data);
      console.log(a)
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

function getDataEmag(a) {
fetch('/profile/data?firma=emag&username=' + a)
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

function getDataPCgarage(a) {
  fetch('/profile/data?firma=pcgarage&username=' + a)
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

function getDataCel(a) {
  fetch('/profile/data?firma=cel&username=' + a)
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

function getDataAltex(a) {
  fetch('/profile/data?firma=altex&username=' + a)
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
                <a href="${product.link}" class="btn btn-primary">${product.price}</a>
                <a href="#" class="btn btn-primary class-col-list-but-id"
                id="compare_data-ida1321" data-bs-toggle="modal" data-name-product="
                ${product.name}" data-bs-target="#exampleModal">Compare</a>
            </div>
            </div>
            </div>


            `;

            document.getElementById("product-list-tag-id").innerHTML +=cards_boots;
}
}

document.getElementById("setButton").click();




