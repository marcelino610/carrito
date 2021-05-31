//Algunas cuestiones del diseño del sitio

var height = window.innerHeight * 0.97 + 'px';
let fullSize = false;

document.getElementById('grid-container').style.height = height;

window.addEventListener('keyup', (e) => {
    let ev = e.keyCode
    if (ev === 122 && !fullSize) {
        height = window.outerHeight + 'px';
        document.getElementById('grid-container').style.height = height;
        fullSize = true
    } else if (ev === 122 && fullSize) {
        height = window.innerHeight * 0.97 + 'px';
        document.getElementById('grid-container').style.height = height;
        fullSize = false
    }
}, false)

let guestName = ''

//document.getElementById('welcome').innerHTML = `<h3 style="color: white;">Bienvenido/a ${guestName} </h3>`

//Algo de jQuery en el proyecto

$('#accept-name').on('click', () => {
    guestName = $('#name').val()
    $('#w-message').text(`Bienvenido/a ${guestName}`)
    $('#n-i-screen').addClass('invisible')
})

$('#name-form').submit(e => {
    e.preventDefault()
})