// CART AND PRODUCTS SECTION 
class Product {
    constructor(title, price, description, image) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}
// this is main cart variable

const productList = document.querySelector("#productList")
const products = [];
const productModal = document.querySelector("#productModal");


async function startShop() {
    const response = await fetch("./products/products.json");
    const productsJson = await response.json();
    console.log(productsJson.items)
    for (const product of productsJson.items) {
        products.push(
            new Product(product.title, product.price, product.description, product.image)
        );
    }
    createProductCards();
}

let cart = [];
//buttons 


function createProductCards() {
    for (const product of products) {
        // Create elements, set text, add classes
        const card = document.createElement("li");
        const cardTitle = document.createElement("div");
        const cardBody = document.createElement("div");
        const cardText = document.createElement("p");
        const cardImage = document.createElement("img");
        const cardFooter = document.createElement("div");
        const modalButton = document.createElement("button");
        const cartButton = document.createElement("button");

        card.classList.add("card", "mx-auto", "d-block", "border-secondary", "mb-3");
        cardTitle.classList.add("card-title");
        cardBody.classList.add("card-body");
        cardText.classList.add("card-text");
        cardFooter.classList.add("footer");
        cardImage.classList.add("card-img-top");
        cardImage.style.width = "50%";
        modalButton.classList.add("btn", "btn-primary", "m-2");
        cartButton.classList.add("btn", "btn-primary", "bag-btn", "m-2");

        cardTitle.innerText = product.title;
        cardImage.src = product.image;
        cardText.innerText = product.price;
        modalButton.innerText = "Mer info";
        cartButton.innerText = "Lägg i korgen";

        // Set up events for buttons
        modalButton.onclick = () => {
            createModal(product);
            $('#exampleModal').modal('show');
        };

        cartButton.onclick = () => {
            addToCart(product);
        };

        // Add elements to card list 
        cardFooter.append(modalButton, cartButton);
        cardBody.append(cardTitle, cardText);
        card.append(cardImage, cardBody, cardFooter)
        productList.append(card);
    }
}

function createModal(product) {
    const productModal = document.querySelector("#productModal");
    // Clear old modal if it's there
    productModal.firstChild.remove();
    const modal = document.createElement("div");
    const modalDialog = document.createElement("div");
    const modalContent = document.createElement("div");
    const modalHeader = document.createElement("div");
    const modalTitle = document.createElement("h5");
    const modalBody = document.createElement("div");
    const modalFooter = document.createElement("div");
    const closeButton = document.createElement("button");
    const cartButton = document.createElement("button");

    const modalBodyTitle = document.createElement("p");
    const modalBodyDescription = document.createElement("p");
    const modalBodyPrice = document.createElement("p");


    modal.classList.add('modal');
    modal.role = "dialog";
    modal.tabIndex = "-1";
    modal.ariaHidden = "true";
    modalDialog.classList.add("modal-dialog");
    modalDialog.role = "document";
    modalContent.classList.add("modal-content");
    modalHeader.classList.add("modal-header");
    modalTitle.classList.add("modal-title");
    modalBody.classList.add("modal-body");
    modalFooter.classList.add("modal-footer");
    closeButton.classList.add("close", "btn", "btn-primary");
    cartButton.classList.add("close", "btn", "btn-primary");

    closeButton.onclick = () => {
        $('#exampleModal').modal('hide');
    }

    modalTitle.innerText = product.title;
    modalBodyTitle.innerText = product.title;
    modalBodyDescription.innerText = product.description;
    modalBodyPrice.innerText = product.price;
    closeButton.innerText = "Stäng";
    cartButton.innerText = "Lägg i korgen";

    modalBody.append(modalBodyTitle, modalBodyDescription, modalBodyPrice);
    modalFooter.append(closeButton, cartButton);
    modalHeader.append(modalTitle);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalDialog.append(modalContent);
    modal.appendChild(modalDialog);


    modal.id = "exampleModal";
    console.log(modal);
    productModal.appendChild(modal);
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

startShop();


// OLD MODAL FUNCTION
// TODO change this to similar to above - take in product instead
// function createModal(product) {
//     // The doubleclick problem on the product modal was becasue the product list was read again in that function. It's unnecessary because it's already stored in the local storage - when productlist is gotten from there instead it works on first click
//     productModal.innerHTML = `
//         <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
//         aria-hidden="true">
//         <div class="modal-dialog" role="document">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h5 class="modal-title" id="exampleModalLabel">${product.title}</h5>
//                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//                 <div class="modal-body">
//                     <p>${product.title}</p>
//                     <p>${product.description}</p>
//                     <p>${product.price}</p>
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Stäng</button>
//                     <button type="button" class="btn btn-primary">Lägg i korgen</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `
//     console.log(productModal.innerHTML);
// }
