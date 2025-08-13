import { IWalkthrough, Phase } from "./Walkthrough";
import {
    commentary,
    DimStyle,
    dimStyleColor,
    embed,
    ITimeInfo,
    IWalkthroughArgs,
    moveCameraTo,
    phaseTools,
    setInitialCamera,
} from "./WalkthroughTools";
import s from "./Walkthrough.module.scss";
import { Dim, Vec3, Vec4 } from "@/src/utils/vector";
import { clamp, makeArray } from "@/src/utils/data";
import React, { useState } from "react";
import { useProgramState } from "../Sidebar";
import { dimProps, findSubBlocks, splitGrid } from "../Annotations";
import { useGlobalDrag } from "@/src/utils/pointer";
import { IBlkDef } from "../GptModelLayout";
import { IProgramState } from "../Program";
import { lerp } from "@/src/utils/math";
import { drawDependences } from "../Interaction";
import { drawDataFlow } from "../components/DataFlow";

interface IIntroState {}

function getIntroState(walkthrough: IWalkthrough): IIntroState {
    return walkthrough.phaseData.get(Phase.Intro_Intro) as IIntroState;
}

export function walkthroughIntro(args: IWalkthroughArgs) {
    let { breakAfter, afterTime, c_str } = phaseTools(args.state);
    let { state, layout, walkthrough: wt } = args;

    if (wt.phase !== Phase.Intro_Intro) {
        return;
    }

    setInitialCamera(
        state,
        new Vec3(184.744, 0.0, -636.82),
        new Vec3(296.0, 16.0, 13.5)
    );

    let c0 = commentary(
        wt,
        null,
        0
    )`Bienvenido al recorrido por el modelo de lenguaje grande GPT.
    Aquí exploraremos el modelo nano-gpt, con apenas 85,000 parámetros.

    Su objetivo es simple: tomar una secuencia de seis letras: ${embed(
        ExampleInputOutput
    )}
    y ordenarlas en orden alfabético, es decir, convertirla en "ABBBCC".`;

    if (c0.t > 0) {
        for (let cube of layout.cubes) {
            if (cube.t === "i" && cube.access) {
                cube.access.disable = true;
            }
        }
        state.display.tokenIdxModelOpacity = makeArray(6, 0);
    }

    let t4 = afterTime(null, 1.5, 0.4);

    moveCameraTo(
        args.state,
        t4,
        new Vec3(5.45, 0.0, 7.913),
        new Vec3(281.5, 12.5, 0.519)
    );
    let t6 = afterTime(null, 1.0, 0.2);

    if (t4.active) {
        state.display.topOutputOpacity = 0.2;
    }

    if (t6.active && t6.t < 1.0) {
        let mixes = [0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 6; i++) {
            let highT = (i + 1.5) / 8;
            mixes[i] = 1.0 - clamp(Math.abs(t6.t - highT) * 4, 0, 1);
        }
        state.display.tokenColors = {
            mixes,
            color2: dimStyleColor(DimStyle.Token),
        };
    }

    breakAfter();

    let tokenStr = c_str("_token_", 0, DimStyle.Token);
    let tokenIdxStr = c_str("_token index_", 0, DimStyle.TokenIdx);

    commentary(
        wt,
        t6
    )`Llamamos a cada una de estas letras un ${tokenStr}, y el conjunto de los diferentes tokens del modelo conforma su vocabulario:${embed(
        TokenVocab
    )}

        A partir de esta tabla, a cada token se le asigna un número, su ${tokenIdxStr}.
        Ahora podemos introducir esta secuencia de números en el modelo:${embed(
            ExampleTokenValues
        )}\n`;
    breakAfter();

    let t7 = afterTime(null, 1.5, 0.5);

    if (t7.active) {
        let opacity = makeArray(6, 0);
        for (let i = 0; i < 6; i++) {
            let highT = (i + 1.5) / 8;
            opacity[i] = clamp((t7.t - highT) * 4, 0, 1);
        }
        state.display.tokenIdxColors = {
            mixes: opacity,
            color2: dimStyleColor(DimStyle.TokenIdx),
        };

        let idxPos = t7.t * 6;

        if (t7.t < 1.0) {
            splitGrid(
                layout,
                layout.idxObj,
                Dim.X,
                idxPos,
                clamp(6 - idxPos, 0, 1)
            );
            for (let blk of findSubBlocks(
                layout.idxObj,
                Dim.X,
                null,
                Math.min(5, Math.floor(idxPos))
            )) {
                if (blk.access) {
                    blk.access.disable = false;
                }
            }
        } else {
            if (layout.idxObj.access) {
                layout.idxObj.access.disable = false;
            }
        }
    }

    breakAfter();

    let c5 = commentary(
        wt
    )`En la vista 3D, cada celda verde representa un número que se está procesando, y cada celda azul es un peso. ${embed(
        GreenBlueCells
    )}
    Cada número de la secuencia primero se convierte en un vector de 48 elementos (un tamaño elegido para este modelo en particular). A esto se le llama una *incrustación* o *embedding*.`;
    breakAfter(c5);

    {
        let t_camMove = afterTime(null, 1.0, 0.5);
        let t_makeVecs = afterTime(null, 2.0, 0.5);

        moveCameraTo(
            state,
            t_camMove,
            new Vec3(14.1, 0, -30.4),
            new Vec3(286, 14.5, 0.8)
        );

        if (t_makeVecs.active) {
            let idxPos = t_makeVecs.t * 6;
            let splitWidth = clamp(6 - idxPos, 0, 2);
            let splitIdx = Math.min(5, Math.floor(idxPos));
            if (t_makeVecs.t < 1.0) {
                splitGrid(layout, layout.idxObj, Dim.X, idxPos, splitWidth);
                for (let blk of findSubBlocks(
                    layout.idxObj,
                    Dim.X,
                    null,
                    splitIdx
                )) {
                    if (blk.access) {
                        blk.access.disable = false;
                    }
                }

                splitGrid(layout, layout.residual0, Dim.X, idxPos, splitWidth);
                for (let blk of findSubBlocks(
                    layout.residual0,
                    Dim.X,
                    null,
                    splitIdx
                )) {
                    if (blk.access) {
                        blk.access.disable = false;
                    }
                }
            } else {
                if (layout.residual0.access) {
                    layout.residual0.access.disable = false;
                }
            }
        }
    }

    breakAfter();
    commentary(
        wt
    )`La incrustación (embedding) se pasa luego a través del modelo, atravesando una serie de capas llamadas transformers, antes de llegar a la parte inferior.`;
    breakAfter();

    {
        let t_firstResid = afterTime(null, 1.0, 0.5);
        moveCameraTo(
            state,
            t_firstResid,
            new Vec3(-23.16, 0.0, -128.38),
            new Vec3(292.3, 26.8, 2.4)
        );
        let t_firstResidWalk = afterTime(null, 5.0, 0.5);

        let processState = processUpTo(
            state,
            t_firstResidWalk,
            layout.blocks[0].attnResidual
        );

        let t_firstTransformer = afterTime(null, 1.0, 0.5);
        moveCameraTo(
            state,
            t_firstTransformer,
            new Vec3(-78.7, 0, -274.2),
            new Vec3(299.4, 14.7, 4.3)
        );
        let t_firstTransformerWalk = afterTime(null, 3.5, 0.5);
        processUpTo(
            state,
            t_firstTransformerWalk,
            layout.blocks[0].mlpResidual,
            processState
        );

        if (t_firstTransformer.active) {
            layout.blocks[0].transformerLabel.visible = t_firstTransformer.t;
        }

        let t_fullFrame = afterTime(null, 1.0, 0.5);
        moveCameraTo(
            state,
            t_fullFrame,
            new Vec3(-147, 0, -744.1),
            new Vec3(298.5, 23.4, 12.2)
        );
        let t_fullFrameWalk = afterTime(null, 5.0, 0.5);
        processUpTo(state, t_fullFrameWalk, layout.ln_f.lnResid, processState);

        let t_output = afterTime(null, 1.0, 0.5);
        moveCameraTo(
            state,
            t_output,
            new Vec3(-58.4, 0, -1654.9),
            new Vec3(271.3, 6.4, 1.1)
        );
        let t_outputWalk = afterTime(null, 2.0, 0.5);
        processUpTo(state, t_outputWalk, layout.logitsSoftmax, processState);

        let t_outputToks = afterTime(null, 1.0, 0.5);

        if (t_firstResid.active) {
            let arr = makeArray(6, 0);

            if (t_outputToks.active) {
                for (let i = 0; i < 6; i++) {
                    let highT = (i + 1.5) / 8;
                    arr[i] = clamp((t_outputToks.t - highT) * 4, 0, 1);
                }
            }

            state.display.tokenOutputColors = {
                color1: new Vec4(0, 0, 0, 0),
                color2: Vec4.fromHexColor("#000", 1),
                mixes: arr,
            };
        }
    }

    commentary(
        wt
    )`Entonces, ¿cuál es la salida?
    Una predicción del siguiente *token* en la secuencia.
    Así, en la sexta entrada, obtenemos probabilidades de que el próximo *token* sea "A", "B" o "C".
    `;

    commentary(
        wt
    )`En este caso, el modelo está bastante seguro de que será 'A'. Ahora, podemos alimentar esta predicción de nuevo en la parte superior del modelo y repetir
    todo el proceso.`;

    breakAfter();
}

