var cart = [];
let productCount = 0;
let productUnitCost = 0;
let productCurrency = "";
let productCost = 0;
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    let totalHTML = document.getElementById("total");
    let totalCurrencyHTML = document.getElementById("totalCurrency");
    total = (subtotal*(1+shippingPercentage));
    totalHTML.innerHTML = total;
    totalCurrencyHTML = productCurrency;
}

function updateSubtotal(){
    let subtotalHTML = document.getElementById("subtotal");
    let subtotalCurrencyHTML = document.getElementById("subtotalCurrency");
    subtotal = (productCount)*(productUnitCost);
    subtotalHTML.innerHTML = subtotal;
    subtotalCurrencyHTML = productCurrency;
}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(array){

    let htmlContentToAppend = "";
    

    for(let i = 0; i < array.length; i++){
        let article = array[i];

        productUnitCost = article.unitCost;
        productCurrency = article.currency;
        
            htmlContentToAppend += `

                
                    <div class="col-md-9 border">
                        <div class="row">
                            <div class="col">
                                <img src="` + article.src + `" alt="`+ article.name +`" class="img-thumbnail rounded mx-auto d-block">
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="border col-lg-8">
                                <p class="font-weight-bold">`+ article.name +`</p>
                            </div>
                            <div class="border col-lg-4">
                                <p class="font-weight-bold">` + article.unitCost + `` + article.currency + `</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col border" style="height: 100px"></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="input-group">
                                    <span class="input-group-btn-prepend">
                                        <button type="button" class="btn btn-primary btn-number" data-type="minus" data-field="quant[1]">
                                            <img src="img/minus.png" style="width: 20px" alt="minus">
                                        </button>
                                    </span>

                                    <input type="number" name="quant[1]" id="productCount" class="form-control input-number text-center" value="`+ article.count +`>

                                    <span class="input-group-btn-append">
                                        <button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
                                            <img src="img/plus.png" style="width: 20px" alt="plus">
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <p class="font-weight-bold">`+ subtotal +``+ article.currency +`</p>
                            </div>
                        </div>
                    </div>
           
            `

        }
    document.getElementById("cart").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(CART_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                cart = resultObj.data;
                showArticles(cart.articles);
            }

            document.getElementById("productCount").addEventListener("change", function(){
                productCount = this.value;
                updateSubtotal();
                updateTotalCosts();
            });
        });
    });