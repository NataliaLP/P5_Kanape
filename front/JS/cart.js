let cart = JSON.parse(localStorage.getItem("sofa"));


if (cart === null) {
    document.querySelector("h1").innerText += " est vide !"; 
} else {
    for (sofa of cart) { 
        document.querySelector("#cart__items").innerHTML += 
        `<article class="cart__item" data-id="${sofa.id}" data-color="${sofa.color}">
        <div class="cart__item__img">
        <img src="${sofa.photo}" alt="${sofa.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${sofa.name}</h2>
            <p>${sofa.color}</p>
            <p>${sofa.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${sofa.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
    }
}