class Usuario {
    constructor (nombre, apellido, dni){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}

const usuarioJuan = new Usuario("Juan", "Gomez", 1111);
const usuarioPepe = new Usuario("Pepe", "Perez", 2222);
const usuarioPablo = new Usuario("Pablo", "Gomez",3333);

const arrayUsuarios = [];

arrayUsuarios.push (usuarioJuan);
arrayUsuarios.push (usuarioPepe);
arrayUsuarios.push (usuarioPablo);

console.log(arrayUsuarios);

/*------------------------- INICIO DE SESION --------------------------------------*/


alert ("Bienvenido al banco Coder & Co.");


let dni = parseInt(prompt("Por favor, ingrese su DNI: "));
let usuario = arrayUsuarios.find(Usuario => Usuario.dni === dni);

if (dni == usuario){
    alert ("Bienvenido " + Usuario.nombre + " " + Usuario.apellido);
}else{
    alert ("El DNI ingresado no corresponde a ningun usuario, vuelva a intentar");
}

/*--------------------- VER SALDO DE CUENTA Y OPERACION DE DEPOSITO --------------------------------*/
alert ("Su saldo es de $0")

let saldoInicial = 0;
let montoIngresado = parseInt(prompt("¿Cuanto dinero desea ingresar a su cuenta?"));
console.log(montoIngresado);

if (montoIngresado < 0){
    alert ("Disculpe, el monto ingresado es incorrecto. Por favor ingrese un monto mayor a cero pesos.");
}

function suma (saldoInicial,montoIngresado){
    return saldoInicial + montoIngresado;
}
let resultadoSuma = suma(saldoInicial,montoIngresado);
console.log(resultadoSuma)
alert("Ahora saldo de su cuenta es de $ " + resultadoSuma);

alert ("Gracias por confiar en Coder & Co. Hasta la proxima")