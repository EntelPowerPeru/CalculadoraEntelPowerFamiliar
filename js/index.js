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
      let plan_sugerido_linea_adicional;
      let plan_sugerido_cdp1;
      let plan_sugerido_cdp2;

      if (numero_lineas === 0 || costo_plan_familiar === 0) {
        alert("No esta llenando todos los campos");
        return;
      }

      pago_sin_descuento = Number(
        Number(numero_lineas * costo_plan_familiar).toFixed(2)
      );
      pago_con_descuento = Number(
        Number((numero_lineas - 1) * promocion + costo_plan_familiar).toFixed(2)
      );
      pago_ahorro_familiar = Number(
        Number(pago_sin_descuento - pago_con_descuento).toFixed(2)
      );
      pago_total_plan_actual = Number(
        Number(
          plan_linea_1 -
          plan_linea_1 * descuento_linea_1 +
          (plan_linea_2 - plan_linea_2 * descuento_linea_2) +
          (plan_linea_3 - plan_linea_3 * descuento_linea_3) +
          (plan_linea_4 - plan_linea_4 * descuento_linea_4) +
          (plan_linea_5 - plan_linea_5 * descuento_linea_5),
          2
        ).toFixed(2)
      );
      pago_diferencia_factura =
        pago_total_plan_actual === 0
          ? 0
          : Number(Number(pago_con_descuento - pago_total_plan_actual).toFixed(2));

      document.querySelector("#txt_pago_sin_descuento").value =
        Number(pago_sin_descuento).toFixed(2);
      document.querySelector("#txt_pago_con_descuento").value =
        Number(pago_con_descuento).toFixed(2);
      document.querySelector("#txt_pago_ahorro_plan_familiar").value =
        Number(pago_ahorro_familiar).toFixed(2);
      document.querySelector("#txt_pago_total_plan_actual").value =
        Number(pago_total_plan_actual).toFixed(2);
      document.querySelector("#txt_pago_diferencia_factura").value =
        Number(pago_diferencia_factura).toFixed(2);

      const lista_plan_sugerido = HELPERS.plan_sugerido();
      plan_sugerido_linea_adicional = lista_plan_sugerido[0];
      plan_sugerido_cdp1 = lista_plan_sugerido[1];
      plan_sugerido_cdp2 = lista_plan_sugerido[2];

      document.querySelector("#txt_plan_sugerido_linea_adicional").value = plan_sugerido_linea_adicional;
      document.querySelector("#txt_plan_sugerido_cdp1").value = plan_sugerido_cdp1;
      document.querySelector("#txt_plan_sugerido_cdp2").value = plan_sugerido_cdp2;
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

      document.querySelector("#bg_plan_linea_1").innerHTML = "";
      document.querySelector("#bg_plan_linea_2").innerHTML = "";
      document.querySelector("#bg_plan_linea_3").innerHTML = "";
      document.querySelector("#bg_plan_linea_4").innerHTML = "";
      document.querySelector("#bg_plan_linea_5").innerHTML = "";
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
};

