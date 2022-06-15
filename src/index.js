let addToy = false;
let like = 0
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchAndysToys()
});
function renderOneToy(toys){
  const toyCollection = document.getElementById("toy-collection")
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `
  <h2>${toys.name}</h2>
  <img src="${toys.image}" class="toy-avatar" />
  <p>${toys.likes}</p>
  <button class="like-btn" id="${toys.id}">Like ❤️</button>
  `
  toyCollection.appendChild(toyCard)
}


function fetchAndysToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toys => renderOneToy(toys)))
}

document.querySelector("form").addEventListener('submit', (e) =>{
  e.preventDefault()
  const toyInfo = {  }
  const nameInput = document.querySelector(".input-text").value
  const imageInput = document.querySelector(".input-txt").value
  
  toyInfo.name = nameInput
  toyInfo.image = imageInput
  toyInfo.likes = like
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:{
      "content-type":"application/json",
      Accept: "applicaton/json"
    },
    body:JSON.stringify(toyInfo)
  })
})

// const likeBtn = document.querySelectorAll(`.like-btn`)
// for (const btn of likeBtn) {
//    console.log(btn)
// }