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



const btnCommander = document.querySelector("#order");




const regExpFirstLastNameCity = (value) =>{
    return /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(value);
};

const regExpMail = (value) => {
    return /^[\w.]+@([\w-]+.)+[\w-]{2,4}$/.test(value);
};

const regExpAddress = (value) => {
    return /^[0-9A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(value);
};

function validFirstName(contact){
    const firstName = contact.firstName;
    let inputFirstname = document.querySelector("#firstName");
    if(regExpFirstLastNameCity(firstName)){
		inputFirstname.style.border = "2px solid green";        
		return true;
    } else {
		inputFirstname.style.border = "2px solid red";        
        document.querySelector("#firstNameErrorMsg").textContent = "'Prénom invalide, quel est votre prénom? ";
        return false; 
    };
}

function validLastName(contact){
    const lastName = contact.lastName;
    let inputLastname = document.querySelector("#lastName");
    if(regExpFirstLastNameCity(lastName)){
		inputLastname.style.border = "2px solid green";        
		return true;
    } else {
		inputLastname.style.border = "2px solid red";        
        document.querySelector("#lastNameErrorMsg").textContent = "'Nom invalide, quel est votre Nom? ";
        return false; 
    };
}


function validCity(contact){
    const city = contact.city;
    let inputCity = document.querySelector("#city");
    if(regExpFirstLastNameCity(city)){
		inputCity.style.border = "2px solid green";        
		return true;
    } else {
		inputCity.style.border = "2px solid red";        
        document.querySelector("#cityErrorMsg").textContent = "'Ville non reconnue, quel est le Nom de votre ville? ";
        return false; 
    };
}


function validAddress(contact){
    const address = contact.address;
    let inputAddress = document.querySelector("#address");
    if(regExpAddress(address)){
		inputAddress.style.border = "2px solid green";        
		return true;
    } else {
		inputAddress.style.border = "2px solid red";        
        document.querySelector("#addressErrorMsg").textContent = "'Il semble qu'une erreur ou un caractère non autorisé s'est glissé dans votre adresse, veuillez corriger et valider à nouveau. ";
        return false; 
    };
}

function validEmail(contact){
    const email = contact.email;
    let inputEmail = document.querySelector("#email");
    if(regExpMail(email)){
		inputEmail.style.border = "2px solid green";        
		return true;
    } else {
		inputEmail.style.border = "2px solid red";        
        document.querySelector("#emailErrorMsg").textContent = "'Il semble qu'un caractère non autorisé s'est glissé dans votre adresse email ou que celle-ci n'est pas complète, veuillez corriger et valider à nouveau. ";
        return false; 
    };
}

const form = document.querySelector("form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
});

btnCommander.addEventListener('click', async (event) => {
    event.preventDefault();
    let contact = {
        lastName: document.getElementById("lastName").value,
        firstName: document.getElementById("firstName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
    };

    let invalide = false;

    const firstNameOK = validFirstName(contact);
    if (!firstNameOK) {
        invalide = true;
    }
    const lastNameOK = validLastName(contact);
    if (!lastNameOK) {
        invalide = true;
    }
    const addressOK = validAddress(contact);
    if (!addressOK) {
        invalide = true;
    }
	const cityOK = validCity(contact);
    if (!cityOK) {
        invalide = true;
    }
	const emailOK = validEmail(contact);
    if (!emailOK) {
        invalide = true;
    }
    if (invalide) {
      return;
  }

  const orderObject = {
      contact,
      products: [],
  };

  let cart = JSON.parse(localStorage.getItem("sofa"));
  for (let sofaCart of cart) {
      if (!orderObject.products.includes(sofaCart.id)) {
          orderObject.products.push(sofaCart.id);
      }
  }

  const reponse = await fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      body: JSON.stringify(orderObject),
      headers: {
          'Accept': "application/json",
          "Content-type": "application/json",
      },
  })
  
  .then((res) => res.json())
  .then((data) => {
      //redirection vers la page de confirmattion
      window.location.href = "confirmation.html" + "?orderId=" + data.orderId;
      localStorage.clear();
  })
});