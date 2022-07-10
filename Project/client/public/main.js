const host = 'http://localhost:3000/';
const accessToken = "thai";

window.onload = function (){
    loadAllProducts();
    loadCart();
};

function loadAllProducts(){
    //fetch an array of products
    const url = host+'products';
    const promise = fetch(url);
    promise
        .then(response => response.json())
        .then(products => {

            let table = document.getElementById('productsTbl');
            products.forEach(prod => {
                /*
                <tr style="user-select: auto;">
                    <td id="P0001-ProductName">Macbook Air M2</td>
                    <td id="P0001-ProductPrice">1500</td>
                    <td>
                        <img id="P0001-ProductImage" src="http://localhost:3000/images/macbookairm2.png" alt="img" class="thumbnail">
                    </td>
                    <td id="P0001-ProductStock">10</td>
                    <td>
                        <button type="button" class="cartBtn btn btn-primary" data-product-id="P0001" style="user-select: auto;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16" style="user-select: auto;">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" style="user-select: auto;"></path>
                            </svg>
                        </button>
                    </td>
                </tr>

                 */
                let row = table.insertRow(-1);

                let cell0 = row.insertCell(0);
                cell0.id = prod.id+"-ProductName";
                cell0.innerHTML = prod.name;

                let cell1 = row.insertCell(1);
                cell1.id = prod.id+"-ProductPrice";
                cell1.innerHTML = prod.price;

                let cell2 = row.insertCell(2);
                cell2.id = prod.id+"-ProductImage";
                let src = "http://localhost:3000" + prod.image;
                cell2.innerHTML = ` 
                    <img src="${src}" alt="img" class="thumbnail"/>
                `;

                let cell3 = row.insertCell(3);
                cell3.id = prod.id+"-ProductStock";
                cell3.innerHTML = prod.stock;

                let cell4 = row.insertCell(4);
                cell4.innerHTML = ` 
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
            });

            //add onclick action on cart buttons
            const cartBtns = Array.prototype.slice.call(document.getElementsByClassName('cartBtn'));
            cartBtns.forEach(function(cartBtn) {
                cartBtn.addEventListener('click', eventClickCart );
            });
        });
}

function eventClickCart(e){
    /*
    1. update shopping cart table at client side
    */

    const stock = document.getElementById(this.dataset.productId + "-ProductStock").innerHTML;
    if(stock <= 0){
        alert("out of stock");
    }else {
        //Update cart at client side
        const item = {};
        item.id = this.dataset.productId;
        item.name = document.getElementById(item.id + "-ProductName").innerHTML;
        item.price = document.getElementById(item.id + "-ProductPrice").innerHTML;

        //Update Cart
        let quantityElem = document.getElementById(item.id + "-CartQuantity");
        if (!quantityElem) {
            item.quantity = 1;
            item.totalPrice = item.price * item.quantity;
            addItemToCart(item);
            server_updateCart(item.id, item.quantity);
        } else {
            item.quantity = quantityElem.value;
            item.quantity++;
            if(item.quantity < 0 || item.quantity > stock) {
                alert('reached max stock');
            }else {
                item.totalPrice = item.price * item.quantity;
                updateItemInCart(item);
                server_updateCart(item.id, item.quantity);
            }
        }
    }
}

function updateItemInCart(item){

    document.getElementById(item.id+"-CartName").innerHTML = item.name;
    document.getElementById(item.id+"-CartPrice").innerHTML = item.price;
    document.getElementById(item.id+"-CartTotalPrice").innerHTML = item.totalPrice;
    document.getElementById(item.id+"-CartQuantity").value = item.quantity;
}

function addItemToCart(item){
    // <tr>
    //     <td id="P0001-CartName">Ipad</td>
    //     <td id="P0001-CartPrice">450</td>
    //     <td id="P0001-CartTotalPrice">450</td>
    //     <td id="P0001-CartQuantity">1</td>
    // </tr>

    const table = document.getElementById('cartTbl');

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
    //let id = item.id+"-CartQuantity";
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

function eventChangeQuantity(e){
    let productId = e.target.id.split('-')[0];
    if(productId){
        let stock = 0;
        if(document.getElementById(productId + "-ProductStock")){
            stock = document.getElementById(productId + "-ProductStock").innerHTML;
        }

        let quantity = 0;
        if(document.getElementById(productId + "-CartQuantity")){
            quantity = document.getElementById(productId + "-CartQuantity").value;
        }

        if (quantity < 0 || quantity > stock){
            alert('invalid quantity');
        }else{
            server_updateCart(productId, quantity);
        }
    }
}

function eventAddQuantity(e){
    let productId = e.target.id.split('-')[0];
    if(productId){
        let stock = 0;
        if(document.getElementById(productId + "-ProductStock")){
            stock = document.getElementById(productId + "-ProductStock").innerHTML;
        }

        let quantity = 0;
        if(document.getElementById(productId + "-CartQuantity")){
            quantity = document.getElementById(productId + "-CartQuantity").value;
            quantity++;
        }

        if (quantity < 0 || quantity > stock){
            alert('invalid quantity');
        }else{
            document.getElementById(productId + "-CartQuantity").value = quantity;
            server_updateCart(productId, quantity);
        }
    }
}

function eventSubQuantity(e){
    let productId = e.target.id.split('-')[0];
    if(productId){
        let stock = 0;
        if(document.getElementById(productId + "-ProductStock")){
            stock = document.getElementById(productId + "-ProductStock").innerHTML;
        }

        let quantity = 0;
        if(document.getElementById(productId + "-CartQuantity")){
            quantity = document.getElementById(productId + "-CartQuantity").value;
            quantity--;
        }

        if (quantity < 0 || quantity > stock){
            alert('invalid quantity');
        }else{
            document.getElementById(productId + "-CartQuantity").value = quantity;
            server_updateCart(productId, quantity);
        }
    }
}

function server_updateCart(productId, quantity) {
    const url = host + 'carts';
    let data = {
        "accessToken": accessToken,
        "item":{
            "productId": productId,
            "productQuantity": quantity
        }
    }

    const promise = fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
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
        });
}

function loadCart(){
    //fetch cart of user
    const url = host + 'carts/' + accessToken;
    const promise = fetch(url);
    promise
        .then(response => response.json())
        .then(cart => {
            if(cart && cart.items && cart.items.length) {
                cart.items.forEach(item => {
                    addItemToCart(item);
                });
            }
            displayCartFooter();
        });
}

function displayCartFooter(){
    //If cart is empty: display cart is empty
    //Else:
    //  - display sum of price
    //  - display place order button
    const table = document.getElementById('cartTbl');
    if(table){
        console.log(table.rows.length);
        if(table.rows.length <= 1){
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            cell.colSpan = table.rows[0].cells.length;
            cell.innerHTML = "You cart is empty";
        }else{
            let total = 1000;

            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            cell.colSpan = table.rows[0].cells.length;
            cell.innerHTML = "Total: " + total;

            row = table.insertRow(-1);
            cell = row.insertCell(0);
            cell.colSpan = table.rows[0].cells.length;
            cell.innerHTML = `
                <button id="placeOrderBtn">Place Order</button>
            `;
        }
    }

}

