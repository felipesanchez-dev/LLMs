import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, DimStyle, IWalkthroughArgs, moveCameraTo, setInitialCamera } from "./WalkthroughTools";
import { lerp, lerpSmoothstep } from "@/src/utils/math";
import { processUpTo, startProcessBefore } from "./Walkthrough00_Intro";

export function walkthrough06_Projection(args: IWalkthroughArgs) {
    let { walkthrough: wt, state, layout, tools: { breakAfter, afterTime, c_blockRef, c_dimRef, cleanup } } = args;

    if (wt.phase !== Phase.Input_Detail_Projection) {
        return;
    }

    setInitialCamera(state, new Vec3(-73.167, 0.000, -270.725), new Vec3(293.606, 2.613, 1.366));
    let block = layout.blocks[0];
    wt.dimHighlightBlocks = [...block.heads.map(h => h.vOutBlock), block.projBias, block.projWeight, block.attnOut];

    let outBlocks = block.heads.map(h => h.vOutBlock);

    commentary(wt, null, 0)`

Después del proceso de auto-atención, tenemos salidas de cada una de las cabezas. Estas salidas son
los vectores V apropiadamente mezclados, influenciados por los vectores Q y K.

Para combinar los ${c_blockRef('vectores de salida', outBlocks)} de cada cabeza, simplemente los apilamos uno encima del otro. Así, para el tiempo
${c_dimRef('t = 4', DimStyle.T)}, pasamos de 3 vectores de longitud ${c_dimRef('A = 16', DimStyle.A)} a 1 vector de longitud ${c_dimRef('C = 48', DimStyle.C)}.`;

    breakAfter();

    let t_fadeOut = afterTime(null, 1.0, 0.5);
    let t_stack = afterTime(null, 1.0);

    breakAfter();

    commentary(wt)`

Vale la pena señalar que en GPT, la longitud de los vectores dentro de una cabeza (${c_dimRef('A = 16', DimStyle.A)}) es igual a ${c_dimRef('C', DimStyle.C)} / num_heads.
Esto asegura que cuando los apilamos de nuevo juntos, obtenemos la longitud original, ${c_dimRef('C', DimStyle.C)}.

Desde aquí, realizamos la proyección para obtener la salida de la capa. Esta es una simple multiplicación
matriz-vector por columnas, con un sesgo añadido.`;

    breakAfter();

    let t_process = afterTime(null, 3.0);

    breakAfter();

    commentary(wt)`

Ahora tenemos la salida de la capa de auto-atención. En lugar de pasar esta salida directamente a la
siguiente fase, la añadimos elemento por elemento a la incrustación de entrada. Este proceso, denotado
por la flecha verde vertical, se llama _conexión residual_ o _vía residual_.
`;

    breakAfter();

    let t_zoomOut = afterTime(null, 1.0, 0.5);
    let t_processResid = afterTime(null, 3.0);

    cleanup(t_zoomOut, [t_fadeOut, t_stack]);

    breakAfter();

    commentary(wt)`

Al igual que la normalización de capas, la vía residual es importante para permitir un aprendizaje
efectivo en redes neuronales profundas.

Ahora con el resultado de la auto-atención en mano, podemos pasarlo a la siguiente sección del
transformer: la red feed-forward.
`;

    breakAfter();

    if (t_fadeOut.active) {
        for (let head of block.heads) {
            for (let blk of head.cubes) {
                if (blk !== head.vOutBlock) {
                    blk.opacity = lerpSmoothstep(1, 0, t_fadeOut.t);
                }
            }
        }
    }

    if (t_stack.active) {
        let targetZ = block.attnOut.z;
        for (let headIdx = 0; headIdx < block.heads.length; headIdx++) {
            let head = block.heads[headIdx];
            let targetY = head.vOutBlock.y + head.vOutBlock.dy * (headIdx - block.heads.length + 1);
            head.vOutBlock.y = lerp(head.vOutBlock.y, targetY, t_stack.t);
            head.vOutBlock.z = lerp(head.vOutBlock.z, targetZ, t_stack.t);
        }
    }

    let processInfo = startProcessBefore(state, block.attnOut);

    if (t_process.active) {
        processUpTo(state, t_process, block.attnOut, processInfo);
    }

    moveCameraTo(state, t_zoomOut, new Vec3(-8.304, 0.000, -175.482), new Vec3(293.606, 2.623, 2.618));

    if (t_processResid.active) {
        processUpTo(state, t_processResid, block.attnResidual, processInfo);
    }
}
