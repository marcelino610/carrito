let cart = [];

if (localStorage.getItem('ls-cart')) {
    cart = JSON.parse(localStorage.getItem('ls-cart'))
}

function showCart() {
    document.getElementsByTagName('table').innerHTML = `<tr class="centered-text"><p>No hay elementos en el carrito</p></tr>`
    document.getElementById('total').innerHTML = `<p>Total: $0</p>`
    if (cart.length) {
        itemsInCart()
    }
    document.getElementById('cart-container').classList.remove('invisible')
}
function hideCart() {
    document.getElementById('cart-container').classList.add('invisible');
}

function itemsInCart() {
    let list = ''
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        list +=
            `<tr style="width: 100% !important;">
                <td scope="row" class="td-60"><p>${cart[i].bookTitle}</p></th>
                <td class="td-10">
                    <p>x${cart[i].amount} </p>
                </td>
                <td class="td-10">
                <img id="${cart[i].id}"  class="pointer" src="./add.png" height="15px" width="15px" onclick="addOne(id)" alt="add">
                </td>
                <td class="td-10">
                <img id="d-${cart[i].id}" class="pointer" src="./minus.png" height="15px" width="15px" onclick="deleteOne(id)" alt="remove">
                </td>
                <td class="td-10">
                    <p>$${cart[i].bookPrice} </p>
                </td>
                <td class="td-10">
                <img id="r-${cart[i].id}" class="pointer" src="./trash.png" height="15px" width="15px" alt="delete" onclick="removingBookFromCart(id)">
                </td>

            </tr>`
        total = total + cart[i].bookPrice * cart[i].amount
    }
    document.getElementById('cart-table').innerHTML = list
    document.getElementById('total').innerHTML = `<p>Total: $${total}</p>`
}

function pay() {
    let totalAsString = document.getElementById('total').innerText//Toma el total mostrado en pantalla
    let totalAlmostNumber = totalAsString.replace('Total: $', '')//Deja string con número
    let total = parseInt(totalAlmostNumber)//Lo pasa a tipo de dato number
    if (cart.length === 0) {
        alert('No hay libros en tu carrito');
        return false;
    }
    alert(`Gracias por tu compra, ${guestName}`);//Variable tomada de script 'styles'
    if (total > 7000) {
        alert(`Por tu compra mayor a $7000 te bonificamos el 10%\n
        El total a pagar es $${total - total / 10}`)
    }
    document.getElementById('cart-container').classList.add('invisible')
    clearCart();
}

function clearCart() {//Limpia el carrito luego de efectuada la compra
    cart = []
    localStorage.removeItem('ls-cart')
    document.getElementById('cart-list').innerHTML = `
    <table id="cart-table" class="lateral-margin">
        <tr>
            <td>
                <p class="centered-text">No hay elementos en el carrito</p>
            </td>
        </tr>
    </table>`
    document.getElementById('total').innerHTML = `<p>Total: $0</p>`
}