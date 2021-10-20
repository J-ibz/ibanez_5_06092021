//Récupération des infos stocké dans le local storage
let panier = JSON.parse(localStorage.getItem("produit"));

//Affichage des éléments du panier
function afficherPanier() {
    //Si panier vide
    if (panier === null || panier.length == 0) {
        document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";
    }
    // si element dans panier
    else {
        for (i = 0; i < panier.length; i++) {
            document.querySelector("#cart__items").innerHTML += `
    <article class="cart__item" data-id="${panier[i][0].idProduct}">
        <div class="cart__item__img">
            <img src="${panier[i][0].image}" alt="${panier[i][0].imageAlt}" />
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${panier[i][0].name}</h2>
                <p>${panier[i][0].price}</p>
                <p>Couleur: ${panier[i][0].choixOpt}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input index="${[i]}" onchange="getNewQty(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${panier[i][0].qty}" />
                </div>
                <div class="cart__item__content__settings__delete">
                    <p index="${[i]}" onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
    `;
        }
    }
}
afficherPanier();

// Supression de la ligne  au clic du bouton suppr
function supprimerArticle(e) {
    let index = e.getAttribute("index");
    panier.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(panier));
    location.reload();
}

// Mise à jour des quantités et total prix si modification des valeures dans l'input
function getNewQty(e) {
    let index = e.getAttribute("index");
    let newQty = e.value;
    panier[index][0].qty = newQty;

    if (newQty == 0) {
        panier.splice(index, 1);
        localStorage.setItem("produit", JSON.stringify(panier));
        location.reload();
    } else {
        document.querySelector("#totalQuantity").innerHTML = totalQty();
        document.querySelector("#totalPrice").innerHTML = totalPrice();
        localStorage.setItem("produit", JSON.stringify(panier));
    }
}
// Calcul du total prix
function totalPrice() {
    let totalprix = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i][0].qty);
        let prix = parseInt(panier[i][0].price);
        totalprix += prix * quantity;
    }
    return totalprix;
}

// affichage du total prix
document.querySelector("#totalPrice").innerHTML = totalPrice();

// Calcul du total quantité(s)
function totalQty() {
    let totalqty = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i][0].qty);
        totalqty += quantity;
    }
    return totalqty;
}

// affichage du total quantités
document.querySelector("#totalQuantity").innerHTML = totalQty();
