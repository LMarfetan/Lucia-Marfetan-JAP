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


function updateDate(days1, days2){

    var datemin = new Date(new Date().getTime()+(days1*24*60*60*1000));
    var datemax = new Date(new Date().getTime()+(days2*24*60*60*1000));

    let deliveryDateMinHTML = document.getElementById("deliveryDateMin"); 
    let deliveryDateMaxHTML = document.getElementById("deliveryDateMax");

    dd1 = datemin.getDate();
    mm1 = datemin.getMonth();
    yy1 = datemin.getFullYear();

    dd2 = datemax.getDate();
    mm2 = datemax.getMonth();
    yy2 = datemax.getFullYear();

    deliveryDateMinHTML.innerHTML = dd1+"/"+mm1+"/"+yy1;
    deliveryDateMaxHTML.innerHTML = dd2+"/"+mm2+"/"+yy2;
}

function validate(){
    var x = document.forms["0"]["creditCardNumber"].value;
    var y = document.forms["0"]["creditCardSecurityCode"].value;
    var z = document.forms["0"]["dueDate"].value;
    var yyz = z.substr(0,4);
    var mmz = z.substr(5,6);
    var date = new Date();
    var yyd = date.getFullYear();
    var mmd = date.getMonth();
    
    
    if(document.getElementById('creditCardPaymentRadio').checked) {
        if ((x.length<16)||(x.length>16)){
            txt="El número de tarjeta debe tener 16 caracteres";
            event.preventDefault();
            event.stopPropagation();
            document.getElementById("invalidCreditCard").innerHTML = txt;
            document.getElementById("creditCardNumber").classList.add('error');    
            return false;

        }else if ((y.length<3)||(y.length>3)){
            txt="El código de seguridad debe tener 3 caracteres";
            event.preventDefault();
            event.stopPropagation();
            document.getElementById("invalidSecurityCode").innerHTML = txt;
            document.getElementById("invalidCreditCard").innerHTML = "";
            document.getElementById("creditCardSecurityCode").classList.add('error')
            document.getElementById("creditCardNumber").classList.remove('error');
            return false;

        }else if ((yyz<yyd)||((yyz=yyd)&&(mmz<mmd))){
            txt="Ingrese una fecha válida";
            event.preventDefault();
            event.stopPropagation();
            document.getElementById("invalidDueDate").innerHTML = txt;
            document.getElementById("invalidSecurityCode").innerHTML = "";
            document.getElementById("dueDate").classList.add('error')
            document.getElementById("creditCardSecurityCode").classList.remove('error');
            return false;

        } else {
            document.forms["0"].classList.add('was-validated');
            window.open("index.html","_self");
            return true;
        }
    }
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
                    <div class="p-3 col-md-3 shadow p-3 mb-5 bg-white rounded">
                        <div class="row">
                            <div class="col">
                                <img src="` + article.src + `" alt="`+ article.name +`" class="img-thumbnail rounded mx-auto d-block"  style=" height:150px;">
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
                                   <input type="number" min="0" id="productCount" class="form-control input-number text-center" value="`+ productCount +`">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <p id="subtotalHTMLToAppend" class="font-weight-bold">`+ subtotalProduct +``+ article.currency +`</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
           
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

                 //cart.articles.push({
                     //count: 1,
                     //currency: "UYU",
                     //name: "Lavarropas",
                     //src: "img/lavarropas.jpg",
                     //unitCost: 2000,
                //})

                 //cart.articles.push({
                    //count: 5,
                    //currency: "UYU",
                    //name: "Gorro",
                    //src: "img/gorro.jpg",
                    //unitCost: 200,
                //})

                showArticles(cart.articles);
                updateSubtotal(cart.articles);
                updateTotalCosts();
                updateDate(daysmin,daysmax);
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
                updateDate(daysmin,daysmax);
            });
            
            document.getElementById("expressradio").addEventListener("change", function(){
                shippingPercentage = 0.07;
                daysmin = 5;
                daysmax = 8;
                updateTotalCosts();
                updateDate(daysmin,daysmax);
            });
        
            document.getElementById("standardradio").addEventListener("change", function(){
                shippingPercentage = 0.05;
                daysmin = 12;
                daysmax = 15;
                updateTotalCosts();
                updateDate(daysmin,daysmax);
            });

            document.getElementById("form").addEventListener("submit", function(){
                validate();
            });
        });
    });