const HELPERS = {
  plan_sugerido() {
    const b2_c12_rango = [
      { id: 39.9, text: "Entel Power Base" },
      { id: 69.8, text: "Entel Power Familiar+ 39.90" },
      { id: 79.8, text: "Entel Power Familiar+ 49.90" },
      { id: 85.8, text: "Entel Power Familiar+ 55.90" },
      { id: 89.8, text: "Entel Power Familiar+ 59.90" },
      { id: 104.8, text: "Entel Power Familiar+ 74.90" },
      { id: 119.8, text: "Entel Power Familiar 89.90 SD" },
      { id: 129.8, text: "Entel Power Familiar 99.90 SD" },
      { id: 139.8, text: "Entel Power Familiar 109.90" },
      { id: 189.8, text: "Entel Power Familiar 159.90" },
      { id: 1000, text: "Entel Power Familiar 199.90" },
    ];

    const b14_c24_rango = [
      { id: 69.8, text: "Entel Power Base" },
      { id: 99.7, text: "Entel Power Familiar+ 39.90" },
      { id: 109.7, text: "Entel Power Familiar+ 49.90" },
      { id: 115.7, text: "Entel Power Familiar+ 55.90" },
      { id: 119.7, text: "Entel Power Familiar+ 59.90" },
      { id: 134.7, text: "Entel Power Familiar+ 74.90" },
      { id: 149.7, text: "Entel Power Familiar 89.90 SD" },
      { id: 159.7, text: "Entel Power Familiar 99.90 SD" },
      { id: 169.7, text: "Entel Power Familiar 109.90" },
      { id: 219.7, text: "Entel Power Familiar 159.90" },
      { id: 1000, text: "Entel Power Familiar 199.90" },
    ];

    const b26_c36_rango = [
      { id: 99.7, text: "Entel Power Base" },
      { id: 129.6, text: "Entel Power Familiar+ 39.90" },
      { id: 139.6, text: "Entel Power Familiar+ 49.90" },
      { id: 145.6, text: "Entel Power Familiar+ 55.90" },
      { id: 149.6, text: "Entel Power Familiar+ 59.90" },
      { id: 164.6, text: "Entel Power Familiar+ 74.90" },
      { id: 179.6, text: "Entel Power Familiar 89.90 SD" },
      { id: 189.6, text: "Entel Power Familiar 99.90 SD" },
      { id: 199.6, text: "Entel Power Familiar 109.90" },
      { id: 249.6, text: "Entel Power Familiar 159.90" },
      { id: 1000, text: "Entel Power Familiar 199.90" },
    ];

    const b38_c48_rango = [
      { id: 129.6, text: ",Entel Power Base" },
      { id: 159.5, text: ",Entel Power Familiar+ 39.90" },
      { id: 169.5, text: ",Entel Power Familiar+ 49.90" },
      { id: 175.5, text: ",Entel Power Familiar+ 55.90" },
      { id: 179.5, text: ",Entel Power Familiar+ 59.90" },
      { id: 194.5, text: ",Entel Power Familiar+ 74.90" },
      { id: 209.5, text: ",Entel Power Familiar 89.90 SD" },
      { id: 219.5, text: ",Entel Power Familiar 99.90 SD" },
      { id: 229.5, text: ",Entel Power Familiar 109.90" },
      { id: 279.5, text: ",Entel Power Familiar 159.90" },
      { id: 1000, text: ",Entel Power Familiar 199.90" },
    ];

    const e2_f15_rango = [
      { id: 69.8, text: "Entel Power Familiar+ 39.90" },
      { id: 79.8, text: "Entel Power Familiar+ 49.90" },
      { id: 85.8, text: "Entel Power Familiar+ 55.90" },
      { id: 89.8, text: "Entel Power Familiar+ 59.90" },
      { id: 104.8, text: "Entel Power Familiar+ 74.90" },
      { id: 119.8, text: "Entel Power Familiar 89.90 SD" },
      { id: 129.8, text: "Entel Power Familiar 99.90 SD" },
      { id: 139.8, text: "Entel Power Familiar 109.90" },
      { id: 159.8, text: "Entel Power Familiar 129.90" },
      { id: 189.8, text: "Entel Power Familiar 159.90" },
      { id: 209.8, text: "Entel Power Familiar 179.90" },
      { id: 229.8, text: "Entel Power Familiar 199.90" },
      { id: 289.8, text: "Entel Power Familiar 259.90" },
      { id: 329.8, text: "Entel Power Familiar 299.90" },
    ];

    const e17_f30_rango = [
      { id: 99.7, text: "Entel Power Familiar+ 39.90" },
      { id: 109.7, text: "Entel Power Familiar+ 49.90" },
      { id: 115.7, text: "Entel Power Familiar+ 55.90" },
      { id: 119.7, text: "Entel Power Familiar+ 59.90" },
      { id: 134.7, text: "Entel Power Familiar+ 74.90" },
      { id: 149.7, text: "Entel Power Familiar 89.90 SD" },
      { id: 159.7, text: "Entel Power Familiar 99.90 SD" },
      { id: 169.7, text: "Entel Power Familiar 109.90" },
      { id: 189.7, text: "Entel Power Familiar 129.90" },
      { id: 219.7, text: "Entel Power Familiar 159.90" },
      { id: 239.7, text: "Entel Power Familiar 179.90" },
      { id: 259.7, text: "Entel Power Familiar 199.90" },
      { id: 319.7, text: "Entel Power Familiar 259.90" },
      { id: 359.7, text: "Entel Power Familiar 299.90" },
    ];

    const e32_f45_rango = [
      { id: 129.6, text: "Entel Power Familiar+ 39.90" },
      { id: 139.6, text: "Entel Power Familiar+ 49.90" },
      { id: 145.6, text: "Entel Power Familiar+ 55.90" },
      { id: 149.6, text: "Entel Power Familiar+ 59.90" },
      { id: 164.6, text: "Entel Power Familiar+ 74.90" },
      { id: 179.6, text: "Entel Power Familiar 89.90 SD" },
      { id: 189.6, text: "Entel Power Familiar 99.90 SD" },
      { id: 199.6, text: "Entel Power Familiar 109.90" },
      { id: 219.6, text: "Entel Power Familiar 129.90" },
      { id: 249.6, text: "Entel Power Familiar 159.90" },
      { id: 269.6, text: "Entel Power Familiar 179.90" },
      { id: 289.6, text: "Entel Power Familiar 199.90" },
      { id: 349.6, text: "Entel Power Familiar 259.90" },
      { id: 389.6, text: "Entel Power Familiar 299.90" },
    ];

    const e47_f60_rango = [
      { id: 159.5, text: "Entel Power Familiar+ 39.90" },
      { id: 169.5, text: "Entel Power Familiar+ 49.90" },
      { id: 175.5, text: "Entel Power Familiar+ 55.90" },
      { id: 179.5, text: "Entel Power Familiar+ 59.90" },
      { id: 194.5, text: "Entel Power Familiar+ 74.90" },
      { id: 209.5, text: "Entel Power Familiar 89.90 SD" },
      { id: 219.5, text: "Entel Power Familiar 99.90 SD" },
      { id: 229.5, text: "Entel Power Familiar 109.90" },
      { id: 249.5, text: "Entel Power Familiar 129.90" },
      { id: 279.5, text: "Entel Power Familiar 159.90" },
      { id: 299.5, text: "Entel Power Familiar 179.90" },
      { id: 319.5, text: "Entel Power Familiar 199.90" },
      { id: 379.5, text: "Entel Power Familiar 259.90" },
      { id: 419.5, text: "Entel Power Familiar 299.90" },
    ];

    const h2_i11_rango = [
      { id: "Entel Power Base", text: "Entel Power Familiar+ 39.90" },
      {
        id: "Entel Power Familiar+ 39.90",
        text: "Entel Power Familiar+ 49.90",
      },
      {
        id: "Entel Power Familiar+ 49.90",
        text: "Entel Power Familiar+ 55.90",
      },
      {
        id: "Entel Power Familiar+ 55.90",
        text: "Entel Power Familiar+ 59.90",
      },
      {
        id: "Entel Power Familiar+ 59.90",
        text: "Entel Power Familiar+ 74.90",
      },
      {
        id: "Entel Power Familiar+ 74.90",
        text: "Entel Power Familiar 89.90 SD",
      },
      {
        id: "Entel Power Familiar 89.90 SD",
        text: "Entel Power Familiar 99.90 SD",
      },
      {
        id: "Entel Power Familiar 99.90 SD",
        text: "Entel Power Familiar 109.90",
      },
      {
        id: "Entel Power Familiar 109.90",
        text: "Entel Power Familiar 159.90",
      },
      //{ id: "Entel Power Familiar 159.90", text: "Entel Power Familiar 199.90" }
    ];

    const l2_m15_rango = [
      { id: "Entel Power Familiar+ 39.90", text: 39.9 },
      { id: "Entel Power Familiar+ 49.90", text: 49.9 },
      { id: "Entel Power Familiar+ 55.90", text: 55.9 },
      { id: "Entel Power Familiar+ 59.90", text: 59.9 },
      { id: "Entel Power Familiar+ 74.90", text: 74.9 },
      { id: "Entel Power Familiar 89.90 SD", text: 89.9 },
      { id: "Entel Power Familiar 99.90 SD", text: 99.9 },
      { id: "Entel Power Familiar 109.90", text: 109.9 },
      { id: "Entel Power Familiar 129.90", text: 129.9 },
      { id: "Entel Power Familiar 159.90", text: 159.9 },
      { id: "Entel Power Familiar 179.90", text: 179.9 },
      { id: "Entel Power Familiar 199.90", text: 199.9 },
      { id: "Entel Power Familiar 259.90", text: 259.9 },
      { id: "Entel Power Familiar 299.90", text: 299.9 },
    ];

    function r15() {
      try {
        let resultado;
        const numero_lineas = Number(document.querySelector("#cbo_numero_lineas").value);
        let numero_lineas_registradas = 0;
        const precio_lineas_registradas = [];
        let r17_celda = r17();
        const plan_sugerido_cdp1 = obtener_plan_sugerido_cdp1();
        const total_planes_actuales = Number(document.querySelector("#txt_pago_total_plan_actual").value);

        // Contar lineas registradas | almacenar precios de las lineas registradas en array
        document.querySelectorAll(".cbo_planes").forEach((elemento) => {
          const valor = Number(elemento.value);

          if (valor > 0) {
            numero_lineas_registradas++;

            precio_lineas_registradas.push(valor);
          }
        });

        // Condiciones
        if (numero_lineas <= numero_lineas_registradas) {
          resultado = "-";
        } else if (precio_lineas_registradas.every((precio) => r17_celda >= precio)) {
          resultado = plan_sugerido_cdp1;
        } else if (numero_lineas === 2) {
          let valor = b2_c12_rango.find((e) => e.id >= total_planes_actuales).text;

          resultado = h2_i11_rango.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
        } else if (numero_lineas === 3) {
          let valor = b14_c24_rango.find((e) => e.id >= total_planes_actuales).text;

          resultado = h2_i11_rango.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
        } else if (numero_lineas === 4) {
          let valor = b26_c36_rango.find((e) => e.id >= total_planes_actuales).text;

          resultado = h2_i11_rango.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
        } else if (numero_lineas === 5) {
          let valor = b38_c48_rango.find((e) => e.id >= total_planes_actuales).text;

          resultado = h2_i11_rango.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
        } else {
          resultado = 0;
        }

        return resultado;
      } catch (error) {
        return 0;
      }
    }

    function r17() {
      const n17 = obtener_plan_sugerido_cdp1();

      const resultado = l2_m15_rango.find((e) => n17 === e.id).text;

      return resultado;
    }

    function obtener_plan_sugerido_linea_adicional() {
      try {
        let resultado = "";
        let r15_celda = r15();
        let valor;
        const precio_lineas_registradas = [];

        valor = l2_m15_rango.find(e => e.id === r15_celda).text;

        document.querySelectorAll(".cbo_planes").forEach((elemento) => {
          precio_lineas_registradas.push(Number(elemento.value));
        });

        if (precio_lineas_registradas.every((precio) => valor >= precio)) {
          resultado = r15_celda;
        } else {
          resultado = h2_i11_rango.find((e) => e.id === r15_celda).text;
        }

        return resultado;
      } catch (error) {
        return "No aplica";
      }
    }

    function obtener_plan_sugerido_cdp1() {
      try {
        let resultado = "";
        const numero_lineas = Number(document.querySelector("#cbo_numero_lineas").value);
        const total_planes_actuales = Number(document.querySelector("#txt_pago_total_plan_actual").value);

        if (numero_lineas === 2) {
          resultado = e2_f15_rango.find((e) => e.id >= total_planes_actuales).text;
        } else if (numero_lineas === 3) {
          resultado = e17_f30_rango.find((e) => e.id >= total_planes_actuales).text;
        } else if (numero_lineas === 4) {
          resultado = e32_f45_rango.find((e) => e.id >= total_planes_actuales).text;
        } else if (numero_lineas === 5) {
          resultado = e47_f60_rango.find((e) => e.id >= total_planes_actuales).text;
        } else {
          resultado = "Error";
        }

        return resultado;
      } catch (error) {
        return "No aplica";
      }
    }

    function obtener_plan_sugerido_cdp2() {
      try {
        let resultado = "";
        const numero_lineas = Number(document.querySelector("#cbo_numero_lineas").value);
        const total_planes_actuales = Number(document.querySelector("#txt_pago_total_plan_actual").value);

        if (numero_lineas === 2) {
          resultado = e2_f15_rango.reverse().find((e) => e.id <= total_planes_actuales).text;
        } else if (numero_lineas === 3) {
          resultado = e17_f30_rango.reverse().find((e) => e.id <= total_planes_actuales).text;
        } else if (numero_lineas === 4) {
          resultado = e32_f45_rango.reverse().find((e) => e.id <= total_planes_actuales).text;
        } else if (numero_lineas === 5) {
          resultado = e47_f60_rango.reverse().find((e) => e.id <= total_planes_actuales).text;
        } else {
          resultado = "Error";
        }

        return resultado;
      } catch (error) {
        return "No aplica";
      }
    }

    return [
      obtener_plan_sugerido_linea_adicional(),
      obtener_plan_sugerido_cdp1(),
      obtener_plan_sugerido_cdp2()
    ];
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
    const cbo_plan_familiar = document.querySelector("#cbo_plan_familiar");

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

const INICIALIZAR_TODO = {
  init: () => {
    EVENTOS.init();
    INICIALIZAR_ELEMENTOS.init();
  },
};

INICIALIZAR_TODO.init();
