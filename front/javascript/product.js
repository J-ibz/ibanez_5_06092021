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

//Selection du bouton ajouter au panier
let cartButton = document.getElementById("addToCart");

//Ajouter produit au panier lors du clique
cartButton.addEventListener("click", function (e) {
    if (document.querySelector("#colors").value == "") {
        alert("Veuillez sélectionnez une couleur");
        e.preventDefault();
    } else {
        // Select des elements à mettre dans le panier
        let image = document.querySelector("body > main > div > section > article > div.item__img > img").src;
        let imageAlt = document.querySelector("body > main > div > section > article > div.item__img > img").alt;
        let name = document.getElementById("title").textContent;
        let price = document.getElementById("price").textContent + "€";
        let choixOpt = document.querySelector("#colors").value;
        let productID = idProduct;
        //transformation du type of qty
        let qty_chiffre = document.querySelector("#quantity").value;
        let qty = Number(qty_chiffre);

        //pour tester la boucle et l'arreter
        let boucle = 0;

        // ajout des elt du panier dans un tableau
        let eltPanier = [{ image, imageAlt, name, price, choixOpt, qty, productID }];

        //Déclaration au format js de la clé produit stocké dans le local storage
        let panierToStock = JSON.parse(localStorage.getItem("produit"));

        //Si le localstorage est vide, on créer tableau, on push le panier dedans et on stock dans localStorage
        if (!panierToStock) {
            panierToStock = [];
            panierToStock.push(eltPanier);
            localStorage.setItem("produit", JSON.stringify(panierToStock));
        }
        //Avant de stock dans local storage, on verifie si nom et option sont =, si = alors on incremente qty
        else {
            for (let i = 0; i < panierToStock.length; i++) {
                if (panierToStock[i][0].name === name && panierToStock[i][0].choixOpt === choixOpt) {
                    panierToStock[i][0].qty += qty;
                    boucle = 1;
                }
            }
            //Si pas égale, on stop la boucle et on push le panier dans local storage
            if (boucle == 0) {
                panierToStock.push(eltPanier);
            }

            localStorage.setItem("produit", JSON.stringify(panierToStock));
        }

        if (qty > 1) {
            alert(`Vous avez ajouté ${qty} articles au panier`);
        } else if (qty == 1) {
            alert(`Vous avez ajouté ${qty} article au panier`);
        }
    }
});
