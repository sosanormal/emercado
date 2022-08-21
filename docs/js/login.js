document.getElementById("ok").addEventListener("click", function() {

  const email= document.getElementById("email").value;
  const password= document.getElementById("pass").value;

if (email && password){
  window.location = "index.html";
}else{
  window.location = "login.html";
}
})

//DESAFIATE

/*
gapi.load('auth2', function(){
  gapi.auth2.init();
});

document.getElementById("signin").addEventListener("click", function() {

})
*/