/*-----------------------------------------
 ----------- Functions to call ------------
 -----------------------------------------*/

// Global variables
let product = {};

//Change product ID
function newProdID(id){
  localStorage.setItem("prodID", id);
  location.reload();
}

//Add Slider indicators
function addSlideInd(items){
  var elementHTML = ""
  for (i=0; i<items.length; i++){
   if (i==0){
      elementHTML += `<button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i}"></button>`
    }else{
      elementHTML += `<button type="button" data-bs-target="#carousel" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`
    }
  }  
  return elementHTML;
}

//Add Slider images
function addSlideIMG(images){
  var elementHTML = ""

  for (i=0; i<images.length; i++){
    if (i==0){
      elementHTML +=
      `<div class="carousel-item active">
          <img class="sliderIMG" src="${images[i]}" class="d-block w-100" alt="...">
      </div>`

     }else{
      elementHTML +=
      `<div class="carousel-item">
        <img class="sliderIMG" src="${images[i]}" class="d-block w-100" alt="...">
      </div>`
     }
   }  
return elementHTML;
}

// Show alert sucess function
function showAlertSucess() {
  document.getElementById("alert-success").style.display = "block";

  setTimeout(function() { 
    document.getElementById("alert-success").style.display = "none"; 
    }, 5000);
}

//Add Stars FUNCTION
function addStars(score){
  let starCount= 0;
  let starsHTML = "";

  for(j=0; j<5; j++){
    if(starCount<score){ starsHTML += `<span class="fa fa-star" style="color: orange;"></span>`}
    else{ starsHTML += `<span class="fa fa-star"></span>`}
    starCount ++;
  }
  return starsHTML;
}


/*--------------------------------------------
 ----------- LOAD WEBSITE CONTENT ------------
 -------------------------------------------*/


//Website Load
document.addEventListener("DOMContentLoaded", () =>{

  //Product Info FETCH
  fetch(PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE)
  .then(response => response.json())
  .then(data => {
    product = data;
    showProductInfo(data);

    loadRelatedProducts(data.relatedProducts);

    //console.log(PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE)
  })

  //Comment section FETCH
  fetch(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodID') + EXT_TYPE)
  .then(resp => resp.json())
  .then(data => {
    loadComments(data);
  })
});


// Product Html Loading Function
function showProductInfo(product){


  //Design HTML
  var elementHTML = `
      <div class="row">
            
            <div id="carousel" class="carousel slide col-lg-7 col-md-12" data-bs-ride="carousel">  
                <div class="carousel-indicators">${addSlideInd(product.images)}</div>
                <div class="carousel-inner">${addSlideIMG(product.images)}</div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class= "product_info col-lg-4 col-md-12"> 
              <h1>${product.name}</h1>
              <h2 class="price">${product.cost} ${product.currency}</h2>
              <br>
              <p><strong>Categoría: </strong>${product.category}</p>
              <p><strong>Descripción: </strong>${product.description}</p>
              <p><strong>Vendidos:</strong> ${product.soldCount}</p>

              <button onclick="addToCart()" class="btn btn-success">${cartIcon} Agregar al carrito</button>
            </div>
      </div>
    `
  //Apply HTML changes
    document.getElementById("productInfo").innerHTML += elementHTML;

}    

/*--------------------------------------------
 ------------ RELATED PRODUCTS ---------------
 -------------------------------------------*/


function loadRelatedProducts(relProd){
  var elementHTML = "";

  for (i=0; i<relProd.length; i++){
    elementHTML += 
        `<div class= "d-inline-flex p-2 border m-2" style="border-radius: 10px;">
            <div style= "flex-direction: column; text-align: center;">
                  <a onclick="newProdID(${relProd[i].id})" href="#">
                    <img class="img_gallery" style="width:200px" src="${relProd[i].image}">
                    <p>${relProd[i].name} </p>
                  </a>
                
            </div>

        </div>`
  }

  document.getElementById("relatedProducts").innerHTML += elementHTML;
}

/*--------------------------------------------  ; 
 ------------ PRODUCT COMMENTS ---------------
 -------------------------------------------*/



// Loading comments
function loadComments(comments){

  var elementHTML = "";

  for (i=0; i<comments.length; i++){
    elementHTML += 
    `<div class="comments">
        <p><strong>${comments[i].user}</strong><span class="date"> | ${comments[i].dateTime} | </span><span>${addStars(comments[i].score)}</span></p>
        <p>${comments[i].description}</p>
    </div>`
  }
  
  //Apply HTML changes
  document.getElementById("commentSection").innerHTML += elementHTML;
}


/*--------------------------------------------
 --------------- MY COMMENTS -----------------
 -------------------------------------------*/

//NEW comments
function addComment(){

  //set variables
  let comment = document.getElementById("myComment").value;
  let rate = document.getElementById("rate").value;
  let user = localStorage.getItem("user")

  //Set comment date
  const myDate= new Date();
  const dateString= myDate.toLocaleString();

  //Set comment HTML
  document.getElementById("commentSection").innerHTML +=
  `
    <div class="comments">
      <p><strong>  ${user}</strong> | <span style="color:gray;">${dateString}</span> | <span>${addStars(rate)}</span></p>
      <p>${comment}</p>
    </div>
    `

  //Add HTML comment
  document.getElementById("myComment").value = "";
  document.getElementById("rate").value = "1";

  showAlertSucess() 
}





/*-----------------------------------------
 ----------- ADD TO CART FUNCTION ------------
 -----------------------------------------*/

 function addToCart(){

  let alreadyInCart = false;

  if(localStorage.getItem("myCart")){

    alreadyInCart = false;

    for (i=0;i<loadLocalStorageCart().length; i++){
      if (loadLocalStorageCart()[i].id == product.id){
        //tengo que ver como hacer para que en este caso, agregue 1 al 'count' del producto
        alreadyInCart = true;
        console.log("Already in cart!! wont add it");
      }
    }
  }
    else{
      console.log("There is no cart, lets create it");
      let productObject={id: product.id , name: product.name, unitCost: product.cost, count: 1 , currency: product.currency, image: product.images[0]};
      cartList = []
      cartList = cartList.concat(productObject);
      localStorage.setItem('myCart', JSON.stringify(cartList));
      alreadyInCart = true;

    }

    if (alreadyInCart==false){
      console.log("The product is not in the cart, lets add it");

      let productObject={id: product.id , name: product.name, unitCost: product.cost, count: 1 , currency: product.currency, image: product.images[0]};

      cartList = loadLocalStorageCart();

      cartList = cartList.concat(productObject);
    
      localStorage.setItem('myCart', JSON.stringify(cartList));
    }

}