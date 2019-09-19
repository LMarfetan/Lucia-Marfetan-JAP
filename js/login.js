function login(){

var username = document.getElementById("inputEmail").value;
var password = document.getElementById("inputPassword").value;

    if ( username == "lucia.marfetan@gmail.com" && password == "ceibal1234"){
    alert ("Usted ha iniciado sesión correctamente");
    window.open("index.html","_self");
    }
    else{
    alert("Te dejamos entrar igual");
    window.open("index.html","_self");
    }

localStorage.setItem(username);
  
}