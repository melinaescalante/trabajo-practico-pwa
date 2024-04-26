let lista=document.querySelector(".list-group")

window.addEventListener("DOMContentLoaded", function(){

        
        addHistory()
  })

  
const addHistory=()=>{
    let item=JSON.parse(localStorage.getItem("historial"))
    console.log(item)
 
    item.forEach(pelicula => {
        lista.innerHTML+=`<li class="list-group-item">${pelicula}</li>`
        
    });

}