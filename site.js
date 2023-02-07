// CART AND PRODUCTS SECTION 
class Product {
    constructor(title, price, description, image) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

const productList = document.querySelector("#productList")
const products = [];
// const productModal = document.querySelector("#productModal");


async function startShop() {
    const response = await fetch("./products/products.json");
    const productsJson = await response.json();
    for (const product of productsJson.items) {
        products.push(
            new Product(product.title, product.price, product.description, product.image)
        );
    }
    createProductCards();
}

function openCart() {
    cartModal();
    $('#cartModal').modal('show');
}

// Look in localStorage - if cart is there, load that one, otherwise initialize
// this is main cart variable
let cart = [];
function cartModal() {
    const cartModal = document.querySelector("#shopping-cart-modal");
    // Clear old modal if it's there
    cartModal.firstChild.remove();

    let totalPrice = 0;

    // need a cartModal with title "Kundkorg". 
    const modal = document.createElement("div");
    const modalDialog = document.createElement("div");
    const modalContent = document.createElement("div");
    const modalHeader = document.createElement("div");
    const modalTitle = document.createElement("h5");
    const modalBody = document.createElement("div");
    const modalCardList = document.createElement("ul");
    const modalFooter = document.createElement("div");
    const totalPriceDiv = document.createElement("div");
    const closeCartButton = document.createElement("button");
    const emptyCartButton = document.createElement("button");
    const checkoutButton = document.createElement("button");


    // add classes
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
    closeCartButton.classList.add("close", "btn", "btn-primary");
    emptyCartButton.classList.add("btn", "btn-danger");
    checkoutButton.classList.add("btn", "btn-success");


    //Then a list of small cards - horizontally aligned with products. Title, Price, amount, lower/increase buttons, total price for each of item and remove button
    for (const product of cart) {
        const productContainer = document.createElement("div");
        const productRow = document.createElement("div")
        const productText = document.createElement("div");
        const productAmount = document.createElement("div");
        const productPrice = document.createElement("div");
        const removeProduct = document.createElement("div");

        productContainer.classList.add("container");
        productRow.classList.add("row");
        productRow.style.border = "1px solid grey";

        productText.classList.add("col-4", "m-3");
        productPrice.classList.add("col", "m-3");
        productAmount.classList.add("col");
        removeProduct.classList.add("col", "btn", "btn-danger", "m-3");
        removeProduct.style.maxHeight = "40px";

        productText.innerText = product.title;
        productPrice.innerText = `à ${product.price} kr`
        removeProduct.innerText = "Ta bort";

        // remove product clicky thing doesn't work
        removeProduct.onclick = () => {
            const index = cart.indexOf(product);
            cart.splice(index, 1);
            $("#cartModal").modal("hide");
            openCart();
        }

        // Append everything to the main list
        productRow.append(productText, productPrice, removeProduct);
        productContainer.append(productRow);
        modalCardList.append(productContainer);

        totalPrice += product.price;
    }
    // then a footer with total price, empty cart button and checkout button

    modalTitle.innerText = "Kundkorg";
    totalPriceDiv.innerText = `${totalPrice} kr`;
    closeCartButton.innerText = "Stäng";
    emptyCartButton.innerText = "Töm korgen";
    checkoutButton.innerText = "Gå till kassan";

    // functionality for cart buttons
    emptyCartButton.onclick = () => {
        cart.splice(0, cart.length);
        $("#cartModal").modal("hide");
        openCart();
    }

    closeCartButton.onclick = () => {
        $("#cartModal").modal("hide");
    }

    // append everything to the main Modal
    modalFooter.append(totalPriceDiv, emptyCartButton, checkoutButton);
    modalBody.append(modalCardList, modalFooter);
    modalHeader.append(modalTitle, closeCartButton);
    modalContent.append(modalHeader, modalBody, modalFooter);
    modalDialog.append(modalContent);
    modal.appendChild(modalDialog);

    modal.id = "cartModal";
    cartModal.appendChild(modal);
}

function createProductCards() {
    for (const product of products) {
        // Create elements, set text, add classes
        const card = document.createElement("div");
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
        cardImage.classList.add("card-img-top", "card-img-top-small");
        modalButton.classList.add("btn", "btn-primary", "m-2");
        cartButton.classList.add("btn", "btn-primary", "bag-btn", "m-2");

        cardTitle.innerText = product.title;
        cardImage.src = product.image;
        cardImage.alt = "https://sv.wikipedia.org/wiki/404_error#/media/Fil:Camino-404.png"
        cardText.innerText = `${product.price} kr`;
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
    const modalImage = document.createElement("img");
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
    modalImage.classList.add("card-img-top");
    modalTitle.classList.add("modal-title");
    modalBody.classList.add("modal-body");
    modalFooter.classList.add("modal-footer");
    closeButton.classList.add("close", "btn", "btn-primary");
    cartButton.classList.add("close", "btn", "btn-primary");

    closeButton.onclick = () => {
        $('#exampleModal').modal('hide');
    }

    // Cart button needs to go here 
    cartButton.onclick = () => {
        addToCart(product);
    }

    modalTitle.innerText = product.title;
    modalBodyTitle.innerText = product.title;
    modalBodyDescription.innerText = product.description;
    modalBodyPrice.innerText = `${product.price} kr`;
    modalImage.src = product.image;
    modalImage.alt = "https://sv.wikipedia.org/wiki/404_error#/media/Fil:Camino-404.png";
    closeButton.innerText = "Stäng";
    cartButton.innerText = "Lägg i korgen";

    modalBody.append(modalBodyTitle, modalBodyDescription, modalBodyPrice);
    modalFooter.append(closeButton, cartButton);
    modalHeader.append(modalTitle);
    modalContent.append(modalHeader, modalImage, modalBody, modalFooter);
    modalDialog.append(modalContent);
    modal.appendChild(modalDialog);


    modal.id = "exampleModal";
    productModal.appendChild(modal);
}

function addToCart(product) {
    cart.push(product);
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

