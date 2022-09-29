document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


//Checks Login and applies it
  function loadLogIn(){
    let logInButton = document.getElementById("navBarMenu");
  
    if(localStorage.getItem("user")){
        logInButton.innerHTML += 
  
        `<div class="dropdown">
        <li class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><img style="width: 20px;" src='${localStorage.getItem("profilePic")}'>
        ${localStorage.getItem("user")}
        </li>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item " href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item " href="my-profile.html">Mi perfil</a></li>
          <li><a class="dropdown-item " id="logOut" href="">Cerrar sesión</a></li>
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