interface IProcessInfo {
    lastBlockIdx: number;
}

export function startProcessBefore(
    state: IProgramState,
    block: IBlkDef
): IProcessInfo {
    let activeBlocks = state.layout.cubes.filter((a) => a.t !== "w");

    return {
        lastBlockIdx: activeBlocks.indexOf(block) - 1,
    };
}

export function processUpTo(
    state: IProgramState,
    timer: ITimeInfo,
    block: IBlkDef,
    prevInfo?: IProcessInfo
): IProcessInfo {
    let activeBlocks = state.layout.cubes.filter((a) => a.t !== "w");

    let firstIdx = prevInfo ? prevInfo.lastBlockIdx + 1 : 0;
    let lastIdx = activeBlocks.indexOf(block);

    let cellCounts = activeBlocks
        .filter((_, i) => i >= firstIdx && i <= lastIdx)
        .map((a) => a.cx * a.cy * Math.pow(a.deps?.dotLen ?? 1, 0.25));
    let totalCells = cellCounts.reduce((a, b) => a + b, 0);

    let accCell = 0;
    let currIdx = firstIdx;
    let subPos = 0; // 0 -> 1
    for (let i = firstIdx; i <= lastIdx; i++) {
        let blockFract = cellCounts[i - firstIdx] / totalCells;
        accCell += blockFract;
        if (timer.t < accCell) {
            currIdx = i;
            subPos = (timer.t - (accCell - blockFract)) / blockFract;
            break;
        }
    }

    let blk = activeBlocks[currIdx];

    let dim0 = Dim.X;
    let dim1 = Dim.Y;
    if (blk.transpose) {
        dim0 = Dim.Y;
        dim1 = Dim.X;
    }

    let { cx } = dimProps(blk, dim0);
    let { cx: cy } = dimProps(blk, dim1);

    let horizPos = lerp(0, cx, subPos);
    let horizIdx = Math.floor(horizPos);

    let vertPos = lerp(0, cy, horizPos - horizIdx);
    let vertIdx = Math.floor(vertPos);

    let blockPos = new Vec3()
        .withSetAt(dim0, horizIdx)
        .withSetAt(dim1, vertIdx); 
    let pinPos = new Vec3(Math.floor(cx / 2), 0, 0);

    if (blk === state.layout.residual0) {
        pinPos = new Vec3(cx * 2, -2, 0);
    }

    if (timer.t >= 1.0) {
        currIdx = lastIdx;
    }

    for (let i = firstIdx; i < currIdx; i++) {
        let blk = activeBlocks[i];
        if (blk.access) {
            blk.access.disable = false;
        }
    }

    if (timer.active && timer.t < 1.0) {
        drawDependences(state, blk, blockPos);
        drawDataFlow(state, blk, blockPos, pinPos);

        for (let label of state.layout.labels) {
            for (let c of label.cubes) {
                if (c === blk) {
                    label.visible = 1.0;
                }
            }
        }

        blk.highlight = 0.3;

        let column = splitGrid(state.layout, blk, dim0, horizPos, 0);
        if (column) {
            for (let col of findSubBlocks(blk, dim0, null, horizIdx)) {
                if (col.access) {
                    col.access.disable = false;
                    col.highlight = 0.1;
                }
            }
            column.highlight = 0.4;

            let curr = splitGrid(state.layout, column, dim1, vertPos, 0);
            for (let blk of findSubBlocks(column, dim1, null, vertIdx)) {
                if (blk.access) {
                    blk.access.disable = false;
                }
            }
            if (curr) {
                curr.highlight = 0.7;
            }
        }
    } else if (timer.active) {
        let blk = activeBlocks[lastIdx];
        if (blk.access) {
            blk.access.disable = false;
        }
    }

    let info = prevInfo ?? { lastBlockIdx: currIdx };
    info.lastBlockIdx = lastIdx;
    return info;
}

