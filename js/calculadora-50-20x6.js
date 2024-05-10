import {
  LISTA_PLANES,
  LISTA_PORCENTAJES,
  LISTA_LINEAS,
  LISTA_PLANES_FAMILIARES,
  LISTA_MENSUAL_CON_FAMILIA,
  LISTA_MENSUAL_50_20X6_CLIENTE_NUEVO,
  LISTA_MENSUAL_50_20X6_CLIENTE_BASE,
  LISTA_20x3,
  LISTA_LINEAS_20x3,
  B2_C12_RANGO,
  B14_C24_RANGO,
  B26_C36_RANGO,
  B38_C48_RANGO,
  E2_F15_RANGO,
  E17_F30_RANGO,
  E32_F45_RANGO,
  E47_F60_RANGO,
  H2_I11_RANGO,
  L2_M15_RANGO,
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
              select.selectedIndex = "0";
            });

          HELPERS.establecer_datos();
        }
      });
    });
  },
  calcular_campos() {
    document
      .querySelectorAll(
        ".cbo_planes, .cbo_descuentos, #cbo_numero_lineas, #cbo_plan_familiar"
      )
      .forEach((elemento) => {
        elemento.addEventListener("change", (evento) => {
          HELPERS.establecer_datos();
        });
      });
  },
  limpiar_campos() {
    document.querySelector("#btn_limpiar").addEventListener("click", () => {
      document
        .querySelectorAll("#container_calculadora select")
        .forEach((select) => (select.selectedIndex = "0"));

      document
        .querySelectorAll("#container_calculadora input[type='text']")
        .forEach((input) => (input.value = null));

      document.querySelector("#rd_tipo_cliente_entel").checked = true;

      document
        .querySelectorAll(".bg_plan")
        .forEach((span) => (span.innerHTML = ""));
    });
  },
  mostrar_datos_plan() {
    const cbo_planes = document.querySelectorAll(".cbo_planes");

    cbo_planes.forEach((select) => {
      select.addEventListener("change", (event) => {
        const id = event.currentTarget.id;
        const texto = select.options[select.selectedIndex].text;
        const datos = LISTA_PLANES.find((e) => e.plan === texto).datos;

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
  r15(
    numero_lineas,
    numero_lineas_registradas,
    precio_lineas_registradas,
    total_planes_actuales
  ) {
    try {
      let resultado;
      const r17_celda = this.r17(numero_lineas, total_planes_actuales);
      const plan_sugerido_cdp1 = this.obtener_plan_sugerido_cdp1(
        numero_lineas,
        total_planes_actuales
      );

      if (numero_lineas <= numero_lineas_registradas) {
        resultado = "-";
      } else if (
        precio_lineas_registradas.every((precio) => r17_celda >= precio)
      ) {
        resultado = plan_sugerido_cdp1;
      } else if (numero_lineas === 2) {
        let valor = B2_C12_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;

        resultado = H2_I11_RANGO.find(
          (e) => e.id.toLowerCase().trim() === valor.toLowerCase().trim()
        ).text;
      } else if (numero_lineas === 3) {
        let valor = B14_C24_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;

        resultado = H2_I11_RANGO.find(
          (e) => e.id.toLowerCase().trim() === valor.toLowerCase().trim()
        ).text;
      } else if (numero_lineas === 4) {
        let valor = B26_C36_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;

        resultado = H2_I11_RANGO.find(
          (e) => e.id.toLowerCase().trim() === valor.toLowerCase().trim()
        ).text;
      } else if (numero_lineas === 5) {
        let valor = B38_C48_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;

        resultado = H2_I11_RANGO.find(
          (e) => e.id.toLowerCase().trim() === valor.toLowerCase().trim()
        ).text;
      } else {
        resultado = 0;
      }

      return resultado;
    } catch (error) {
      return 0;
    }
  },
  r17(numero_lineas, total_planes_actuales) {
    const n17 = this.obtener_plan_sugerido_cdp1(
      numero_lineas,
      total_planes_actuales
    );

    const resultado = L2_M15_RANGO.find((e) => n17 === e.id).text;

    return resultado;
  },
  obtener_plan_sugerido_linea_adicional(
    numero_lineas,
    numero_lineas_registradas,
    precio_lineas_registradas,
    total_planes_actuales
  ) {
    try {
      if (!numero_lineas) {
        return "";
      }

      let resultado = "";
      const r15_celda = this.r15(
        numero_lineas,
        numero_lineas_registradas,
        precio_lineas_registradas,
        total_planes_actuales
      );
      const valor = L2_M15_RANGO.find((e) => e.id === r15_celda).text;

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
        resultado = E2_F15_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;
      } else if (numero_lineas === 3) {
        resultado = E17_F30_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;
      } else if (numero_lineas === 4) {
        resultado = E32_F45_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;
      } else if (numero_lineas === 5) {
        resultado = E47_F60_RANGO.find(
          (e) => e.id >= total_planes_actuales
        ).text;
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
        resultado = [...E2_F15_RANGO]
          .reverse()
          .find((e) => e.id <= total_planes_actuales).text;
      } else if (numero_lineas === 3) {
        resultado = [...E17_F30_RANGO]
          .reverse()
          .find((e) => e.id <= total_planes_actuales).text;
      } else if (numero_lineas === 4) {
        resultado = [...E32_F45_RANGO]
          .reverse()
          .find((e) => e.id <= total_planes_actuales).text;
      } else if (numero_lineas === 5) {
        resultado = [...E47_F60_RANGO]
          .reverse()
          .find((e) => e.id <= total_planes_actuales).text;
      }

      return resultado;
    } catch (error) {
      return "No aplica";
    }
  },
  establecer_datos() {
    const promocion = 34.9;

    const cbo_plan_linea_1 = document.getElementById("cbo_plan_linea_1");
    const cbo_plan_linea_1_texto = cbo_plan_linea_1.options[cbo_plan_linea_1.selectedIndex].text;

    const cbo_plan_linea_2 = document.getElementById("cbo_plan_linea_2");
    const cbo_plan_linea_2_texto = cbo_plan_linea_1.options[cbo_plan_linea_2.selectedIndex].text;
    const cbo_plan_linea_2_tipo = LISTA_PLANES.find(e => e.plan === cbo_plan_linea_2_texto).tipo;

    const cbo_plan_linea_3 = document.getElementById("cbo_plan_linea_3");
    const cbo_plan_linea_3_texto = cbo_plan_linea_1.options[cbo_plan_linea_3.selectedIndex].text;
    const cbo_plan_linea_3_tipo = LISTA_PLANES.find(e => e.plan === cbo_plan_linea_3_texto).tipo;

    const cbo_plan_linea_4 = document.getElementById("cbo_plan_linea_4");
    const cbo_plan_linea_4_texto = cbo_plan_linea_1.options[cbo_plan_linea_4.selectedIndex].text;
    const cbo_plan_linea_4_tipo = LISTA_PLANES.find(e => e.plan === cbo_plan_linea_4_texto).tipo;

    const cbo_plan_linea_5 = document.getElementById("cbo_plan_linea_5");
    const cbo_plan_linea_5_texto = cbo_plan_linea_1.options[cbo_plan_linea_5.selectedIndex].text;
    const cbo_plan_linea_5_tipo = LISTA_PLANES.find(e => e.plan === cbo_plan_linea_5_texto).tipo;

    const plan_linea_1 = Number(document.querySelector("#cbo_plan_linea_1").value);
    const plan_linea_2 = cbo_plan_linea_2_texto === cbo_plan_linea_1_texto && cbo_plan_linea_2_tipo === "FAMILIA" ? 34.9 : Number(document.querySelector("#cbo_plan_linea_2").value);
    const plan_linea_3 = cbo_plan_linea_3_texto === cbo_plan_linea_1_texto && cbo_plan_linea_3_tipo === "FAMILIA" ? 34.9 : Number(document.querySelector("#cbo_plan_linea_3").value);
    const plan_linea_4 = cbo_plan_linea_4_texto === cbo_plan_linea_1_texto && cbo_plan_linea_4_tipo === "FAMILIA" ? 34.9 : Number(document.querySelector("#cbo_plan_linea_4").value);
    const plan_linea_5 = cbo_plan_linea_5_texto === cbo_plan_linea_1_texto && cbo_plan_linea_5_tipo === "FAMILIA" ? 34.9 : Number(document.querySelector("#cbo_plan_linea_5").value);

    const descuento_linea_1 = Number(document.querySelector("#cbo_descuento_linea_1").value);
    const descuento_linea_2 = Number(document.querySelector("#cbo_descuento_linea_2").value);
    const descuento_linea_3 = Number(document.querySelector("#cbo_descuento_linea_3").value);
    const descuento_linea_4 = Number(document.querySelector("#cbo_descuento_linea_4").value);
    const descuento_linea_5 = Number(document.querySelector("#cbo_descuento_linea_5").value);

    const q_lineas_actual = (plan_linea_1 ? 1 : 0) + (plan_linea_2 ? 1 : 0) + (plan_linea_3 ? 1 : 0) + (plan_linea_4 ? 1 : 0) + (plan_linea_5 ? 1 : 0);

    const pago_total_plan_actual = plan_linea_1 || plan_linea_2 || plan_linea_3 || plan_linea_4 || plan_linea_5 ?
      Number(
        (plan_linea_1 - plan_linea_1 * descuento_linea_1) +
        (plan_linea_2 - plan_linea_2 * descuento_linea_2) +
        (plan_linea_3 - plan_linea_3 * descuento_linea_3) +
        (plan_linea_4 - plan_linea_4 * descuento_linea_4) +
        (plan_linea_5 - plan_linea_5 * descuento_linea_5)
      ) : "";

    const numero_lineas = Number(document.querySelector("#cbo_numero_lineas").value);
    const costo_plan_familiar = Number(document.querySelector("#cbo_plan_familiar").value);
    const cbo_plan_familiar = document.getElementById("cbo_plan_familiar");
    const cbo_plan_familiar_texto = cbo_plan_familiar.options[cbo_plan_familiar.selectedIndex].text;

    /*let numero_lineas_registradas = 0;
    let precio_lineas_registradas = [];

    document.querySelectorAll(".cbo_planes").forEach((elemento) => {
      const precio = Number(elemento.value);

      if (precio > 0) {
        numero_lineas_registradas++;

        precio_lineas_registradas.push(precio);
      }
    });*/

    const lineas_nuevas_actuales = q_lineas_actual + numero_lineas;

    const plan_sugerido_linea_adicional = HELPERS.plan_sugerido_linea_adicional(
      [plan_linea_1, plan_linea_2, plan_linea_3, plan_linea_4, plan_linea_5],
      pago_total_plan_actual,
      numero_lineas,
      lineas_nuevas_actuales
    );

    const plan_sugerido_cdp1 = HELPERS.cdp1(
      [plan_linea_1, plan_linea_2, plan_linea_3, plan_linea_4, plan_linea_5],
      pago_total_plan_actual,
      numero_lineas,
      lineas_nuevas_actuales
    );

    const plan_sugerido_cdp2 = HELPERS.cdp2(
      q_lineas_actual,
      pago_total_plan_actual,
      numero_lineas
    );

    const pago_sin_descuento = lineas_nuevas_actuales > 5 ? 0 : Number(lineas_nuevas_actuales * costo_plan_familiar);

    const pago_con_descuento = LISTA_MENSUAL_CON_FAMILIA.find(e => e.plan === cbo_plan_familiar_texto && e.lineas === lineas_nuevas_actuales)?.monto

    /*const pago_con_20x3 = numero_lineas && cbo_plan_familiar_texto !== "-" && lineas_nuevas_actuales !== "0" ?
      (!q_lineas_actual ?
        LISTA_20x3.find(e => e.lineas_nuevas_actuales === lineas_nuevas_actuales && e.text === cbo_plan_familiar_texto).id
        :
        LISTA_LINEAS_20x3.find(e => e.q_lineas_actuales === q_lineas_actual && e.lineas_nuevas_actuales === lineas_nuevas_actuales && e.text === cbo_plan_familiar_texto).id)
      :
      0;*/

    const tipo_cliente = q_lineas_actual ? "BASE" : "NUEVO";

    const pago_con_20x3 = HELPERS.pago_20x3(q_lineas_actual, tipo_cliente, pago_con_descuento, cbo_plan_familiar_texto, numero_lineas, lineas_nuevas_actuales);

    const pago_ahorro_mensual_familiar = pago_sin_descuento - pago_con_20x3;

    const pago_ahorro_anual_familiar = (pago_sin_descuento * 12) - ((pago_con_descuento * 6) + (pago_con_20x3 * 6));

    const pago_diferencia_factura = !pago_total_plan_actual ? 0 : Number(pago_con_20x3 - pago_total_plan_actual);

    document.querySelector("#txt_q_lineas_actual").value = q_lineas_actual || "";
    document.querySelector("#txt_pago_sin_descuento").value = pago_sin_descuento ? pago_sin_descuento.toFixed(2) : "";
    document.querySelector("#txt_pago_con_descuento").value = pago_con_descuento ? pago_con_descuento.toFixed(2) : "";
    document.querySelector("#txt_pago_con_20x3").value = pago_con_20x3 ? pago_con_20x3.toFixed(2) : "";
    document.querySelector("#txt_pago_ahorro_mensual_plan_familiar").value = pago_ahorro_mensual_familiar ? pago_ahorro_mensual_familiar.toFixed(2) : "";
    document.querySelector("#txt_pago_ahorro_anual_plan_familiar").value = pago_ahorro_anual_familiar ? pago_ahorro_anual_familiar.toFixed(2) : "";
    document.querySelector("#txt_lineas_nuevas_actuales").value = lineas_nuevas_actuales || "";
    document.querySelector("#txt_pago_total_plan_actual").value = pago_total_plan_actual ? pago_total_plan_actual.toFixed(2) : "";
    document.querySelector("#txt_tipo_cliente").value = tipo_cliente;
    document.querySelector("#txt_pago_diferencia_factura").value = pago_diferencia_factura ? pago_diferencia_factura.toFixed(2) : "";
    document.querySelector("#txt_plan_sugerido_linea_adicional").value = plan_sugerido_linea_adicional || "";
    document.querySelector("#txt_plan_sugerido_cdp1").value = plan_sugerido_cdp1 || "";
    document.querySelector("#txt_plan_sugerido_cdp2").value = plan_sugerido_cdp2 || "";
  },
  plan_sugerido_linea_adicional(lista_montos_planes_actuales, total_planes_actuales, lineas_adicionales, total_lineas) {
    if (lineas_adicionales < 1) {
      return "NO APLICA";
    }

    const t25 = this.t25(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales);

    return t25;
  },
  cdp1(lista_montos_planes_actuales, total_planes_actuales, lineas_adicionales, total_lineas) {
    if (lineas_adicionales > 0) {
      return "NO APLICA";
    }

    const t31 = this.t31(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales);

    return t31;
  },
  cdp2(q_lineas, total_planes_actuales, lineas_adicionales) {
    if (lineas_adicionales > 0) {
      return "NO APLICA";
    }

    const t36 = this.t36(q_lineas, total_planes_actuales);

    return t36;
  },
  t24(lineas_adicionales, lista_montos_planes_actuales) {
    if (lineas_adicionales === 0) {
      return "-";
    }

    if (lista_montos_planes_actuales.max() < 39.9) {
      return "ENTEL POWER FAMILIAR+ 39.90 R";
    }

    let indice_plan_familiar_siguiente;

    for (let i = 0; i < LISTA_PLANES_FAMILIARES.length; i++) {
      if (LISTA_PLANES_FAMILIARES[i].monto === lista_montos_planes_actuales.max()) {
        indice_plan_familiar_siguiente = i + 1;

        break;
      } else if (LISTA_PLANES_FAMILIARES[i].monto > lista_montos_planes_actuales.max()) {
        indice_plan_familiar_siguiente = i;

        break;
      }
    }

    if (!indice_plan_familiar_siguiente) {
      return "-";
    }

    return LISTA_PLANES_FAMILIARES[indice_plan_familiar_siguiente].plan;
  },
  t30(lineas_adicionales, lista_montos_planes_actuales) {
    if (lineas_adicionales !== 0) {
      return "-";
    }

    if (lista_montos_planes_actuales.max() < 39.9) {
      return "ENTEL POWER FAMILIAR+ 39.90 R";
    }

    let indice_plan_familiar_siguiente;

    for (let i = 0; i < LISTA_PLANES_FAMILIARES.length; i++) {
      if (LISTA_PLANES_FAMILIARES[i].monto === lista_montos_planes_actuales.max()) {
        indice_plan_familiar_siguiente = i + 1;

        break;
      } else if (LISTA_PLANES_FAMILIARES[i].monto > lista_montos_planes_actuales.max()) {
        indice_plan_familiar_siguiente = i;

        break;
      }
    }

    if (!indice_plan_familiar_siguiente) {
      return "-";
    }

    return LISTA_PLANES_FAMILIARES[indice_plan_familiar_siguiente].plan;
  },
  t36(q_lineas, total_planes_actuales) {
    const lista = LISTA_MENSUAL_CON_FAMILIA.filter(e => e.lineas === q_lineas);

    let indice_plan_familiar_siguiente;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].monto === total_planes_actuales) {
        indice_plan_familiar_siguiente = i;

        break;
      } else if (lista[i].monto > total_planes_actuales) {
        indice_plan_familiar_siguiente = i - 1;

        break;
      }
    }

    if (!indice_plan_familiar_siguiente) {
      return "ENTEL POWER FAMILIAR+ 39.90 R";
    }

    return lista[indice_plan_familiar_siguiente].plan;
  },
  v24(lineas_adicionales, total_lineas, lista_montos_planes_actuales) {
    const t24 = this.t24(lineas_adicionales, lista_montos_planes_actuales);

    const monto = LISTA_MENSUAL_CON_FAMILIA.find(e => e.plan === t24 && e.lineas === total_lineas)?.monto;

    if (!monto) {
      return 0;
    }

    return monto;
  },
  v25(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales) {
    const t25 = this.t25(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales);

    const monto = LISTA_MENSUAL_CON_FAMILIA.find(e => e.plan === t25 && e.lineas === total_lineas)?.monto;

    if (!monto) {
      return 0;
    }

    return monto;
  },
  v30(lineas_adicionales, total_lineas, lista_montos_planes_actuales) {
    const t30 = this.t30(lineas_adicionales, lista_montos_planes_actuales);

    const monto = LISTA_MENSUAL_CON_FAMILIA.find(e => e.plan === t30 && e.lineas === total_lineas)?.monto;

    if (!monto) {
      return 0;
    }

    return monto;
  },
  v31(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales) {
    const t31 = this.t31(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales);

    const monto = LISTA_MENSUAL_CON_FAMILIA.find(e => e.plan === t31 && e.lineas === total_lineas)?.monto;

    if (!monto) {
      return 0;
    }

    return monto;
  },
  t25(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales) {
    const t24 = this.t24(lineas_adicionales, lista_montos_planes_actuales);
    const v24 = this.v24(lineas_adicionales, total_lineas, lista_montos_planes_actuales);

    if (v24 > total_planes_actuales) {
      return t24;
    }

    const lista = LISTA_MENSUAL_CON_FAMILIA.filter(e => e.lineas === total_lineas);

    let indice_plan_familiar_siguiente;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].monto === total_planes_actuales) {
        indice_plan_familiar_siguiente = i + 1;

        break;
      } else if (lista[i].monto > total_planes_actuales) {
        indice_plan_familiar_siguiente = i;

        break;
      }
    }

    if (!indice_plan_familiar_siguiente) {
      return "ENTEL POWER FAMILIAR 129.90 SD N";
    }

    return lista[indice_plan_familiar_siguiente].plan;
  },
  t31(lineas_adicionales, total_lineas, lista_montos_planes_actuales, total_planes_actuales) {
    const t30 = this.t30(lineas_adicionales, lista_montos_planes_actuales);
    const v30 = this.v30(lineas_adicionales, total_lineas, lista_montos_planes_actuales);

    if (v30 > total_planes_actuales) {
      return t30;
    }

    const lista = LISTA_MENSUAL_CON_FAMILIA.filter(e => e.lineas === total_lineas);

    let indice_plan_familiar_siguiente;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].monto === total_planes_actuales) {
        indice_plan_familiar_siguiente = i + 1;

        break;
      } else if (lista[i].monto > total_planes_actuales) {
        indice_plan_familiar_siguiente = i;

        break;
      }
    }

    if (!indice_plan_familiar_siguiente) {
      return "-";
    }

    return lista[indice_plan_familiar_siguiente].plan;
  },
  pago_20x3(q_lineas, tipo_cliente, pago_mensual_con_familia, plan_familiar, lineas_portar, total_lineas) {
    if (lineas_portar === 0) {
      return pago_mensual_con_familia;
    }

    if (tipo_cliente === "NUEVO") {
      return LISTA_MENSUAL_50_20X6_CLIENTE_NUEVO.find(e => e.plan === plan_familiar && e.linea === total_lineas)?.monto;  // L73
    }

    return LISTA_MENSUAL_50_20X6_CLIENTE_BASE.find(e => e.linea_base === q_lineas && e.linea === total_lineas && e.plan === plan_familiar)?.monto;
  }
};

const INICIALIZAR_ELEMENTOS = {
  init() {
    this.selects();
    this.inputs();
    this.otros();
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
        opcion.textContent = obj.plan;
        opcion.value = obj.monto;
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
      opcion.textContent = obj.plan;
      opcion.value = obj.monto;
      cbo_plan_familiar.appendChild(opcion);
    });
  },
  inputs() {
    document.querySelectorAll("input[type='text']").forEach((input) => {
      input.readOnly = true;
    });
  },
  otros() {
    Array.prototype.max = function () {
      return Math.max.apply(null, this);
    };
  }
};

const INICIALIZAR_TODO = {
  init: () => {
    EVENTOS.init();
    INICIALIZAR_ELEMENTOS.init();
  },
};

INICIALIZAR_TODO.init();
