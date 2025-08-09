      const reconocimiento = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      reconocimiento.lang = "es-ES";
      reconocimiento.continuous = true;
      reconocimiento.interimResults = false;

      reconocimiento.onresult = function (event) {
        const resultado = event.results[event.results.length - 1][0].transcript;
        const campoID = document.getElementById("campoActivo").value;
        const campo = document.getElementById(campoID);
        campo.value += resultado + " ";
      };

      function empezarDictado() {
        reconocimiento.start();
      }

      function detenerDictado() {
        reconocimiento.stop();
      }

      function guardarTexto() {
        const datos = document.getElementById("datos").value;
        const condicion = document.getElementById("condicion").value;
        const evaluacion = document.getElementById("evaluacion").value;
        const opciones = document.getElementById("opciones").value;

        const contenido =
          "DATOS PERSONALES:\n" +
          datos +
          "\n\n" +
          "CONDICIÓN/TEMA:\n" +
          condicion +
          "\n\n" +
          "EVALUACIÓN:\n" +
          evaluacion +
          "\n\n" +
          "OPCIONES:\n" +
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
