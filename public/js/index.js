const socket = io({
  autoConnect:false
});

/* Form para agregar un nuevo producto a la base de datos */

const productForm = document.getElementById('productForm');

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  fetch('/api', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      Swal.fire({
        icon: 'success',
        text: "Product added successfully",
        toast: true,
        position: "top-right",
        timer: 2000
      });
    }
    if (res.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: "Failed to add product",
        toast: true,
        position: "top-right",
        timer: 2000
      })
    }
  })
});

/* Listener del socket para actualizar lista de productos */

/* Orden de hacer fetch de productos */
socket.on('fetchProducts', (data) => {
  fetch('http://localhost:8080/api', {
    method: 'GET'
  })
  .then(res => res.json())
  .then(products => {
    const productTemplate = document.querySelector('#productListTemplate').innerHTML;
    const compiledProductTemplate = Handlebars.compile(productTemplate);
    document.querySelector('#productListContainer').innerHTML = compiledProductTemplate(products);
  });
});

/* Informacion de que otro usuario ha agregado un nuevo producto */
socket.on('newProduct', (userId) => {
  Swal.fire({
    icon: 'info',
    text: 'New product added by user ' + userId,
    toast: true,
    position: "top-right",
    timer: 2000
  });
})

/* Listeners del socket para el chat */

let username;

Swal.fire({
  title: "Identifícate",
  input: "text",
  text: "Ingresa el usuario con el que te identificarás en el chat",
  inputValidator: (value) => {
    return !value && "¡Necesitas identificarte para poder continuar!"
  },
  allowOutsideClick: false,
  allowEscapeKey: false
})
.then(result => {
  username = result.value;
  socket.connect();
});

/* Informacion de que un nuevo usuario esta en linea */

socket.on('newUser', (userId) => {
  if (username) {
    Swal.fire({
      text: 'User ' + userId + ' is online',
      toast: true,
      position: "top-right",
      timer: 2000
    });
  }
});

const chatBox = document.getElementById('chatBox');


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}



/* Event Listeners del chatBox */
chatBox.addEventListener('keyup',evt=>{
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit('message', {
        user: username,
        message: chatBox.value,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      });
      chatBox.value = '';
    }
  }
});

/*Listeners del socket */
socket.on('log', (data) => {
  let log = document.getElementById('log');
  let messages = "";
  data.forEach(message => {
    const messageToAdd = (username === message.user)
    ? `<span style="width: 200px;" class="border border-1 rounded border-primary bg-primary m-1 p-2 align-self-end"><b>${message.user}:</b> <i>${message.message}</i><br><small style="color: brown;">${message.date}</small><br><small style="color: brown;">${message.time}</small></span>`
    : `<span style="width: 200px;" class="border border-1 rounded border-success bg-success m-1 p-2 align-self-start"><b>${message.user}:</b> <i>${message.message}</i><br><small style="color: brown;">${message.date}</small><br><small style="color: brown;">${message.time}</small></span>`;
    messages += messageToAdd;
  });
  log.innerHTML = messages;
})






