document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/getorder') // Ensure this endpoint matches your backend
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('orderTableBody');
            data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

            
            // If your API response is an array of orders:
            data.forEach(order => {
                const row = document.createElement('tr');
                const orderDate = new Date(order.orderDate);
                const formattedDate = orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                
                row.innerHTML = `
                    <td class="text-center">${order.username}</td>
                    <td class="text-center">${order.bookname}</td>
                    <td class="text-center">${order.author}</td>
                    <td class="text-center">${order.price}</td>
                    <td> <p class="text-center" style="font-size:13px; color:black">${formattedDate} </P
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
});
