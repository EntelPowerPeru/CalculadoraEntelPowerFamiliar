import {
  LISTA_PLANES,
  LISTA_PORCENTAJES,
  LISTA_LINEAS,
  LISTA_PLANES_FAMILIARES,
} from "../json/lista_planes.js";

const EVENTOS = {
  init() {
    this.rd_tipo_cliente();
    this.btn_calcular();
    this.btn_limpiar();
    this.mostrar_datos_plan();
    this.mostrar_datos_plan2();
  },
  rd_tipo_cliente() {
    const rd_tipo_cliente = document.querySelectorAll(".rd_tipo_cliente");

    rd_tipo_cliente.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const tipo_cliente = radio.value;

        if (tipo_cliente === "1") {
          document
            .querySelectorAll("#container_calculadora .select-estado")
            .forEach((select) => {
              select.disabled = false;
            });
        } else {
          document
            .querySelectorAll("#container_calculadora .select-estado")
            .forEach((select) => {
              select.disabled = true;
            });
        }
      });
    });
  },
  btn_calcular() {
    document.querySelector("#btn_calcular").addEventListener("click", () => {
      const plan_linea_1 = Number(
        document.querySelector("#cbo_plan_linea_1").value
      );
      const plan_linea_2 = Number(
        document.querySelector("#cbo_plan_linea_2").value
      );
      const plan_linea_3 = Number(
        document.querySelector("#cbo_plan_linea_3").value
      );
      const plan_linea_4 = Number(
        document.querySelector("#cbo_plan_linea_4").value
      );
      const plan_linea_5 = Number(
        document.querySelector("#cbo_plan_linea_5").value
      );

      const descuento_linea_1 = Number(
        document.querySelector("#cbo_descuento_linea_1").value
      );
      const descuento_linea_2 = Number(
        document.querySelector("#cbo_descuento_linea_2").value
      );
      const descuento_linea_3 = Number(
        document.querySelector("#cbo_descuento_linea_3").value
      );
      const descuento_linea_4 = Number(
        document.querySelector("#cbo_descuento_linea_4").value
      );
      const descuento_linea_5 = Number(
        document.querySelector("#cbo_descuento_linea_5").value
      );

      const numero_lineas = Number(
        document.querySelector("#cbo_numero_lineas").value
      );
      const costo_plan_familiar = Number(
        document.querySelector("#cbo_plan_familiar").value
      );
      const promocion = 29.9;

      let pago_sin_descuento;
      let pago_con_descuento;
      let pago_ahorro_familiar;
      let pago_total_plan_actual;
      let pago_diferencia_factura;

      if (numero_lineas === 0 || costo_plan_familiar === 0) {
        alert("No esta llenando todos los campos");
        return;
      }

      debugger;
      pago_sin_descuento = numero_lineas * costo_plan_familiar;
      pago_con_descuento =
        (numero_lineas - 1) * promocion + costo_plan_familiar;
      pago_ahorro_familiar = Math.round(
        pago_sin_descuento - pago_con_descuento,
        2
      );
      pago_total_plan_actual = Math.round(
        plan_linea_1 -
          plan_linea_1 * descuento_linea_1 +
          (plan_linea_2 - plan_linea_2 * descuento_linea_2) +
          (plan_linea_3 - plan_linea_3 * descuento_linea_3) +
          (plan_linea_4 - plan_linea_4 * descuento_linea_4) +
          (plan_linea_5 - plan_linea_5 * descuento_linea_5),
        2
      );
      pago_diferencia_factura =
        pago_total_plan_actual === 0
          ? 0
          : Math.round(pago_con_descuento - pago_total_plan_actual, 2);

      document.querySelector("#txt_pago_sin_descuento").value =
        pago_sin_descuento;
      document.querySelector("#txt_pago_con_descuento").value =
        pago_con_descuento;
      document.querySelector("#txt_pago_ahorro_plan_familiar").value =
        pago_ahorro_familiar;
      document.querySelector("#txt_pago_total_plan_actual").value =
        pago_total_plan_actual;
      document.querySelector("#txt_pago_diferencia_factura").value =
        pago_diferencia_factura;
    });
  },
  btn_limpiar() {
    document.querySelector("#btn_limpiar").addEventListener("click", () => {
      document
        .querySelectorAll("#container_calculadora select")
        .forEach((select) => {
          select.selectedIndex = "0";
        });

      document
        .querySelectorAll("#container_calculadora input[type='text']")
        .forEach((input) => {
          input.value = null;
        });

      document.querySelector("#rd_tipo_cliente_entel").checked = true;
    });
  },
  mostrar_datos_plan() {
    const cbo_planes = document.querySelectorAll(".cbo_planes");

    cbo_planes.forEach((select) => {
      select.addEventListener("change", (event) => {
        const id = event.currentTarget.id;
        const texto = select.options[select.selectedIndex].text;

        const datos = LISTA_PLANES.find((e) => e.text === texto).datos;

        if (id === "cbo_plan_linea_1") {
          document.querySelector("#bg_plan_linea_1").innerHTML = datos;
        } else if (id === "cbo_plan_linea_2") {
          document.querySelector("#bg_plan_linea_2").innerHTML = datos;
        } else if (id === "cbo_plan_linea_3") {
          document.querySelector("#bg_plan_linea_3").innerHTML = datos;
        } else if (id === "cbo_plan_linea_4") {
          document.querySelector("#bg_plan_linea_4").innerHTML = datos;
        } else {
          document.querySelector("#bg_plan_linea_5").innerHTML = datos;
        }
      });
    });
  },
  mostrar_datos_plan2() {
    const cbo_plan_familiar = document.querySelectorAll(".cbo_plan_familiar");

    cbo_plan_familiar.forEach((select) => {
      select.addEventListener("change", (event) => {
        const id = event.currentTarget.id;
        const texto = select.options[select.selectedIndex].text;

        const datos = LISTA_PLANES_FAMILIARES.find(
          (e) => e.text === texto
        ).datos;

        if (id === "cbo_plan_familiar1") {
          document.querySelector("#bg_plan_linea_familiar1").innerHTML = datos;
        }
      });
    });
  },
};