const ExampleInputOutput: React.FC = () => {
    let state = useProgramState();
    let cols = state.display.tokenColors;
    let chars = "CBABBC".split("");

    return (
        <div className={s.tableWrap}>
            <div>
                {chars.map((c, i) => {
                    let baseColor = dimStyleColor(DimStyle.Token);
                    if (cols) {
                        baseColor = Vec4.lerp(
                            baseColor,
                            cols.color2,
                            cols.mixes[i]
                        );
                    }
                    return (
                        <span key={i} style={{ color: baseColor.toHexColor() }}>
                            {c}{" "}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

const ExampleTokenValues: React.FC = () => {
    let state = useProgramState();
    let cols = state.display.tokenIdxColors;
    let chars = "CBABBC".split("");

    return (
        <div className={s.tableWrap}>
            <div>
                {chars.map((c, i) => {
                    let tokIdx = c.charCodeAt(0) - "A".charCodeAt(0);

                    let baseColor = dimStyleColor(DimStyle.TokenIdx);
                    if (cols) {
                        baseColor = Vec4.lerp(
                            baseColor,
                            cols.color2,
                            cols.mixes[i]
                        );
                    }
                    return (
                        <span key={i} style={{ color: baseColor.toHexColor() }}>
                            {tokIdx}{" "}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

const TokenVocab: React.FC = () => {
    return (
        <div className={s.tableWrap}>
            <table className={s.table}>
                <tbody>
                    <tr
                        className={s.tokString}
                        style={{
                            color: dimStyleColor(DimStyle.Token).toHexColor(),
                        }}
                    >
                        <th>token</th>
                        <td>A</td>
                        <td>B</td>
                        <td>C</td>
                    </tr>
                    <tr
                        className={s.tokIndex}
                        style={{
                            color: dimStyleColor(
                                DimStyle.TokenIdx
                            ).toHexColor(),
                        }}
                    >
                        <th>index</th>
                        <td>0</td>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const GreenBlueCells: React.FC = () => {
    let [blueNums, setBlueNums] = useState([-0.7, 0.7, -0.1]);
    let [greenNums, setGreenNums] = useState([-0.7, 0.4, 0.8]);

    let blueColor = new Vec4(0.3, 0.3, 1.0);
    let greenColor = new Vec4(0.3, 0.9, 0.3);

    return (
        <div className={s.tableWrap}>
            <div className={s.cellInfoCols}>
                <div className={s.cellInfoCol}>
                    <Cell nums={greenNums} color={greenColor} mul={0.5} />
                    <Graph
                        nums={greenNums}
                        color={greenColor}
                        setNums={setGreenNums}
                    />
                    <div className={s.cellInfoText}>being processed</div>
                </div>
                <div className={s.cellInfoCol}>
                    <Cell nums={blueNums} color={blueColor} mul={1} />
                    <Graph
                        nums={blueNums}
                        color={blueColor}
                        setNums={setBlueNums}
                    />
                    <div className={s.cellInfoText}>weights</div>
                </div>
            </div>
        </div>
    );
};

const Cell: React.FC<{ nums: number[]; color: Vec4; mul?: number }> = ({
    color,
    nums,
    mul,
}) => {
    let grey = new Vec4(0.5, 0.5, 0.5, 1.0);
    let cellLight = Vec4.lerp(color, grey, 0.9);
    let cellDark = cellLight.mul(0.98);
    cellDark.w = 1.0;

    let cellColor = (n: number) => {
        let weight = clamp(Math.abs(n), 0.0, 1.0);

        let negColor = new Vec4(0.0, 0.0, 0.0);
        let posColor = color;
        let zeroColor = new Vec4(0.5, 0.5, 0.5);
        if (n < 0.0) {
            return Vec4.lerp(zeroColor, negColor, weight).toHexColor();
        } else {
            return Vec4.lerp(zeroColor, posColor, weight).toHexColor();
        }
    };

    return (
        <div className={s.cellArrayHoriz}>
            {nums.map((n, i) => {
                return (
                    <div
                        className={s.cellRect}
                        key={i}
                        style={{
                            backgroundColor: (i % 2 === 0
                                ? cellLight
                                : cellDark
                            ).toHexColor(),
                        }}
                    >
                        <div
                            className={s.cellCircle}
                            style={{
                                backgroundColor: cellColor(n * (mul ?? 1.0)),
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const Graph: React.FC<{
    nums: number[];
    color: Vec4;
    max?: number;
    setNums?: (nums: number[]) => void;
}> = ({ color, nums, max, setNums }) => {
    let [graphEl, setGraphEl] = useState<HTMLDivElement | null>(null);

    let ticks = [-1, 0, 1];
    let cellW = 30;
    let dispColor = color.mul(1.0);
    dispColor.w = 0.5;

    interface IDragInitial {
        index: number;
        nums: number[];
    }

    let [, setDragStart] = useGlobalDrag<IDragInitial>(function handleMove(
        ev,
        ds
    ) {
        let dy = ev.clientY - ds.clientY;
        let h = graphEl!.clientHeight * 0.5;
        let nums = [...ds.data.nums];
        nums[ds.data.index] = clamp(nums[ds.data.index] - dy / h, -1.0, 1.0);
        setNums?.(nums);
        ev.preventDefault();
        ev.stopImmediatePropagation();
    });

    return (
        <div
            className={s.graph}
            style={{ width: cellW * nums.length }}
            ref={setGraphEl}
        >
            <div className={s.axisLeft} />

            <div className={s.axisZero} />

            {nums.map((n, i) => {
                let nScaled = n / (max ?? 1.0);

                return (
                    <div className={s.graphCol} key={i}>
                        <div
                            className={s.graphBar}
                            style={{
                                backgroundColor: dispColor.toHexColor(),
                                top:
                                    nScaled < 0
                                        ? "50%"
                                        : `${(0.5 - nScaled / 2) * 100}%`,
                                height: `${(Math.abs(nScaled) / 2) * 100}%`,
                            }}
                        />
                        <div
                            className={s.graphBarHit}
                            onMouseDown={(ev) => {
                                setDragStart(ev, { index: i, nums });
                                ev.stopPropagation();
                                ev.preventDefault();
                            }}
                            style={{
                                top: `${(0.5 - nScaled / 2) * 100}%`,
                            }}
                        />
                        <div
                            className={s.graphBarLabel}
                            style={{
                                bottom: nScaled < 0 ? "50%" : undefined,
                                top: nScaled > 0 ? "50%" : undefined,
                            }}
                        >
                            {n.toFixed(1)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
