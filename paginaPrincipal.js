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

window.addEventListener('load', function () {
    menu();
});

function menu() {
    Swal.fire({
        title: "Seleccione la operación a realizar",
        input: "select",
        inputOptions: {
            1: "Consultar saldo de cuenta",
            2: "Depositar dinero en cuenta"
        },
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar",
        inputValidator: (value) => {
            if (!value) {
                return "Debe seleccionar una opción";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let opcion = parseInt(result.value);
            switch (opcion) {
                case 1:
                    consultaSaldo();
                    break;
                case 2:
                    deposito();
                    break;
                default:
                    Swal.fire("Opción incorrecta", "", "error");
                    break;
            }
        } else {
            Swal.fire("Operación cancelada", "", "info");
        }
    });
}

function consultaSaldo() {
    Swal.fire({
        title: "Consulta de saldo",
        input: "number",
        inputLabel: "Ingrese nuevamente su DNI",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Consultar",
        inputValidator: (value) => {
            if (!value) {
                return "Debe ingresar su DNI";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let documento = parseInt(result.value);
            let usuario = arrayUsuarios.find((usuario) => usuario.dni === documento);
            if (usuario) {
                Swal.fire("Consulta de saldo", "Su saldo es de $ " + usuario.saldo, "info");
            } else {
                Swal.fire("Usuario no encontrado", "", "error");
            }
        } else {
            Swal.fire("Consulta cancelada", "", "info");
        }
    });
}

function deposito() {
    Swal.fire({
        title: "Depósito de dinero",
        input: "number",
        inputLabel: "Ingrese nuevamente su DNI",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Depositar",
        inputValidator: (value) => {
            if (!value) {
                return "Debe ingresar su DNI";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let documento = parseInt(result.value);
            let usuario = arrayUsuarios.find((usuario) => usuario.dni === documento);
            if (usuario) {
                Swal.fire({
                    title: "Depósito de dinero",
                    input: "number",
                    inputLabel: "¿Cuánto dinero desea ingresar a su cuenta?",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Depositar",
                    inputValidator: (value) => {
                        if (!value) {
                            return "Debe ingresar la cantidad a depositar";
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        let deposito = parseInt(result.value);
                        let indice = arrayUsuarios.indexOf(usuario);
                        let saldo = usuario.saldo;
                        let nuevoSaldo = saldo + deposito;
                        usuario.saldo = nuevoSaldo;
                        arrayUsuarios.splice(indice, 1, usuario);
                        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
                        Swal.fire("Depósito exitoso", "Su nuevo saldo es de $ " + nuevoSaldo, "success");
                    }
                });
            }
        }
    });
}

/*------------------------------- CERRAR SESION ------------------------------------------*/

function cerrarSesion() {
    Swal.fire({
        icon: 'success',
        title: '¡Sesión cerrada!',
        text: 'Has cerrado sesión exitosamente.'
    }).then(() => {
        window.location.href = 'index.html';
    });
}

/*----------------------------- BOTON DOLAR -------------------------------------*/

function mostrarValoresDolar() {
    Swal.fire({
        title: 'Valores del Dólar',
        html: `
        <div>Dólar oficial: <span id="dolarOficial"></span></div>
        <div>Dólar blue: <span id="dolarBlue"></span></div>
        `,
        didRender: () => {
            obtenerValoresDolar((dolarOficial, dolarBlue) => {
                document.getElementById('dolarOficial').textContent = dolarOficial;
                document.getElementById('dolarBlue').textContent = dolarBlue;
            });
        }
    });
}

function obtenerValoresDolar(callback) {
    fetch('https://v6.exchangerate-api.com/v6/d7991c6b1253d19da0beadfb/latest/USD')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const dolarOficial = data.rates && data.rates.ARS;
            const dolarBlue = data.rates && data.rates.ARSBLUE;
            callback(dolarOficial, dolarBlue);
            guardarValoresDolarEnLocalStorage(dolarOficial, dolarBlue);
        })
        .catch(error => {
            console.log(error);
        });
}

function guardarValoresDolarEnLocalStorage(dolarOficial, dolarBlue) {
    const valoresDolar = {
        official: dolarOficial,
        blue: dolarBlue
    };
    localStorage.setItem('valoresDolar', JSON.stringify(valoresDolar));
}

obtenerValoresDolar((dolarOficial, dolarBlue) => {
    guardarValoresDolarEnLocalStorage(dolarOficial, dolarBlue);
});

setInterval(() => {
    obtenerValoresDolar((dolarOficial, dolarBlue) => {
        guardarValoresDolarEnLocalStorage(dolarOficial, dolarBlue);
    });
}, 30 * 60 * 1000);
