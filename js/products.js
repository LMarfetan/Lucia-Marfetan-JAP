const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_PRICE = "";
const ORDER_DESC_BY_PRICE = "";
var currentSortCriteria = undefined;
var currentProductsArray = [];
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCost);
            let bCount = parseInt(b.productCost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCost);
            let bCount = parseInt(b.productCost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
    });

    return result;
}

function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <p class="text-muted">` + product.cost + ` ` + product.currency + `</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p>` + product.description + `</p>
                        <small >` + product.soldCount + ` articulos vendidos </small>
                    </div>
                </div>
            </div>
        </a>
        `
    }
    document.getElementById("product html").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then (function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProductsArray = (resultObj.data);
            showProductsList(currentProductsArray);
        }
    })
});