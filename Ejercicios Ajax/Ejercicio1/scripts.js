const formulario = document.getElementById('form');
const personajes = document.getElementById('characters');
const table = document.getElementById('table');

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    getData(personajes.children[personajes.selectedIndex].value)
})

const getData = (id) =>
{

    let xhr
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest
    else xhr = new ActiveXObject("Microsoft.XMLHTTP")
    if(id == undefined){
            xhr.open('GET', 'marvel.php')
            xhr.addEventListener('load',(data)=>{
                console.log(data)
                const dataJSON = JSON.parse(data.target.response)
                console.log(dataJSON)
                const fragmento = document.createDocumentFragment()
                for(const heroes of dataJSON){
                    let opcion = document.createElement('OPTION')
                    opcion.setAttribute('value', heroes.ID)
                    opcion.textContent = heroes.Name
                    fragmento.appendChild(opcion)
                }
                personajes.appendChild(fragmento)
            })
            
    }else{
        xhr.open('GET', `marvel.php?id=${id}`)
        xhr.addEventListener('load',(data)=>{
            const dataJSON = JSON.parse(data.target.response)
            const fragmento = document.createDocumentFragment()

            for (const heroe of dataJSON) {
                const row = document.createElement('TR')
                const dataName = document.createElement('TD')
                const dataAlignment = document.createElement('TD')
                const dataHometown = document.createElement('TD')
                const dataGender = document.createElement('TD')
                const dataFighting = document.createElement('TD')
                dataName.textContent = heroe.Name
                dataAlignment.textContent = heroe.Alignment
                dataHometown.textContent = heroe.Hometown
                dataGender.textContent = heroe.Gender
                dataFighting.textContent = heroe.Fighting_Skills

                row.append(dataName)
                row.append(dataAlignment)
                row.append(dataHometown)
                row.append(dataGender)
                row.append(dataFighting)

                fragmento.append(row)
            }
            if (table.children[1]) {
                table.removeChild(table.children[1])
            }
            table.append(fragmento)
        })
    }
    
    xhr.send()
}

getData()
