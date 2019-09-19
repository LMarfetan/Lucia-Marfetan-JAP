function showUserName(){

    var mail =  localStorage.getItem(username);

    htmlContentToAppend += `
        <p>` + mail + `</p>
        `
    
    document.getElementById("username").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
        showUserName();
});