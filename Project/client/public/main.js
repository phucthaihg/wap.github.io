const host = 'http://localhost:3000/';

window.onload = function (){

    switchMode();

};

function switchMode(){
    if(!sessionStorage.getItem("accessToken")){
        guestMode();
    }else{
        userMode();
        server_loadAllProducts();
        server_loadCart();
    }
}

function guestMode(){
    document.getElementById("guestDiv").style.display = "block";
    document.getElementById("userDiv").style.display = "none";
    document.getElementById("loginBtn").addEventListener("click", eventClickLogin);
}

function userMode(){
    document.getElementById("guestDiv").style.display = "none";
    document.getElementById("userDiv").style.display = "block";
    document.getElementById("logoutBtn").addEventListener("click", eventClickLogout);
}

function eventClickLogin(e){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let param = {
        "username": username,
        "password": password
    };

    const url = host + 'users/login';
    const promise = fetch(url, {
        method: 'POST',
        body: JSON.stringify(param),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    promise
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert(result.error);
                guestMode();
            }else {
                sessionStorage.setItem("accessToken", result.accessToken);
                switchMode();
            }
        });
}

function eventClickLogout(e){
    sessionStorage.removeItem("accessToken");
    switchMode();
}

/*
   fetch an array of products
 */
function server_loadAllProducts(){
    let accessToken = sessionStorage.getItem("accessToken");
    console.log("server_loadAllProducts: " + accessToken);
    if(!accessToken){
        guestMode();
    }else {
        const url = host + 'products';
        const promise = fetch(url);
        promise
            .then(response => response.json())
            .then(result => {

                if (result.error) {
                    alert(result.error);
                    let table = document.getElementById('productsTbl');
                    genProductHeader(table);
                } else {
                    genProductTable(result);
                }
            });
    }
}

/*
    fetch user's cart
 */
function server_loadCart(){
    let accessToken = sessionStorage.getItem("accessToken");
    if(!accessToken){
        guestMode();
    }else {
        const url = host + 'carts/' + accessToken;
        const promise = fetch(url);
        promise
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    alert(result.error);
                } else {
                    genCartTable(result);
                }
            });
    }
}

function genProductTable(products){
    let table = document.getElementById('productsTbl');
    table.innerHTML = "";

    genProductHeader(table);

    if(products && products.length){
        for(let i = 0; i < products.length; i++){
            genProductRow(table, products[i]);
        }
    }

    //add onclick action on cart buttons
    const cartBtns = Array.prototype.slice.call(document.getElementsByClassName('cartBtn'));
    cartBtns.forEach(function(cartBtn) {
        cartBtn.addEventListener('click', eventClickCart );
    });
}

function genProductHeader(table) {

    let header = table.createTHead();

    let row = header.insertRow(-1);
    let cell = row.insertCell(0);
    cell.innerHTML = "Name";

    cell = row.insertCell(1);
    cell.innerHTML = "Price";

    cell = row.insertCell(2);
    cell.innerHTML = "Image";

    cell = row.insertCell(3);
    cell.innerHTML = "Stock";

    cell = row.insertCell(4);
    cell.innerHTML = "Action";
}

function genProductRow(table, prod){
    let row = table.insertRow(-1);

    let cell = row.insertCell(0);
    cell.id = prod.id+"-ProductName";
    cell.innerHTML = prod.name;

    cell = row.insertCell(1);
    cell.id = prod.id+"-ProductPrice";
    cell.innerHTML = prod.price;

    cell = row.insertCell(2);
    cell.id = prod.id+"-ProductImage";
    let src = "http://localhost:3000" + prod.image;
    cell.innerHTML = ` 
        <img src="${src}" alt="img" class="thumbnail"/>
    `;

    cell = row.insertCell(3);
    cell.id = prod.id+"-ProductStock";
    cell.innerHTML = prod.stock;

    cell = row.insertCell(4);
    cell.innerHTML = ` 
        <button type="button" class="cartBtn btn" data-product-id="${prod.id}"
                              style="user-select: auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-cart" viewBox="0 0 16 16" style="user-select: auto;">
                <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    style="user-select: auto;"></path>
            </svg>
        </button>
    `;
}

function genCartTable(cart){
    let table = document.getElementById('cartTbl');

    genCartHeader(table);

    if(cart && cart.items && cart.items.length){
        for(let i = 0; i < cart.items.length; i++){
            genCartRow(table, cart.items[i]);
        }
    }

    genCartFooter(table, cart);
}

function genCartHeader(table) {

    table.innerHTML = "";

    let header = table.createTHead();

    let row = header.insertRow(-1);
    let cell = row.insertCell(0);
    cell.innerHTML = "Name";

    cell = row.insertCell(1);
    cell.innerHTML = "Price";

    cell = row.insertCell(2);
    cell.innerHTML = "Total Price";

    cell = row.insertCell(3);
    cell.innerHTML = "Quantity";
}

