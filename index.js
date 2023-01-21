class Barco {
    longitud = 0
    numero_disparos = 0
    esta_hundido = false
    identificador = ""
    constructor(longitud, identificador) {
        this.longitud = longitud
        this.identificador = identificador
        this.esta_tocado = false
        this.esta_hundido = false
        this.numero_disparos = 0
    }

    recibir_disparo() {
        this.numero_disparos++
        this.esta_tocado = true;
        if(this.numero_disparos == this.longitud){
            this.esta_hundido = true
        }
    }
}

class Jugador {
    nombre
    tiene_barcos_sin_hundir
    disparos_restantes
    
    constructor(nombre){
        this.nombre = nombre
        this.tiene_barcos_sin_hundir = true
        this.disparos_restantes = 100
    }
}

class Casilla {
    tiene_barco = false
    hay_agua = false
    barco = "" // identificador del barco
    esta_vacia = !this.tiene_barco && this.hay_agua // esto se usara para los disparos
    disparada
    barco_hundido 

    constructor(){
        this.tiene_barco = false
        this.hay_agua = false
        this.barco = ""
        this.esta_vacia = !this.tiene_barco && this.hay_agua 
        this.disparada = false
        this.barco_hundido = false
    }

    obtener_estado_casilla_adversario() {
        
        if (this.disparada == false) {
            return " vaci "
        } else if (this.tiene_barco == true) {
            if (this.barco_hundido == true) {
                return " hund "
            } else {
                return " toca "
            }
        } else {
            return " agua "
        }    
    }

    obtener_estado_casilla_propia() {
        
        if (this.disparada == true) {
            if (this.tiene_barco == true) {
                if (this.barco_hundido) {
                    return " hund "
                } else {
                    return " toca "
                }
            } else {
                return " agua "
            }
        } else {
            if (this.tiene_barco == true) {
                return " "+ this.barco+" "
            } else {
                return " agua "
            }
        }
    }
}


