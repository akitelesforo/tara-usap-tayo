let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

    console.log('Client connected');

    socket.on('user:join', (data) => {
        io.emit('user:join', data);
    });

    socket.on('send:message', (data) => {
        io.emit('send:message', {
            user: data.user,
            message: data.message,
            time: data.time
        });
    });

    socket.on('disconnect', (data) => {
        io.emit('send:disconnect', data);
    });   

});

server.listen(port, () => {
    console.log(`Socket IO server started on port: ${port}`);
});