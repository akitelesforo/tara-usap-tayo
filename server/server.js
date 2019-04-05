let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

// Routing
app.use(express.static('./'));

// Socket.io
const ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
const port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

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

server.listen(port, ipaddress, () => {
    console.log(`Socket IO server started on port: ${port}`);
});