class Tablero {
    filas = new Array(10)
    barcos = new Array(10)
    propietario = ""  
    constructor (propietario) {
        for (let index = 0; index < 10; index++) {
            this.filas[index] = new Array(10);
        }
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.filas[x][y] = new Casilla()
            }
        }
        this.propietario = propietario
        const portaaviones = new Barco(5,"port")
        const buque = new Barco(4, "buq1")
        const submarino1 = new Barco(3, "sub1")
        const submarino2 = new Barco(3, "sub2")
        const crucero1 = new Barco(2, "cru1")
        const crucero2 = new Barco(2, "cru2")
        const crucero3 = new Barco(2, "cru3")
        const lancha1 = new Barco(1, "lan1")
        const lancha2 = new Barco(1, "lan2")
        const lancha3  = new Barco(1, "lan3")

        this.barcos[0] = portaaviones
        this.barcos[1] = buque
        this.barcos[2] = submarino1
        this.barcos[3] = submarino2
        this.barcos[4] = crucero1
        this.barcos[5] = crucero2
        this.barcos[6] = crucero3
        this.barcos[7] = lancha1
        this.barcos[8] = lancha2
        this.barcos[9] = lancha3
    }
    
    pintar(nombre) {
        let tablero = ""
        let letras = {
            0: "J",
            1: "I",
            2: "H",
            3: "G",
            4: "F",
            5: "E",
            6: "D",
            7: "C",
            8: "B",
            9: "A"
        }
        for (let x = 0; x < 10; x++) {
            tablero += letras[x]
            for (let y = 0; y < 10; y++) {
                if(this.propietario=="propio") {
                    tablero += this.filas[x][y].obtener_estado_casilla_propia()
                } else {
                    tablero += this.filas[x][y].obtener_estado_casilla_adversario()
                } 
            }
            tablero += "\n"
        }
        tablero += "   1     2     3     4     5     6     7     8     9     10"
        console.log("-------------------TABLERO %s---------------------------",nombre)
        console.log(tablero);
    }

    colocar_barcos() {
        for (let indice_barcos = 0; indice_barcos < this.barcos.length; indice_barcos++) {
            let punto_original_barco = this.elegir_inicio_barco()
            let orientacion_barco = this.elegir_orientacion_barco(punto_original_barco, this.barcos[indice_barcos].longitud) 
            this.colocar_barco(punto_original_barco, orientacion_barco, this.barcos[indice_barcos].identificador, this.barcos[indice_barcos].longitud)
        }
    }

    colocar_barco(punto_original_barco, orientacion_barco, identificador, longitud) { //punto_original_barco = array, [0] -> fila, [1] -> columna
        switch (orientacion_barco) {
            case 1: //orientacion arriba
                for (let x = punto_original_barco[0]; x >= punto_original_barco[0] - (longitud-1); x--) {
                    this.filas[x][punto_original_barco[1]].tiene_barco = true
                    this.filas[x][punto_original_barco[1]].barco = identificador
                }
                break
            case 2: //orientacion derecha
                for (let y = punto_original_barco[1]; y <= punto_original_barco[1] + (longitud-1); y++) {
                    this.filas[punto_original_barco[0]][y].tiene_barco = true
                    this.filas[punto_original_barco[0]][y].barco = identificador
                }
                break
            case 3: // orientacion abajo
                for (let x = punto_original_barco[0]; x <= punto_original_barco[0] + (longitud-1); x++) {
                    this.filas[x][punto_original_barco[1]].tiene_barco = true
                    this.filas[x][punto_original_barco[1]].barco = identificador
                }
                break
            case 4: //orientacion izquierda
                for (let y = punto_original_barco[1]; y >= punto_original_barco[1] - (longitud-1); y--) {
                    this.filas[punto_original_barco[0]][y].tiene_barco = true
                    this.filas[punto_original_barco[0]][y].barco = identificador
                }
                break
        }
    }


    elegir_inicio_barco() {
        let casilla_valida = false
        let array_respuesta = new Array()
        while (casilla_valida == false){
            let indice_fila = this.generar_numer_aleatorio(0, 9);
            let indice_columna = this.generar_numer_aleatorio(0, 9);

            if (!this.filas[indice_fila][indice_columna].tiene_barco) {
                casilla_valida = true;
                array_respuesta[0] = indice_fila
                array_respuesta[1] = indice_columna
            }
        }
        return array_respuesta;
    }

    elegir_orientacion_barco(punto_original_barco, longitud) {
      let orientacion_elegida = false
      let orientacion_barco = 0
      let numero_orientaciones_probadas
        while (orientacion_elegida == false){
            //Si ninguna orientacion es valida tiene que elegir un nuevo punto de inicio
            if (numero_orientaciones_probadas >= 8) {
                punto_original_barco = this.elegir_inicio_barco()
                numero_orientaciones_probadas = 0
            }

            orientacion_barco = this.generar_numer_aleatorio(1, 4)
            
        let orientacion_erronea =false
            switch (orientacion_barco) {
                case 1: //orientacion arriba
                for (let x = punto_original_barco[0]; x >= punto_original_barco[0] - (longitud-1); x--) {
                        if (x < 0) {
                           orientacion_erronea = true
                           break
                        }

                        if (this.filas[x][punto_original_barco[1]].tiene_barco) {
                            orientacion_erronea = true
                            break
                        }
                    }
                    orientacion_erronea == true ? orientacion_elegida = false : orientacion_elegida =true 
                    numero_orientaciones_probadas++
                    break
                case 2: //orientacion derecha
                for (let y = punto_original_barco[1]; y <= punto_original_barco[1] + (longitud-1); y++) {
                        if (y > 9) {
                            orientacion_erronea = true
                            break
                        }
                        if ( this.filas[punto_original_barco[0]][y].tiene_barco){
                            orientacion_erronea = true
                            break
                        }
                    }
                    orientacion_erronea == true ? orientacion_elegida = false : orientacion_elegida =true 
                    numero_orientaciones_probadas++
                    break
                case 3: // orientacion abajo
                for (let x = punto_original_barco[0]; x <= punto_original_barco[0] + (longitud-1); x++) {
                   
                        if (x > 9) {
                            orientacion_erronea = true
                            break
                        }

                        if (this.filas[x][punto_original_barco[1]].tiene_barco) {
                            orientacion_erronea = true
                            break
                        }
                    }
                    orientacion_erronea == true ? orientacion_elegida = false : orientacion_elegida =true 
                    numero_orientaciones_probadas++
                    break
                case 4: //orientacion izquierda
                    for (let y = punto_original_barco[1]; y >=  punto_original_barco[1] - (longitud-1); y--) {
                      
                        if (y < 0) {
                            orientacion_erronea = true
                           break
                        }
                        if (this.filas[punto_original_barco[0]][y].tiene_barco){
                            orientacion_erronea = true
                           break
                        }
                    }
                    orientacion_erronea == true ? orientacion_elegida = false : orientacion_elegida =true 
                    numero_orientaciones_probadas++
                    break
            }
        }

        return orientacion_barco; 
    }

    generar_numer_aleatorio(min, max) {
        return Math.floor((Math.random() * (max - min +1)) + min);
    }

    disparar() {
        let casilla_valida = false
        let x = 10
        let y = 10
        let respuesta = {
            0: false, //ha tocado barco?
            1: true // le quedan barcos sin hudir?
        }

        while(casilla_valida == false) {
            x = this.generar_numer_aleatorio(0, 9);
            y = this.generar_numer_aleatorio(0, 9);

            if (this.filas[x][y].disparada == false) {
                casilla_valida = true
            }
        }

        this.filas[x][y].disparada = true

        console.log("Se ha disparado a la Casilla %s:%s", x, y)

        if(this.filas[x][y].tiene_barco == true) {
            respuesta[0] = true
            let identificador = this.filas[x][y].barco
            let quedan_barcos_sin_hundir = false
            let barco_hundido = false
            this.barcos.forEach(function(barco) {
                if(identificador == barco.identificador){
                    barco.recibir_disparo()
                    barco_hundido = barco.esta_hundido
                }
                if(barco.esta_hundido == false) {
                    quedan_barcos_sin_hundir = true
                }
            })

            this.filas[x][y].barco_hundido = barco_hundido

            if (barco_hundido == true) {
                for (let x = 0; x < 10; x++) {
                    for (let y = 0; y < 10; y++) {
                        if (this.filas[x][y].barco == identificador) {
                            this.filas[x][y].barco_hundido = true
                        }
                    }
                }
            }

            if(quedan_barcos_sin_hundir == true) {
                respuesta[1] = true
            } else {
                respuesta[1] = false
            }

        }
        
        return respuesta
        
    }

    clonar_posicion_barcos(tablero) {
        this.filas = tablero
    }
}

