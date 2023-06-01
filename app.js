const express = require('express');
const { Server } = require('socket.io');
const app = express();
const PORT = process.env.port || 8080;

const server = app.listen(PORT, () => {
    console.log('Listening to port ', PORT);
})

app.use(express.static(__dirname+'/public')) // el dirname permite ubircar la raiz del proyecto y ejecutar la address desde ahi, con esto carga los 3 archivos que existen en public
// NOTE: EL __dirname NO EXISTE EN EL TYPE: MODULES hay que crearlo aparte
const io = new Server(server)
let messages = [];

io.on('connection', socket => { // el servidor io escucha cuando hay una connexion y con el socket que se conecto hace lo siguient
    console.log('cliente conectado')
    socket.emit('welcome', 'BIENVENIDO A MI SOCKET')
    socket.on('message', data => {
        // socket.emit('messagelog', data); // --> esto solo envia el mensaje al socket del cual escuchamos el mensaje
      //  messages.push({id:socket.id, message: data})
      messages.push(data)
        io.emit('messagelog', messages); // si usamos io.emit el mensaje se lo enviaria a todos los clients que estan conectados con el servidor no con este socket en particular
    })
})
