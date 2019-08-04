// Guardamos elementos del DOM en variables que podemos utilizar

//Form
const pizzaForm = document.querySelector('#pizza-form');
//Inputs
const pizza = pizzaForm.pizza;
const pizzaSize = document.getElementById('size');
const pizzaDough = document.getElementById('dough');
const vivienda = document.getElementById('vivienda');

//cards
const pizzaCards = document.getElementsByClassName('pizza-card');

//checkout section
const checkoutInfo = document.querySelector('.checkout__info');
const orderButton = document.querySelector('#order-button');
//Section
const list = document.querySelector('#lista');

//Global order object
var activeOrder = [];

//Nos suscribimos al evento submit de pizzaFrom (nuestro formulario)
pizzaForm.addEventListener('submit', function(event){
  // Previene el default del submit para que no se actualize la página
  event.preventDefault();

  //Preguntamos por el valor de los inputs (Dentro de la función que se ejecuta a raiz del evento de submit)
  const flavorValue = pizza.value;
  const sizeValue = pizzaSize.value;
  const doughValue = pizzaDough.value;

  //Creamos un objeto pizza para guardar sus propiedades

  const newPizza = {
    flavor: flavorValue,
    size: sizeValue,
    dough: doughValue
  }
  //Añadimos la pizza que creamos a la lista de Active Order
  activeOrder.push(newPizza);

  //Mandamos a llamar otra función que haga el update del checkout
  updateCheckout();
});


// Recorremos cada uno de las pizza cards
for(let card of pizzaCards) {
  //Nos suscribimos al evento de click de cualquiera de las tarjetas
  card.addEventListener('click', function(event) {
    //Le quitamos la clase active a todos los elementos de pizzaCards
    for(let card of pizzaCards) {
      card.classList.remove('active')
    }
    //Le añadimos la clase active al elemento que se apretó
    event.target.classList.add('active');
  });
}

//Función para actualizar el resumen de orden
function updateCheckout() {
  orderButton.classList.add('active');
  checkoutInfo.innerHTML = `<h3 class="checkout__title">Resumen de tu construcción</h3>`;
  for(let pizza of activeOrder) {
    const pizzaInfo = `
      <article class="checkout__article">
        <h4 class="article__title">Tipo de vivienda: ${pizza.flavor}</h4>
        <p><span class="article__span">Baños:</span> ${pizza.size}</p>
        <p><span class="article__span">Preferencia:</span> ${pizza.dough}</p>
      </article>
    `
    checkoutInfo.innerHTML += pizzaInfo;
  }
}

//Nos suscribimos la evento de click del boton de orden para generar la tarjeta de ordenen
orderButton.addEventListener('click', createOrder);

//Estamos inyectando código HTML a el elemento list (Solo funcionia usando backtips ``)
function createOrder() {
  let order = ``;
  let images = ``;
  for(let pizza of activeOrder) {

    // Validación para cambiar la foto dependiendo del sabor
    let pizzaImg;
    if(pizza.flavor == 'pastor') {
      pizzaImg = 'pastor.jpeg';
    } else if(pizza.flavor == 'mexicana'){
      pizzaImg = 'mexicana.jpeg';
    } else {
      pizzaImg = 'pizza.png';
    }

    order += `
      <div>
        <h3>Pizza de ${pizza.flavor}</h3>
        <p>De tamaño ${pizza.size}</p>
        <p>Masa: ${pizza.dough}</p>
      </div>
    `

    images += `
      <img src="assets/img/${pizzaImg}">
    `
  }

  list.innerHTML += `
    <article class="pizza-orden">
      <h2>Pidieron: </h2>
      ${order}
      <div class="pizza-orden__img">
        ${images}
      </div>
    </article>
  `

  // Limpia todos los elementos donde añadimos elementos
  activeOrder = [];
  checkoutInfo.innerHTML = '';
  orderButton.classList.remove('active');
}





//
