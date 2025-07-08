const form = document.getElementById('roomForm');
const roomTableBody = document.querySelector('#roomTable tbody');

const api = 'https://hotel-roommanagement.onrender.com/api/rooms';

function getAllRooms() {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            roomTableBody.innerHTML = '';
            data.forEach(room => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${room.roomID}</td>
                    <td>${room.roomName}</td>
                    <td>${room.roomType}</td>
                    <td>IDR${room.price}</td>
                    <td>
                        <button onclick="deleteRoom('${room._id}')">Delete</button>
                    </td>
                    `;
                
                roomTableBody.appendChild(row);
            });
        });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const newRoom = {
        roomID: form.roomID.value,
        roomName: form.roomName.value,
        roomType: form.roomType.value,
        price: parseFloat(form.price.value)
    };

    fetch(api, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newRoom)
    })
        .then(res => res.json())
        .then(() => {
            form.reset();
            getAllRooms();
        });
});

function deleteRoom(id) {
    fetch(`${api}/${id}`, { method: 'DELETE' })
        .then(() => getAllRooms());
}

getAllRooms();