

// 1. Skapa en array med bilmärkesnaman: 
//     ['bmw', 'mercedes', 'volvo', 'opel']
// 2. lägg till märket 'saab' först i listan
// 3. lägg till 'tesla' sist
// 4. leta upp 'saab' utan att plocka bort
//      och printa ut det
// 5. skapa en till array med fler märken
//     ['renault', 'skoda']
// 6. lägg till den nya arrayen från index 2 i den första

// const cars = ['bmw', 'mercedes', 'volvo', 'open'];

// cars.unshift('saab');

// cars.push('tesla');

// for (i = 0; i < cars.length; i++) {
//     if (cars[i] == "saab") {
//         console.log(`first mention is here: ${cars[i]}`);
//     }
// }

// const cars2 = ['renault', 'skoda'];

// for (i = 0; i < cars2.length; i++) {
//     cars.splice(2, 0, cars2[i]);
// }

// for (i = 0; i < cars.length; i++) {
//     console.log(cars[i]);
// }

const products = [["Köttfärd", "/images/bone.svg"], ["Bitkudde", "/images/DogProfile.svg"], ["Koppel", "/images/dog-collar.svg"]];
const list = document.getElementById("shopProducts");

// for (i = 0; i < products.length; i++) {
//     const li = document.createElement("li");
//     li.innerText = products[i];
//     list.appendChild(li);
// };

// for (i = 0; i < products.length; i++) {
//     const li = document.createElement("li");
//     li.innerText = products[i];
//     list.appendChild(li);
// };

const cardList = document.getElementById("shopProductsCards");
for (i = 0; i < products.length; i++) {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card mx-auto d-block" style="width: 18rem;">
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