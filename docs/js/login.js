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
function handleCredentialResponse(response){
  console.log(response);
  console.log('Full Name: ' + response.credential.name);
  console.log("Image URL: " + response.credential.picture);
  console.log("Email: " + response.credential.email);
}