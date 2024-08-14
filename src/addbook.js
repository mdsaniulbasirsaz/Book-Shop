document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addbook');
    const submitButton = form.querySelector('button[type="button"]');
    
    submitButton.addEventListener('click', async () => {
      const formData = new FormData();
      
      // Manually append fields from the form
      formData.append('bookname', document.getElementById('bookname').value);
      formData.append('author', document.getElementById('author').value);
      formData.append('price', document.getElementById('price').value);
      
      // Append the file if selected
      const imageInput = document.getElementById('image');
      if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
      }
      
      try {
        const response = await fetch('/addBook', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          const result = await response.text();
          alert('Success: ' + result);
          form.reset();
        } else {
          const error = await response.text();
          alert('Error: ' + error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
      }
    });
  });

