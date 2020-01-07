var socket = io();

socket.on('serverTransfer', function (data) {
    console.log('Im listening :D');
});