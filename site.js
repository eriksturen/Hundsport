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

const productModal = document.querySelector('.product-info-modal');

// this is main cart variable 
let cart = [];
//buttons 
let buttonsDOM = [];

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
        for (let i = 0; i < products.length; i++) {
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
                    <button type="button" class="btn btn-primary" data-toggle="modal" 
                    data=${products[i].id} data-target="#exampleModal" 
                        onclick="createModal(${products[i].id})">
                        Mer info
                    </button>
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
        const buttons = document.getElementsByClassName("bag-btn");
        buttonsDOM = buttons;
        for (let i = 0; i < buttons.length; i++) {
            const id = buttons[i].getAttribute('data');
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                buttons[i].innerText = "Redan i korgen";
                buttons[i].disabled = true;
            }
            buttons[i].addEventListener('click', (event) => {
                event.target.innerText = "I korgen";
                event.target.disabled = true;
                //get product from products in local storage
                let cartItem = Storage.getProduct(id);
                console.log(cartItem);
                // add product to cart in storage
                // save cart in local storage
                // set cart values
                // show cart 
            });
        }
    }
}
function createModal(id) {
    // The doubleclick problem on the product modal was becasue the product list was read again in that function. It's unnecessary because it's already stored in the local storage - when productlist is gotten from there instead it works on first click
    const products = JSON.parse(localStorage.getItem("products"));
    productModal.innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${products[id].title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${products[id].title}</p>
                    <p>${products[id].price}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Stäng</button>
                    <button type="button" class="btn btn-primary">Lägg i korgen</button>
                </div>
            </div>
        </div>
    </div>
    `
}

// local storage class 
class Storage {
    static saveProduct(products) {
        localStorage.setItem("products", JSON.stringify(products))
    };
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
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