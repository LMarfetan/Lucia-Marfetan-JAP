var cart = [];
let daysmax = 5;
let daysmin = 2;
let productCount = 0;
let productUnitCost = 0;
let productCurrency = "";
let productCost = 0;
let subtotalProduct = 0;
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
    total = (subtotal*(1+shippingPercentage)).toFixed(2);
    
    totalHTML.innerHTML = "Total: " + total +" "+ productCurrency;
}

function updateSubtotal(array){

    let subtotalHTML = document.getElementById("subtotal");
    let subtotalHTMLToAppendHTML = document.getElementById("subtotalHTMLToAppend")
    
    for(let i = 0; i < array.length; i++){
        let article = array[i];

        subtotalProduct = (productCount)*(article.unitCost);
        subtotal =+ subtotalProduct;
        subtotalHTMLToAppendHTML.innerHTML = subtotalProduct +" "+ productCurrency;
    }
    
    subtotalHTML.innerHTML = "Subtotal: " + subtotal +" "+ productCurrency;
    
}


function updateDate(){

    var date = new Date();

    let deliveryDateMinHTML = document.getElementById("deliveryDateMin"); 
    let deliveryDateMaxHTML = document.getElementById("deliveryDateMax");
        
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();
    

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
        productCount = article.count
        subtotalProduct = productCount*productUnitCost
        
            htmlContentToAppend += `                
                    <div class="p-3 col-md-11 border">
                        <div class="row">
                            <div class="col">
                                <img src="` + article.src + `" alt="`+ article.name +`" class="img-thumbnail rounded mx-auto d-block">
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="p-3 col-lg-8">
                                <p class="font-weight-bold">`+ article.name +`</p>
                                <small>Stock disponible</small> 
                            </div>
                            <div class="p-3 col-lg-4">
                                <p class="font-weight-bold">` + article.unitCost + ` ` + article.currency + `</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" style="height: 100px"></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="input-group">
                                   <input type="number" id="productCount" class="form-control input-number text-center" value="`+ productCount +`">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <p id="subtotalHTMLToAppend" class="font-weight-bold">`+ subtotalProduct +``+ article.currency +`</p>
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
                updateSubtotal(cart.articles);
                updateTotalCosts();
                updateDate();
            }

            document.getElementById("productCount").addEventListener("change", function(){
                productCount = this.value;
                updateSubtotal(cart.articles);
                updateTotalCosts();
            });

            document.getElementById("premiumradio").addEventListener("change", function(){
                shippingPercentage = 0.15;
                daysmin = 2;
                daysmax = 5;
                updateTotalCosts();
                updateDate();
            });
            
            document.getElementById("expressradio").addEventListener("change", function(){
                shippingPercentage = 0.07;
                daysmin = 5;
                daysmax = 8;
                updateTotalCosts();
                updateDate();
            });
        
            document.getElementById("standardradio").addEventListener("change", function(){
                shippingPercentage = 0.05;
                daysmin = 12;
                daysmax = 15;
                updateTotalCosts();
                updateDate();
            });
        });
    });