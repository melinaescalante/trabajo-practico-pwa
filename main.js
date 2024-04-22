let contenedorPelicula = document.querySelector(".contenedorPelicula");
let buttonSearch = document.querySelector(".btn.btn-outline-success");
let inputSearch = document.querySelector("form>input");
console.log(buttonSearch)


buttonSearch.addEventListener("click", (e) => {
    let key = inputSearch.value
    console.log(key)
    // const data=""
    e.preventDefault()
    const EndPoint = `http://www.omdbapi.com/?i=tt3896198&apikey=5b2866d8&t=${key}`

    bringFilm(EndPoint)
})

const bringFilm = async (endpoint) => {

    try {
        const datos = await fetch(endpoint)
        if (datos.ok == false) {
            throw new Error("Error al traer datos")
            
        } 
            const data = await datos.json()
            createTemplate(data)
        

    } catch (error) {
        createError(error)
    }
}

const createTemplate = (datos) => {
    console.log(datos)
    if (datos > 1) {

        datos.forEach(pelicula => {
            console.log("hola")
            contenedorPelicula.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${pelicula.Poster}" class="card-img-top" alt=""${pelicula.Title}">
            <div class="card-body">
            <h5 class="card-title">${pelicula.Title}"</h5>
            <p class="card-text">"${pelicula.Plot}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Año: ${pelicula.Year}</li>
                <li class="list-group-item">Actores: ${pelicula.Actors}</li>
                <li class="list-group-item">${pelicula.Director}</li>
            </ul>
            </div>`
        });
    } else {
        contenedorPelicula.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${datos.Poster}" class="card-img-top" alt=""${datos.Title}">
            <div class="card-body">
            <h5 class="card-title">"${datos.Title}</h5>
            <p class="card-text">${datos.Plot}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Año: ${datos.Year}</li>
                <li class="list-group-item">Actores: ${datos.Actors}</li>
                <li class="list-group-item">${datos.Director}</li>
            </ul>
        </div>`
    }
    datos=null

}
const createError = (mensage) =>{
    contenedorPelicula.innerHTML = 
    `<div class="alert alert-warning" role="alert">
                ${mensage}
    </div>`
}