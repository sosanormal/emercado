/*-----------------------------------------
 ----------- Functions to call ------------
 -----------------------------------------*/

// Global variables
let product = {};

//Function for changing images when clicking at gallery 
function changeIMG(k){
  console.log(product.images[k])
  document.getElementById("shownIMG").src = product.images[k]
}

//Add small gallery of images with function
  function addImgGallery(){
    var galleryHTML = ""
    for (let k=0; k< product.images.length;k++){
      galleryHTML += `<a href="#"><img onclick="changeIMG(${k})" class="img_gallery" src="${product.images[k]}"></a>`
    }
    return galleryHTML;
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
      <div class= "row" style="padding-top:10px;">
          <div id="imgGallery" class="col-1 m-1"> ${addImgGallery()}
          </div>
            <div class="col-6"> 
              <a href="${product.images[0]}" target="_blank"><img id="shownIMG" class="shownIMG" src="${product.images[0]}"></a>
            </div>

            <div class= "product_info col-4"> 
              <h1>${product.name}</h1>
              <h2 class="price">${product.cost} ${product.currency}</h2>
              <br>
              <p><strong>Categoría: </strong>${product.category}</p>
              <p><strong>Descripción: </strong>${product.description}</p>
              <p><strong>Vendidos:</strong> ${product.soldCount}</p>
            </div>
      </div>
    `
  //Apply HTML changes
    document.getElementById("productInfo").innerHTML += elementHTML;

}


/*--------------------------------------------
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

  showAlertSucess() 
}