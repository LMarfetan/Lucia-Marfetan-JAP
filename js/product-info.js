var product = {};

function firstSlide(array){
    let htmlContentToAppend = "";
    let imageSrc = array[0];

        htmlContentToAppend += `
        <div class="carousel-item active">
            <img class="d-block w-100" src="` + imageSrc + `" alt="">
        </div>
        `
        document.getElementById("firstSlide").innerHTML = htmlContentToAppend;
}

function otherSlides(array){
    let htmlContentToAppend = "";

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
            <img class="d-block w-100" src="` + imageSrc + `" alt="">
        </div>
        `
        document.getElementById("otherSlides").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;

            firstSlide(product.images);
            otherSlides(product.images);
        }
    });
});