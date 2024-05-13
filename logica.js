console.table(productosLista);
let carrito = [];

const contenedorProds = document.getElementById('misprods');
const tablaBody = document.getElementById('tablabody');

function renderizarProductos(listaProds){
    for(const prod of listaProds){
        contenedorProds.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=${prod.foto} alt=${prod.nombre}>
        <div class="card-body">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text">Precio: $ ${prod.precio}</p>
          <button class="btn btn-primary compra" id=${prod.id}>Comprar</button>
        </div>
      </div>
        `
    }

    //eventos
    const botonesCompra = document.getElementsByClassName('compra');
    for(const boton of botonesCompra){
        //opcion 1 - addEventListener()
        boton.addEventListener('click', ()=>{
            console.log('Hiciste click en el boton cuyo id es: '+boton.id);
            //buscar el objeto que tiene ese id
            const prodACarrito = listaProds.find(prod => prod.id == boton.id);
            console.log(prodACarrito);
            //cargar el producto al carrito de compras
            agregarACarrito(prodACarrito);
        })
    }
}

renderizarProductos(productosLista);


function agregarACarrito(producto){
    carrito.push(producto);
    console.table(carrito);
    tablaBody.innerHTML+=`
    <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
    </tr>
    `
    const totalCarrito = calcularTotal(carrito);

    const totalElement = document.getElementById('total');
    totalElement.innerText = `Total a pagar $: ${totalCarrito}`;
}


// calcular el total de los productos en el carrito
function calcularTotal(prodACarrito) {
    let total = 0;
    for (const producto of prodACarrito) {
      total += producto.precio;
    }
    return total;
}

const campoNombre = document.getElementById('nombre');
const campoEmail = document.getElementById('email');

//opcion 2
campoNombre.onkeyup = () => {
   if(campoNombre.value.length < 3){
    console.log('Nombre de menos de 3 letras 🚨');
    campoNombre.style.color='red';
   }else{
    campoNombre.style.color='black';
   }
}
//opcion 2
campoNombre.onchange=()=>{
    alert('Cambio el nombre en el formulario');
    if(campoNombre.value == 'pepe'){
        campoNombre.value = '';
    }
}

campoEmail.addEventListener('input', ()=>{
    if((!campoEmail.value.includes('@'))||(!campoEmail.value.includes('.'))){
        document.getElementById('mensaje').innerText='Ingrese un email valido !'
    }else{
        document.getElementById('mensaje').innerText=''
    }
})


//opcion 3 que viene del html linea 66
function borrarCampos(){
    campoNombre.value = '';
    campoEmail.value = '';
}


//evento submit del formulario
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', validar);

function validar(ev){
    if((campoNombre.value == '') || (campoEmail.value == '')){
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

// Funciones para cambiar el modo
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

// Verificar el modo almacenado en localStorage al cargar la página
if (localStorage.getItem('mode') === 'dark') {
    pasarADark();
} else {
    pasarALight();
}
