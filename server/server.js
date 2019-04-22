let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

// App
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

// Routing
app.use(express.static('./public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.io
const ipaddress = "0.0.0.0";
const port = 8080;

io.set('transports', [
    'websocket',
    'polling'
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
    console.log(`Socket IO server started on: ${ipaddress}:${port}`);
});