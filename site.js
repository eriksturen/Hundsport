

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

const products = ["hundmat", "kötffärs", "koppel"];
const list = document.getElementById("shopProducts");

// for (i = 0; i < products.length; i++) {
//     const li = document.createElement("li");
//     li.innerText = products[i];
//     list.appendChild(li);
// };

for (i = 0; i < products.length; i++) {
    const li = document.createElement("li");
    li.innerText = products[i];
    list.appendChild(li);
};

// var items = [
//     ['Logitek', 'Rp 60.000,00', 'Logitek Keyboard', 'logitek.jpeg'],
//     ['MSI', 'Rp 300.000,00', 'MSI Keyboard', 'msi.jpeg'],
//     ['Genius', 'Rp 50.000,00', 'Genius Mouse', 'genius.jpeg'],
//     ['Jerry', 'Rp 30.000,00', 'Jerry Mouse', 'jerry.jpeg']
// ]

// let content = '';

// items.forEach(p => {
//     content += `
//       <div id="keyBoard" class="col-md-4 mt-2">
//                 <div class="card" style="width: 18rem;">
//                     <img src="${p[3]}" class="card-img-top img-fluid" alt="keyboard">
//                     <div class="card-body">
//                         <h5 class="card-title" id="itemName">${p[0]}</h5>
//                         <p class="card-text" id="itemDesc">${p[2]}</p>
//                         <p class="card-text">${p[1]}</p>
//                         <a href="#" class="btn btn-primary" id="addCart">Add to cart</a>
//                     </div>
//                 </div>
//             </div>
//     `
// });