function genCartRow(table, item){
    // <tr>
    //     <td id="P0001-CartName">Ipad</td>
    //     <td id="P0001-CartPrice">450</td>
    //     <td id="P0001-CartTotalPrice">450</td>
    //     <td id="P0001-CartQuantity">1</td>
    // </tr>

    let row = table.insertRow(-1);
    let cell0 = row.insertCell(0);
    cell0.id = item.id+"-CartName";
    cell0.innerHTML = item.name;

    let cell1 = row.insertCell(1);
    cell1.id = item.id+"-CartPrice";
    cell1.innerHTML = item.price;

    let cell2 = row.insertCell(2);
    cell2.id = item.id+"-CartTotalPrice";
    cell2.innerHTML = item.totalPrice;

    let cell3 = row.insertCell(3);
    cell3.innerHTML = `
        <span>
            <button id="${item.id}-CartQuantitySub" class="btn">-</button>
            <input id="${item.id}-CartQuantity" class="quantity" type="number" value="${item.quantity}"/>
            <button id="${item.id}-CartQuantityAdd" class="btn">+</button>
        </span>
        
    `;
    //quantity change listener (for input)
    const quantityInput = document.getElementById(item.id+"-CartQuantity");
    quantityInput.addEventListener('change', eventChangeQuantity );

    //click button add quantity listener
    const quantityAddBtn = document.getElementById(item.id+"-CartQuantityAdd");
    quantityAddBtn.addEventListener('click', eventAddQuantity );

    //click button sub quantity listener
    const quantitySubBtn = document.getElementById(item.id+"-CartQuantitySub");
    quantitySubBtn.addEventListener('click', eventSubQuantity );
}

function genCartFooter(table, cart){
    if(!cart || !cart.items || cart.items.length === 0){
        let row = table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.colSpan = table.rows[0].cells.length;
        cell.innerHTML = "You cart is empty";
    }else{
        let sum = 0;
        for(let i = 0; i < cart.items.length; i++){
            sum = sum + parseFloat(cart.items[i].totalPrice);
        }

        let row = table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.colSpan = table.rows[0].cells.length;
        cell.className = "summary";
        cell.innerHTML = "Total: " + sum;

        row = table.insertRow(-1);
        cell = row.insertCell(0);
        cell.colSpan = table.rows[0].cells.length;
        cell.className = "summary";
        cell.innerHTML = `
            <button id="placeOrderBtn" class="btn btn-primary">Place Order</button>
        `;
        //add onclick action on Place Order buttons
        const orderBtn = document.getElementById("placeOrderBtn");
        if(orderBtn) {
            orderBtn.addEventListener('click', eventClickOrder );
        }
    }
}

function eventClickCart(e){

    let productId = this.dataset.productId;
    let obj = validateQuantityAgainstStock(productId, "add");
    updateQuantity(obj);
}

function validateQuantityAgainstStock(productId, action){

    let result = {};
    let quantity = 0;
    const stock = document.getElementById(productId + "-ProductStock").innerHTML;
    if(stock <= 0){
        result.error = "stock <= 0";
    }else {
        let quantityElem = document.getElementById(productId + "-CartQuantity");

        if (!quantityElem) {
            quantity = 1;
        } else {
            if(action === 'add') {
                quantity = parseInt(quantityElem.value) + 1;
            }else if(action === 'change'){
                quantity = parseInt(quantityElem.value);
            }else if(action === 'sub'){
                quantity = parseInt(quantityElem.value) - 1;
            }
        }

        if(quantity > stock) {
            result.error = "quantity > stock";
        }

        if(quantity < 0) {
            result.error = "quantity < 0";
        }
    }

    result.productId = productId;
    result.productQuantity = quantity;
    return result;
}

function eventChangeQuantity(e){
    if(!sessionStorage.getItem("accessToken")){
        guestMode();
    }else {
        let productId = e.target.id.split('-')[0];

        let obj = validateQuantityAgainstStock(productId, "change");
        updateQuantity(obj);
    }
}

function eventAddQuantity(e){
    if(!sessionStorage.getItem("accessToken")){
        guestMode();
    }else {
        let productId = e.target.id.split('-')[0];

        let obj = validateQuantityAgainstStock(productId, "add");
        updateQuantity(obj);
    }
}

function eventSubQuantity(e){
    if(!sessionStorage.getItem("accessToken")){
        guestMode();
    }else {
        let productId = e.target.id.split('-')[0];

        let obj = validateQuantityAgainstStock(productId, "sub");
        updateQuantity(obj);
    }
}

function updateQuantity(obj) {
    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
        guestMode();
    } else if (obj.error) {
        alert(obj.error);
    } else {
        const param = {};
        param.accessToken = accessToken;
        param.item = {};
        param.item.productId = obj.productId;
        param.item.productQuantity = obj.productQuantity;
        server_updateCart(param);
    }
}

function server_updateCart(param) {
    if(!sessionStorage.getItem("accessToken")){
        guestMode();
    }else {
        const url = host + 'carts';
        const promise = fetch(url, {
            method: 'PUT',
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        promise
            .then(response => response.json())
            .then(cart => {
                if (cart.error) {
                    alert(cart.error);
                }
                genCartTable(cart);
            });
    }
}

function eventClickOrder(e){
    let accessToken = sessionStorage.getItem("accessToken");
    if(!accessToken){
        guestMode();
    }else {
        const param = {};
        param.accessToken = accessToken;

        server_orderCart(param);
    }
}

function server_orderCart(param) {
    if(!sessionStorage.getItem("accessToken")){
        guestMode();
    }else {
        const url = host + 'carts';
        const promise = fetch(url, {
            method: 'POST',
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        promise
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    alert(result.error);
                }

                genProductTable(result.product);
                genCartTable(result.cart);
            });
    }
}




