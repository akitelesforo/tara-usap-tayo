let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);

io.set('transports', [
    'websocket'
]);

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