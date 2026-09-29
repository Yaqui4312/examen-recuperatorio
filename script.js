// ===== Datos =====
let contactos = [];   // { id, nombre, telefono }
let siguienteId = 1;

// ===== Elementos del DOM =====
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const inputBuscador = document.getElementById("buscador");
const lista = document.getElementById("lista-contactos");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contador = document.getElementById("contador");

// ===== Renderizado =====
function render() {
  const texto = inputBuscador.value.trim().toLowerCase();

  // Filtra solo para mostrar; el arreglo original no se modifica
  const visibles = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(texto)
  );

  lista.innerHTML = "";

  visibles.forEach((c) => {
    const li = document.createElement("li");
    li.className = "contacto";

    const datos = document.createElement("div");
    datos.className = "datos";

    const nombre = document.createElement("span");
    nombre.className = "nombre";
    nombre.textContent = c.nombre;

    const telefono = document.createElement("span");
    telefono.className = "telefono";
    telefono.textContent = c.telefono;

    datos.appendChild(nombre);
    datos.appendChild(telefono);

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarContacto(c.id));

    li.appendChild(datos);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  // Mensaje cuando no hay nada que mostrar
  if (contactos.length === 0) {
    mensajeVacio.textContent = "Todavía no agregaste contactos.";
    mensajeVacio.style.display = "block";
  } else if (visibles.length === 0) {
    mensajeVacio.textContent = "No se encontraron contactos.";
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";
  }

  // El contador siempre usa el total real, no los visibles
  contador.textContent = "Contactos: " + contactos.length;
}

// ===== Agregar =====
function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  if (nombre === "" || telefono === "") return; // no se permiten vacíos

  contactos.push({ id: siguienteId++, nombre, telefono });

  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();

  render();
}

// ===== Eliminar =====
function eliminarContacto(id) {
  contactos = contactos.filter((c) => c.id !== id);
  render();
}

// ===== Eventos =====
btnAgregar.addEventListener("click", agregarContacto);
inputBuscador.addEventListener("input", render);

render();