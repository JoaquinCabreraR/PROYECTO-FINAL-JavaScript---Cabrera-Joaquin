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

/*------------------------------- MENU ------------------------------------------*/

window.addEventListener('load', function() {
    function menu() {
        let opcion = parseInt(
            prompt("Por favor, seleccione la operacion a realizar:\n1) Consultar saldo de cuenta\n2) Depositar\n3) Salir")
        );
        return opcion;
    }
    
    function consultaSaldo() {
        let documento = parseInt(prompt("Por favor, ingrese nuevamente su DNI: "));
        let usuario = arrayUsuarios.find((usuario) => usuario.dni === documento);
        console.log(usuario.saldo);
        alert("Su saldo es de $ " + usuario.saldo)
    }
    
    function deposito() {
        let documento = parseInt(prompt("Por favor, ingrese nuevamente su DNI: "));
        let usuario = arrayUsuarios.find((usuario) => usuario.dni === documento);
        let indice = arrayUsuarios.indexOf(usuario);
        let saldo = usuario.saldo;
        let deposito = parseInt(prompt("¿Cuánto dinero desea ingresar a su cuenta?"));
    
        function suma(deposito, saldo) {
            return deposito + saldo;
        }
    
        let nuevoSaldo = suma(deposito, saldo);
        usuario.saldo = nuevoSaldo;
        arrayUsuarios.splice(indice, 1, usuario);
        console.log(arrayUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
        alert("Su nuevo saldo es de $ " + nuevoSaldo)
    }
    
    function salir() {
        alert("Gracias por confiar en Coder & Co. Hasta la próxima.");
        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
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
});