import {
  LISTA_PLANES,
  LISTA_PORCENTAJES,
  LISTA_LINEAS,
  LISTA_PLANES_FAMILIARES,
  B2_C12_RANGO,
  B14_C24_RANGO,
  B26_C36_RANGO,
  B38_C48_RANGO,
  E2_F15_RANGO,
  E17_F30_RANGO,
  E32_F45_RANGO,
  E47_F60_RANGO,
  H2_I11_RANGO,
  L2_M15_RANGO
} from "../json/lista_planes.js";

const EVENTOS = {
  init() {
    this.tipo_cliente();
    this.calcular_campos();
    //this.limpiar_campos();
    this.mostrar_datos_plan();
  },
  tipo_cliente() {
    const rd_tipo_cliente = document.querySelectorAll(".rd_tipo_cliente");

    rd_tipo_cliente.forEach((radio) => {
      radio.addEventListener("change", (evento) => {
        const tipo_cliente = radio.value;

        if (tipo_cliente === "1") {
          document
            .querySelectorAll(".cbo_planes, .cbo_descuentos")
            .forEach((select) => {
              select.disabled = false;
            });
        } else {
          document
            .querySelectorAll(".cbo_planes, .cbo_descuentos")
            .forEach((select) => {
              select.disabled = true;
            });
        }
      });
    });
  },
  calcular_campos() {
    document.querySelectorAll(".cbo_planes, .cbo_descuentos, #cbo_numero_lineas, #cbo_plan_familiar").forEach(elemento => {
      elemento.addEventListener("change", (evento) => {
        const promocion = 29.9;
        const plan_linea_1 = Number(document.querySelector("#cbo_plan_linea_1").value);
        const plan_linea_2 = Number(document.querySelector("#cbo_plan_linea_2").value);
        const plan_linea_3 = Number(document.querySelector("#cbo_plan_linea_3").value);
        const plan_linea_4 = Number(document.querySelector("#cbo_plan_linea_4").value);
        const plan_linea_5 = Number(document.querySelector("#cbo_plan_linea_5").value);
        const descuento_linea_1 = Number(document.querySelector("#cbo_descuento_linea_1").value);
        const descuento_linea_2 = Number(document.querySelector("#cbo_descuento_linea_2").value);
        const descuento_linea_3 = Number(document.querySelector("#cbo_descuento_linea_3").value);
        const descuento_linea_4 = Number(document.querySelector("#cbo_descuento_linea_4").value);
        const descuento_linea_5 = Number(document.querySelector("#cbo_descuento_linea_5").value);
        const numero_lineas = Number(document.querySelector("#cbo_numero_lineas").value);
        const costo_plan_familiar = Number(document.querySelector("#cbo_plan_familiar").value);
        const pago_sin_descuento = !numero_lineas || !costo_plan_familiar ? "" : Number(numero_lineas * costo_plan_familiar);
        const pago_con_descuento = !numero_lineas || !costo_plan_familiar ? "" : Number((numero_lineas - 1) * promocion + costo_plan_familiar);
        const pago_ahorro_familiar = !pago_sin_descuento || !pago_con_descuento ? "" : Number(pago_sin_descuento - pago_con_descuento);
        const pago_total_plan_actual = !plan_linea_1 && !plan_linea_2 && !plan_linea_3 && !plan_linea_4 && !plan_linea_5 ? "" : Number(
          (plan_linea_1 - plan_linea_1 * descuento_linea_1) +
          (plan_linea_2 - plan_linea_2 * descuento_linea_2) +
          (plan_linea_3 - plan_linea_3 * descuento_linea_3) +
          (plan_linea_4 - plan_linea_4 * descuento_linea_4) +
          (plan_linea_5 - plan_linea_5 * descuento_linea_5),
          2);
        const pago_diferencia_factura = !pago_total_plan_actual ? "" : Number(pago_con_descuento - pago_total_plan_actual);
        let numero_lineas_registradas = 0;
        let precio_lineas_registradas = [];

        document.querySelectorAll(".cbo_planes").forEach((elemento) => {
          const precio = Number(elemento.value);

          if (precio > 0) {
            numero_lineas_registradas++;

            precio_lineas_registradas.push(precio);
          }
        });

        const plan_sugerido_linea_adicional = HELPERS.obtener_plan_sugerido_linea_adicional(numero_lineas, numero_lineas_registradas, precio_lineas_registradas, pago_total_plan_actual);
        const plan_sugerido_cdp1 = HELPERS.obtener_plan_sugerido_cdp1(numero_lineas, pago_total_plan_actual);
        const plan_sugerido_cdp2 = HELPERS.obtener_plan_sugerido_cdp2(numero_lineas, pago_total_plan_actual);

        document.querySelector("#txt_pago_sin_descuento").value = pago_sin_descuento && pago_sin_descuento.toFixed(2);
        document.querySelector("#txt_pago_con_descuento").value = pago_con_descuento && pago_con_descuento.toFixed(2);
        document.querySelector("#txt_pago_ahorro_plan_familiar").value = pago_ahorro_familiar && pago_ahorro_familiar.toFixed(2);
        document.querySelector("#txt_pago_total_plan_actual").value = pago_total_plan_actual && pago_total_plan_actual.toFixed(2);
        document.querySelector("#txt_pago_diferencia_factura").value = pago_diferencia_factura && pago_diferencia_factura.toFixed(2);

        document.querySelector("#txt_plan_sugerido_linea_adicional").value = plan_sugerido_linea_adicional;
        document.querySelector("#txt_plan_sugerido_cdp1").value = plan_sugerido_cdp1;
        document.querySelector("#txt_plan_sugerido_cdp2").value = plan_sugerido_cdp2;
      });
    })
  },
  limpiar_campos() {
    document.querySelector("#btn_limpiar").addEventListener("click", () => {
      document.querySelectorAll("#container_calculadora select").forEach((select) => select.selectedIndex = "0");

      document.querySelectorAll("#container_calculadora input[type='text']").forEach((input) => input.value = null);

      document.querySelector("#rd_tipo_cliente_entel").checked = true;

      document.querySelectorAll(".bg_plan").forEach(span => span.innerHTML = "");
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
  r15(numero_lineas, numero_lineas_registradas, precio_lineas_registradas, total_planes_actuales) {
    try {
      let resultado;
      const r17_celda = this.r17(numero_lineas, total_planes_actuales);
      const plan_sugerido_cdp1 = this.obtener_plan_sugerido_cdp1(numero_lineas, total_planes_actuales);

      if (numero_lineas <= numero_lineas_registradas) {
        resultado = "-";
      } else if (precio_lineas_registradas.every((precio) => r17_celda >= precio)) {
        resultado = plan_sugerido_cdp1;
      } else if (numero_lineas === 2) {
        let valor = B2_C12_RANGO.find((e) => e.id >= total_planes_actuales).text;

        resultado = H2_I11_RANGO.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
      } else if (numero_lineas === 3) {
        let valor = B14_C24_RANGO.find((e) => e.id >= total_planes_actuales).text;

        resultado = H2_I11_RANGO.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
      } else if (numero_lineas === 4) {
        let valor = B26_C36_RANGO.find((e) => e.id >= total_planes_actuales).text;

        resultado = H2_I11_RANGO.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
      } else if (numero_lineas === 5) {
        let valor = B38_C48_RANGO.find((e) => e.id >= total_planes_actuales).text;

        resultado = H2_I11_RANGO.find(e => e.id.toLowerCase().trim() === valor.toLowerCase().trim()).text;
      } else {
        resultado = 0;
      }

      return resultado;
    } catch (error) {
      return 0;
    }
  },
  r17(numero_lineas, total_planes_actuales) {
    const n17 = this.obtener_plan_sugerido_cdp1(numero_lineas, total_planes_actuales);

    const resultado = L2_M15_RANGO.find((e) => n17 === e.id).text;

    return resultado;
  },
  obtener_plan_sugerido_linea_adicional(numero_lineas, numero_lineas_registradas, precio_lineas_registradas, total_planes_actuales) {
    try {
      if (!numero_lineas) {
        return "";
      }

      let resultado = "";
      const r15_celda = this.r15(numero_lineas, numero_lineas_registradas, precio_lineas_registradas, total_planes_actuales);
      const valor = L2_M15_RANGO.find(e => e.id === r15_celda).text;

      if (precio_lineas_registradas.every((precio) => valor >= precio)) {
        resultado = r15_celda;
      } else {
        resultado = H2_I11_RANGO.find((e) => e.id === r15_celda).text;
      }

      return resultado;
    } catch (error) {
      return "No aplica";
    }
  },
  obtener_plan_sugerido_cdp1(numero_lineas, total_planes_actuales) {
    try {
      let resultado = "";

      if (numero_lineas === 2) {
        resultado = E2_F15_RANGO.find((e) => e.id >= total_planes_actuales).text;
      } else if (numero_lineas === 3) {
        resultado = E17_F30_RANGO.find((e) => e.id >= total_planes_actuales).text;
      } else if (numero_lineas === 4) {
        resultado = E32_F45_RANGO.find((e) => e.id >= total_planes_actuales).text;
      } else if (numero_lineas === 5) {
        resultado = E47_F60_RANGO.find((e) => e.id >= total_planes_actuales).text;
      }

      return resultado;
    } catch (error) {
      return "No aplica";
    }
  },
  obtener_plan_sugerido_cdp2(numero_lineas, total_planes_actuales) {
    try {
      let resultado = "";

      if (numero_lineas === 2) {
        resultado = [...E2_F15_RANGO].reverse().find((e) => e.id <= total_planes_actuales).text;
      } else if (numero_lineas === 3) {
        resultado = [...E17_F30_RANGO].reverse().find((e) => e.id <= total_planes_actuales).text;
      } else if (numero_lineas === 4) {
        resultado = [...E32_F45_RANGO].reverse().find((e) => e.id <= total_planes_actuales).text;
      } else if (numero_lineas === 5) {
        resultado = [...E47_F60_RANGO].reverse().find((e) => e.id <= total_planes_actuales).text;
      }

      return resultado;
    } catch (error) {
      return "No aplica";
    }
  }
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
