const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
reconocimiento.lang = "es-ES";
reconocimiento.continuous = true;
reconocimiento.interimResults = false;

let campoActual = null; // Variable para guardar el campo activo

reconocimiento.onresult = function (event) {
  const resultado = event.results[event.results.length - 1][0].transcript;
  if (campoActual) {
    campoActual.value += resultado + " ";
  }
};

function empezarDictado(idCampo) {
  campoActual = document.getElementById(idCampo);
  reconocimiento.start();
}

function detenerDictado() {
  reconocimiento.stop();
  campoActual = null;
}

function guardarTexto() {
  const datos = document.getElementById("datos").value;
  const condicion = document.getElementById("condicion").value;
  const evaluacion = document.getElementById("evaluacion").value;
  const opciones = document.getElementById("opciones").value;

  const contenido =
    "SCRIPTUM 1:\n" +
    datos +
    "\n\n" +
    "SCRIPTUM 2:\n" +
    condicion +
    "\n\n" +
    "SCRIPTUM 3:\n" +
    evaluacion +
    "\n\n" +
    "SCRIPTUM 4:\n" +
    opciones;

  const blob = new Blob([contenido], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "notas_dictadas.txt";
  enlace.click();

  limpiarTodo(); // Limpia todos los campos después de guardar
}

function limpiarTodo() {
  document.getElementById("datos").value = "";
  document.getElementById("condicion").value = "";
  document.getElementById("evaluacion").value = "";
  document.getElementById("opciones").value = "";
}

function limpiarCampo(id) {
  document.getElementById(id).value = "";
}