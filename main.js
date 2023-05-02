class Usuario {
    constructor (nombre, apellido, dni, saldo){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.saldo = saldo;
    }
}

const usuarioJuan = new Usuario("Juan", "Gomez", 1111, 500);
const usuarioPepe = new Usuario("Pepe", "Perez", 2222, 200);
const usuarioPablo = new Usuario("Pablo", "Gomez",3333, 1000);

const arrayUsuarios = [];

arrayUsuarios.push (usuarioJuan);
arrayUsuarios.push (usuarioPepe);
arrayUsuarios.push (usuarioPablo);

console.log(arrayUsuarios);

/*------------------------- INICIO DE SESION --------------------------------------*/


alert ("Bienvenido al banco Coder & Co.");

arrayUsuarios.forEach (Usuario => {
    console.log (Usuario);
})

//let dni = parseInt(prompt("Por favor, ingrese su DNI: "));

do{
    dni = prompt("Por favor, ingrese su DNI: ")
} while (dni != Usuario.dni)

if (dni === Usuario.dni){
    alert ("Bienvenido " + Usuario.nombre + " " + Usuario.apellido);
}

/*--------------------- VER SALDO DE CUENTA Y OPERACION DE DEPOSITO --------------------------------*/

function menu() {
    let opcion = parseInt(prompt("Por favor, seleccione la operacion a realizar: \n 1) Consultar saldo de cuenta \n 2) Depositar \n 3) Salir"));
    return opcion;
}

function consultaSaldo() {
    let documento = parseInt(prompt("Por favor, ingrese nuevamente su DNI: "));
    let usuario = arrayUsuarios.find(Usuario => Usuario.saldo === saldo);
    console.log(cliente);
}

function deposito(){
    let dni = parseInt(prompt("Por favor, ingrese nuevamente su DNI: "));
    let usuario = arrayUsuarios.find(Usuario => Usuario.dni);
    let indice = arrayClientes.indexOf(Usuario);
    let saldo = arrayUsuarios.find(Usuario => Usuario.saldo);
    let deposito = parseInt(prompt("¿Cuanto dinero desea ingresar a su cuenta?"));
    function suma (deposito,saldo){
        return deposito + saldo
    }
    let nuevoSaldo = new Cliente(saldo);
    arrayUsuarios.splice(indice, 1, nuevoSaldo);
    console.log(arrayUsuarios);
}

function salir() {
    alert("Gracias por confiar en Coder & Co. Hasta la proxima.");
}

let opcion = menu();
switch (opcion) {
    case 1:
        consultaSaldo();
        break;
    case 2:
        deposito();
        break;
    case 3:
        salir();
        break;
    default:
        alert("Opción incorrecta");
        break;
}





















