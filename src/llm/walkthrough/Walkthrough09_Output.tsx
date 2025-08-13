import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough09_Output(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Output) {
        return;
    }

    setInitialCamera(state, new Vec3(-20.203, 0.000, -1642.819), new Vec3(281.600, -7.900, 2.298));

    let c0 = commentary(wt, null, 0)`

Finalmente, llegamos al final del modelo. La salida del bloque transformer final se pasa a través
de una normalización de capas, y luego usamos una transformación lineal (multiplicación de matrices), esta vez sin sesgo.

Esta transformación final toma cada uno de nuestros vectores columna de longitud C a longitud nvocab. Por lo tanto,
efectivamente está produciendo una puntuación para cada palabra en el vocabulario para cada una de nuestras columnas. Estas
puntuaciones tienen un nombre especial: logits.

El nombre "logits" viene de "log-odds", es decir, el logaritmo de las probabilidades de cada token. "Log" se
usa porque el softmax que aplicamos a continuación hace una exponenciación para convertir a "probabilidades" o probabilidades.

Para convertir estas puntuaciones en probabilidades agradables, las pasamos a través de una operación softmax. Ahora, para
cada columna, tenemos una probabilidad que el modelo asigna a cada palabra en el vocabulario.

En este modelo particular, efectivamente ha aprendido todas las respuestas a la pregunta de cómo ordenar
tres letras, por lo que las probabilidades están fuertemente sesgadas hacia la respuesta correcta.

Cuando estamos haciendo que el modelo avance a través del tiempo, usamos las probabilidades de la última columna para determinar el
siguiente token a añadir a la secuencia. Por ejemplo, si hemos suministrado seis tokens al modelo,
usaremos las probabilidades de salida de la 6ª columna.

La salida de esta columna es una serie de probabilidades, y en realidad tenemos que elegir una de ellas para usar
como la siguiente en la secuencia. Hacemos esto "muestreando de la distribución". Es decir, elegimos aleatoriamente
un token, ponderado por su probabilidad. Por ejemplo, un token con una probabilidad de 0.9 será
elegido el 90% del tiempo.

Sin embargo, hay otras opciones aquí, como siempre elegir el token con la probabilidad más alta.

También podemos controlar la "suavidad" de la distribución usando un parámetro de temperatura. Una temperatura más alta
hará que la distribución sea más uniforme, y una temperatura más baja la hará más
concentrada en los tokens de mayor probabilidad.

Hacemos esto dividiendo los logits (la salida de la transformación lineal) por la temperatura antes de
aplicar el softmax. Dado que la exponenciación en el softmax tiene un gran efecto en números más grandes,
hacer que todos estén más cerca juntos reducirá este efecto.
`;

}
