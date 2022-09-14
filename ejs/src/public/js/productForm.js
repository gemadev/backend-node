const productForm = document.getElementById('productForm');

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  fetch('/products', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      document.getElementById('response').innerHTML = '';
      document.getElementById('response').innerHTML = `<p>${res.status}</p><br><p>${res.message}</p><br><p>${JSON.stringify(res.product)}</p>`;
    }
    if (res.status === 'error') {
      document.getElementById('response').innerHTML = '';
      document.getElementById('response').innerHTML = `<p>${res.error}</p>`;
    }
  })
})
