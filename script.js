function listeDesProduits(kanape){
    let listeProduits = "";
    
    for (let elem of kanape){
      let imageUrl = elem.imageUrl;
      let kanapeName = elem.name;
      let kanapePrix = elem.price;
      let altText = elem.altTxt;
      let kanapeDescription = elem.description;
      let kanapeId = elem._id;
      
      listeProduits =listeProduits + `<a href="./product.html?id=${kanapeId}">
        <article>
        <img src=${imageUrl} alt="${altText}, ${kanapeName}">
        <h3 class="productName">${kanapeName}</h3>
        <p class="productDescription">${kanapeDescription}</p>
        </article>
        </a>`;
  
    }
    document.getElementById("items").innerHTML = listeProduits;
    
  }
  async function displayProducts() {
    await fetch('http://localhost:3000/api/products') // will return info, but in wrong format
      .then((response) => response.json()) // will return info, in json format
      .then((kanape) => listeDesProduits(kanape)) // main code here, using json info
  }
  
  displayProducts()

  