//Variables del formulario
let formulario = document.getElementById("formulario");

let uName = document.getElementById("firstName");
let sName = document.getElementById("secondName");
let lName = document.getElementById("firstLastName");
let sLname = document.getElementById("secondLastName");

let mail = document.getElementById("email");
let contact = document.getElementById("contactNumber");

let profilePic = document.getElementById("profilePic");


//Cartel de exito
function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
    setTimeout(() => {
      document.getElementById("alert-success").classList.remove("show")
    }, "5000")
}


//Cargar datos del perfil (si los hay)
loadUserProfile(); function loadUserProfile(){
    if(localStorage.getItem("email")){
          if (localStorage.getItem("email")){ mail.value = localStorage.getItem("email")}
          if (localStorage.getItem("firstName")){ uName.value = localStorage.getItem("firstName")}
          if (localStorage.getItem("secondName")){sName.value = localStorage.getItem("secondName")}
          if (localStorage.getItem("lastName")){lName.value = localStorage.getItem("lastName")}
          if (localStorage.getItem("secondLastName")){sLname.value = localStorage.getItem("secondLastName")}
          if (localStorage.getItem("contactNumber")){contact.value = localStorage.getItem("contactNumber")}
          if (localStorage.getItem("profilePic")){ profilePic.src = localStorage.getItem("profilePic")}
    }
  }

//Funcion para validacion
      (function () {
        'use strict' 
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function(event){
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
      });
      })()



//Función de Guardar cambios
function saveChanges(){

      if(formulario.checkValidity()){

        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("firstName", document.getElementById("firstName").value);
        localStorage.setItem("secondName", document.getElementById("secondName").value);
        localStorage.setItem("lastName", document.getElementById("firstLastName").value);
        localStorage.setItem("secondLastName", document.getElementById("secondLastName").value);
        localStorage.setItem("contactNumber", document.getElementById("contactNumber").value);

        //DESAFIATE
        if(!(localStorage.getItem("newImage") === "")){
          localStorage.setItem("profilePic", localStorage.getItem("newImage"));
          localStorage.setItem("newImage","");
        }else{}

        showAlertSuccess();
      }
}


//DESAFIATE

function readURL(myImg){
  const reader = new FileReader();

  reader.addEventListener("load", () =>{
    localStorage.setItem("newImage", reader.result);
    profilePic.src = reader.result;
  })

  reader.readAsDataURL(myImg.files[0]);
}
