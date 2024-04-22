let contenedorPelicula=document.querySelector(".contenedorPelicula");
let buttonSearch=document.querySelector(".btn.btn-outline-success");
let inputSearch=document.querySelector("form>input");
console.log(buttonSearch)


buttonSearch.addEventListener("click", (e)=>{
    let key=inputSearch.value
    console.log(key)
    e.preventDefault()
    const EndPoint=`http://www.omdbapi.com/?apikey=[${key}]`
})