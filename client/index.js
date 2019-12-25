'use strict'

/** Required Packages */
const io = require('socket.io-client');
const axios = require('axios');
const socket = io.connect('http://127.0.0.1:3001');

/** Assigned ID to this microservice */
const microServiceID = 101

/** Listeners */
socket.on('connect', () => {
    console.log('Client has connected to the server!');
});

socket.on('serverTransfer', (data) => {
    updateRequest('http://127.0.0.1:3001/api/v1/request', data);
});

/** Interval Functions */
setInterval(countModuleAction, 5000);

/** Aux function - Emiter implemented */
function countModuleAction() {
    let payload = {
        ref: microServiceID,
        name: 'p1',
        event: 'count',
        eventId: 'room1',
        requestId: socket.id
    };
    socket.emit('clientTransfer', payload);
};

/** Axios POST request */
async function updateRequest(url, data) {
    try {
        let response = await axios.post(url, data);
        let responseData = response.data;

        console.log(responseData);
    } catch (error) {
        console.log(`${error.response} - Verify your endpoint`);
    }
}
