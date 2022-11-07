/*--------------------------------------------
 -- Functions and local variables to call ---
 --------------------------------------------*/

    let articulos =[];
    let payingMethod ="No ha seleccionado un método de pago";
    let payMethodIsChecked = false;

    //FUNCION SHOW AND HIDE PREVIEW IMAGE
    function showPreview(id){
      let imageId= "preview"+id;
      document.getElementById(imageId).style.display = "block";
    }
    function hidePreview(id){
      let imageId= "preview"+id;
      document.getElementById(imageId).style.display = "none";
    }    

    //VACIAR CARRITO
    function clearCart(){
      localStorage.setItem('myCart', "");
      location.reload();
    }

    /*--------------------------------------------
      ----------------- ENTREGA 6 -----------------
      --------------------------------------------*/

    //Eliminar producto del 'carrito' (DESAFIATE)
    function deleteProduct(productId){
      let element=document.getElementById("product-"+productId);
      element.parentNode.removeChild(element);

      totalDeTotales(); //actualiza el total de la compra

      //Chequea si al borrar el producto queda algo en el carrito. Si no hay nada, deshabilita el botón de comprar
      if(document.getElementById("total").innerHTML==="0"){
        document.getElementById("purchaseBtn").disabled = true;
        document.getElementById("purchaseBtn").classList.add("btn-secondary");
      }
    }

    //Convertir a dolares
    function pesosToDollars(currency,cost){
      if(currency==="UYU"){
        return Math.ceil(cost/40);
      }
      else {return cost;}
      
    }

    //FUNCION SUBTOTAL
    function subtotal(productId,productCost){
      document.getElementById("subtotal"+productId).innerHTML = (productCost * document.getElementById("cantArticulo"+productId).value);
      totalDeTotales(); //siempre que se calcule subtotal, se recalcula el total
    }

    //FUNCION Total (subtotales+envio)

    function totalDeTotales(){
      let total = 0 //defino variable del total
      const shippingPer =  document.getElementById("floatingSelect").value; //tomo valor del porcentaje de envío
      let allTotals = document.getElementsByClassName("subTotalClass"); // guardo en un array la lista de productos cargados en el carrito

      //Voy sumando el el subtotal de cada producto del carrito a la variable 'total'
      for(const subT of allTotals){
        total += parseInt(subT.innerHTML);
      }
      document.getElementById("subTotal").innerHTML= total; //Una vez tengo la suma de subtotales, modifico en el HTML

      //Calculo el costo de envío a partir de la suma de subtotales y el porcentaje de envío
      let shippingCost = total*shippingPer; 
      document.getElementById("shippingCost").innerHTML= shippingCost; //actualizo  el HTML con el Costo de envío

      // Calculo el total sumandole el costo de envío a la variable de total que ya tenía
      total += shippingCost;
      document.getElementById("total").innerHTML= total; //actualizo  el HTML con el total
    }

    // ENABLE paying method options
    function enablePayingOptions(metodo){
      if(metodo==="credit"){

        // Habilita opciones de pago por tarjeta de credito
        document.getElementById("cardNumber").disabled = false;   
        document.getElementById("cardNumber").required = true;

        document.getElementById("safeCode").disabled = false; 
        document.getElementById("safeCode").required = true;

        document.getElementById("expDate").disabled = false; 
        document.getElementById("expDate").required = true;

        // Deshabilita opciones de pago por transferencia
        document.getElementById("accountNumber").disabled = true; 
        document.getElementById("accountNumber").required = false;

      } else if(metodo==="bank"){           
        
        // Deshabilita opciones de pago por tarjeta de credito
        document.getElementById("cardNumber").disabled = true; 
        document.getElementById("cardNumber").required = false;
        document.getElementById("safeCode").disabled = true; 
        document.getElementById("safeCode").required = false;
        document.getElementById("expDate").disabled = true; 
        document.getElementById("expDate").required = false;

        // Habilita opciones de pago por transferencia
        document.getElementById("accountNumber").disabled = false; 
        document.getElementById("accountNumber").required = true;
      }
    }

    //Chequea si el metodo de pago es correcto
    function checkPayingMethod(){
      var element= document.getElementById("setPayingMethod");

      if(document.getElementById("payingMethodForm").checkValidity()){
              event.preventDefault();
              event.stopPropagation();

              if (document.getElementById("bank-method").checked){
                payingMethod ="Transferencia bancaria";
                element.style.color= "green";
                payMethodIsChecked = true;

              }else if(document.getElementById("credit-method").checked){
                payingMethod ="Tarjeta de crédito"; 
                element.style.color= "green";
                payMethodIsChecked =true;

              }else{payingMethod ="No ha seleccionado un método de pago";element.style.color= "red"; payMethodIsChecked=false;}

      }else{
        payingMethod ="No ha seleccionado un método de pago";
        element.style.color= "red";
        payMethodIsChecked = false;
      }
      element.innerHTML=payingMethod; 
    }



    // para que funcione la validacion en formularios
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

    // Muestra mensaje de exito
    function showAlertSuccess() {
          document.getElementById("alert-success").classList.add("show");
          setTimeout(() => {
            document.getElementById("alert-success").classList.remove("show")
          }, "5000")
    }
    
      
    // Enviar

    function Purchase(){

      if(!document.getElementById("shippingForm").checkValidity()){
        return
      }
      
      if(payMethodIsChecked){

        showAlertSuccess();
        document.getElementById("shippingForm").reset();
        document.getElementById("payingMethodForm").reset();
        checkPayingMethod();

      }else {
        event.preventDefault();
        event.stopPropagation();
      }
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

    //addShippingControls();

    addBill();

    totalDeTotales();

    addPayingMethod();
  })
})



