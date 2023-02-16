const renderItemsInCartIcon = async () => {
    const user = await (await fetch('/user/data')).json()
    const userCartId = user.cart[0]
    const myCart = await( await fetch(`/api/carrito/${userCartId}/productos`)).json()

    const itemsCart = document.getElementById('items-cart').innerHTML = myCart.length;
};

renderItemsInCartIcon()