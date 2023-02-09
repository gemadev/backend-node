const calcularPrecioporProducto = async () => {

    const user = await (await fetch('/user/data')).json()
    const userCartId = user.cart[0]
   
    const myCart = await( await fetch(`/api/carrito/${userCartId}/productos`)).json()

    let finalTotal = 0;

    for (let index = 0; index < document.getElementsByClassName('this-precio').length; index++) {

        const precio = `Precio unitario: <span class="fw-bold">${myCart[index].precio}</span>`
        const cantidad = `Cantidad: <span class="fw-bold">${myCart[index].cantidad}</span>`
        const total = `Total: <span class="fw-bold">$ ${myCart[index].precio * myCart[index].cantidad}</span>`

        const thisPrecio = document.getElementsByClassName('this-precio').item(index).innerHTML = precio;
        const thisCantidad = document.getElementsByClassName('this-cantidad').item(index).innerHTML = cantidad;
        const thisTotal = document.getElementsByClassName('this-total').item(index).innerHTML = total;
    
        let precioFinal = myCart[index].precio * myCart[index].cantidad
        finalTotal += precioFinal
    }

    if(finalTotal !==0) document.getElementById('total-final').innerHTML = `Total final: $ <span class="text-success">${finalTotal}</span>`;
};

calcularPrecioporProducto()