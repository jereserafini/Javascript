/* Variables y constantes */

let arrayPedidos = [];
let contadorPedido = 1;
let total = 0;
const url = "../js/json_productos.json";



/* Ejecución */

$(document).ready( () => {

  /* Traída de datos del Local Storage */
  let obtenerPedido = JSON.parse(localStorage.getItem('pedido'))

  if (obtenerPedido != null) {

    contadorPedido = JSON.parse(localStorage.getItem('contador'))

    for (const pedido of obtenerPedido) {

      arrayPedidos.push(pedido)

      $('#carro').append(
        `<div class="row mt-3 d-flex justify-content-around border-top border-bottom py-3 medidaLetra">

          <p class="col-3 align-self-center mb-0">${pedido.producto}</p>

          <p class="col-3 align-self-center mb-0">$${pedido.precio}</p>
          

        </div>`
      );
    }

    obtenerPedido.map(suma => total += suma.precio)

    $('#totalismo').html(`

    <div class="row mt-3 d-flex justify-content-around border-top border-bottom py-3 medidaLetra">
  
      <p class="col-3 align-self-center mb-0">Total + IVA:</p>
  
      <p class="col-3 align-self-center mb-0">$${parseInt(total*1.21)}</p>  
  
    </div>
  
    `);

    contadorPedido++;
  }



  /* Traída de datos del JSON */
  $.getJSON(url, function (respuesta, estado) {
    if (estado === "success") {
      for (const dato of respuesta){

        /* Pintado productos */
        $('#listaProductos').append(
          `
          <div id="tarjeta${dato.id}" class="card text-white bg-dark m-2 col-3 medidaLetra" style="width: 18rem;">
            <img src="${dato.image}" height="200" width="200" class="card-img-top" alt="producto">
            <div class="card-body">
              <h5 class="card-title">${dato.producto}</h5>
              <p class="card-text">$${dato.precio}</p>
              <button id="btn${dato.id}" class="btn btn-warning btn-lg fondoAmarillo">Agregar al carrito</button>
            </div>
          </div>
          `
        );

        /* Agregado de productos al Carrito */
        $(`#btn${dato.id}`).click(function (e) { 

          /* Animacion de agregado al carrito */
          $('.carrito').fadeIn(1000, ()=>{
        
            $('.carrito').fadeOut(1000);
        
          });

          /* Armado del pedido */
          let numeroProductoElegido = parseInt(dato.id);

          let productoElegido = respuesta.find(producto => producto.id === numeroProductoElegido)
      
          let pedido = new Pedido(contadorPedido, productoElegido.producto, productoElegido.precio);

          arrayPedidos.push(pedido);

          /* Guardado del predido al Local Storage */
          localStorage.setItem('pedido', JSON.stringify(arrayPedidos))


          /* Pintado producto seleccionado al carrito */
          let productoSeleccionado = respuesta.find(producto => producto.id === dato.id);

          $('#carro').append(`      
            <div class="row mt-3 d-flex justify-content-around border-top border-bottom py-3 medidaLetra">

              <p class="col-3 align-self-center mb-0">${productoElegido.producto}</p>

              <p class="col-3 align-self-center mb-0">$${productoElegido.precio}</p>

            </div>`
          );

          localStorage.setItem('contador', JSON.stringify(contadorPedido))
          contadorPedido++;

          total = 0;

          arrayPedidos.map(suma => total += suma.precio)
          $('#totalismo').html(`
      
            <div class="row mt-3 d-flex justify-content-around border-top border-bottom py-3 medidaLetra">
          
              <p class="col-3 align-self-center mb-0">Total + IVA:</p>
          
              <p class="col-3 align-self-center mb-0">$${parseInt(total*1.21)}</p>  
          
            </div>
        
          `);
        });
      }
    }
  });
});