// Global variables
let product = {};

//Function for changing images when clicking at gallery 
function changeIMG(k){
  console.log(product.images[k])
  document.getElementById("shownIMG").src = product.images[k]
}


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
          <div id="imgGallery" class="col-1 m-1"> 
          </div>
            <div class="col-6"> 
              <a href="${product.images[0]}" target="_blank"><img id="shownIMG" style="width:100%; border-radius: 20px;" src="${product.images[0]}"></a>
            </div>

            <div class= "col-4 m-1"> 
              <h1>${product.name}</h1>
              <h2 style="color:green">${product.cost} ${product.currency}</h2>
              <br>
              <p><strong>Categoría: </strong>${product.category}</p>
              <p><strong>Descripción: </strong>${product.description}</p>
              <p><strong>Vendidos:</strong> ${product.soldCount}</p>
            </div>
      </div>
    `
  //Apply HTML changes
    document.getElementById("productInfo").innerHTML += elementHTML;

  //Add small gallery of images with function
    for (let k=0; k< product.images.length;k++){
      document.getElementById("imgGallery").innerHTML += `<a href="#"><img onclick="changeIMG(${k})" style="width:100%; padding:1px; border: 1px solid #ddd; border-radius: 10px;" src="${product.images[k]}"></a>
      <style>
        img:hover {
          box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
        }
      </style>`
    }

}


// Loading comments
function loadComments(comments){

  var elementHTML = "";

  for (i=0; i<comments.length; i++){
    elementHTML += `
    <div id="${comments[i].user}_${comments[i].dateTime}" class="m-3 p-3" style="border: 1px solid #ddd; background-color:lavender;">

    <p><strong>${comments[i].user}</strong> | <span style="color:gray;">${comments[i].dateTime}</span> | <span id="${comments[i].user}_score"></span></p>
      <p>${comments[i].description}</p>

    </div>
    `
  }
  
  //Apply HTML changes
  document.getElementById("commentSection").innerHTML += elementHTML;

  //Add the stars
    for (i=0; i<comments.length; i++){
      let starCount= 0;
      for(j=0; j<5; j++){
        if(starCount<comments[i].score){
          document.getElementById(comments[i].user + "_score").innerHTML += `<span class="fa fa-star" style="color: orange;"></span>`;
        }else{document.getElementById(comments[i].user + "_score").innerHTML += `<span class="fa fa-star"></span>`}
        starCount ++;
      }
    }
}


//Add new comments
function addComment(){
  let comment = document.getElementById("myComment").value;
  let rate = document.getElementById("rate").value;

  
  const myDate= new Date();
  const dateString= myDate.getFullYear() +'-'+ myDate.getMonth()+'-'+ myDate.getDay();
  let myCommentId = localStorage.getItem("user") + "_" + dateString

  document.getElementById("commentSection").innerHTML +=
  `
    <div id="${myCommentId}" class="m-3 p-3" style="border: 1px solid #ddd; background-color:lavender;">
    <p><strong>  ${localStorage.getItem("user")}</strong> | <span style="color:gray;">${dateString}</span> | <span id="${localStorage.getItem("user")}_score"></span></p>
      <p>${comment}</p>
    </div>
    `

    //Add STARS (provisorio)

      let starCount= 0;
      for(j=0; j<5; j++){
        if(starCount<rate){
          document.getElementById(localStorage.getItem("user") + "_score").innerHTML += `<span class="fa fa-star" style="color: orange;"></span>`;
        }else{document.getElementById(localStorage.getItem("user") + "_score").innerHTML += `<span class="fa fa-star"></span>`}
        starCount ++;
      }

    document.getElementById("commentForm").innerHTML = `<strong style="color:#3399aa">¡Gracias por su comentario!</strong>`
}