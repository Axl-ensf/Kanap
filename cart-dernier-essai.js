//Récupére ce qu'il y a dans le local storage avec la clé "cart"
let backUpInfos = JSON.parse(localStorage.getItem("cart"));
//--JSON.parse c'est pour convertir les donneés au format JSON qui sont dans le localStorage en objet JavaScript
      

backUpInfosLocalStorage();
displayOrderArray(backUpInfos);
modifyArticleQuantity(backUpInfos);
deleteArticle();
totalArticle();
//totalCart();
//orderForm();
//order();

//Fonctions
function backUpInfosLocalStorage(){
      console.log(backUpInfos);//affiche les infos de backupinfos
      console.log(typeof backUpInfos);//affiche le type de donné =>objet
}

async function displayProducts() {
      await fetch('http://localhost:3000/api/products') // will return info, but in wrong format
        .then((response) => response.json()) // will return info, in json format
        .then((fauteuil) => listeDesProduits(fauteuil)) // main code here, using json info
}
function listeDesProduits(fauteuil){
      let listeProduits = "";
      
      for (let elem of fauteuil){
        let imageUrl = elem.imageUrl;
        let fauteuilName = elem.name;
        let fauteuilPrix = elem.price;
        
        
      
      }
}
displayProducts();
    


function displayOrderArray(backUpInfos,fauteuil){
      for (let c =0; c < backUpInfos.length; c = c+1){
            let cart = document.querySelector("#cart__items"); //sélection du noeud
            //schema html
            /*<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>*/
            //création des balises
            let codeArticle = document.createElement("article");//<article></article>
            let codeDivImg = document.createElement("div")//<div></div>
            let codeImg = document.createElement("img");//</img>
            let codeDivContent = document.createElement("div");//<div></div>
            let codeDivDescription = document.createElement("div");//<div></div>
            let codeH2 = document.createElement("h2");//<h2></h2>
            let codeColorPara = document.createElement("p");//<p></p>
            let codePricePara = document.createElement("p");//<p></p>
            let codeDivSettings = document.createElement("div");//<div></div>
            let codeDivQuantity = document.createElement("div");//<div></div>
            let codeQuantityPara = document.createElement("p");//<p></p>
            let codeQuantityInput = document.createElement("input");//<input></input>
            let codeDivDelete = document.createElement("div");//<div></div>
            let codeDeletePara = document.createElement("p");//<p></p>

            //Affecter les balises, classes et attribut dans le dom
            cart.appendChild(codeArticle);// ajout <article> a la balise parente <section> dans le DOM
            codeArticle.classList.add("cart__item");//ajout de class="cart_item" à la balise <article> dans le DOM
            codeArticle.dataset.id = backUpInfos[c].id;//ajout de l'attribut 'data' à la balise <article> dans le DOM
            codeArticle.dataset.color = backUpInfos[c].couleur;//ajout de l'attribut 'data' à la balise <article> dans le DOM

            codeArticle.appendChild(codeDivImg);
            codeArticle.classList.add("cart__item__img");
            codeArticle.appendChild(codeImg);
            codeImg.scr = backUpInfos[c].image;
            codeImg.alt = backUpInfos[c].texte;

            codeArticle.appendChild(codeDivContent);
            codeDivContent.classList.add("cart__item__content");

            codeDivContent.appendChild(codeDivDescription);
            codeDivDescription.classList.add("cart__item__content__titlePrice");
            codeDivDescription.appendChild(codeH2);
            codeH2.textContent = backUpInfos[c].nom;
            codeDivDescription.appendChild(codeColorPara);
            codeColorPara.textContent = backUpInfos[c].couleur;
            codeDivDescription.appendChild(codePricePara);
            codePricePara.textContent = backUpInfos[c].prix + "€";

            codeDivContent.appendChild(codeDivSettings);
            codeDivSettings.classList.add("cart__item__content__settings");
            codeDivSettings.appendChild(codeDivQuantity);
            codeDivQuantity.classList.add("cart__item__content__settings__quantity");
            codeDivQuantity.appendChild(codeQuantityPara);
            codeQuantityPara.textContent = "Qté : ";
            codeDivQuantity.appendChild(codeQuantityInput);
            codeQuantityInput.type = "number";
            codeQuantityInput.classList.add("itemQuantity");
            codeQuantityInput.name = "itemQuantity";
            codeQuantityInput.min = "1";
            codeQuantityInput.max = "100";
            codeQuantityInput.value = backUpInfos[c].quantite;
            codeDivSettings.appendChild(codeDivDelete);
            codeDivDelete.classList.add("deleteItem");
            codeDivDelete.textContent = "Supprimer";

            console.log(cart);
      }
}
function modifyArticleQuantity(backUpInfos){
      let quantity = document.querySelectorAll(".itemQuantity");
      console.log(quantity);
      let article = document.querySelectorAll("article");
      console.log(article);

      for (let i = 0; i< quantity.length; i = i + 1){
            quantity[i].addEventListener("change",function (event){
                  let newQuantity = event.target.value;
                  console.log(newQuantity);
                  let idArticle = article[i].dataset.id;
                  console.log(idArticle);
                  let couleurArticle = article[i].dataset.color;
                  console.log(couleurArticle);

                  //rechercher le canapé dans le localStorage à partir de l'index
                  let findIndexToModify = backUpInfos.findIndex(
                        (i)=> i.id === idArticle && i.couleur === couleurArticle
                  );
                  console.log(findIndexToModify);
                  backUpInfos[findIndexToModify].quantite = newQuantity;
                  console.log(newQuantity);
                  backUpInfos.push(newQuantity);
                  backUpInfos.pop();
                  console.log(backUpInfos);
                  console.log(typeof backUpInfos); //=>objet
                  localStorage.setItem("cart", JSON.stringify(backUpInfos));

            });
      }
}

function deleteArticle(){
      let deleteButton = document.querySelectorAll(".cart__item__content__settings__delete");
      for(let i=0; i<deleteButton.length; i=i+1){
            deleteButton[i].addEventListener("click",function(){
                  let articleIdToDelete = backUpInfos[i].id;
                  console.log(articleIdToDelete);
                  let articleColorToDelete = backUpInfos[i].color;
                  console.log (articleColorToDelete);

                  //recherche de l'article dans le localStorage par rapport a l'id ou la couleur
                  backUpInfos = backUpInfos.filter(
                        (kanape)=>
                        kanape.id !== articleIdToDelete ||
                        kanape.couleur !== articleColorToDelete
                  );
                  console.log(backUpInfos);
                  localStorage.setItem("cart", JSON.stringify(backUpInfos));

            });
      }
}
function totalArticle(){
      let articleQuantity = 0;

      let quantity = document.querySelectorAll(".itemQuantity");
      console.log(quantity);
      let totalQuantity = quantity.length;
      console.log(totalQuantity);

      for(let i=0; i<totalQuantity; i= i+1){
            articleQuantity = articleQuantity + quantity[i].valueAsNumber;
            console.log(articleQuantity);

            let totalArticle = document.querySelector("#totalQuantity");
            totalArticle.textContent = articleQuantity;
      }
}