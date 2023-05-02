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
    alert("Hola " + usuario + ". Buenos dias");
}

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

