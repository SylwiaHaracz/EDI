document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    const apiKey = 'ea458540';
    const url = 'https://my.api.mockaroo.com/customers.json';

        const response = await fetch(url, {
            headers: {
                'X-API-Key': apiKey,
            },
        });

        const data = await response.json();

        // Display data as before
        displayData(data);

}

function displayData(data) {
    const tableBody = document.querySelector('#api_table tbody');
    data.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.id;
        row.insertCell(1).textContent = item.name;
        row.insertCell(2).textContent = item.email;
        row.insertCell(3).textContent = item.gender;
        row.insertCell(4).textContent = item.order;
        row.insertCell(5).textContent = item.rating;
        row.insertCell(6).textContent = item.order_price;
        row.insertCell(7).textContent = item.order_date;
        row.insertCell(8).textContent = item.payment_method;
        row.insertCell(9).textContent = item.is_a_regular_client;
    });
}