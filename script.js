const boton_sorteo = document.getElementById("boton_sorteo");

// Un bloque define a un conjunto de cosas a rifar
class bloque {
    constructor(id, nombre_imagen){
        this.id = id;
        this.img = nombre_imagen;
        this.paisesComites = []; // Opcional: puede quedar vacío
    }
    getID (){
        return this.id
    }

}

// handler a cargo de la lógica
class handler {
    constructor() {
        this.instituciones = ['01. Preparatoria de Jalisco',
                            '02. Preparatoria No. 02', 
                            '03. Preparatoria No. 03', 
                            '04. Preparatoria No. 04', 
                            '05. Preparatoria No. 05', 
                            '06. Preparatoria No. 06', 
                            '07. Preparatoria No. 07', 
                            '08. Preparatoria No. 08',
                            '09. Preparatoria No. 09',
                            '10. Preparatoria No. 10',
                            '11. Preparatoria No. 11',
                            '12. Preparatoria No. 12',
                            '13. Preparatoria No. 13',
                            '14. Preparatoria No. 14',
                            '15. Preparatoria No. 15',
                            '16. Preparatoria No. 16',
                            '17. Preparatoria No. 17',
                            '18. Preparatoria No. 18',
                            '19. Preparatoria No. 19',
                            '20. Preparatoria No. 20',
                            '21. Preparatoria No. 21 de Zapopan',
                            '22. Escuela Preparatoria No. 22',
                            '23. Escuela Vocacional',
                            '24. Escuela Politécnica de Guadalajara',
                            '25. Escuela Politécnica "Ing. Jorge Matute Remus"',
                            '26. Preparatoria de Tonalá',
                            '27. Preparatoria de Tonalá Norte',
                            '28. Escuela de Educación Media Superior Wixárika',
                            '29. Escuela Regional de Educación Media Superior de Ocotlán',
                            '30. Preparatoria de San José del Valle de Tlajomulco de Zúñiga',
                            '31. Preparatoria Regional de Ahualulco de Mercado',
                            '32. Preparatoria Regional de Amatitán',
                            '33. Preparatoria Regional de Ameca',
                            '34. Preparatoria Regional de Arandas',
                            '35. Preparatoria Regional de Atotonilco',
                            '36. Preparatoria Regional de Autlán de Navarro',
                            '37. Preparatoria Regional de Casimiro Castillo',
                            '38. Preparatoria Regional de Chapala',
                            '39. Preparatoria Regional de Cihuatlán',
                            '40. Preparatoria Regional de Ciudad Guzmán',
                            '41. Preparatoria Regional de Cocula',
                            '42. Preparatoria Regional de Colotlán',
                            '43. Preparatoria Regional de Degollado',
                            '44. Preparatoria Regional de El Grullo',
                            '45. Preparatoria Regional de El Salto',
                            '46. Preparatoria Regional de Etzatlán',
                            '47. Preparatoria Regional de Huejuquilla El Alto',
                            '48. Preparatoria Regional de Jalostotitlán',
                            '49. Preparatoria Regional de Jamay',
                            '50. Preparatoria Regional de Jocotepec',
                            '51. Preparatoria Regional de La Barca',
                            '52. Preparatoria Regional de Lagos de Moreno',
                            '53. Preparatoria Regional de Puerto Vallarta',
                            '54. Preparatoria Regional de San Juan de Los Lagos',
                            '55. Preparatoria Regional de San Martín Hidalgo',
                            '56. Preparatoria Regional de San Miguel El Alto',
                            '57. Preparatoria Regional de Santa Anita',
                            '58. Preparatoria Regional de Sayula',
                            '59. Preparatoria Regional de Tala',
                            '60. Preparatoria Regional de Tamazula de Gordiano',
                            '61. Preparatoria Regional de Tecolotlán',
                            '62. Preparatoria Regional de Tepatitlán de Morelos',
                            '63. Preparatoria Regional de Tequila',
                            '64. Preparatoria Regional de Tlajomulco de Zúñiga',
                            '65. Preparatoria Regional de Toluquilla',
                            '66. Preparatoria Regional de Tuxpan',
                            '67. Preparatoria Regional de Unión de Tula',
                            '68. Preparatoria Regional de Villa Corona',
                            '69. Preparatoria Regional de Zacoalco de Torres',
                            '70. Preparatoria Regional de Zapotiltic',
                            '71. Preparatoria Regional de Zapotlanejo'
                            ];
        this.bloques = [];
        this.etapa = 0; // 0 = "previo al sorteo, 1 = sorteo de instituciones, 2 sorteo de bloques"
        this.bloques_sorteados = 0;

    }

