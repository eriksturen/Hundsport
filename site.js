const products = [["Köttfärs", "/images/DogProfile.svg"], ["Bitkudde", "/images/DogProfile.svg"], ["Koppel", "/images/dog-collar.svg"], ["Storpack märgben", "/images/DogProfile.svg"], ["Tennisboll", "/images/DogProfile.svg"], ["Lyftsele", "/images/dog-collar.svg"], ["leversnittar", "/images/DogProfile.svg"], ["Gummigris", "/images/DogProfile.svg"], ["Kamerasele", "/images/dog-collar.svg"]];
const list = document.getElementById("shopProducts");

const cardList = document.getElementById("shopProductsCards");
for (i = 0; i < products.length; i++) {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card mx-auto d-block border-secondary mb-3" style="width: 18rem;">
            <img src=${products[i][1]} class="card-img-top" style="width:50%;" alt="...">
            <div class="card-body">
                <h5 class="card-title">${products[i][0]}</h5>
                <p class="card-text">This is a product card <br> 
                    It describes the product
                </p>
                <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
        </div>
  `
    cardList.appendChild(card);
}

console.log(cardList);