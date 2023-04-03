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
        ventana.document.write($("#contenido").html() +
            "<script>function llenarCanvas(canvasOriginal) { var canvasNuevo = document.getElementById('acquisitions'); var contexto = canvasNuevo.getContext('2d'); canvasNuevo.width = canvasOriginal.width; canvasNuevo.height = canvasOriginal.height; contexto.drawImage(canvasOriginal, 0, 0); return canvasNuevo; }</script>");
        ventana.document.close();

        // Se llama a la función agregada a la ventana nueva con el canvas original para que copie su contenido.
        ventana.llenarCanvas(document.getElementById("acquisitions"));
        ventana.focus();

        // Se imprime la nueva ventana. Es cuestión del usuario seleccionar una impresora o el generador de PDF.
        ventana.print();
    });
});
