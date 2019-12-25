'use strict'

/** Required Packages */
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

/** Required Project Files */
const serverController = require('./controllers/serverController');

/** Events -(Must move this part to another file) */
let events = require('./utils/events');
console.log(events);

/** Server set */
server.set('port', 3001);

/** Middlewares */
server.use(bodyParser.json());

/** Routes */
server.use('/api/v1', require('./routes/router'));

/** Server Init */
const serverSocket = server.listen(server.get('port'), () => {
    console.log('Running server on port',server.get('port'));
});

/** ============================================== */

/** Socket IO implementation */
const SocketIO = require('socket.io');
const io = SocketIO(serverSocket);

io.on('connection', (socket) => {
    console.log('New Connection', socket.id);

    socket.on('clientTransfer', (data) => {
        serverController.randomValue(data, events);

        socket.emit('serverTransfer', {
            ref: data.ref,
            name: data.name,
            event: data.event,
            eventId: data.eventId,
            requestId: data.requestId,
            countersData: events
        });
    })
});