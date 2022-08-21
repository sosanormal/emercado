const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"


fetch(URL)
.then(response => response.json())
.then(data => {
  const ProductList = data.products;
  document.getElementById("cat").innerHTML = data.catName;
  showList(ProductList);
  
})

function showList(array){

  for (let i=0; i < array.length; i++){
    var elementHTML = `
      
            <div class="row">
                    <div class="col-3">
                        <img class="img-thumbnail" src="${array[i].image}"> 
                    </div>
                    <div class="col-8">
                        <h4>${array[i].name} </h4>
                        <p>${array[i].description} </p>
                    </div>
                    <div class="col-1">
                      <small>
                          ${array[i].soldCount} vendidos
                      </small>
                    </div>
            </div>`

    document.getElementById("info").innerHTML += elementHTML;
  }
}