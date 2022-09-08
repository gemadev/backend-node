// JS para consigna 2:
const getProductLink = document.getElementById('getProduct')

const productIdInput = document.getElementById('productIdInput')

productIdInput.addEventListener('change', (e) => {
  const id = e.target.value;
  if (isNaN(id)) return alert('El parámetro debe ser un número');
  const parsedId = parseInt(id);
  getProductLink.setAttribute('href', `http://localhost:8080/api/products/${parsedId}`);
})

// JS para consigna 3:
let newProductForm = document.getElementById('newProductForm');

const handleSubmitUploadNewProduct = (e, form, route) => {
  e.preventDefault();
  let formData = new FormData(form);
  fetch(route, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      document.getElementById('uploadResponse').innerHTML = '';
      document.getElementById('uploadResponse').innerHTML = `<p>${res.status}</p><br><p>${res.message}</p><br><p>${JSON.stringify(res.product)}</p>`;
    }
    if (res.status === 'error') {
      document.getElementById('uploadResponse').innerHTML = '';
      document.getElementById('uploadResponse').innerHTML = `<p>${res.error}</p>`;
    }
  })
}

newProductForm.addEventListener('submit', (e) => {
  handleSubmitUploadNewProduct(e, e.target, '/api/products');
})

// JS para consigna 4:
let productUpdateForm = document.getElementById('productUpdateForm');

const handleSubmitUpdateProduct = (e, form, route) => {
  e.preventDefault();
  let formData = new FormData(form);
  fetch(route, {
    method: 'PUT',
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      document.getElementById('updateResponse').innerHTML = '';
      document.getElementById('updateResponse').innerHTML = `<p>${res.status}</p><br><p>${res.message}</p><br><p>${JSON.stringify(res.product)}</p>`;
    }
    if (res.status === 'error') {
      document.getElementById('updateResponse').innerHTML = '';
      document.getElementById('updateResponse').innerHTML = `<p>${res.error}</p>`;
    }
  })
}

productUpdateForm.addEventListener('submit', (e) => {
  handleSubmitUpdateProduct(e, e.target, `/api/products/${e.target.id.value}`);
})

//JS para consigna 5:
let deleteForm = document.getElementById('deleteForm');

let result

const handleSubmitDeleteById = (e, form, route) => {
  e.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  fetch(route, {
    method: 'DELETE',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      document.getElementById('deleteResponse').innerHTML = '';
      document.getElementById('deleteResponse').innerHTML = `<p>${res.status}</p><br><p>${res.message}</p>`;
    }
    if (res.status === 'error') {
      document.getElementById('deleteResponse').innerHTML = '';
      document.getElementById('deleteResponse').innerHTML = `<p>${res.error}</p>`;
    }
  })
}

deleteForm.addEventListener('submit', (e) => {
  handleSubmitDeleteById(e, e.target, `/api/products/${e.target.id.value}`)
})