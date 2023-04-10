alert ("Bienvenido al banco Coder & Co.")

const usuario = "coder";
const password = 1234;

let usuarioCliente = usuario;
let passwordCliente = password;

do{
    usuarioCliente = prompt("Ingrese su usuario");
} while(usuarioCliente != usuario);
console.log(usuarioCliente);

do{
    passwordCliente = prompt("Ingrese su contraseña")
} while (passwordCliente != password);
console.log(passwordCliente);

if ((usuarioCliente == usuario)&&(passwordCliente == password)){
    alert("Hola " + usuario);
}

alert ("Su saldo es de $0")

let saldoInicial = 0;
let montoIngresado = parseInt(prompt("¿Cuanto dinero desea ingresar a su cuenta?"));
console.log(montoIngresado);

function suma (saldoInicial,montoIngresado){
    return saldoInicial + montoIngresado;
}
let resultadoSuma = suma(0,montoIngresado);
console.log(resultadoSuma)
alert("El saldo de su cuenta es de $ " + resultadoSuma);
