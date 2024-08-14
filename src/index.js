document.addEventListener('DOMContentLoaded', function() {
    fetch('/info')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched books:', data);
        
        const bookContainer = document.getElementById('book-container');

        data.forEach(book => {
          const card = document.createElement('div');
          card.classList.add('col-sm-4', 'col-md-4', 'col-6', 'col-lg-2', 'mb-3');

          card.innerHTML = `
            <div class="card shadow" style="width: 9rem;">
              <img src="/uploads/${book.image}" class="card-img-top pt-4 mx-auto" alt="" style="width: 70px;">
              <div class="card-body">
                <p class="card-title font-weight-bold mb-0" style="font-size: 12px;">${book.name}</p>
                <p class="card-text mb-0" style="font-size: 10px;">${book.author}</p>
                <p class="card-text font-weight-bold text-danger" style="font-size: 10px;">BDT: ${book.price}</p>
                <a href="#" class="btn" style="background-color: #6946F4; color: white; padding: 6px; font-size: 12px;">Buy Now</a>
              </div>
            </div>
          `;

          bookContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  });