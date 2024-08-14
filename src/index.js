// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/info')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Fetched books:', data);
        
//         const bookContainer = document.getElementById('book-container');

//         data.forEach(book => {
//           const card = document.createElement('div');
//           card.classList.add('col-sm-4', 'col-md-4', 'col-6', 'col-lg-2', 'mb-3');

//           card.innerHTML = `
//             <div class="card shadow" style="width: 9rem;">
//               <img src="/uploads/${book.image}" class="card-img-top pt-4 mx-auto" alt="" style="width: 70px;">
//               <div class="card-body">
//                 <p class="card-title font-weight-bold mb-0" style="font-size: 12px;">${book.bookname}</p>
//                 <p class="card-text mb-0" style="font-size: 10px;">${book.author}</p>
//                 <p class="card-text font-weight-bold text-danger" style="font-size: 10px;">BDT: ${book.price}</p>
//                 <a href="#" class="btn buy-btn" style="background-color: #6946F4; color: white; padding: 6px; font-size: 12px;">Buy Now</a>
//               </div>
//             </div>
//           `;

//           bookContainer.appendChild(card);
//         });
//         // Add event listener to all Buy Now buttons
// document.querySelectorAll('.buy-btn').forEach(button => {
//   button.addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default link behavior

//     // Retrieve data from the card
//     const bookname = this.getAttribute('data-bookname');
//     const author = this.getAttribute('data-author');
//     const price = this.getAttribute('data-price');

//     // Retrieve username from local storage
//     const username = localStorage.getItem('username');
    
//     if (username) {
//       // Prepare data to be sent to the server
//       const data = {
//         username: username,
//         bookname: bookname,
//         author: author,
//         price: price
//       };

//       // Send data to the server
//       fetch('/api/saveBook', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       })
//       .then(response => response.json())
//       .then(result => {
//         console.log('Success:', result);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//     } else {
//       alert('Please log in to purchase.');
//     }
//   });
// });

//       })
//       .catch(error => {
//         console.error('Error fetching books:', error);
//       });
//   });

//   // function checkIfUserLoggedIn() {
//   //   return localStorage.getItem('username');
//   // }

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
              <p class="card-title font-weight-bold mb-0" style="font-size: 12px;">${book.bookname}</p>
              <p class="card-text mb-0" style="font-size: 10px;">${book.author}</p>
              <p class="card-text font-weight-bold text-danger" style="font-size: 10px;">BDT: ${book.price}</p>
              <a href="#" class="btn buy-btn" style="background-color: #6946F4; color: white; padding: 6px; font-size: 12px;"
                 data-bookname="${book.bookname}" data-author="${book.author}" data-price="${book.price}">Buy Now</a>
            </div>
          </div>
        `;

        bookContainer.appendChild(card);
      });

      // Add event listener to all Buy Now buttons
      document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default link behavior

          // Retrieve data from the card
          const bookname = this.getAttribute('data-bookname');
          const author = this.getAttribute('data-author');
          const price = this.getAttribute('data-price');

          // Retrieve username from local storage
          const username = localStorage.getItem('username');
          
          if (username) {
            // Prepare data to be sent to the server
            const data = {
              username: username,
              bookname: bookname,
              author: author,
              price: price
            };

            // Send data to the server
            fetch('/api/saveBook', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
              console.log('Success:', result);
              alert('Order placed successfully!');
            })
            .catch(error => {
              console.error('Error:', error);
            });
          } else {
            alert('Please log in to purchase.');
          }
        });
      });

    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
});
