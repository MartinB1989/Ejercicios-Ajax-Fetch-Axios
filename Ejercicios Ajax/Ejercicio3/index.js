let d=document, $main = d.querySelector("main"), $ul=d.querySelector("ul"),
$boton = d.querySelector("input"), vof = false

const getData = (option) =>{
    const xml = new XMLHttpRequest();
    let {url,success,error} = option;

    xml.addEventListener("readystatechange", e =>{
        if(xml.readyState != 4)return;
        if(xml.status>= 200 && xml.status <300){
            let json = JSON.parse(xml.responseText);
            success(json)
           
        }else{
            let mensaje = xml.statusText || "Ocurrio un error"

            error(`Error ${xml.status}: ${mensaje}`)
        }
    })
    xml.open("GET",url);

    xml.send()

}

d.addEventListener("DOMContentLoaded", e =>{
   
    d.addEventListener("click", e =>{

        if(e.target.matches("input")){
            getData(
                {url:'https://api.openweathermap.org/data/2.5/weather?id=3432555&lang=es&units=metric&appid=ebd9b8a6cefae88c9a049f0fe2db9836', 
                success: json =>{
                    let fragment = d.createDocumentFragment(),
                    $html = d.createElement("div");
                    $html.classList.add("weather-box");
                    $html.innerHTML = `<div class="titulos"><h1 class="city">${json.name}</h1><h2 class="condition">${json.weather[0].description}</h2></div><div class="vib"><img src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="icono-tiempo" class="icono"><div class="temp">${json.main.temp}°C</div></div><div class="max-min">max:${json.main.temp_max}°C <br> min:${json.main.temp_min}°C</div>`
                    console.log(json);
                    fragment.appendChild($html)
                    $main.appendChild(fragment)
                    $boton.setAttribute('disabled','')



                },
                error:(err) => $main.innerHTML = `<h1>${err}</h1>`
            })
        }
    })

    getData(
        {url:'https://api.openweathermap.org/data/2.5/forecast?id=3432555&lang=es&units=metric&appid=ebd9b8a6cefae88c9a049f0fe2db9836', 
        success: json =>{
            console.log(json)
       



        },
        error:(err) => $main.innerHTML = `<h1>${err}</h1>`
    })
})

