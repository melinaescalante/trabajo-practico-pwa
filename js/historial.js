let lista=document.querySelector(".list-group")

let button =document.querySelector(".btn-primary")

window.addEventListener("DOMContentLoaded", function(){
        addHistory()
  })

  
const addHistory=()=>{
    let item=JSON.parse(localStorage.getItem("historial"))
 
    item.forEach(pelicula => {
        lista.innerHTML+=`<li class="list-group-item">${pelicula}</li>`
        
    });

}
button.addEventListener("click",(e)=>{
    localStorage.removeItem("historial");
    lista.innerHTML=""

})