const jugador_rojo = new Jugador("Jugador Rojo")
const jugador_azul = new Jugador("Jugador Azul")

const tablero_rojo_propio = new Tablero("propio")
const tablero_azul_propio = new Tablero("propio")

const tablero_rojo_adversario = new Tablero("adversario")
const tablero_azul_adversario = new Tablero("adversario")

tablero_rojo_propio.colocar_barcos()
tablero_azul_propio.colocar_barcos()

tablero_rojo_adversario.clonar_posicion_barcos(tablero_azul_propio.filas)
tablero_azul_adversario.clonar_posicion_barcos(tablero_rojo_propio.filas)


tablero_rojo_propio.pintar(jugador_rojo.nombre + " propio");
tablero_azul_propio.pintar(jugador_azul.nombre + " propio");


console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
console.log("Bienvenid@ a la Guerra")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
console.log("Empiezan las Batallas")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

let contador = 0

while (jugador_rojo.tiene_barcos_sin_hundir == true && jugador_azul.tiene_barcos_sin_hundir == true) {
    contador++
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("Batalla %s", contador)
    if (jugador_rojo.tiene_barcos_sin_hundir == true && jugador_azul.tiene_barcos_sin_hundir == true) {
        console.log("**Turno del Jugador Rojo")
        let jugador_rojo_sigue_disparando = true

        while(jugador_rojo_sigue_disparando == true && jugador_azul.tiene_barcos_sin_hundir == true) {
            let respuesta = tablero_rojo_adversario.disparar();
            jugador_rojo_sigue_disparando = respuesta[0]
            if (respuesta[1] == false) {
                jugador_azul.tiene_barcos_sin_hundir = false;
            }
            tablero_rojo_propio.pintar(jugador_rojo.nombre + " propio")
            tablero_rojo_adversario.pintar(jugador_rojo.nombre + " adversario")
            jugador_rojo.disparos_restantes--
            console.log("Disparos Restantes del Jugador Rojo: %s", jugador_rojo.disparos_restantes)
        }
    }
    if (jugador_rojo.tiene_barcos_sin_hundir == true && jugador_azul.tiene_barcos_sin_hundir == true) {
        console.log("**Turno del Jugador Azul")
        let jugador_azul_sigue_disparando = true

        while(jugador_azul_sigue_disparando == true && jugador_rojo.tiene_barcos_sin_hundir == true) {
            let respuesta = tablero_azul_adversario.disparar();
            jugador_azul_sigue_disparando = respuesta[0]
            if (respuesta[1] == false) {
                jugador_rojo.tiene_barcos_sin_hundir = false;
            }
            tablero_azul_propio.pintar(jugador_azul.nombre + " propio")
            tablero_azul_adversario.pintar(jugador_azul.nombre + " adversario")
            jugador_azul.disparos_restantes--
            console.log("Disparos Restantes del Jugador Azul: %s", jugador_azul.disparos_restantes)
        }
    }
}

console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
console.log("La Guerra ha terminado")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
console.log("En cualquier historia de guerra está lo que se ve \ny lo que se esconde. Charles Cholmondeley")
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")

tablero_rojo_propio.pintar(jugador_rojo.nombre + " propio");
tablero_azul_propio.pintar(jugador_azul.nombre + " propio");

if(jugador_azul.tiene_barcos_sin_hundir) {
    console.log("\n¡¡Jugador Azul Gana La Partida!!")
}else{
    console.log("\n¡¡Jugador Rojo Gana La Partida!!")
}