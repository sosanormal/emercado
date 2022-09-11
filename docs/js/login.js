document.getElementById("ok").addEventListener("click", function() {

  //CATCH mail and pass
  const email= document.getElementById("email").value;
  const password= document.getElementById("pass").value;

  //Checks user and pass
  if (email && password){
        //SAVES user in Local Storage > then loads index
        localStorage.setItem("user", email);
        window.location = "index.html";
  }else{
    location.reload();
  }
})


function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);

  console.log("ID: " + responsePayload.sub);
  console.log("Full Name: " + responsePayload.name);
  console.log("Given Name: " + responsePayload.given_name);
  console.log("Family Name: " + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);

  localStorage.setItem("user", responsePayload.email);
  window.open("index.html", "_self");
}

function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};




//Saves GOOGLE info *not working yet*
/*
function handleCredentialResponse(response){
  const responsePayload = decodeJwtResponse(response.credential);
  localStorage.setItem("user", responsePayload.name);
  window.open("index.html", "_self");
}*/
/* EJEMPLO DE JONATHAN ANDINO
window.onload = function(){
  google.accounts.id.initialize({
    client_id: "126921994551-p4huehaodcnik7r336o25qtbrt5te7tq.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: true,
    auto: true
  });
  google.accounts.id.prompt();
}

//funcion decodificador de credential response
function decodeJwtResponse(token){
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c){
    return '%' + ('00'+ c.charCodeAt(0).toString(16)).slice(-2); 
  }).join(''));
  return JSON.parse(jsonPayload);
}*/

/*
Lo dejé por acá porque para poder hacerlo funcionar ya me tenia que meter en temas de backend y me perdí
        https://developers.google.com/identity/sign-in/web/backend-auth

        Este es el metodo que nos pasó JOSELINE
        https://developers.google.com/identity/gsi/web/guides/migration#popup-mode_1

        VIDEO:
        https://www.youtube.com/watch?v=kUi6Z5bxHfE

        EJEMPLO QUE COPIE
        https://gist.github.com/subhamchbty/0ea970b559bc8d15e6f42bf2d1258eae
        */