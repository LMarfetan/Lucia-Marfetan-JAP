var cart = [];
let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){

}

function updateSubtotal(){

}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let article = array[i];
        
            htmlContentToAppend += `

                <div class="row">
                    <div class="col-3 border">
                        <img src="` + article.src + `" alt="`+ article.name +`" class="img-thumbnail rounded mx-auto d-block">
                    </div>
                    <div class="col border">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ article.name +`</h4>
                            <p class="text-muted">` + article.unitCost + ` ` + article.currency + `</small>
                        </div>
                        <div class="col-md-2">
                            <div class="input-group">
                                <span class="input-group-btn input-group-prepend">
                                    <button type="button" class="btn btn-dark btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </span>
                    
                                <input type="text" name="quant[1]" class="form-control input-number text-center" value="`+ article.count +`" min="1" max="10">

                                <span class="input-group-btn input-group-append">
                                    <button type="button" class="btn btn-dark btn-number" data-type="plus" data-field="quant[1]">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </span>
                            </div>
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
        });
    });