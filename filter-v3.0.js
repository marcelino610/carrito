function isChecked(check) {
    let listOfChecked = []
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked) {
            const id = check[i].id.split('-')[1]
            listOfChecked.push(id)
        }
    }
    return listOfChecked
}
function itemsChecked() {
    const priceItems = document.getElementsByName('precio')
    const pri = isChecked(priceItems)
    const categoryItems = document.getElementsByName('categoria')
    const cat = isChecked(categoryItems)
    const recommendationItems = document.getElementsByName('recomendacion')
    const rec = isChecked(recommendationItems)
    return [pri, cat, rec]
}

function filter() {
    const parameters = [
        itemsChecked(),
        [
            'bk.price <= eval(el)',
            'bk.categories.includes(el[0])',
            'bk.recommendation > eval(el)'
        ],
        [
            booksList,
            booksList,
            booksList
        ]
    ]
    parameters[0].forEach(el => {
        if (el != 'all') {
            parameters[2][parameters[0].indexOf(el)] = booksList.filter(bk => eval(parameters[1][parameters[0].indexOf(el)]))
        }
    }
    )
    booksToShow = deleteRepeated(parameters[2][0], parameters[2][1], parameters[2][2])
    displayFiltered()
}

function deleteRepeated(arr1, arr2, arr3) {
    return arr1.filter(bk1 => arr2.filter(bk2 => arr3.includes(bk2)).includes(bk1))
}

function displayFiltered() {
    document.getElementById('books-view').innerHTML = `<button id="cart" class="btn btn-success" onclick="showCart()">Carrito</button>`
    booksToShow.forEach(bk => bk.showBook())
}