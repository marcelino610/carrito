//Desde aquí se maneja la vista de los productos
//Variable 'cart' definida en script 'cart-view'

let booksList = new Array

class Book {
  constructor(id, title, author, price, recommendation, categories, cover) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.recommendation = recommendation;
    this.categories = categories;
    this.cover = cover;
    this.card =
      `<div class="card bg-sixth no-border" >
        <img src="${this.cover}" class="card-img-to" alt="portada">
        <div class="card-body">
          <h5 class="card-title hide-over" style="height: 2.5em">${this.title}</h5>
          <p class="card-text hide-over" style="height: 1.5em">${this.author}</p>
          <p class="card-text">$${this.price}</p>
          <a class="btn btn-success agregar" onclick="addingBookToCart(\'${this.id}\')">Agregar</a>
        </div>
      </div>`;
  }

  addToCart() {
    if (cart.find(elem => elem.bookTitle === this.title)) { //Si ya se encuentra el libro, aumenta en 1 la cantidad
      cart.find(elem => elem.bookTitle === this.title).amount++
      localStorage.setItem('ls-cart', JSON.stringify(cart))
    } else { //Si no se encuentra, agrega el libro indicado
      cart.push({
        id: this.id,
        bookTitle: this.title,
        bookPrice: this.price,
        amount: 1
      })
      localStorage.setItem('ls-cart', JSON.stringify(cart))
    }
  }

  removeFromCart() {
    const thisId = this.id
    function z() {
      let a
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === thisId) {
          a = i
        }
      }
      return a
    }
    const index = z()
    cart.splice(index, 1)
    localStorage.setItem('ls-cart', JSON.stringify(cart))
  }

  removeOne() {
    cart.find(elem => elem.bookTitle === this.title).amount--
    localStorage.setItem('ls-cart', JSON.stringify(cart))
  }
  
  showBook() {
    document.getElementById('books-view').innerHTML += this.card;
  }
}

if (localStorage.booksList) {
  booksList = JSON.parse(localStorage.booksList)
  bookslistFirstHandler()
} else {
  $.get('https://www.etnassoft.com/api/v1/get/?criteria=most_viewed&results_range=0,100', function (response, state) {
    let a = JSON.parse(response.replace(/\ID/g, 'id'))
    for (let item of a) {
      booksList.push(item)
    }
    
    bookslistFirstHandler()
    localStorage.setItem('booksList', JSON.stringify(booksList))
  })
}

function bookslistFirstHandler() {
  for (let i = 0; i < booksList.length; i++) {
    let cat = []
    let rec = Math.random() * 100
    let price = Math.floor(Math.random() * 10000)
    for (let j = 0; j < booksList[i].categories.length; j++) {
      booksList[i].categories[j].name ? cat.push(booksList[i].categories[j].name.toLowerCase()) : cat = booksList[i].categories
    }
    // si es la primera vez que se ingresa, genera precio y recomendación aleatorios; si no, toma los guardados en storage
    booksList[i].price &&booksList[i].recommendation ? booksList[i] = new Book(booksList[i].id, booksList[i].title, booksList[i].author, booksList[i].price, booksList[i].recommendation, cat, booksList[i].cover) : booksList[i] = new Book(booksList[i].id, booksList[i].title, booksList[i].author, price, rec, cat, booksList[i].cover);
    booksList[i].showBook();
  }
}

function addingBookToCart(id) {
  const bookToAdd = booksList.find(elem => elem.id === id)
  bookToAdd.addToCart()
}

function removingBookFromCart(id) {
  const bookToRemove = booksList.find(elem => elem.id === id.replace('r-', ''))
  bookToRemove.removeFromCart()
  itemsInCart()
}

function deleteOne(id) {
  const del = booksList.find(elem => elem.id === id.replace('d-', ''))
  cart.find(elem => elem.id === id.replace('d-', '')).amount === 1 ? removingBookFromCart(id.replace('d-', 'r-')) : del.removeOne()
  cart.length != 0 ? itemsInCart() : clearCart()
}

function addOne(id) {
  const ad = booksList.find(elem => elem.id === id)
  ad.addToCart()
  itemsInCart()
}

