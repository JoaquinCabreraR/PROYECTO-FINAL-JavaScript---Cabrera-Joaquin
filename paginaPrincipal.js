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
            prompt("Por favor, seleccione la operacion a realizar:\n1) Consultar saldo de cuenta\n2) Depositar dinero en cuenta")
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
    
    let opcion = menu();
    switch (opcion) {
        case 1:
            consultaSaldo();
            break;
        case 2:
            deposito();
            break;
        default:
            alert("Opción incorrecta");
            break;
    }
});


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
