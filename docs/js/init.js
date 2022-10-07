const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


/* ---------------------------  */
/* --------- ICONS -----------  */
/* ---------------------------  */

var logOutIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" /> <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" /></svg>`
var cartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"> <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`
var profileIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`




/* ----------------------------------------  */
/* ---------- CHECKS USERLOGIN  -----------  */
/* ----------------------------------------  */

//Checks Login and applies it
function loadLogIn(){
  let logInButton = document.getElementById("navBarMenu");

  if(localStorage.getItem("user")){
      logInButton.innerHTML += 

      `
      <div class="dropdown">
      <li class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img style="width: 20px;" src='${localStorage.getItem("profilePic")}'>
      ${localStorage.getItem("user")}</li>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item " href="cart.html">${cartIcon}
        Mi carrito</a></li>
        <li><a class="dropdown-item " href="my-profile.html">
          ${profileIcon}
        
        Mi perfil</a></li>
        <li><a class="dropdown-item " id="logOut" href="">
            ${logOutIcon}
        
        
        Cerrar sesión</a></li>
      </ul>
    </div>`

  } else{
      window.open("login.html", "_self")
  }
}

loadLogIn();



//Function for LOG OUT

function logOut() {
localStorage.clear(); /* CLEARS ALL LOCAL STORAGE */
location.reload();
}

//Control for LOG OUT 
document.getElementById('logOut').addEventListener("click", function() {
logOut();
});






/* ----------------------------------------  */
/* --------------- PRODUCTS  --------------  */
/* ----------------------------------------  */

    //This function sets the product ID in the local storage
    function setProdID(id) {
      localStorage.setItem("prodID", id);
      window.location = "product-info.html";
    }


/* ----------------------------------------  */
/* ------- GLOBAL CARTVARIABLES  ----------  */
/* ----------------------------------------  */

let cartList = []

function loadLocalStorageCart(){
  let array = localStorage.getItem('myCart');
  array = JSON.parse(array);
  return array;
}

