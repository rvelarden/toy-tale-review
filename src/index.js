let addToy = false;

// Hi Romina! :)
// Be able to make a new toy in the FE and BE
// Be able to increase a toys likes 

const URL =' http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  document.querySelector(".add-toy-form").addEventListener('submit', (event) => {
    event.preventDefault()
    addAToy(event)
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys()

});


// Fetch and render toys 
function getToys(){
  fetch(URL)
    .then((res) => res.json())
    .then((toys) => {
      toys.forEach((toy) => renderToy(toy))
    })
}


function renderToy(toy){
  const toyBox = document.querySelector("#toy-collection")

  let toyCard = document.createElement('div')
      toyCard.className = "card"

  let toyName = document.createElement('h2')
      toyName.innerText = toy.name

  let toyImg = document.createElement('img')
      toyImg.src = toy.image
      toyImg.className = "toy-avatar"

  let toyLikes = document.createElement('p')
      toyLikes.innerText = `${toy.likes} likes`

  let toyBtn = document.createElement('button')
      toyBtn.id = toy.id
      toyBtn.className = "like-btn"
      toyBtn.innerText = "Like <3"

      toyBtn.addEventListener('click', () => {
          likeAtoy(toy, toyLikes)
      })


      toyCard.append(toyName, toyImg, toyLikes, toyBtn)

      toyBox.appendChild(toyCard)

}

function likeAtoy(toy, toyLikes){

  // We will need the id of the toy to make the request
  // The DOM element to update 
  
  //What new data are we sending? 
  let newLikes = {
    likes: +toyLikes.innerText.split(" ")[0] + 1
  }

  let reqPack = {
    headers: {"Content-Type": "application/json"},
    method: "PATCH",
    body: JSON.stringify(newLikes)
  }

  fetch(`${URL}/${toy.id}`, reqPack)
    .then(res => res.json())
    .then((toy) => {
      toyLikes.innerText = `${toy.likes} Likes`
    })

}


function addAToy(event){


  // make a new toy, from the submit event 
  // by grabbing values form (event.target.{value for the name attr}.value)
  let newToy = {
    name: event.target.toyName.value,
    image: event.target.coolImage.value,
    likes: 0,
  }

  let reqPack = {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(newToy)
  }

  fetch(URL, reqPack)
    .then((res) => res.json())
    .then((newToy) => renderToy(newToy))

}