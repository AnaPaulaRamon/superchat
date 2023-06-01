const socket = io(); // el socket es una instancia del io que es el server 

let input = document.getElementById('mensaje');
let user = document.getElementById('user');

input.addEventListener('keyup', (e) => {
    if(e.key === "Enter") {
        if(e.target.value) {
            socket.emit('message', {user: user.value, message: e.target.value});
        } else {
            console.log('NO ENVIADO')
        }
    }
})
socket.on('welcome', data => {
    alert(data);
})

socket.on('messagelog', data => {
   // console.log(data); // en la consola del localhost (cliente) no en la consola del servidor
    let p = document.getElementById('log');
    let messages = data.map(message => {
        return `<div><span>${message.user} dice: ${message.message} </span></div>`
    }).join('') // ignora las comas y junta todo (es safe porque tenemos los mensajes separados por span) 
    // i.e.  const elements = ['Fire', 'Air', 'Water']; console.log(elements.join('')); --> Expected output: "FireAirWater"
    p.innerHTML = messages;
})