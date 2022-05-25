let totalQuantity = 0;
let totalPrice = 0;


function eventDeleteSofa() {
  document.querySelector("#cart_items").innerHTML = "";
  showCart();
}

showCart()

function showCart () {
  let cart = JSON.parse(localStorage.getItem("sofa")); 
  totalQuantity = 0;
  totalPrice = 0;

  if (cart === null) {
    document.querySelector("h1").innerText += " est vide !"; 
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";

} else {
  for (sofaCart of cart) {
    fetch(`http://localhost:3000/api/products/${sofaCart.Id}`)
    .then((response) => {
        return response.json();
    })
    .then((sofa) => {
        showSofaInCart(sofaCart, sofaCart.quantity, sofaCart.color);
    })
    .catch((error) => {
        alert(error);
    });

  }
}
}


function showSofaInCart(sofaCart, quantity, color) {
      document.querySelector("#cart__items").innerHTML += 
      `<article class="cart__item" data-id="${sofaCart.id}" data-color="${color}">
      <div class="cart__item__img">
      <img src="${sofaCart.imageUrl}" alt="${sofaCart.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${sofaCart.name}</h2>
          <p>${color}</p>
          <p>${sofaCart.price}€</p>
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
totalPrice += sofaCart.price * quantity;

document.querySelector("#totalQuantity").innerHTML = totalQuantity;
document.querySelector("#totalPrice").innerHTML = totalPrice;
  }