const INICIALIZAR_ELEMENTOS = {
  init() {
    this.selects();
    this.inputs();
  },
  selects() {
    const lista_planes = [...LISTA_PLANES];
    const lista_porcentajes = [...LISTA_PORCENTAJES];
    const lista_lineas = [...LISTA_LINEAS];
    const lista_planes_familiares = [...LISTA_PLANES_FAMILIARES];

    const cbo_planes = document.querySelectorAll(".cbo_planes");
    const cbo_descuentos = document.querySelectorAll(".cbo_descuentos");
    const cbo_numero_lineas = document.querySelector("#cbo_numero_lineas");
    const cbo_plan_familiar = document.querySelectorAll(".cbo_plan_familiar");

    cbo_planes.forEach((select) => {
      lista_planes.forEach((obj) => {
        const opcion = document.createElement("option");
        opcion.textContent = obj.text;
        opcion.value = obj.id;
        select.appendChild(opcion);
      });
    });

    cbo_descuentos.forEach((select) => {
      lista_porcentajes.forEach((obj) => {
        const opcion = document.createElement("option");
        opcion.textContent = obj.text;
        opcion.value = obj.id;
        select.appendChild(opcion);
      });
    });

    lista_lineas.forEach((obj) => {
      const opcion = document.createElement("option");
      opcion.textContent = obj.text;
      opcion.value = obj.id;
      cbo_numero_lineas.appendChild(opcion);
    });

    lista_planes_familiares.forEach((obj) => {
      const opcion = document.createElement("option");
      opcion.textContent = obj.text;
      opcion.value = obj.id;
      cbo_plan_familiar.appendChild(opcion);
    });
  },
  inputs() {
    document.querySelectorAll("input[type='text']").forEach((input) => {
      input.readOnly = true;
    });
  },
};

const INIZIALIZAR_TODO = {
  init: () => {
    EVENTOS.init();
    INICIALIZAR_ELEMENTOS.init();
  },
};

INIZIALIZAR_TODO.init();
