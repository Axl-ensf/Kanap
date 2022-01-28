//Récupération de l'id dans l'url.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//Rechercher le produit dans l'api grâce à son id.
let outputAPI = "";
function displayProduct(id) {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (resultsAPI) {
      outputAPI = resultsAPI; //Toutes les infos du produit sélecionné.
      showElems(outputAPI);
      
      
    })
    .catch((err)=> console.log("Erreur :" + err));

}
//fonction pour faire apparaître les élements dans le DOM.
function showElems(data) {
  let imageUrl = data.imageUrl;
  let kanapeName = data.name;
  let kanapePrice = data.price;
  let kanapeDescription = data.description;
  let kanapeAltText = data.altTxt;

  document.querySelector(".item__img").innerHTML = `<img src=${imageUrl} alt="${kanapeAltText}">`;
  document.getElementById("title").textContent = `${kanapeName}`;
  document.getElementById("price").textContent = `${kanapePrice}`;
  document.getElementById("description").textContent = `${kanapeDescription}`;
  data.colors.forEach(color => {
    document.querySelector('#colors').innerHTML += `<option value =${color}>${color}</option>`
  });
}
displayProduct(id);
//---------fin---affichage images de canapés,description,couleur et prix------

//----------Fonctions du panier---------
//Mettre le choix de l'utilisateur dans une variable

const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");
const productId = outputAPI.id;

const choiceOptionColor = colorChoice.value;
const choiceOptionQuantity = quantityChoice.value;
console.log(choiceOptionColor);
console.log(choiceOptionQuantity);

//------ La gestion du panier----//
//La récupération des données sélectionnées par l'utilisateur et envoie du panier.
//Sélection du bouton Ajouter l'article au panier
//fonction du bouton "ajouter au panier",avec des alert au cas ou quantityChoice et colorChoice ne sont pas remplis.
function addProductToCart(){
      let addProductToCart = document.querySelector("#addToCart");
      console.log(addProductToCart);
      
    //Ecouter le bouton et envoyer le panier
          addProductToCart.addEventListener("click", function (event) {
          event.preventDefault();
          console.log("Vous avez cliquer sur 'Ajouter au panier'");
          //Les caractéristique de l'article
          let article = {
          id: outputAPI._id,
          couleur: colorChoice.value,
          quantite: quantityChoice.value,
          
          };
          console.log(article);
          
          if (!checkValues(colorChoice.value, quantityChoice.value)){
            return;
          }
//Déclaration de la variable "basket" dans laquelle on met les key et les values qui sont dans le localStorage
          let basket = JSON.parse(localStorage.getItem("cart"));
//--JSON.parse c'est pour convertir les donneés au format JSON qui sont dans le localStorage en objet JavaScript
          console.log(basket);
    
//si le panier est vide,ajouter l'article a l'objet article          
          if (basket == null){
                basket = [];
                basket.push(article);
                localStorage.setItem("cart", JSON.stringify(basket));
          }else{
                
                
                let foundProduct = basket.findIndex(
                      (product)=>
                      product.id === article.id && product.couleur === article.couleur //si l'id et la couleur sont les mêmes.
                );//Recherche de l'index de l'article dans le tableau "basket"
                console.log(foundProduct);
                if (foundProduct !== -1){
                      //true => index trouvé
                      basket[foundProduct].quantite =
                            parseInt(basket[foundProduct].quantite) +
                            parseInt(quantityChoice.value);// calcule la nouvelle quantité
                      basket.push(article);//ajouter l'article dans le tableau
                      basket.pop(); //Supprime le dernier article
                      localStorage.setItem("cart", JSON.stringify(basket));//sauvegarde l'article
                }else{
                      //false => index non trouvé
                      basket.push(article);//ajoute l'article dans le tableau
                      localStorage.setItem("cart", JSON.stringify(basket));
                }
                
          }
      
      })
    };
    //fonction fenêtre pop up
    /*function popupConfirmation(){
      if(window.confirm(`${quantityChoice.value + " " + outputAPI.name +" en" +" " + colorChoice.value} a bien été ajouté au panier.
    Consultez le panier OK ou revenir à l'accueil ANNULER`)){
      window.location.href = "cart.html";
      }else{
            window.location.href = "index.html";
    
      }
    };*/
    
    function checkValues(color,quantity){
          console.log("La couleur sélestionnée est :" + colorChoice.value);
          if (!color) {
          alert("Merci de choisir une couleur");
          return false;
           }
          console.log("Le nombre sélectionné est :" + quantityChoice.value);
           if (quantity <= 0 || quantity > 100) {
          alert("Merci de sélectionner une quantité entre 1 et 100");
          return false;
          }
          return true;
    };
    
    
    
    
    
    
    addProductToCart();