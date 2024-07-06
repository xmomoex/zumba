document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");

  // Función para mezclar aleatoriamente un array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const Main = () => {
    const state = {
      jugadores: "",
      numEquipos: 2,
      equipos: [],
    };

    const handleInputChange = (event) => {
      state.jugadores = event.target.value;
    };

    const handleNumEquiposChange = (event) => {
      state.numEquipos = Number(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const jugadoresArray = state.jugadores
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      // Calcular cuántos jugadores debe tener cada equipo
      const jugadoresPorEquipo = Math.floor(
        jugadoresArray.length / state.numEquipos
      );
      let jugadoresExtras = jugadoresArray.length % state.numEquipos; // Jugadores sobrantes

      // Mezclar aleatoriamente el array de jugadores
      const jugadoresMezclados = shuffleArray(jugadoresArray);

      // Repartir jugadores en equipos
      const equiposTemp = Array.from({ length: state.numEquipos }, () => []);

      let jugadorIndex = 0;
      for (let i = 0; i < state.numEquipos; i++) {
        let actualJugadoresPorEquipo = jugadoresPorEquipo;
        if (jugadoresExtras > 0) {
          actualJugadoresPorEquipo++;
          jugadoresExtras--;
        }
        for (let j = 0; j < actualJugadoresPorEquipo; j++) {
          if (jugadorIndex < jugadoresMezclados.length) {
            equiposTemp[i].push(jugadoresMezclados[jugadorIndex]);
            jugadorIndex++;
          }
        }
      }

      state.equipos = equiposTemp;
      render();
    };

    const render = () => {
      const form = document.createElement("form");
      form.addEventListener("submit", handleSubmit);
      form.classList.add("form");

      const jugadoresInput = document.createElement("textarea");
      jugadoresInput.classList.add("form-control");
      jugadoresInput.setAttribute("name", "jugadores");
      jugadoresInput.setAttribute("cols", "50");
      jugadoresInput.setAttribute("rows", "10");
      jugadoresInput.setAttribute(
        "placeholder",
        "Escribe el nombre de los jugadores, uno por línea"
      );
      jugadoresInput.value = state.jugadores;
      jugadoresInput.addEventListener("input", handleInputChange);

      const numEquiposGroup = document.createElement("div");
      numEquiposGroup.classList.add("form-group");

      const numLabel = document.createElement("span");
      numLabel.classList.add("num-label");
      numLabel.textContent = "Selecciona el número de equipos:";
      numEquiposGroup.appendChild(numLabel);

      [2, 3, 4, 5, 6, 7, 8].forEach((num) => {
        const label = document.createElement("label");
        label.classList.add("radio-label");

        const input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "numEquipos");
        input.setAttribute("value", num);
        input.checked = state.numEquipos === num;
        input.classList.add("radio-input");
        input.addEventListener("change", handleNumEquiposChange);

        const span = document.createElement("span");
        span.classList.add("radio-custom");

        label.appendChild(input);
        label.appendChild(span);
        label.appendChild(document.createTextNode(num));

        numEquiposGroup.appendChild(label);
      });

      const submitBtn = document.createElement("button");
      submitBtn.setAttribute("type", "submit");
      submitBtn.classList.add("btn-submit");
      submitBtn.textContent = "Enviar";

      form.appendChild(jugadoresInput);
      form.appendChild(numEquiposGroup);
      form.appendChild(submitBtn);

      const equiposDiv = document.createElement("div");
      equiposDiv.classList.add("equipos");

      state.equipos.forEach((equipo, index) => {
        const equipoDiv = document.createElement("div");
        equipoDiv.classList.add("equipo");

        const h3 = document.createElement("h3");
        h3.textContent = `Equipo ${index + 1}`;
        equipoDiv.appendChild(h3);

        const ul = document.createElement("ul");
        ul.classList.add("jugadores");

        equipo.forEach((jugador, jugadorIndex) => {
          const li = document.createElement("li");
          li.textContent = jugador;
          ul.appendChild(li);
        });

        equipoDiv.appendChild(ul);
        equiposDiv.appendChild(equipoDiv);
      });

      container.innerHTML = "";
      container.appendChild(form);
      container.appendChild(equiposDiv);
    };

    render();
  };

  Main();
});
