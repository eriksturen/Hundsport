// CART AND PRODUCTS SECTION 
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.cart-btn');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

const productInfoModalBtn = document.querySelector('.product-info-modal-btn');

// this is main cart variable 
let cart = [];

// this class reformats the data from products.json.
// the products file has a weird format becasue of the contentful CMS to be used later 
// the reformatting is done using destructuring in the map function 
class Products {
    async getProducts() {
        try {
            let result = await fetch('/products/products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// display products - responsible for getting all items returned from Products and displaying them
class UI {
    displayProducts(products) {
        let i;
        for (i = 0; i < products.length; i++) {
            const prod = document.createElement("div");
            prod.innerHTML = `
            <article class="product">
            <div class="card mx-auto d-block border-secondary mb-3" style="width: 18rem;">
            <img src=${products[i].image} class="card-img-top" style="width: 50%;">
                <div class="card-body">
                <h5 class="card-title">${products[i].title}</h5>
                <p class="card-text">This is a product card <br>
                    ${products[i].price} kr
                 </p>
                    <a href="#" class="btn btn-primary info-btn">Mer info</a>
                    
                    <button href="#" class="btn btn-primary bag-btn" data=${products[i].id}>Lägg i korgen</button>
                </div>
                </div>
            </article>
            `
            productsDOM.appendChild(prod)
            // send products[i].id to a function that creates a modal with more info about that product, hook that up to the ShowModalButton somehow
        };

    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll(".bag-btn")];
        for (let i = 0; i < buttons.length; i++) {

        }
    }
}
// local storage class 
class Storage {
    static saveProduct(products) {
        localStorage.setItem("products", JSON.stringify(products))
    };

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products then pass then off to the ui class which handles displaying correctly
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProduct(products);
    }).then(() => {
        ui.getBagButtons();
    });
});




// OLD PRODUCTS SECTION
// const products = [["Köttfärs", "/images/DogProfile.svg"], ["Bitkudde", "/images/DogProfile.svg"], ["Koppel", "/images/dog-collar.svg"], ["Storpack märgben", "/images/DogProfile.svg"], ["Tennisboll", "/images/DogProfile.svg"], ["Lyftsele", "/images/dog-collar.svg"], ["Leversnittar", "/images/DogProfile.svg"], ["Gummigris", "/images/DogProfile.svg"], ["Kamerasele", "/images/dog-collar.svg"]];
// const list = document.getElementById("shopProducts");

// const cardList = document.getElementById("shopProductsCards");
// for (i = 0; i < products.length; i++) {
//     const card = document.createElement("div");
//     card.innerHTML = `
//         <div class="card mx-auto d-block border-secondary mb-3" style="width: 18rem;">
//             <img src=${products[i][1]} class="card-img-top" style="width:50%;" alt="...">
//             <div class="card-body">
//                 <h5 class="card-title">${products[i][0]}</h5>
//                 <p class="card-text">This is a product card <br>
//                     333 kr
//                 </p>
//                 <a href="#" class="btn btn-primary">Mer info</a>
//                 <a href="#" class="btn btn-primary">Lägg i korgen</a>
//             </div>
//         </div>
//   `
//     cardList.appendChild(card);
// }

// console.log(cardList);