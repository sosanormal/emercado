/* --------------- GLOBAL VARIABLES  ---------------  */
let ArrayProducts = []
let min = 0;
let max = 0;
let keyWord = "";

/* ------------------------------------------  */
/* ----------- Shortcut Functions -----------  */
/* ------------------------------------------  */

    //CLEAR LIST
    function clearList(){
      document.getElementById("info").innerHTML = ""
    }


/* ----------------------------------------------  */
/* --------------- FILTER EVENTS  ---------------  */
/* ----------------------------------------------  */

    //ORDER EVENTS
    document.getElementById("sortAsc").addEventListener("click", function(){
      mostrarOrdenado('ORDER_ASC_BY_NAME', ArrayProducts);
    });  
    document.getElementById("sortDesc").addEventListener("click", function(){
      mostrarOrdenado('ORDER_DESC_BY_NAME', ArrayProducts);
    });  
    document.getElementById("sortByCount").addEventListener("click", function(){
      mostrarOrdenado('ORDER_DESC_BY_COUNT', ArrayProducts);
    });  
    //FILTER EVENTS
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
      min = document.getElementById("rangeFilterCountMin").value;
      max = document.getElementById("rangeFilterCountMax").value;
      clearList();
      showList(ArrayProducts);
    }); 
    //CLEAR FILTER
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";
      min = "";
      max = "";
      clearList();
      showList(ArrayProducts);
    }); 

    //SEARCH
    document.getElementById("searchBtn").addEventListener("click", function(){
      keyWord = document.getElementById("keyWords").value;
      clearList();
      showList(ArrayProducts);
    }); 



/* ---------------------------------------------------------  */
/* ---------- LOAD, SHOW AND CLEAR LIST ACTIONS  -----------  */
/* ---------------------------------------------------------  */

    //FETCH
    fetch(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE)
    .then(response => response.json())
    .then(data => {
      const ProductList = data.products;
      document.getElementById("cat").innerHTML = data.catName;
      showList(ProductList);
      ArrayProducts = ProductList;
    })

    //Show List
    function showList(array){
        array.forEach(element => {
          if (((min == 0) || (element.cost)>= min) && ((max == 0) || (element.cost)<= max) && ((keyWord == "") || element.name.toLowerCase().includes(keyWord.toLowerCase()))){
            var elementHTML = 
            `<div class="row">
                    <div class="col-3">
                        <img class="img-thumbnail" src="${element.image}"> 
                    </div>
                    <div class="col-8">
                        <h4>${element.name} </h4>
                        <h5>$ ${element.cost}  </h5>
                        <p>${element.description} </p>
                    </div>
                    <div class="col-1">
                      <small>
                          ${element.soldCount} vendidos
                      </small>
                    </div>
              </div>`
              document.getElementById("info").innerHTML += elementHTML;
          }
        }) 
    }


    
/* --------------------------------------------  */
/* --------------- ORDER LISTS  ---------------  */
/* --------------------------------------------  */

    //Mostrar Ordenado
    function mostrarOrdenado(criterio,array){
      if(criterio === "ORDER_ASC_BY_NAME"){
        ArrayProducts = array.sort((a,b) => a.name.localeCompare(b.name));
      } else if(criterio === "ORDER_DESC_BY_NAME"){
        ArrayProducts = array.sort((a,b) => b.name.localeCompare(a.name));
      } else if(criterio === "ORDER_DESC_BY_COUNT"){
        ArrayProducts = array.sort((a,b) => b.soldCount - a.soldCount);
      }
      clearList();
      showList(ArrayProducts);
    }