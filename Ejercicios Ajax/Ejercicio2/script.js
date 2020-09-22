let $main = document.querySelector("main");

const getData = (option) =>{
    let {ruta,success,error} = option;
    let xml = new XMLHttpRequest();

    xml.addEventListener("readystatechange", e =>{
        if(xml.readyState != 4)return
        if(xml.status >= 200 && xml.status <300){
            let html = xml.responseText
            success(html)
        }else{
            let mensaje = xml.statusText || "Ocurrio un error"

            error(`Error ${xml.status}: ${mensaje}`)
        }
    
    })

    xml.open("GET",ruta);
    xml.setRequestHeader("Content-type","text/html; charset=utf-8")
    xml.send();

}

document.addEventListener("DOMContentLoaded", e =>{
    getData(
        {ruta:"paginas/perrito.html", 
    success:(html) => $main.innerHTML = html,
    error:(err) => $main.innerHTML = `<h1>${err}</h1>`
    })
})

document.addEventListener("click", e =>{
    e.preventDefault()
    if(e.target.matches("nav a")){
        getData({
        ruta:e.target.href, 
        success:(html) => $main.innerHTML = html,
        error:(err) => $main.innerHTML = `<h1>${err}</h1>`
        })   
    }
})