    // Dado un array, revuelve sus contenidos
    revolver(array) {
        let indice_actual = array.length,  indice_aleatorio;
        while (indice_actual != 0) {
            // Elegir un elemento
            indice_aleatorio = Math.floor(Math.random() * indice_actual);
            indice_actual--;

            // E intercambiarlo por el actual
            [array[indice_actual], array[indice_aleatorio]] = [
                array[indice_aleatorio], array[indice_actual]
            ];
        }

        return array;
    }

    // Revuelve instituciones y bloques para repartir
    sorteo() {
        console.log("La etapa es: "+  this.etapa);
        switch (this.etapa) {
            case 0:
                // Imprimir instituciones en orden
                this.instituciones.forEach(institucion => {
                    gmHandler.crearFila(institucion);
                });
                // Transicionar a siguiente etapa
                boton_sorteo.innerHTML = "Sorteo de turnos";
                this.etapa++;
                break;
            case 1:
                // Revolver instituciones e imprimir
                this.instituciones = this.revolver(this.instituciones);
                this.borrarFilas();
                this.instituciones.forEach(institucion => {
                    gmHandler.crearFila(institucion);
                });
                //Transicionar a siguiente etapa (y rifar bloques)
                boton_sorteo.innerHTML = "Rifar bloque";
                this.bloques = this.revolver(this.bloques);
                this.etapa++;
                break;
            case 2:
                // Mostrar uno por uno los resultados hasta que se acaben
                this.borrarFilas();
                    this.bloques_sorteados++;
                    
                    // Imprimir completo los sorteados
                    for (let i = 0; i < this.bloques_sorteados; i++) {
                        this.crearFila(
                            this.instituciones[i],
                            this.bloques[i].id,
                            this.bloques[i].img
                        );
                    }
                    // Imprimir solo la institución de los no sorteados
                    for (let i = this.bloques_sorteados; i < this.instituciones.length; i++) {
                        this.crearFila(
                            this.instituciones[i]
                        );
                    }
                    // Transición hacia el fin del sorteo
                    if (this.bloques_sorteados == this.instituciones.length){
                        boton_sorteo.innerHTML = "Fin del sorteo";
                        this.bloques_sorteados++;;
                        
                    }
                    break;
            default:
                boton_sorteo.innerHTML = "Fin del sorteo";
                
        }
    }

    // Si las diapositivas se guardan como "imgk.PNG" para k=1,2,... esta función crea bloque
    // para cada k con su imagen respectiva en PNG
    crearBloques() {
        for (let index = 1; index < this.instituciones.length + 1; index++) {
            this.bloques.push(new bloque(index, "img" + index + ".JPG"));
        }
    }

    crearFila(institucion, bloque, img_filename) {
    // Preparar elementos
        let tabla = document.getElementById("tabla-sorteo")
        let fila = document.createElement("tr");
        let dato1 = document.createElement("td");
        dato1.innerHTML = institucion;
        let dato2 = document.createElement('td');

        // En caso de que se pase más de un argumento
        if (bloque != undefined || img_filename != undefined){
            let link = document.createElement('a');
            link.href = "./img/" + img_filename;
            link.target = "_blank";
            link.innerHTML = bloque;
            dato2.appendChild(link)
        }

        // Agregar elementos al DOM
        fila.appendChild(dato1);
        fila.appendChild(dato2);
        tabla.appendChild(fila);
    }

    borrarFilas (){
        let tabla = document.getElementById("tabla-sorteo");
        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
    }


}

// Al cargar página web
let gmHandler = new handler();
gmHandler.crearBloques();

//gmHandler.crearFila("HARVARD", 1, "img1.PNG");