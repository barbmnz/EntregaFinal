console.table(productosLista);
let carrito = [];

const contenedorProds = document.getElementById('misprods');
const tablaBody = document.getElementById('tablabody');
const totalElement = document.getElementById('total');
const botonVaciar = document.getElementById('vaciarBtn');

function renderizarProductos(listaProds) { 
    for (const prod of listaProds) {
        contenedorProds.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top md-3" src=${prod.foto} alt=${prod.nombre}>
            <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">Precio: $ ${prod.precio}</p>
                <input type="number" class="form-control cantidad" value="1" min="1">
                <button class="btn btn-primary compra" id=${prod.id}>Comprar</button>
            </div>
        </div>
        `;
    }

    //eventos
    const botonesCompra = document.getElementsByClassName('compra');
    for (const boton of botonesCompra) {
        //opcion 1 - addEventListener()
        boton.addEventListener('click', () => {
            console.log('Hiciste click en el boton cuyo id es: ' + boton.id);
            //buscar el objeto que tiene ese id
            const prodACarrito = listaProds.find(prod => prod.id == boton.id);
            console.log(prodACarrito);
            // obtener la cantidad seleccionada
            const cantidadSeleccionada = parseInt(boton.parentNode.querySelector('.cantidad').value);
            // crear una copia del producto con la cantidad seleccionada
            const productoConCantidad = { ...prodACarrito, cantidad: cantidadSeleccionada };
            //cargar el producto al carrito de compras
            agregarACarrito(productoConCantidad);
        });
    }
}

renderizarProductos(productosLista);

function agregarACarrito(producto) {
    // verificar si el producto ya está en el carrito
    const productoExistenteIndex = carrito.findIndex(item => item.id === producto.id);
    if (productoExistenteIndex !== -1) {
        // si el producto ya está en el carrito, actualizar la cantidad
        carrito[productoExistenteIndex].cantidad += producto.cantidad;
    } else {
        // si el producto no está en el carrito, agregarlo
        carrito.push(producto);
        Swal.fire({
            title: "Genial",
            text: `Agregaste: ${producto.nombre} al carrito`,
            imageUrl: producto.foto,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
    }

    console.table(carrito);
    renderizarCarrito();
}

function renderizarCarrito() {
    tablaBody.innerHTML = '';

    carrito.forEach((item, index) => {
        tablaBody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
            <td>${item.cantidad}</td>
            <td><button class="btn btn-danger eliminar" data-index="${index}">Eliminar</button></td>
        </tr>
        `;
    });

    const totalCarrito = calcularTotal(carrito);
    totalElement.innerText = `Total a pagar $: ${totalCarrito}`;

    // Agregar eventos a los botones de eliminar
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            const index = boton.getAttribute('data-index');
            eliminarDelCarrito(index);
        });
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderizarCarrito();
}

// calcular el total de los productos en el carrito
function calcularTotal(prodACarrito) {
    let total = 0;
    for (const producto of prodACarrito) {
        total += producto.precio * producto.cantidad;
    }
    return total;
}

const checkoutBtn = document.getElementById('checkoutBtn');

checkoutBtn.addEventListener('click', () => {
    realizarCheckout();
});

function realizarCheckout() {
    if (carrito.length === 0) {
        Swal.fire({
            title: "No hay articulos en el carrito",
            text: "Deber agregar productos para hacer Checkout!",
            icon: "error"
          });
        return;
    }

    console.log('Checkout realizado');
    limpiarCarrito();
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "¡Gracias por tu compra! Tu pedido ha sido procesado."
      });
}

function limpiarCarrito() {
    carrito = [];
    tablaBody.innerHTML = '';
    document.getElementById("total").innerText = 'Total a pagar: $ ';
}

botonVaciar.onclick = () => {
    limpiarCarrito();
    Swal.fire("Se han eliminado los productos del carrito");
}

const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');

//opcion 2
campoNombre.onkeyup = () => {
    if (campoNombre.value.length < 3) {
        console.log('Nombre de menos de 3 letras 🚨');
        campoNombre.style.color = 'red';
    } else {
        campoNombre.style.color = 'black';
    }
}
//opcion 2
campoNombre.onchange = () => {
    alert('Cambio el nombre en el formulario');
    if (campoNombre.value == 'pepe') {
        campoNombre.value = '';
    }
}

campoEmail.addEventListener('input', () => {
    if ((!campoEmail.value.includes('@')) || (!campoEmail.value.includes('.'))) {
        document.getElementById('mensaje').innerText = 'Ingrese un email valido !'
    } else {
        document.getElementById('mensaje').innerText = ''
    }
})

//opcion 3 que viene del html linea 66
function borrarCampos() {
    campoNombre.value = '';
    campoEmail.value = '';
}

//evento submit del formulario
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', validar);

function validar(ev) {
    if ((campoNombre.value == '') || (campoEmail.value == '')) {
        ev.preventDefault();
        alert('Ingrese nombre o email faltante!');
    }
}

const contenedor = document.getElementById('principal');
const boton = document.getElementById('mode');

// Evento para cambiar el modo
boton.onclick = () => {
    if (localStorage.getItem('mode') === 'dark') {
        pasarALight();
    } else {
        pasarADark();
    }
}

// funciones para cambiar el modo
function pasarADark() {
    localStorage.setItem('mode', 'dark');
    boton.innerText = 'Light Mode';
    contenedor.classList.replace('light', 'dark');
    document.body.className = 'dark';
}

function pasarALight() {
    localStorage.setItem('mode', 'light');
    boton.innerText = 'Dark Mode';
    contenedor.classList.replace('dark', 'light');
    document.body.className = 'light';
}

// verificar el modo almacenado en localStorage al cargar la página
if (localStorage.getItem('mode') === 'dark') {
    pasarADark();
} else {
    pasarALight();
}