/*-------------------------------
 ----- SHOW LIST FUNCTIONS ------
 -------------------------------*/

    //CREATE HEADER

        function showListHead(){

          var elementHTML= `
              <div class="list-group-item" style="max-width:1200px; margin:auto; background-color:lavender;">
                <div class="row">
                  <div class="col-2 disableIfSmall"></div>
                  <div class="col-4">
                      <strong class="col">Nombre de articulo</strong>
                  </div>
                  <div class="col-2 disableIfSmall">
                    <strong>Costo</strong> <span class="text-muted">(USD)</span>
                  </div>
                  <div class="col-2">
                      <strong>Cantidad</strong>
                  </div>
                  <div class="col text-center">
                    <strong>Subtotal</strong>
                  </div>
                  <div class="col-1"></div>
                </div>
              </div>
          `
          document.getElementById("listacompras").innerHTML += elementHTML;
        }


    //SHOW ARTICLE(s) *to be improved for arrays in Desafiate*

        function showArticulo(prod){

          let listaDesplegable = ""

          for(i=0; i<prod.length; i++){

            listaDesplegable += `
              <div id="product-${prod[i].id}" class="list-group-item list-group-item-action cursor-active" style="max-width:1200px; margin:auto;">
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
                    <p class="col">${pesosToDollars(prod[i].currency,prod[i].unitCost)}</p></a>
                  </div>

                  <div class="col-2">
                      <input class="text-center" type="number" id="cantArticulo${prod[i].id}" value=${prod[i].count} min="1" max="10" onchange="subtotal(${prod[i].id},${pesosToDollars(prod[i].currency,prod[i].unitCost)})">
                  </div>

                  <div class="col text-center">
                      <strong>USD <span class="subTotalClass" id="subtotal${prod[i].id}">${pesosToDollars(prod[i].currency,prod[i].unitCost)}</span></strong>
                  </div>
                  <div class="col-1"><a href="#" onclick="deleteProduct(${prod[i].id})">${trashIcon}</a></div>
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
          <form id="shippingForm" class="needs-validation" style="max-width:1200px; margin:auto;" novalidate>
                <h4>Tipo de envío</h4>
                <div class="form-floating col-8 ml-auto gx-1"">
                  <select class="form-select" id="floatingSelect" aria-label="Select your shipping class" onchange="totalDeTotales()" required>
                    <option selected value="0.05">Standard - 12 a 15 días (5%)</option>
                    <option value="0.07">Express -5 a 8 días (7%) </option>
                    <option value="0.15">Premium - 2 a 5 días (15%)</option>
                  </select>
                  <label for="floatingSelect">Elige tu tipo de envío</label>
                </div><br>
                <h4>Dirección de envío</h4>
                
                <div class="row p-1">
                    <div class="form-floating col-5 gx-1">
                      <label for="streetInput">Calle</label>
                      <input type="text" id="streetInput" class="form-control col-8" name="calle" placeholder="Calle" required>
                      <div class="invalid-feedback">Debe ingresar nombre de calle</div>
                    </div>
                    <div class="form-floating col-3 gx-1">
                      <label for="numberInput">N°</label>
                      <input type="number" id="numberInput" class="form-control col-8" name="numero" placeholder="N°" required>
                      <div class="invalid-feedback">Debe ingresar numero de puerta</div>
                    </div>
                    <div class="form-floating col-4 gx-1">  
                      <label for="cornerInput">esquina</label> 
                      <input type="text" id="cornerInput" class="form-control col-8" name="esquina" placeholder="esquina"required>
                      <div class="invalid-feedback">Debe ingresar esquina</div>
                    </div>
                </div>
          </form>
          `
          document.getElementById("shippingControls").innerHTML += elementHTML;
        }

     //LOAD TOTALE
        function addBill(){
          var elementHTML=
              `<hr>
              <h4>Costos</h4>
              
              <div class="list-group-item list-group-item">
                  <div class="row">
                      <div class="col">
                          <h5>Subtotal</h5>
                          <p class="text-muted">Costo Unitario del producto por cantidad</p>
                      </div>
                      <span class="col-3 text-center" style="margin-top: auto; margin-bottom:auto;">USD <span id="subTotal">1</span></span>
                  </div>
              </div>

              <div class="list-group-item list-group-item">
                  <div class="row">
                      <div class="col">
                          <h5>Costo de envío</h5>
                          <p class="text-muted">Según el tipo de envío</p>
                      </div>
                      <span class="col-3 text-center" style="margin-top: auto; margin-bottom:auto;">USD <span id="shippingCost">1</span></span>
                  </div>
              </div>
              
              <div class="list-group-item list-group-item" style="background-color:lavender">
                  <div class="row">
                      <div class="col">
                          <h5>Total</h5>
                      </div>
                      <span class="col-3 text-center">USD <span id="total">1</span></span>
                  </div>
              </div>
              `
              document.getElementById("bill").innerHTML += elementHTML;
        }


        //Load formas de pago
        function addPayingMethod(){
          var elementHTML= `
              <hr>
              <h4>Forma de pago</h4>
              <p><span id="setPayingMethod" style="color:red;">${payingMethod}</span> | <a href="#" data-bs-toggle="modal" data-bs-target="#payingWindow">Elegir otro método de pago</a></p>
              <button id="purchaseBtn" type="submit" form="shippingForm" onclick="Purchase()" class="btn btn-primary">Finalizar compra</button>
          `
          document.getElementById("payingMethod").innerHTML += elementHTML;
        }
        