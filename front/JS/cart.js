let totalQuantity = 0;
let totalPrice = 0;

showCart()

async function showCart() {
	let cart = JSON.parse(localStorage.getItem("sofa"));
	console.log(cart);
	totalQuantity = 0;
	totalPrice = 0;


	if (cart === null || cart.length === 0) {
		document.querySelector("h1").innerText += " est vide !";
		document.querySelector("#totalQuantity").innerHTML = "0";
		document.querySelector("#totalPrice").innerHTML = "0";
	}
	else {
		const articlesArray = [];

		for (let sofaCart of cart) {
			const response = await fetch(`http://localhost:3000/api/products/${sofaCart.id}`);
			const sofa = await response.json();
			const article = showSofaInCart(sofa, sofaCart.quantity, sofaCart.color);
			articlesArray.push(article);
		}

		document.querySelector("#cart__items").innerHTML = "";
		articlesArray.forEach(article=>{
			document.querySelector("#cart__items").append(article);
		});
	}
}

function showSofaInCart(sofa, quantity, color) {

	const article = document.createElement("article");
	article.classList.add("cart__item");
	article["data-id"] = sofa._id;
	article["data-color"] = color;
	article.innerHTML = `
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
		    <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${quantity}">
		  </div>
		  <div class="cart__item__content__settings__delete">
		    <p class="deleteItem">Supprimer</p>
		  </div>
		</div>
		</div>
	`;

	let deleteSofaButton = article.querySelector(".deleteItem");
	deleteSofaButton.addEventListener("click", () => {
		deleteSofaOfCart(sofa._id, color);
    confirm("Cet article a bien été supprimé de votre panier")
	});

  let inputQuantity = article.querySelector(".itemQuantity");
  inputQuantity.addEventListener("change", () => {
	  const newQuantity = inputQuantity.valueAsNumber;
	  if (newQuantity === 0) {
		  deleteSofaOfCart(sofa._id, color);
	  } else {
		  changeQuantity(sofa._id, color, inputQuantity.valueAsNumber);
	  }
  } );
  
	
	totalQuantity += Number(quantity);
	totalPrice += sofa.price * quantity;

	document.querySelector("#totalQuantity").innerHTML = totalQuantity;
	document.querySelector("#totalPrice").innerHTML = totalPrice;

	return article;
}

function deleteSofaOfCart(sofaId, color) {
	let cart = JSON.parse(localStorage.getItem("sofa"));
	cart = cart.filter(function (sofaInCart) {
		if (sofaInCart.id === sofaId && sofaInCart.color === color) {
			return false;
		}
		return true;
	});
	localStorage.setItem("sofa", JSON.stringify(cart));
	showCart();
}

function changeQuantity(sofaId, color, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("sofa"));
  cart = cart.map(function (sofaInCart) {
    if (sofaInCart.id === sofaId && sofaInCart.color === color) {
		sofaInCart.quantity = newQuantity;
    }
	return sofaInCart;
  })
  localStorage.setItem("sofa", JSON.stringify(cart));
	showCart();
}
