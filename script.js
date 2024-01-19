/*Usamos el método .sort() que nos permite ordenar los elementos de un arreglo de acuerdo 
al resultado de una función que será su parámetro.
Como queremos que nos genere números aleatorios, creamos una función 
con el método Math.random(). Esta función nos genera números desde el cero hasta el 
1 (sin incluir al 1).
*/
let primerResultado = null;
let segundoResultado = null;
let tarjeta1 = null;
let tarjeta2 = null;
let tarjetasDestapadas = 0;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 25;
let timerInicial = timer;
let tiempoRegresivoId = null; //esta variable nos permite hacer que cuando llegue a cero no disminuya más el temporizador

//Array números
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//Apuntando a documento HTML
let mostrarMov = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

numeros = numeros.sort(() =>{
    return Math.random()-0.5;
});
console.log(numeros);

const bloquearTarjetas = () =>{
    for(let i = 0; i <= 15; i++)
    {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

const contarTiempo = () =>{
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if(timer == 0)
        {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            mostrarTiempo.innerHTML = `Perdiste! Se acabó el tiempo.`
        }
    },1000);
}

//Función principal
const destapar = (id) =>{

    if(temporizador == false)
    {
        contarTiempo();      
        temporizador = true; 
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1)
    {
        //Muestro el primer numero
        tarjeta1 = document.getElementById(id); //acá guardo el elemento html con ese ID
        primerResultado = numeros[id];//con esto logramos que los 16 botones se asocien a los 16 elementos que tiene el array
        tarjeta1.innerHTML = primerResultado;
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Muestro el segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        tarjeta2.disabled = true;
        //Incremento movimiento
        movimientos++;
        mostrarMov.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado)
        {
            tarjetasDestapadas = 0;            
            //Aumento los aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8)
            {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`
                mostrarMov.innerHTML = `Movimientos: ${movimientos} 🤙🤟😎`
                mostrarTiempo.innerHTML = `Genial 🥳! Sólo demoraste ${timerInicial - timer} segundos ⏱`
            }
        }else{
            //Mostrar momentaneamente los valores y volver a ocultar
            setTimeout(() =>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },300);
        }
    }
}
