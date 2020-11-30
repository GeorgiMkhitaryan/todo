let state = {
    products: [
        {
            imageUrl: "./product1.png",
            name: "Product1",
            price: 100,

        },
        {
            imageUrl: "./product2.png",
            name: "Product2",
            price: 300,

        }
    ],
    basket:[]
};
let writeContainer = document.querySelector(".productsContainer");
let productsButt = document.querySelector(".products");
let basketButt = document.querySelector(".basket");

productsButt.firstElementChild.click()


function createProduct (product){
    return `
        <img class='productPhoto' src=${product.imageUrl} alt="Product Photo">
        <p class='productName'>${product.name}</p>
        <p class='productPrice'>${product.price}</p>
    `
}

function createBasket (Basket){
    return `
        <img class='basketPhoto' src=${Basket.imageUrl} alt="Product Photo">
        <p class='basketName'>${Basket.name}</p>
        <p class='basketCount'>${Basket.count}</p>
        <p class='basketPrice'>${Basket.price}</p>
    `
}

function addToBasket(product){
    let condidate = state.basket.find(item => item.name === product.name)
    if(condidate){
        condidate.count++
    }else{
        product["count"] = 1
        state.basket.push(product)
    }
}

function createProductsList (){
    writeContainer.innerHTML = "";
    state.products.map(item=> {
        let container = document.createElement("div");
        container.classList.add("productContainer");
        container.innerHTML = createProduct(item);
        let addBasket = document.createElement("button");
        addBasket.innerText = "add to basket";
        addBasket.classList.add("addBasketButt");
        addBasket.onclick = () => {
            addToBasket(item);
        }
        container.appendChild(addBasket);
        writeContainer.appendChild(container);
    })
}

function createBasketList (){
    writeContainer.innerHTML = "";
    state.basket.map(item=> {
        let container = document.createElement("div");
        container.classList.add("basketContainer");
        container.innerHTML = createBasket(item);
        writeContainer.appendChild(container);
    })
}


function activePage(activePage, disablePage){
    let ActiveButton = document.querySelector(`.${activePage}`);
    let lastActiveButton = document.querySelector(`.${disablePage}`);
    ActiveButton.classList.add("active");
    lastActiveButton.classList.remove("active");
}

function showProducts() {
    activePage("products", "basket");
    createProductsList();
    test()
}

function writePrice() {
    let price = document.querySelector(".totalPrice p");
    price.parentElement.classList.remove("hidden");
    let priceSum = 0;
    state.basket.forEach(item => {
        priceSum+= item.price* item.count;
    })
    price.innerText = `Total Price  ${priceSum}`;
}

function test() {
    let price = document.querySelector(".totalPrice");
    let count = document.querySelector(".totalCount");
    if(basketButt.classList.contains("active")){
        price.firstElementChild.classList.remove("hidden")
        count.firstElementChild.classList.remove("hidden")
        writeContainer.classList.add("basket");
    }
    else{
        price.firstElementChild.classList.add("hidden")
        count.firstElementChild.classList.add("hidden")
        writeContainer.classList.remove("basket");
    }
}

function writeCount() {
    let count = document.querySelector(".totalCount p");
    let countSum = 0;
    state.basket.forEach(item => {
        countSum+= item.count;
    })
    count.innerText = `Total Count  ${countSum}`;
}


function showBasket() {
    activePage("basket", "products");
    createBasketList();
    writePrice();
    writeCount();
    test()
}