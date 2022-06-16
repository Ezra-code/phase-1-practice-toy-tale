let addToy = false;
let like = 0
const toyInfo = {  }
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
  activatingLikeButton(toys)

}


function fetchAndysToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toys => renderOneToy(toys)))
}

document.querySelector("form").addEventListener('submit', (e) =>{
  e.preventDefault()
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

function activatingLikeButton(toys){
  let likeBtn = document.getElementById(`${toys.id}`)
  let likeCount = toys.likes
  console.log(likeBtn)
  likeBtn.addEventListener('click', (e)=>{
    e.preventDefault()
  let addLike = likeCount + 1
    fetch(`http://localhost:3000/toys/${toys.id}`, {
    method: "PATCH",
    headers:{
      "content-type":"application/json",
      Accept: "applicaton/json"
    },
    body:JSON.stringify({
        "likes": addLike
  })
  })

  })
}