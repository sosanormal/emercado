document.getElementById("ok").addEventListener("click", function() {

  //CATCH mail and pass
  const email= document.getElementById("email").value;
  const password= document.getElementById("pass").value;

  //Checks user and pass
  if (email && password){
        //SAVES user in Local Storage > then loads index 
        localStorage.setItem("user", email);
        localStorage.setItem("profilePic", 'https://dfge.de/wp-content/uploads/blank-profile-picture-973460_640.png');
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
  localStorage.setItem("profilePic", responsePayload.picture);
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