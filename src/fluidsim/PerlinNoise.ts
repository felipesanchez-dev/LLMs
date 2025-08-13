/**
 * GENERADOR DE RUIDO PERLIN 2D
 * 
 * El ruido Perlin es una función que genera valores pseudoaleatorios suaves y naturales.
 * Se usa aquí para crear condiciones iniciales realistas en la simulación de fluidos,
 * como variaciones de temperatura y velocidad inicial.
 * 
 * Características:
 * - Determinista: misma semilla = mismos resultados
 * - Suave: sin cambios abruptos entre valores cercanos
 * - Escalable: se puede usar a diferentes frecuencias
 */

import { makeArray } from "../utils/data";
import { Random } from "../utils/random";

export class PerlinNoise2D {
    private perm: number[]; // Tabla de permutación para pseudoaleatoriedad

    constructor(seed: number) {
        let rand = new Random(seed);
        let perm = makeArray(256, 0);
        // Generar tabla de permutación aleatoria
        for (let i = 0; i < 256; i++) {
            perm[i] = rand.randint(0, 256);
        }
        this.perm = perm;
    }

    // Vectores gradiente predefinidos para interpolación suave
    private grad2: [number, number][] = [
        [1, 1], [-1, 1], [1, -1], [-1, -1],
        [1, 0], [-1, 0], [1, 0], [-1, 0],
        [0, 1], [0, -1], [0, 1], [0, -1],
    ];

    /**
     * Genera valor de ruido en coordenadas (x, y)
     * @param x Coordenada X
     * @param y Coordenada Y
     * @returns Valor de ruido entre -1 y 1
     */
    public noise(x: number, y: number) {
        // Encontrar coordenadas de celda de grilla
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;

        // Obtener posición relativa dentro de la celda
        x -= Math.floor(x);
        y -= Math.floor(y);

        // Aplicar función de suavizado (fade)
        let u = fade(x);
        let v = fade(y);

        // Calcular hashes para las cuatro esquinas
        let A = this.perm[X] + Y;
        let AA = this.perm[A % 255];
        let AB = this.perm[(A + 1) % 255];
        let B = this.perm[(X + 1) % 255] + Y;
        let BA = this.perm[B % 255];
        let BB = this.perm[(B + 1) % 255];

        // Interpolar entre los cuatro valores de esquina
        return lerp(
            lerp(dot2(this.grad2[AA % 12], x, y    ), dot2(this.grad2[BA % 12], x - 1, y   ), u),
            lerp(dot2(this.grad2[AB % 12], x, y - 1), dot2(this.grad2[BB % 12], x - 1, y - 1), u),
            v);
    }

    /**
     * Genera ruido fractal combinando múltiples octavas
     * @param x Coordenada X
     * @param y Coordenada Y  
     * @param octaves Número de capas de ruido
     * @param persistence Cómo se reduce la amplitud en cada octava
     * @returns Valor de ruido fractal normalizado
     */
    public octaveNoise(x: number, y: number, octaves: number, persistence: number) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;
        
        // Combinar múltiples frecuencias de ruido
        for (let i = 0; i < octaves; i++) {
            total += this.noise(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence; // Cada octava es más débil
            frequency *= 2;          // Cada octava es más detallada
        }
        
        // Normalizar resultado
        return total / maxValue * (1 / 0.4);
    }
}

// Función de suavizado cúbico - hace transiciones más suaves
function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

// Interpolación lineal entre dos valores
function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
}

// Producto punto entre vector gradiente y vector de posición
function dot2(g: [number, number], x: number, y: number) {
    return g[0] * x + g[1] * y;
}
