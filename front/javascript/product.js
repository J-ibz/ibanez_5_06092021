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
