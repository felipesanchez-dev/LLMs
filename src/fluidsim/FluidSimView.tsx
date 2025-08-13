'use client';

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useScreenLayout } from "../utils/layout";
import { ICanvasTargetDef, IFluidSimState, initFluidSimState, stepFluidSim } from "./FluidSimMain";
import s from "./FluidSimView.module.scss";
import { Subscriptions, useSubscriptions } from "../utils/hooks";

let dummySubs = new Subscriptions();

export const FluidSimView: React.FC = () => {
    let [manager, setManager] = useState<FluidSimManager | null>(null);
    let [isPlaying, setIsPlaying] = useState(false);
    let [simulationSpeed, setSimulationSpeed] = useState(20);
    let [pressureIterations, setPressureIterations] = useState(200);
    let [showVelocityField, setShowVelocityField] = useState(true);
    let [showTemperature, setShowTemperature] = useState(false);

    useSubscriptions(manager?.subscriptions ?? dummySubs);

    let layout = useScreenLayout();
    useEffect(() => {
        function handleKeyDown(ev: KeyboardEvent) {
            if (!manager) {
                return;
            }
            let key = ev.key.toLowerCase();
            if (ev.key === ' ') {
                ev.preventDefault();
                handlePlayClicked();
            }
            if (ev.key === 's') {
                ev.preventDefault();
                handleStepClicked();
            }
            if (ev.key === 'r') {
                ev.preventDefault();
                handleResetClicked();
            }
            if (ev.key === 'v') {
                ev.preventDefault();
                setShowVelocityField(!showVelocityField);
            }
            if (ev.key === 't') {
                ev.preventDefault();
                setShowTemperature(!showTemperature);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        console.log('Creando FluidSimManager - Simulador de fluidos iniciado');
        let manager = new FluidSimManager();
        setManager(manager);
        manager.markDirty();

        return () => {
            console.log('Limpiando FluidSimManager - Simulador detenido');
            manager.looper.stopped = true;
            setManager(null);
        };
    }, []);

    manager?.markDirty();

    function handleResetClicked() {
        if (!manager) {
            return;
        }
        console.log('Reiniciando simulación de fluidos');
        manager.fluidSimState = initFluidSimState();
        manager.fluidSimState.sim.numPressureIterations = 0;
        stepFluidSim(manager.fluidSimState.sim, simulationSpeed);
        setIsPlaying(false);
        manager.fluidSimState.running = false;
        manager.markDirty();
    }

    function handleStepClicked() {
        if (!manager) {
            return;
        }
        console.log('Ejecutando un paso de simulación');
        stepFluidSim(manager.fluidSimState.sim, simulationSpeed);
        manager.markDirty();
    }

    function handlePlayClicked() {
        if (!manager) {
            return;
        }
        const newPlayingState = !manager.fluidSimState.running;
        manager.fluidSimState.running = newPlayingState;
        setIsPlaying(newPlayingState);
        console.log(newPlayingState ? 'Iniciando simulación continua' : 'Pausando simulación');
        manager.markDirty();
    }

    let sim = manager?.fluidSimState.sim;

    return <div className={s.page}>
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Simulación de Fluidos 2D</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
                Simulación interactiva de dinámicas de fluidos usando las ecuaciones de Navier-Stokes. 
                Observa cómo se comportan la velocidad, temperatura y presión en tiempo real.
            </p>
        </div>

        {manager && sim && <>
            {/* Panel de Control Principal */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4 w-full max-w-4xl">
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <button 
                        onClick={handlePlayClicked}
                        className={`px-6 py-2 rounded font-medium transition-colors ${
                            isPlaying 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                        {isPlaying ? '⏸ Pausar' : '▶ Reproducir'}
                    </button>
                    
                    <button 
                        onClick={handleStepClicked}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                    >
                        ⏭ Un Paso
                    </button>
                    
                    <button 
                        onClick={handleResetClicked}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium transition-colors"
                    >
                        🔄 Reiniciar
                    </button>
                </div>

                {/* Controles de Parámetros */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-white">
                        <label className="block text-sm font-medium mb-1">Velocidad de Simulación (ms)</label>
                        <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            value={simulationSpeed}
                            onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                            className="w-full"
                        />
                        <span className="text-xs text-gray-300">{simulationSpeed}ms por paso</span>
                    </div>

                    <div className="text-white">
                        <label className="block text-sm font-medium mb-1">Iteraciones de Presión</label>
                        <input 
                            type="range" 
                            min="50" 
                            max="500" 
                            step="50"
                            value={pressureIterations}
                            onChange={(e) => setPressureIterations(Number(e.target.value))}
                            className="w-full"
                        />
                        <span className="text-xs text-gray-300">{pressureIterations} iteraciones</span>
                    </div>

                    <div className="text-white">
                        <label className="block text-sm font-medium mb-1">Visualización</label>
                        <div className="space-y-1">
                            <label className="flex items-center text-sm">
                                <input 
                                    type="checkbox" 
                                    checked={showVelocityField}
                                    onChange={(e) => setShowVelocityField(e.target.checked)}
                                    className="mr-2"
                                />
                                Campo de Velocidad
                            </label>
                            <label className="flex items-center text-sm">
                                <input 
                                    type="checkbox" 
                                    checked={showTemperature}
                                    onChange={(e) => setShowTemperature(e.target.checked)}
                                    className="mr-2"
                                />
                                Temperatura
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estado de Simulación */}
            <div className="bg-gray-700 rounded p-2 mb-4 text-white text-sm">
                Iteraciones de Presión: {sim.numPressureIterations} | 
                Estado: {isPlaying ? '▶ Ejecutándose' : '⏸ Pausado'}
            </div>

            {/* Visualización Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-6xl">
                <div className="flex flex-col gap-4">
                    <CanvasView 
                        manager={manager} 
                        name="Campo de Velocidad Principal"
                        sourceType={SourceType.VelocityVector}
                        sourceArray={sim.cells}
                    />
                    <CanvasView 
                        manager={manager} 
                        name="Campo de Presión"
                        sourceType={SourceType.Scalar}
                        sourceArray={sim.pressure0}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <CanvasView 
                        manager={manager} 
                        name="Divergencia Inicial"
                        sourceType={SourceType.Scalar}
                        sourceArray={sim.divergence0}
                    />
                    <CanvasView 
                        manager={manager} 
                        name="Divergencia Final (Validación)"
                        sourceType={SourceType.Scalar}
                        sourceArray={sim.divergence1}
                    />
                </div>
            </div>

            {/* Información de Estado */}
            {sim.aggregates && (
                <div className="bg-gray-800 rounded-lg p-4 mt-4 w-full max-w-4xl">
                    <h3 className="text-white font-medium mb-2">Propiedades Físicas del Fluido</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-300">
                        <div>
                            <span className="block font-medium">Masa Total</span>
                            <span>{sim.aggregates.totalMass.toFixed(3)} kg</span>
                        </div>
                        <div>
                            <span className="block font-medium">Energía Cinética</span>
                            <span>{sim.aggregates.totalKineticEnergy.toFixed(3)} J</span>
                        </div>
                        <div>
                            <span className="block font-medium">Momento X</span>
                            <span>{sim.aggregates.totalMomentumX.toFixed(3)} kg⋅m/s</span>
                        </div>
                        <div>
                            <span className="block font-medium">Momento Y</span>
                            <span>{sim.aggregates.totalMomentumY.toFixed(3)} kg⋅m/s</span>
                        </div>
                        <div>
                            <span className="block font-medium">Temp. Promedio</span>
                            <span>{sim.aggregates.averageTemperature.toFixed(3)} °C</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Controles de Teclado */}
            <div className="bg-gray-800 rounded-lg p-4 mt-4 w-full max-w-4xl">
                <h3 className="text-white font-medium mb-2">Controles de Teclado</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-300">
                    <div><kbd className="bg-gray-700 px-2 py-1 rounded">Espacio</kbd> - Reproducir/Pausar</div>
                    <div><kbd className="bg-gray-700 px-2 py-1 rounded">S</kbd> - Un Paso</div>
                    <div><kbd className="bg-gray-700 px-2 py-1 rounded">R</kbd> - Reiniciar</div>
                    <div><kbd className="bg-gray-700 px-2 py-1 rounded">V</kbd> - Toggle Campo de Velocidad</div>
                    <div><kbd className="bg-gray-700 px-2 py-1 rounded">T</kbd> - Toggle Temperatura</div>
                </div>
            </div>
        </>}
    </div>;
};

interface ICanvasRenderOpts {
    sourceType: SourceType;
    sourceArray: Float32Array;
}

enum SourceType {
    VelocityVector,
    Temp,
    Density,
    Scalar,
}

const CanvasView: React.FC<{
    manager: FluidSimManager;
    name: string,
} & ICanvasRenderOpts> = ({ manager, name, ...renderOpts }) => {
    let [canvasEl, setCanvasEl] = React.useState<HTMLCanvasElement | null>(null);
    useSubscriptions(manager.subscriptions);

    useLayoutEffect(() => {
        if (canvasEl) {
            let parentBcr = canvasEl.parentElement!.getBoundingClientRect();
            let pr = window.devicePixelRatio;
            canvasEl.width = parentBcr.width * pr;
            canvasEl.height = parentBcr.height * pr;
            renderFluidSimTarget(manager.fluidSimState, canvasEl, renderOpts);
        }
    });

    return <div className="flex flex-col items-center bg-gray-900 rounded-lg p-3">
        <div className="text-white text-sm font-medium mb-2 text-center">{name}</div>
        <div className="aspect-square relative overflow-hidden flex-none w-[280px] h-[280px] border border-gray-600 rounded">
            <canvas ref={setCanvasEl} className={s.canvas} />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-center max-w-[280px]">
            {renderOpts.sourceType === SourceType.VelocityVector ? 
                'Vectores muestran dirección y magnitud de velocidad' : 
                'Colores representan intensidad del campo escalar'
            }
        </div>
    </div>;
}


class FluidSimManager {
    looper: Looper;
    markDirty: () => void;
    fluidSimState: IFluidSimState;
    subscriptions = new Subscriptions();

    constructor() {
        this.looper = new Looper(this.render);
        this.markDirty = this.looper.markDirty;
        this.fluidSimState = initFluidSimState();
    }

    render = (time: number, dt: number) => {
        if (this.fluidSimState.running) {
            stepFluidSim(this.fluidSimState.sim, 10);
        }

        updateFluidSim(this.fluidSimState, dt);
        this.subscriptions.subs.forEach(s => s());
    }
}

class Looper {
    stopped = false;
    prevTime: number = performance.now();
    rafHandle: number = 0;
    isDirty = false;

    constructor(public render: (time: number, dt: number) => void) {
    }

    markDirty = () => {
        if (this.stopped) {
            return;
        }

        this.isDirty = true;
        if (!this.rafHandle) {
            this.prevTime = performance.now();
            this.rafHandle = requestAnimationFrame(this.loop);
        }
    }

    loop = (time: number) => {
        if (!this.isDirty || this.stopped) {
            this.rafHandle = 0;
            return;
        }
        let wasDirty = this.isDirty;

        this.isDirty = false;

        let dt = time - this.prevTime;
        this.prevTime = time;
        if (dt < 8) dt = 16; // sometimes we get -ve dt due to perf.now() vs requestAnimationFrame() timing, so put to 16ms in that case

        if (wasDirty || this.isDirty) {
            this.render(time, dt);
        }

        this.rafHandle = requestAnimationFrame(this.loop);
    }
}

function drawToCanvas(state: IFluidSimState, canvas: HTMLCanvasElement, sourceArr: Float32Array) {
    let ctx = canvas.getContext("2d")!;
    let w = state.sim.width;
    let h = state.sim.height;
    let cellData = new Uint8ClampedArray(w * h * 4);

    let nPx = state.sim.width * state.sim.height;
    for (let i = 0; i < nPx; i++) {
        let temp = sourceArr[i * 4 + 0];
        let vX = sourceArr[i * 4 + 2];
        let vY = sourceArr[i * 4 + 3];
        cellData[i * 4 + 0] = floatToByte(temp);
        // cellData[i * 4 + 1] = floatToByte(vY * 40); //density * 255;
        cellData[i * 4 + 3] = 255;
    }

    {
        let localCanvas = state.canvasTemp;
        localCanvas.width = w;
        localCanvas.height = h;
        let localCtx = localCanvas.getContext("2d")!;
        let imageData = new ImageData(cellData, w, h);
        localCtx.putImageData(imageData, 0, 0);
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(state.canvasTemp, 0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(canvas.width / w, canvas.height / h);
    ctx.globalAlpha = 0.1;
    for (let y = 0; y < h; y += 3) {
        for (let x = 0; x < w; x += 3) {
            // draw arrow for velocity, with length proportional to velocity amplitude
            let vx = sourceArr[(y * w + x) * 4 + 2];
            let vy = sourceArr[(y * w + x) * 4 + 3];
            let vLen = Math.sqrt(vx * vx + vy * vy);
            let drawLen = floatToByte(vLen * 40) / 255 * 3;

            let x0 = x + 0.5;
            let y0 = y + 0.5;

            let x2 = x0 + vx * drawLen / vLen;
            let y2 = y0 + vy * drawLen / vLen;

            // two arrowhead lines, each at 45 degrees to the line
            let dx = x2 - x0;
            let dy = y2 - y0;

            let x3 = x2 - dx * 0.2 + dy * 0.2;
            let y3 = y2 - dy * 0.2 - dx * 0.2;

            let x4 = x2 - dx * 0.2 - dy * 0.2;
            let y4 = y2 - dy * 0.2 + dx * 0.2;

            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.moveTo(x2, y2);
            ctx.lineTo(x4, y4);
            ctx.strokeStyle = "white";
            ctx.lineWidth = w / canvas.width;
            ctx.stroke();
        }
    }
    ctx.restore();
}

function drawFieldToCanvas(state: IFluidSimState, canvas: HTMLCanvasElement, arr: Float32Array) {
    let ctx = canvas.getContext("2d")!;
    let w = state.sim.width;
    let h = state.sim.height;
    let cellData = new Uint8ClampedArray(w * h * 4);
    let nPx = w * h;
    for (let i = 0; i < nPx; i++) {
        cellData[i * 4 + 0] = floatToByte(arr[i] * 40);
        cellData[i * 4 + 3] = 255;
    }

    {
        let localCanvas = state.canvasTemp;
        localCanvas.width = w;
        localCanvas.height = h;
        let localCtx = localCanvas.getContext("2d")!;
        let imageData = new ImageData(cellData, w, h);
        localCtx.putImageData(imageData, 0, 0);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(state.canvasTemp, 0, 0, canvas.width, canvas.height);
    }
}

function renderFluidSimTarget(state: IFluidSimState, canvas: HTMLCanvasElement, opts: ICanvasRenderOpts) {

    // canvas.width = state.sim.width;
    // canvas.height = state.sim.height;

    let ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (opts.sourceType === SourceType.VelocityVector) {
        drawToCanvas(state, canvas, opts.sourceArray);
    }
    if (opts.sourceType === SourceType.Scalar) {
        drawFieldToCanvas(state, canvas, opts.sourceArray);
    }

    // drawFieldToCanvas(state, state.targetDefs[0], state.sim.divergence0);
    // drawFieldToCanvas(state, state.targetDefs[1], state.sim.divergence1);
}

function updateFluidSim(state: IFluidSimState, dt: number) {
    /*
    state.canvas.width = state.sim.width;
    state.canvas.height = state.sim.height;

    let ctx = state.canvas.getContext("2d")!;

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);

    drawToCanvas(state, state.canvas);
    drawFieldToCanvas(state, state.targetDefs[0], state.sim.divergence0);
    drawFieldToCanvas(state, state.targetDefs[1], state.sim.divergence1);
    */
    // stepFluidSim(state.sim, dt);
}

function floatToByte(f: number) {
    // sigmoid function, assuming a common range of -1 to 1

    let x = f;
    let y = 1 / (1 + Math.exp(-x));
    return y * 255;
}
