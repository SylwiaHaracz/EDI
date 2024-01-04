document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    const apiKey = 'ea458540';'https://my.api.mockaroo.com/customers.json'
    const url = 'https://my.api.mockaroo.com/customers.json';

        const response = await fetch(url, {
            headers: {
                'X-API-Key': apiKey,
            },
        });

        const data = await response.json();
        displayData(data);
        create_doughnut_chart(data);
        create_bar_chart(data)

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

function create_doughnut_chart(data){
    const regular = data.filter(item => item.is_a_regular_client === true).length;
    const new_client = data.length - regular;

    const ctx = document.getElementById('doughnut_chart').getContext('2d');
    new Chart(ctx,{
        type: 'doughnut',
        data:{
            labels: ["Regular client", "New client"],
            datasets: [
            {
                data: [regular, new_client],
                backgroundColor: ['#b48156', '#735335']
            }
            ]
        },
        options:{
            responsive: false,
            maintainAspectRatio: false,
        }
    })}

function create_bar_chart(data) {
    const order_counter = {};
    data.forEach(item => {
        const order_value = item.order;
        order_counter[order_value] = (order_counter[order_value] || 0) + 1;
    });
    
    const order_names = Object.keys(order_counter);
    const order_counts = order_names.map(order_value => order_counter[order_value]);
    
    const ctx = document.getElementById('bar_chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: order_names,
            datasets: [{
                label: 'Order Quantity',
                data: order_counts,
                backgroundColor: '#b48156',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    position: 'bottom',
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        fontSize: 12,
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, 
                        precision: 0,
                    }
                }
            }
        }
    });
}