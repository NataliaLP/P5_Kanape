let totalQuantity = 0;
let totalPrice = 0;
let cart = JSON.parse(localStorage.getItem("sofa")); 
let deleteSofa = document.querySelectorAll(".deleteItem");



showCart()

function showCart () {
  cart 
  console.log(cart)
  totalQuantity = 0;
  totalPrice = 0;

  if (cart === null) {
    document.querySelector("h1").innerText += " est vide !"; 
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";

} else {
  for (let sofaCart of cart) {
    fetch(`http://localhost:3000/api/products/${sofaCart.id}`)
    .then((response) => {
        return response.json();
    })
    .then((sofa) => {
        showSofaInCart(sofa, sofaCart.quantity, sofaCart.color);
    })
    .catch((error) => {
        alert(error);
    });


  }
}
}


function showSofaInCart(sofa, quantity, color) {

      document.querySelector("#cart__items").innerHTML +=  
      `<article class="cart__item" data-id="${sofa.id}" data-color="${color}">
      <div class="cart__item__img">
      <img src="${sofa.imageUrl}" alt="${sofa.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${sofa.name}</h2>
          <p>${color}</p>
          <p>${sofa.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
totalQuantity += Number(quantity);
totalPrice += sofa.price * quantity;

document.querySelector("#totalQuantity").innerHTML = totalQuantity;
document.querySelector("#totalPrice").innerHTML = totalPrice;
  }
  
console.log(showSofaInCart)

function deleteSofaOfCart() {
  deleteSofa.addEventListener("click", () => {
    localStorage.removeItem(sofa);
  })

  document.querySelector("#cart_items").innerHTML = "";
  showCart();
}