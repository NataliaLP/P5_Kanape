
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
        optionColors.innerHTML =`${color}`;
        optionColors.value =`${color}`;
        ColorId.appendChild(optionColors);
    }
}



