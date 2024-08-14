document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (!username) {
        console.error('Username not found in localStorage');
        return;
    }

    fetch(`/api/getorder/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('orderTableBody');

            const totalPriceElement = document.getElementById('totalPrice');
            let totalPrice = 0;

            if (!data || data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="2">No orders found</td></tr>';
                totalPriceElement.innerText = 'Total Price: $0';
                return;
            }

            data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

            // Populate table with order data
            data.forEach(order => {
                const row = document.createElement('tr');
                const orderDate = new Date(order.orderDate);
                const formattedDate = orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                const price = parseFloat(order.price);
                row.innerHTML = `
                    <td class="text-center">${order.bookname}</td>
                    <td class="text-center">${order.price}</td>
                `;

                tableBody.appendChild(row);
                totalPrice += price;
            });
            totalPriceElement.innerText = `Total Price: ${totalPrice.toFixed(2)} BDT`;

        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            const tableBody = document.getElementById('orderTableBody');
            tableBody.innerHTML = '<tr><td colspan="2">Error fetching orders</td></tr>';
            const totalPriceElement = document.getElementById('totalPrice');
            totalPriceElement.innerText = 'Total Price: $0';
        });
});
