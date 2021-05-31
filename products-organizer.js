let booksToShow = booksList
function organizer(val) {
    const parameters = val.split('-')
    const comparator = dataCase(parameters[0]);
    orderCase(parameters[1], comparator);
    let condition = `${comparator.join('')}`
    const reordered = booksToShow.sort((a, b) => {
        if (eval(condition)) {
            return -1
        } else {
            return 1
        }
    })
    document.getElementById('books-view').innerHTML = `<button id="cart" onclick="showCart()">Carrito</button>`
    for (let i = 0; i < reordered.length; i++) {
        reordered[i].showBook()
    }
}

function dataCase(data) {
    let array = []
    switch (data) {
        case 'p':
            array = ['a.price', 'b.price']
            break;
        case 'n':
            array = ['a.title.toLowerCase()', 'b.title.toLowerCase()']
            break;
        case 'r':
            array = ['a.recommendation', 'b.recommendation']
            break;
        default:
            false
            break;
    }
    return array
}

function orderCase(orderData, arrayWithConditions) {//recibe el orden en que deben ser mostrados los 
    //elementos y el array con los parametros a comparar
    switch (orderData) {
        case 'asc':
            arrayWithConditions.splice(1, 0, ' < ')
            break;
        case 'des':
            arrayWithConditions.splice(1, 0, ' > ')
            break;
        default:
            break;
    }
    return arrayWithConditions
}


function columnDisplayer(val) {
    const columnsNumber = `elem-row-${val}`
    document.getElementById('books-view').classList = columnsNumber
    document.getElementById('books-view').classList.add('bg-second')
}