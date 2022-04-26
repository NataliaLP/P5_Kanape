
fetch("http://localhost:3000/api/products")
  .then((response) => {
    return response.json();
    })
    .then((sofas) => {
        for (data of sofas) {
            document.getElementById("items").innerHTML += `
            <a href="./product.html?id=${data._id}">
                <article>
                    <img src="${data.imageUrl}" alt="${data.altTxt}"/>
                    <h3 class="productName">${data.name}</h3>
                    <p class="productDescription">${data.description}</p>
                </article>
            </a>`;
            }     
    })
    .catch((err) => {
        alert(error);
    })

