
const sofaId = getSofaId()
function getSofaId() {
    return new URL(location.href).searchParams.get("id");
};


fetch(`http://localhost:3000/api/products/${sofaId}`)
    .then((response) => {
        return response.json();
    })
    .then((sofa) => {
        displaySofa(sofa);
    })
    .catch((error) => {
        alert(error);
    });
    

let displaySofa = (sofa) => {
    // recuperation des caracteristiques du produit
    document.querySelector(".item__img").innerHTML +=
    `<img src="${sofa.imageUrl}" alt="${sofa.altTxt}">`;
    document.getElementById("title").textContent = sofa.name;
    document.getElementById("price").textContent = sofa.price;
    document.getElementById("description").textContent = sofa.description;

     // selection de la couleur dans le html
     let ColorId = document.querySelector("#colors");
    
     //itération dans le tableau color de l'objet et insertion des variables dans le html 
    for (color of sofa.colors){
        let optionColors = document.createElement("option");
        optionColors.innerHTML = color;
        optionColors.value = color;
        ColorId.appendChild(optionColors);
    }
}


//------Tableau qui contiendra les articles que l'utilisateur souhaite mettre dans le panier---

const btnAddCard = document.getElementById("addToCart")

    btnAddCard.addEventListener("click", (event) => {
    let colorSelect = document.getElementById("colors").value;
    let quantitySelect = document.getElementById("quantity").value;


    if (colorSelect.length === 0) {
        confirm("Veuillez sélectionner une couleur ");
    } 
    
    
    else if (quantitySelect == 0) {
        confirm("Veuillez sélectionner le nombre d'article souhaité");  
    } 
    
    
    else if (quantitySelect > 100) {
        confirm("Les commandes sont limitées à 100 articles par références"); 
    } 
    
    
    else {
      alert("Cet article a été ajouté à votre panier."); 
      let sofaSelectToCart = {
        id: getSofaId(),
        quantity: quantitySelect,
        color: colorSelect,
      };
      let existingCart = JSON.parse(localStorage.getItem("sofa"));
      const localStorageAdd = () => {
        existingCart.push(sofaSelectToCart);
        localStorage.setItem("sofa" , JSON.stringify(existingCart));
      };
      if (existingCart === null) {
        existingCart = []
        localStorageAdd()
        }
     else {
            let sofaFoundInCart = false;
            for (i = 0; i < existingCart.length; i++) {
              if ( existingCart[i].id === sofaSelectToCart.id && existingCart[i].color === sofaSelectToCart.color) {
                sofaFoundInCart = true;
                existingCart[i].quantity = parseInt(existingCart[i].quantity, 10) + parseInt(sofaSelectToCart.quantity, 10);
                localStorage.setItem("sofa" , JSON.stringify(existingCart));
                break;
              }
            }
            if (sofaFoundInCart === false) {
                localStorageAdd();

              }
          }

      }
    }
    )
    console.log(localStorage) 

