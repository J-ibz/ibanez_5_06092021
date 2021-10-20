//Récupération de l'id depuis l'url
let params = new URL(document.location).searchParams;
let idProduct = params.get("id");

//Fetch des données par rapport à l'id récupéré dans l'url du produit
const fetchProductId = async function () {
    await fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            produits = data;
        });
};

// Affichage du produit
const afficherLeProduit = async function () {
    await fetchProductId();
    let choixColor = document.querySelector("#colors");
    document.querySelector(".item__img").innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;
    document.getElementById("title").textContent = produits.name;
    document.getElementById("price").textContent = produits.price;
    document.getElementById("description").textContent = produits.description;
    produits.colors.forEach((option) => {
        choixColor.innerHTML += `<option value="${option}">${option}</option>`;
    });
};
afficherLeProduit();
