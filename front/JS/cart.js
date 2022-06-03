let totalQuantity = 0;
let totalPrice = 0;


showCart()

function showCart() {
	let cart = JSON.parse(localStorage.getItem("sofa"));
	console.log(cart)
	totalQuantity = 0;
	totalPrice = 0;

	document.querySelector("#cart__items").innerHTML = "";

	if (cart === null || cart.length === 0) {
		document.querySelector("h1").innerText += " est vide !";
		document.querySelector("#totalQuantity").innerHTML = "0";
		document.querySelector("#totalPrice").innerHTML = "0";
	}
	else {
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
		    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
		  </div>
		  <div class="cart__item__content__settings__delete">
		    <p class="deleteItem">Supprimer</p>
		  </div>
		</div>
		</div>
	`;
	document.querySelector("#cart__items").append(article);

	let deleteSofaButton = article.querySelector(".deleteItem");
	deleteSofaButton.addEventListener("click", () => {
		deleteSofaOfCart(sofa._id, color);
    confirm("Cet article a bien été supprimé de votre panier")
	});

  let inputQuantity = article.querySelector(".itemQuantity");
  inputQuantity.addEventListener("change", () => {
    changeQuantity(sof._id, color);
  } );
  
	//TODO : Récupérer input number
	//Déclarer évènement sur "change"
	//On appelle fonction sofa._id, color, nouvelle quantité (value de l'input)

	totalQuantity += Number(quantity);
	totalPrice += sofa.price * quantity;

	document.querySelector("#totalQuantity").innerHTML = totalQuantity;
	document.querySelector("#totalPrice").innerHTML = totalPrice;
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

function changeQuantity(sofaId, color) {
  let cart = JSON.parse(localStorage.getItem("sofa"));
  cart = cart.map(function (sofaInCart) {
    if (sofaInCart.id === sofaId && sofaInCart.color === color) {
    quantity = inputQuantity.value;
  }
    else  {
      return sofaInCart;
    }
  })
  localStorage.setItem("sofa", JSON.stringify(cart));
	showCart();
}


//TODO : Fonction maj quantité
/*
	//On récupère tableau du panier (cart)
	//On utilise la méthode map() de Array
	//Dans la fonction du map, deux cas :
	// - Soit on est sur l'objet qui correspond au combo id/couleur : on maj la quantité de sofaInCart et on retourne sofaInCart
	// - Soit on est sur un autre canapé/couleur : return sofaInCart
	//On enregistre cart dans localStorage
	//showCart()
 */