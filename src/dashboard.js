document.addEventListener('DOMContentLoaded', function() {
    fetch('/info')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched books:', data);
        
        const tableBody = document.getElementById('book-table-body');

        data.forEach(book => {
          const row = document.createElement('tr');

          row.innerHTML = `
            <td class="text-center">${book.bookname}</td>
            <td class="text-center">${book.author}</td>
            <td class="text-center">${book.price}</td>
            <td class="text-center">
                <button class="btn btn-outline-primary btn-sm text-white delete-btn" data-id="${book.bookname}" style="background-color: #6946F4;">
                    <i class="fa-solid fa-trash" style="color: white;"></i> Delete
                </button>
            </td>
          `;

          tableBody.appendChild(row);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
              const bookName = this.getAttribute('data-id');
              deleteBook(bookName, this);
            });
          });
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  });
  function deleteBook(bookName, buttonElement) {
    fetch('/delete-book', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookname: bookName })
    })
    .then(response => {
        if (response.ok) {
            buttonElement.closest('tr').remove();
            console.log('Book deleted successfully');
        } else {
            return response.json().then(error => {
                console.error('Error deleting book:', error.message);
            });
        }
    })
    .catch(error => {
        console.error('Error deleting book:', error);
    });
}