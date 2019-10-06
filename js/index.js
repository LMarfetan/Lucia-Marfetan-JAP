function showUserName(){
    let htmlContentToAppend = "";
    
    htmlContentToAppend += `
        <p>` + localStorage.getItem("inputEmail") + `</p>
        `
    
    document.getElementById("username").innerHTML = htmlContentToAppend;
}

showUserName(); 