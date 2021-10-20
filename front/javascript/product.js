//Récupération de l'id depuis l'url
let params = new URL(document.location).searchParams;
let idProduct = params.get("id");
