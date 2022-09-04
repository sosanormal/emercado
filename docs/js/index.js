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

function logOut() {
    localStorage.clear(); /* CLEARS ALL LOCAL STORAGE */
    location.reload();
}

function loadLogIn(){
    let logInButton = document.getElementById("navBarMenu");

    if(localStorage.getItem("user")){
        logInButton.innerHTML += 

        `<div class="dropdown">
        <li class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${localStorage.getItem("user")}
        </li>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item " href="my-profile.html">${localStorage.getItem("user")}</a></li>
          <li><a class="dropdown-item " id="logOut" href="">LogOut</a></li>
        </ul>
      </div>`

    } else{
        //logInButton.innerHTML += `<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>`
        window.open("login.html", "_self")
    }
}
loadLogIn()

document.getElementById('logOut').addEventListener("click", function() {
    logOut();
});