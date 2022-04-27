
const sofaId = getSofaId()
function getSofaId() {
    return new URL(location.href).searchParams.get("id");
};


fetch(`http://localhost:3000/api/products/${sofaId}`)
    .then((response) => {
        return response.json();
    })
    .then((product) => {
        displaySofa(product);
    })
    .catch((error) => {
        alert(error);
    });
    

let displaySofa = (product) => {
    document.querySelector(".item__img").innerHTML +=
    `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
}