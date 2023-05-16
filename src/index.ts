import Chart from "chart.js/auto";
import $ from "jquery";

// El contenido de esta función se ejecuta cuando la página termina de cargar.
$(() => {
    /* Esta variable data y la llamada a new Chart() no son parte de la solución,
       son sólo para generar una gráfica con la misma biblioteca. */
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    new Chart(
        document.getElementById("acquisitions"),
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                    }
                ]
            }
        });

    // Aquí se asocia el evento de click al botón para imprimir (o exportar).
    $("#exportar").on("click", () => {
        /* Se usó la solución con la función print. Aquí se crea la ventana sólo con el contenido que se imprime.
           Las dimensiones no importan pero de preferencia que acomoden la gráfica. */
        var ventana = window.open("", "print", "height=720,width:300")!;

        /* Aquí se copia el contenido del div "contenido" que tiene la parte que se exporta a la ventana nueva.
           Debe incluir el canvas donde se genera la gráfica.
           Se agrega también la función llenarCanvas que permite copiar el contenido del canvas original con la gráfica. */
        ventana.document.write(`
        <html class="no-js" lang="en" dir="ltr">
        <head>
             <meta http-equiv="x-ua-compatible" content="IE=EDGE">
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=0.8">
              <title>BI B@anking</title>
            <!-- CSS -->
            <style>

    /*-----------------------------------GENERAL---------------------------------------*/
    /*Tipografia*/
		@font-face {
		  font-family: "Raleway-Regular";
		  src: url(../../fonts/Raleway/Raleway-Regular.ttf);
		}
		@font-face {
		  font-family: "Lato-Regular";
		  src: url(../../fonts/Lato/Lato-Regular.ttf);
		}
		.numero {
		    font-family: Lato-Regular !important;
		}

	/*Etiquetas*/
	    html,body {
		    margin: 0 auto !important;
		    padding: 0 !important;
		    height: 100% !important;
		    width: 100% !important;
			/*background: #f1f1f1;*/
		}

		div[style*="margin: 16px 0"] {
		    margin: 0 !important;
		}

		/*TABLAS*/
		table,td {
		    mso-table-lspace: 0pt !important;
		    mso-table-rspace: 0pt !important;
		}
		table {
		    border-spacing: 0 !important;
		    border-collapse: collapse !important;
		    table-layout: fixed !important;
		    margin: 0 auto !important;
		}
		tbody td {
		    padding: 0.5rem 0.625rem 0.625rem;
		    vertical-align: top;
		}
		table.table_border {
		    border: 1px solid #00000029;
		    width: 100%;
		}

    	/*ESPACIOS*/
		.row-section{
			padding-left:2.5em;
			padding-right:2.5em;
		}


		hr.hr_comprobante {
			border-top: 0px;
		    border-bottom: 0.5px solid #8C8C8C;
		    font-family: 'Lato-Regular' !important;
		    font-weight: bold;
		}

		label.Txtprincipal{
			text-align: left;
		    color: #003865;
		    font-size: 14px;
		    font-weight: 600 !important;
		}

		label.Txtoperadora{
			color: #8C8C8C;
		    font-size: 16px;
		    font-weight: 400;
		    text-align: left;
		    line-height: 0.8;
		}

		label.Txtcuenta{
			color: #8C8C8C;
		    text-align: left;
		    font-weight: bold;
		    font-size: 16px;
		}

		label.Txtsaldo{
			color: #2C8B9E;
		    text-align: left;
		    font-size: 16px;
		}


		img.imagenlogo {
		    width: 30%;
		    margin-top: 20px;
		}
		canvas.imagenimpre {
		    width: 100% !important;
            height: 300px !important;
		    margin-top: 30px !important;
		    margin-bottom: 30px !important;
		}

    </style>
        </head>
        <body>
            <center style="width: 100%;" >
                <div style="max-width: 700px;" >
                    <!-- Mailing  -->
                    <table align="center" role="presentation" class="table_border">
                        <!--  ENCABEZADO -->
                          <tr>
                              <td class="bg_light row-section" style="text-align: left !important;">
                                <img class="imagenlogo" src="./logoBI.png">
                                <hr class="hr_comprobante">
                            </td>
                        </tr>
                        <!--  FIN DE ENCABEZADO -->
                        <br><br>
                        <!--  CONTENIDO -->
                        <tr>
                          <td class="bg_light footer row-section" style="text-align: left; padding-top:20px" >
                              <label class="Txtprincipal numero ">CLIENTES GENERAL</label><br>
                              <label class="Txtoperadora numero">Operadora S.A.</label><br>
                              <label class="Txtcuenta numero">Cuenta Ahorro 1234567</label><br>
                              <label class="Txtsaldo numero">Saldo Inicial del día $ 259,137.60</label>
                              
                          </td>
                        </tr>
        
                        <!--  Grafica-->
                        <tr>
                          <td class="bg_light footer row-section" style="text-align: left; padding-top:0px" >
                          ${$("#contenido").html()}
                          </td>
		        </tr>
	      </table>
	      <!-- FIN DE ENCABEZADO -->
    </div>
  </center>
  <script>
    function llenarCanvas(canvasOriginal) { var canvasNuevo = document.getElementById('acquisitions'); var contexto = canvasNuevo.getContext('2d'); canvasNuevo.width = canvasOriginal.width; canvasNuevo.height = canvasOriginal.height; contexto.drawImage(canvasOriginal, 0, 0); return canvasNuevo; }
  </script>
</body>
</html>`);
        ventana.document.close();

        // Se llama a la función agregada a la ventana nueva con el canvas original para que copie su contenido.
        ventana.llenarCanvas(document.getElementById("acquisitions"));
        
        // Se imprime la nueva ventana. Es cuestión del usuario seleccionar una impresora o el generador de PDF.
        setTimeout(() => ventana.print(), 10);
    });
});
