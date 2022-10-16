/*--------------------------------------------
 -- Functions and local variables to call ---
 --------------------------------------------*/

    let articulos =[];


    //VACIAR CARRITO

    function clearCart(){
      localStorage.setItem('myCart', "");
      location.reload();

    }

    //FUNCION SUBTOTAL

    function subtotal(productId,productCost){
      document.getElementById("subtotal"+productId).innerHTML = (productCost * document.getElementById("cantArticulo"+productId).value);
    }


    //FUNCION SHOW AND HIDE PREVIEW IMAGE

    function showPreview(id){
      let imageId= "preview"+id
      document.getElementById(imageId).style.display = "block";
    }

    function hidePreview(id){
      let imageId= "preview"+id
      document.getElementById(imageId).style.display = "none";
    }


/*-------------------------------
 -- EXAMPLE USER's CART FETCH ---
 -------------------------------*/

document.addEventListener("DOMContentLoaded", function() {
  fetch(CART_INFO_URL + 25801 + EXT_TYPE)
  .then(resp => resp.json())
  .then(data =>{

    if(localStorage.getItem("myCart")){
      articulos = data.articles.concat(loadLocalStorageCart());
    } else{articulos = data.articles}

    showListHead();

    showArticulo(articulos);

    addShippingControls();
  })
})



/*-------------------------------
 ----- SHOW LIST FUNCTIONS ------
 -------------------------------*/

    //CREATE HEADER

        function showListHead(){

          var elementHTML= `
              <div class="list-group-item" style="max-width:1200px; margin:auto;">
              <div class="row">
                <div class="col-2 disableIfSmall"></div>
                <div class="col-4">
                    <strong class="col">Nombre de articulo</strong>
                </div>
                <div class="col-2 disableIfSmall">
                    <strong>Costo</strong>
                </div>
                <div class="col-2">
                    <strong>Cantidad</strong>
                </div>
                <div class="col text-center">
                  <strong>Subtotal</strong>
                </div>
              </div>
            </div>
          `
          document.getElementById("listacompras").innerHTML += elementHTML;
        }


    //SHOW ARTICLE(s) *to be improved for arrays in Desafiate*

        function showArticulo(prod){

          let listaDesplegable = ""

          for(i=0; i<prod.length; i++){
            console.log(prod[i])

            listaDesplegable += `
              <div class="list-group-item" style="max-width:1200px; margin:auto;">
                <div class="row">
                  <div class="col-2 disableIfSmall">
                    <img style="width: auto; height: auto;max-width: 120px; " src="${prod[i].image}">
                  </div>
                  
                  <div class="col-4">
                      <a onmouseover="showPreview(${prod[i].id})" onmouseout="hidePreview(${prod[i].id})" onclick="setProdID(${prod[i].id})" href="product-info.html"><strong class="col">${prod[i].name}</strong></a>
                      
                      <div id="preview${prod[i].id}" style="width: 200px; position:absolute; display:none; background-color: lavender; padding:10px; z-index:1; border-radius: 5px;">
                        <h4>${prod[i].name}</h4>
                        <h5 style="color:green;">${prod[i].currency} ${prod[i].unitCost}</h5>
                        <img style="width: 100%; border-radius: 5px;" src="${prod[i].image}"><br>
                      </div>

                  </div>
                  <div class="col-2 disableIfSmall">
                    <p class="col">${prod[i].unitCost}</p></a>
                  </div>

                  <div class="col-2">
                      <input class="text-center" type="number" id="cantArticulo${prod[i].id}" value=${prod[i].count} min="1" max="10" onchange="subtotal(${prod[i].id},${prod[i].unitCost})">
                  </div>

                  <div class="col text-center">
                      <strong>${prod[i].currency} <span id="subtotal${prod[i].id}">${prod[i].unitCost}</span></strong>
                  </div>
                </div>
              </div>
              `
          }

          //ADD delete options

          listaDesplegable += `

          <a style="float:right;margin:10px" href="#" onclick="clearCart()">${trashIcon} Vaciar mi carrito</a>`
          document.getElementById("listacompras").innerHTML += listaDesplegable;
        }


    //LOAD SHIPPING CONTROLS

        function addShippingControls(){
          var elementHTML=`
            <h4>Tipo de envío</h4>
            <div class="form-floating col-8 ml-auto gx-1"">
              <select class="form-select" id="floatingSelect" aria-label="Select your shipping class">
                <option selected value="standard">Standard - 12 a 15 días (5%)</option>
                <option value="express">Express -5 a 8 días (7%) </option>
                <option value="premium"> Premium - 2 a 5 días (15%)</option>
              </select>
              <label for="floatingSelect">Elige tu tipo de envío</label>
            </div><br>
            <h4>Dirección de envío</h4>
            <br>
            <div class="row">
                <div class="form-floating col-5 ml-auto gx-1">
                  <input type="text" id="streetInput" class="form-control col-8" name="calle" placeholder="Calle">
                  <label for="streetInput">Calle</label>
                </div>
                <div class="form-floating col-3 ml-auto gx-1">
                  <input type="number" id="numberInput" class="form-control col-8" name="numero" placeholder="N°">
                  <label for="numberInput">N°</label>
                </div>
                <div class="form-floating col-4 ml-auto gx-1">  
                  <input type="text" id="cornerInput" class="form-control col-8" name="esquina" placeholder="esquina">
                  <label for="cornerInput">esquina</label>
                </div>
            </div>
          `
          document.getElementById("shippingControls").innerHTML += elementHTML;
        }