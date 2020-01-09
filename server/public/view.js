let socket = io();

console.log(socket);

socket.on('serverTransfer', (data) => {
    document.write(data);
});