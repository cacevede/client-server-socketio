'use strict'

/** Required Packages */
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

/** Required Project Files */
const serverController = require('./controllers/serverController');
const sequelizeInstance = require('./configs/databaseConnection');

/** Events */
let events = require('./utils/events');

/** Server set */
const dbConnection = sequelizeInstance.getSequelizeConnection();
server.set('port', 3001);
server.set('view engine', 'pug');

/** Middlewares */
server.use(bodyParser.json());

if (dbConnection) {
    console.log(`DB Connection established! => ${dbConnection.config.database} - PORT: ${dbConnection.config.port}`);
} else {
    console.log('DB Connection ERROR => ', dbConnection);
}

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
    console.log('New Client Connection', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

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
    });
});