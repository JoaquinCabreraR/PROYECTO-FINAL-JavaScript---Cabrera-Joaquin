class Usuario {
    constructor(nombre, apellido, dni, saldo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.saldo = saldo;
    }
}

const usuarioJuan = new Usuario("Juan", "Gomez", 1111, 500);
const usuarioPepe = new Usuario("Pepe", "Perez", 2222, 200);
const usuarioPablo = new Usuario("Pablo", "Gomez", 3333, 1000);

const arrayUsuarios = [];

arrayUsuarios.push(usuarioJuan);
arrayUsuarios.push(usuarioPepe);
arrayUsuarios.push(usuarioPablo);

console.log(arrayUsuarios);

localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));

/*------------------------- INICIO DE SESION --------------------------------------*/

const formularioLog = document.getElementById('formularioLog');
const botonLog = document.getElementById('botonLog');
const dniInput = document.getElementById('dniInput');

let intentosIncorrectos = 0;

botonLog.addEventListener('click', function(event) {
    event.preventDefault();

const dni = dniInput.value;
const usuarioEncontrado = arrayUsuarios.find(usuario => usuario.dni === parseInt(dni));

if (usuarioEncontrado) {
    alert('Bienvenido ' + usuarioEncontrado.nombre + ' ' + usuarioEncontrado.apellido);
    window.location.href = 'paginaPrincipal.html';
} else {
    intentosIncorrectos++;

if (intentosIncorrectos >= 5) {
    alert('Has excedido el número máximo de intentos. Por favor, inténtalo más tarde.');
        formularioLog.reset();
    } else {
        alert('El DNI ingresado no es válido. Intento ' + intentosIncorrectos + '/5');
    }
}
});
