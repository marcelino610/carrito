function searchBooks() {
    const toSearch = document.getElementById('search-input').value
    document.getElementById('books-view').innerHTML = `<button id="cart" class="btn btn-success" onclick="showCart()">Carrito</button>`
    booksToShow.forEach(bk => {
        let i = 0
        bk.title.toLowerCase().includes(toSearch.toLowerCase()) ? bk.showBook() : bk.author.toLowerCase().includes(toSearch.toLowerCase()) ? bk.showBook() : i++
    })
}