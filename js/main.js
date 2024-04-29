let contenedorPelicula = document.querySelector(".contenedorPelicula");
let buttonSearch = document.querySelector(".pelicula .btn.btn-outline-success");
let inputSearch = document.querySelector("form>input");
let historial = JSON.parse(localStorage.getItem('historial')) || [];
// Mensaje de error
let movieNotFound="Movie not found!"

if (buttonSearch) {
    
    buttonSearch.addEventListener("click", (e) => {
        let key = inputSearch.value
        
        agregarElementoStorage(key) 
        e.preventDefault()
        const EndPoint = `http://www.omdbapi.com/?i=tt3896198&apikey=5b2866d8&t=${key}`
        
        bringFilm(EndPoint)
    })
}

function agregarElementoStorage(valor) {
    historial.push(valor);
    localStorage.setItem('historial', JSON.stringify(historial));
}

const bringFilm = async (endpoint) => {
    
    try {
        const datos = await fetch(endpoint)
        if (datos.ok == false) {
            throw new Error("Error del servidor")
            
        } 
        const data = await datos.json()
        
        createTemplate(data)
        
        
    } catch (error) {
        createError(error)
    }
}

const createTemplate = (datos) => {
    
    if (datos.Error!==movieNotFound) {
        // Si se trae mas de una pelicula
        if (datos > 1) {

            datos.forEach(pelicula => {
                contenedorPelicula.innerHTML = `
                <div class="card col-12 col-md-4 col-lg-4">
                <img src="${pelicula.Poster}" class="card-img-top" alt=""${pelicula.Title}">
                <div class="card-body">
                <h5 class="card-title">${pelicula.Title}"</h5>
                <p class="card-text">"${pelicula.Plot}</p>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Año: ${pelicula.Year}</li>
                <li class="list-group-item">Actores: ${pelicula.Actors}</li>
                <li class="list-group-item">Director:${pelicula.Director}</li>
                </ul>
                </div>`
            });
        } else {
            // Si la api solo encuentra una pelicula
            contenedorPelicula.innerHTML = `
            <div class="card col-12 col-sm-10 col-md-4 col-lg-4">
            <img src="${datos.Poster}" class="card-img-top" alt=""${datos.Title}">
            <div class="card-body">
            <h5 class="card-title">${datos.Title}</h5>
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
        }else{
        createError("No se ha encontrado la película elegida.")
    }
    
    
}
// Template de error sino se encuentra ni una pelicula
const createError = (mensage) =>{
    contenedorPelicula.innerHTML = 
    `<div class="alert alert-warning" role="alert">
    ${mensage}
    </div>`
}