import React from "react";
import { CPUDirectory, makeCpuMetadata } from "@/src/cpu/guide/GuideIndex";
import {
    CpuEnabledGuide,
    GuideSection,
    Ins,
    Para,
} from "@/src/cpu/guide/CpuEnabledGuide";
import { SchematicView } from "@/src/cpu/guide/SchematicView";
import {
    InstructionDetail,
    InstructionTable,
} from "@/src/cpu/guide/InstructionDetail";
import { CpuPortal } from "@/src/cpu/CpuPortal";
import { AutoLoadCode } from "@/src/cpu/guide/AutoLoadCode";

const dir = CPUDirectory.RiscvBasic;

export const metadata = makeCpuMetadata(dir);

export default function Page() {
    return (
        <CpuEnabledGuide dir={dir}>
            <GuideSection title={"Introducción"}>
                <Para>
                    En esta guía construiremos una computadora RISC-V mínima,
                    basándonos en algunos componentes pre-hechos. Esto te dará
                    un entendimiento básico de cómo el código máquina (solo un
                    arreglo de bytes) se convierte en una computadora que
                    funciona. El conjunto de instrucciones RISC-V es una buena
                    primera opción, ya que las decisiones de diseño lo hacen muy
                    simple de implementar.
                </Para>
            </GuideSection>

            <GuideSection title={"Conjunto de Instrucciones"}>
                <Para>
                    El conjunto de instrucciones es el conjunto de instrucciones
                    que la CPU puede ejecutar. Convenientemente, cada
                    instrucción en RISC-V básico tiene 4 bytes (32 bits) de
                    longitud.
                </Para>

                <Para>
                    Aquí hay una tabla de una selección de algunas de las
                    instrucciones que usaremos:
                </Para>

                <div className="flex flex-col self-center w-[80%] py-4">
                    <div className="flex">
                        <div className="w-[9rem]">add c a b</div>
                        <div>
                            Sumar reg A a reg B; escribir resultado en reg C
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-[9rem]">addi c a imm</div>
                        <div>
                            Sumar imm de 20bit con signo a reg A; escribir
                            resultado en reg C
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-[9rem]">blt a b offset</div>
                        <div>
                            Si reg A &lt; regB, saltar por offset, sino
                            continuar
                        </div>
                    </div>
                </div>

                <Para>
                    Cuando una CPU ejecuta instrucciones, lo hace una a la vez,
                    en orden. Para llevar registro de qué instrucción estamos
                    ejecutando, usamos un valor llamado{" "}
                    <em>contador de programa</em> (PC). Esto se almacena en un{" "}
                    <em>registro</em> como un número de 32 bits.
                </Para>
                <Para>
                    Porque el PC es una dirección, apunta a un byte (8 bits) en
                    memoria. Y luego como cada instrucción tiene 4 bytes de
                    longitud, necesitaremos incrementar el PC por 4 cada vez que
                    ejecutemos una instrucción. Veamos esto en acción:
                </Para>

                <CpuPortal
                    schematicId={"c-a7yetcbo"}
                    caption={
                        "Fig 1: Registro PC con un bucle de retroalimentación que obtiene 4 sumado en cada ciclo"
                    }
                    height={16}
                    width={50}
                />

                <Para>
                    Podemos ver que la salida del registro PC está conectada a
                    la entrada del componente <em>add</em>. Combinado con la
                    entrada del valor constante 4, este componente add produce
                    PC + 4. Luego, en el siguiente <em>ciclo</em>, el registro
                    PC tomará este valor PC + 4 (mostrado en amarillo).
                </Para>

                <Para>
                    Este ciclo es manejado por una <em>señal de reloj</em>{" "}
                    oculta, y ocurre cada vez que hacemos clic en el botón{" "}
                    <em>step</em>. Veremos más sobre el reloj más tarde. En
                    nuestro simple bucle de sumar-4, la señal de reloj solo es
                    usada por el registro mismo para actualizar su valor.
                </Para>

                <Para>
                    OK, genial, tenemos nuestro contador de programa
                    incrementándose cada ciclo. Ahora necesitamos usarlo para
                    obtener una <em>instrucción</em>. Agregamos un componente
                    ROM, que contiene nuestro programa, es decir, nuestra lista
                    de instrucciones. Cada vez que suministramos un valor de
                    dirección, devolveremos el valor de 32-bit (4 bytes)
                    almacenado en esa dirección. El resaltado azul indica esa
                    dirección.
                </Para>

                <CpuPortal
                    schematicId={"c-s1m3zs3x"}
                    caption={"Fig 2: Registro PC consultando contenidos de ROM"}
                    height={30}
                    width={70}
                >
                    <AutoLoadCode fileName={"blinky2.elf"} />
                </CpuPortal>

                <Para>
                    Así que mientras el PC avanza, 4 bytes a la vez, obtenemos
                    la siguiente instrucción de la ROM para ejecutar.
                    Actualmente, esto avanzará sin parar, pero está bien por
                    ahora.
                </Para>

                <Para>
                    Ahora ¿qué hacen realmente nuestras instrucciones? Una de
                    sus tareas básicas es manipular valores almacenados en un
                    conjunto de <em>registros</em>. Estos son solo valores de
                    32-bit que pueden leerse y escribirse. En la ISA de RISC-V
                    de 32bit, hay 32 de estos registros (numerados de 0 a 31).
                    Llamamos a este conjunto de registros el{" "}
                    <em>archivo de registros</em>.
                </Para>

                <CpuPortal
                    schematicId={"reg-file-demo"}
                    caption={"Archivo de Registros con entrada y 2 salidas"}
                    height={60}
                    width={70}
                />

                <Para>
                    Este archivo de registros particular tiene 1 entrada y 2
                    salidas. Es decir, en un ciclo dado, podemos leer
                    cualesquiera dos valores simultáneamente (incluyendo del
                    mismo registro). También podemos escribir a cualquier
                    registro individual, cuyo valor será actualizado al inicio
                    del siguiente ciclo. La única excepción es el primer
                    registro, <code>zero</code>: siempre produce cero, y
                    cualquier escritura a él es ignorada. ¡Inténtalo!
                </Para>

                <Para>
                    Ahora con nuestro archivo de registros en mano, y una forma
                    de obtener instrucciones, ahora podemos echar un vistazo a
                    las varias instrucciones en nuestro{" "}
                    <em>conjunto de instrucciones</em>. Cada instrucción de 32
                    bits que obtenemos de la ROM tiene un significado
                    específico, que necesitamos interpretar y actuar sobre él.
                    Las siguientes secciones nos llevarán a través de los varios
                    tipos de instrucciones, y lo que necesitamos agregar a
                    nuestra computadora para soportarlas.
                </Para>
            </GuideSection>

            <GuideSection title={"Instrucciones tipo R (tipo registro)"}>
                <Para>
                    Asumamos que ya hemos poblado nuestro archivo de registros
                    con algunos valores. Y luego queremos tomar dos valores, de
                    los registros 3 y 4, sumarlos, y luego almacenar el
                    resultado en el registro 6. Para hacer esto, usaremos la
                    instrucción <Ins>add</Ins> de RISC-V. La instrucción
                    contiene varios bits de información:
                </Para>

                <ol className="ml-8 my-4">
                    <li>
                        1. El hecho de que estamos haciendo una instrucción add
                        (en oposición a subtract, jump, load desde memoria, etc)
                    </li>
                    <li>2. El número de registro del registro destino (6)</li>
                    <li>
                        3. El número de registro del primer registro fuente (3)
                    </li>
                    <li>
                        4. El número de registro del segundo registro fuente (4)
                    </li>
                </ol>

                <Para>
                    Ese primer bit de información, sobre que sea un{" "}
                    <code>add</code>, en realidad se divide en dos porciones. La
                    primera de ellas indica que es una instrucción
                    registro-registro (leer de 2, escribir a 1, es decir, una
                    instrucción tipo R), y luego la segunda porción indica que
                    es un add, en oposición a subtract, shift, and, xor etc.
                    Aquí está el desglose completo de la instrucción. La otra
                    cosa a notar es que cada uno de los valores de registro
                    tiene 5 bits de longitud, lo que nos permite elegir entre
                    2^5 = 32 valores, es decir, los 32 registros.
                </Para>

                <InstructionTable>
                    <InstructionDetail name={"add"} />
                </InstructionTable>

                <Para>
                    El trabajo de tomar una instrucción y averiguar qué
                    significa se llama <em>decodificación de instrucciones</em>.
                    Usaremos un componente completamente formado para esto, que
                    puede manejar todos los diferentes tipos de instrucciones,
                    pero por ahora solo será capaz de realizar una operación
                    add. Conectamos nuestro decodificador de instrucciones a la
                    salida de la ROM, cuya dirección hemos seleccionado.
                </Para>

                <SchematicView
                    schematicId={"ins-decode-add"}
                    caption={
                        "Decodificador de Instrucciones conectado a ROM (pero no a registros o ALU)"
                    }
                />

                <Para>
                    El componente de decodificación de instrucciones produce un
                    conjunto completo de <em>señales de control</em>, que se
                    enrutan a los varios otros componentes, diciéndoles qué
                    hacer. Este componente también se considera "combinatorio",
                    significando que sus salidas están completamente
                    determinadas por sus entradas, y no dependen de ningún
                    estado interno. En contraste, el archivo de registros se
                    considera "secuencial", porque tiene estado interno (los
                    valores de los registros), y también se integra con la señal
                    de reloj.
                </Para>

                <Para>
                    Por ejemplo, el decodificador de instrucciones produce
                    señales de control al archivo de registros, diciéndole de
                    qué registros leer y escribir. También indica que queremos
                    hacer una operación add, que se enruta a lo que llamamos una
                    `ALU` (unidad aritmética lógica).
                </Para>

                <Para>
                    Por ahora, usaremos un componente add en lugar de una ALU
                    completa, y estará siempre encendido.
                </Para>

                <SchematicView
                    schematicId={"ins-decode-add"}
                    caption={
                        "Decodificador de Instrucciones conectado al archivo de registros, con instrucción add simple"
                    }
                />

                <Para>
                    ¡Ahora tenemos una instrucción add funcionando! Cuando
                    avanzamos el reloj, el decodificador de instrucciones le
                    dice al archivo de registros que lea de los dos registros
                    fuente, y luego escriba el resultado al registro destino. El
                    componente add hace el cálculo real, y el archivo de
                    registros actualiza su estado interno. Cuando encontramos
                    una instrucción inútil como
                    <code>0x0000_0000</code>, no hacemos nada, y cuando llegamos
                    a la instrucción add, hacemos la acción apropiada.
                </Para>

                <Para>
                    Nuestro estilo de instrucciones de 2-registros de entrada y
                    1-registro de salida forma una familia de instrucciones tipo
                    R (tipo registro). Son todas bastante similares en
                    operación, excepto por el cálculo real que toma lugar. En
                    lugar de nuestro componente add, usaremos un componente ALU
                    apropiado. Esto hace todas las otras operaciones que
                    necesitamos, como subtract, shift, and, or, etc. Desde la
                    perspectiva del decodificador de instrucciones, solo pasa
                    algunos bits directamente de la instrucción original a la
                    ALU, y luego la ALU puede usar esos bits para decidir qué
                    operación realizar. A continuación hay una tabla de las
                    instrucciones tipo R que usaremos.
                </Para>

                <InstructionTable>
                    <InstructionDetail name={"add"} />
                    <InstructionDetail name={"sub"} />
                    <InstructionDetail name={"sll"} />
                    <InstructionDetail name={"slt"} />
                    <InstructionDetail name={"sltu"} />
                    <InstructionDetail name={"xor"} />
                    <InstructionDetail name={"srl"} />
                    <InstructionDetail name={"sra"} />
                    <InstructionDetail name={"or"} />
                    <InstructionDetail name={"and"} />
                </InstructionTable>

                <Para>
                    Estas 10 instrucciones pueden definirse con 4 bits (2^3 = 8:
                    muy pequeño; 2^4 = 16: suficiente), así que esos 4 bits se
                    pasan a la ALU. Los 4 bits se toman de los 3 bits "funct3"
                    (en negro), así como del segundo bit en la instrucción
                    (también en negro). Este último bit diferencia entre un par
                    de operaciones estrechamente relacionadas: add vs subtract,
                    y shift-right-logical vs shift-right-arithmetic. También
                    pasamos algunos bits extra a la ALU, que le dicen si debe
                    hacer algo en absoluto, así como si debe producir un bit de{" "}
                    <em>branch</em>. Conectemos la ALU y veámosla en acción:
                </Para>

                <SchematicView
                    schematicId={"ins-decode-alu"}
                    caption={
                        "Decodificador de Instrucciones conectado a ALU, con varias instrucciones tipo R"
                    }
                />
            </GuideSection>

            <GuideSection title={"Instrucciones tipo I (tipo inmediato)"}>
                <Para>
                    Hasta ahora, hemos asumido que el archivo de registros ya
                    está poblado con valores. Pero normalmente, tal archivo de
                    registros se reinicia a todos ceros, y con todas las
                    instrucciones tipo R, no habría forma de cambiar ninguno de
                    ellos a algo diferente de cero. Así que para ayudar con eso,
                    introducimos un nuevo tipo de instrucción, llamada
                    instrucción tipo I (tipo inmediato). Estas instrucciones son
                    similares a las instrucciones tipo R, excepto que en lugar
                    de tomar dos valores de registro como entradas, toman un
                    valor de registro y un valor inmediato.
                </Para>

                <Para>
                    La palabra <em>inmediato</em> simplemente significa que el
                    valor se almacena directamente en la instrucción misma, en
                    lugar de tomarse de un registro. Idealmente nos gustaría
                    establecer un registro a cualquier valor de 32-bit, pero
                    como la instrucción misma tiene 32 bits de longitud, solo
                    podemos usar algunos de esos bits. Consideremos para qué se
                    usan los otros bits:
                </Para>

                <ol className="ml-8 my-4">
                    <li>7 bits: el tipo de instrucción (tipo I)</li>
                    <li>3 bits: la operación ALU (add, shift, and, or, ...)</li>
                    <li>5 bits: el registro fuente para el LHS</li>
                    <li>5 bits: el registro destino</li>
                </ol>

                <Para>
                    Esos toman un total de 20 bits, dejando 12 bits para el
                    valor inmediato, y nuestra instrucción addi (por ejemplo) se
                    ve así:
                </Para>

                <InstructionTable>
                    <InstructionDetail name={"addi"} />
                    <InstructionDetail name={"slti"} />
                    <InstructionDetail name={"sltiu"} />
                    <InstructionDetail name={"xori"} />
                    <InstructionDetail name={"ori"} />
                    <InstructionDetail name={"andi"} />
                    <InstructionDetail name={"slli"} />
                    <InstructionDetail name={"srli"} />
                    <InstructionDetail name={"srai"} />
                </InstructionTable>

                <Para>
                    En lugar de usar dos valores del archivo de registros,
                    usamos un valor del archivo de registros y uno del
                    decodificador de instrucciones, que el decodificador de
                    instrucciones expande del valor inmediato de 12-bit a un
                    valor completo de 32-bit. Ese valor luego se pasa a la ALU.
                    Al igual que la instrucción tipo R, el resultado de la ALU
                    luego se retroalimenta al archivo de registros.
                </Para>

                <Para>
                    Antes teníamos 10 instrucciones, y ahora solo tenemos 9.
                    Comparadas con las instrucciones tipo R, las instrucciones
                    tipo I carecen de una operación <code>subtract</code>. Esto
                    resulta estar bien, ya que simplemente podemos usar la
                    instrucción <code>addi</code> con un valor inmediato
                    negativo. Sin embargo, aún necesitamos el 4º bit para
                    diferenciar entre shift-right-logical y
                    shift-right-arithmetic. Esto resulta ser factible, ya que
                    todas las instrucciones shift solo necesitan un valor
                    inmediato de 5-bit (solo estamos operando en valores de 32
                    bit, así que el desplazamiento máximo es 2^5 = 32), y
                    podemos usar el bit-2 de la instrucción como antes.
                </Para>

                <Para>
                    Así que para tipo R, el RHS viene del archivo de registros,
                    y para tipo I, el RHS viene del valor inmediato. Por lo
                    tanto necesitamos seleccionar entre estos dos. Para hacer
                    eso, usamos un componente <em>mux</em> (multiplexor). Esta
                    versión particular es un mux de 2-entradas, 32-bit,
                    significando que puede seleccionar entre dos entradas, y
                    producir una de ellas, operando en los 32 valores en
                    conjunto. Para seleccionar entre 2 entradas, solo
                    necesitamos un solo bit.
                </Para>

                <SchematicView
                    schematicId={"2-input-mux"}
                    caption={
                        "Mux (multiplexor) con 2 entradas, manejado por un bit selector"
                    }
                />

                <Para>
                    Ahora podemos usar este mux para seleccionar entre las dos
                    entradas a la ALU. El decodificador de instrucciones le dirá
                    al mux si seleccionar el valor inmediato o el valor de
                    registro.
                </Para>

                <SchematicView
                    schematicId={"r-type-i-type"}
                    caption={
                        "Decodificador de instrucciones seleccionando entre instrucciones tipo I y tipo R"
                    }
                />

                <Para>
                    Este programa ahora puede cargar varios valores en registros
                    usando la instrucción addi, y luego usar las instrucciones
                    tipo R para operar en ellos y producir un nuevo valor.
                    Genial, estamos progresando.
                </Para>
            </GuideSection>

            <GuideSection title={"Instrucciones tipo B (bifurcación)"}>
                <Para>
                    El siguiente tipo de instrucción que soportaremos es la
                    instrucción tipo B (bifurcación). Esta es la primera vez que
                    haremos que el registro PC cambie a algo diferente de PC +
                    4. Esta instrucción forma la base de cosas como
                    declaraciones if/else y bucles for. La instrucción es un
                    poco como la instrucción tipo I: contiene dos valores de
                    registro y un inmediato. Sin embargo, los 2 registros
                    representan dos valores a comparar (es decir, lecturas), y
                    el inmediato se usa como un offset de dirección. Aquí está
                    el desglose:
                </Para>

                <InstructionTable>
                    <InstructionDetail name={"beq"} />
                    <InstructionDetail name={"bne"} />
                    <InstructionDetail name={"blt"} />
                    <InstructionDetail name={"bge"} />
                    <InstructionDetail name={"bltu"} />
                    <InstructionDetail name={"bgeu"} />
                </InstructionTable>

                <Para>
                    Pasamos los dos valores de registro a la ALU, y realizamos
                    una comparación en ellos. Hay algunos tipos de comparación
                    diferentes, y cada uno de ellos produce un valor de 1-bit:
                    "¿Se cumple la condición?". Luego usamos este valor de 1-bit
                    para elegir si queremos saltar o no.
                </Para>

                <Para>
                    El decodificador de instrucciones ya está enviando a la ALU
                    un bit de <em>branch</em>, que le dice que produzca un valor
                    de 1-bit, y ahora necesitamos conectar ese valor de salida a
                    un mux. Ese mux puede entonces seleccionar entre el valor{" "}
                    <code>PC + 4</code> y el valor <code>PC + offset</code>.
                    Como ambos son offsets, podemos seleccionar entre{" "}
                    <code>4</code> y <code>offset</code>, donde el offset viene
                    del decodificador de instrucciones.
                </Para>

                <SchematicView
                    schematicId={"b-type"}
                    caption={"Decodificador de instrucciones con bifurcación"}
                />

                <Para>
                    Ahora podemos saltar por nuestro programa, y el camino que
                    tomamos depende de los valores en los registros. Ejecuta
                    algunos de los programas para verlos en acción.
                </Para>
            </GuideSection>

            <GuideSection title={"Instrucciones tipo J (salto)"}>
                <Para>
                    El siguiente tipo importante de instrucción es la
                    instrucción tipo J (salto). Estas se llaman saltos
                    "incondicionales", porque siempre saltan, en lugar de solo
                    saltar si se cumple una condición. Hay un par de tipos
                    diferentes de instrucciones de salto:
                </Para>

                <InstructionTable>
                    <InstructionDetail name={"jal"} />
                    <InstructionDetail name={"jalr"} />
                </InstructionTable>

                <Para>
                    Estas dos, <Ins>jal</Ins> (jump & link) y <Ins>jalr</Ins>{" "}
                    (jump & link register), son bastante similares. Ambas saltan
                    a una nueva dirección (la parte del salto), y ambas
                    almacenan el valor <code>PC + 4</code> en un registro (la
                    parte del link). La diferencia es que
                    <Ins>jal</Ins> calcula la nueva dirección como{" "}
                    <code>PC + 20-bit-imm</code>, y <Ins>jalr</Ins> la calcula
                    como <code>reg[rs1] + 12-bit-imm</code>.
                </Para>

                <Para>
                    Para implementar estas instrucciones, usaremos la ALU para
                    calcular la nueva dirección. Para la instrucción jal,
                    necesitaremos incluir un mux para cambiar entre tomar el
                    valor LHS del PC o del archivo de registros (Las entradas ya
                    están disponibles para jalr). Agregaremos una señal de
                    control a este nuevo mux también.
                </Para>

                <SchematicView
                    schematicId={"b-type"}
                    caption={"Agregar cables mux PC"}
                />

                <Para>
                    Para manejar los resultados de la ALU, necesitamos agregar
                    un par de mux's más. Normalmente, <code>PC + [offset]</code>{" "}
                    regresa al PC, y la salida de la ALU va al archivo de
                    registros. Pero para nuestras instrucciones de salto,
                    hacemos lo opuesto: <code>PC + [offset]</code> va al archivo
                    de registros, y la salida de la ALU va al PC. Para hacer
                    esto, podemos usar un par de mux's para seleccionar la
                    fuente correcta. Esto puede controlarse por una sola señal
                    del decodificador de instrucciones.
                </Para>

                <SchematicView
                    schematicId={"b-type"}
                    caption={"Agregar conmutación de resultado"}
                />

                <Para>
                    Estas instrucciones pueden parecer un poco extrañas al
                    principio, pero son bastante poderosas. Su uso básico es
                    llamar y retornar de funciones. Cómo hacemos esto es:
                    ejecutar una instrucción <code>jal</code> con su valor imm
                    establecido a un offset que es el inicio de la función, y
                    establecer el registro destino de <code>PC + 4</code> para
                    que sea el <code>ra</code>, o registro de "dirección de
                    retorno" (índice = 1). El PC entonces comienza a ejecutar
                    las instrucciones. Cuando queremos retornar al código que
                    llama, simplemente ejecutamos <code>jalr 0, ra, 0</code>,
                    que salta a la dirección almacenada en <code>ra</code>. Como{" "}
                    <code>ra</code>
                    contenía <code>PC + 4</code> cuando saltamos por primera
                    vez, la dirección de retorno es la instrucción
                    inmediatamente después de la instrucción <code>jal</code>{" "}
                    inicial.
                </Para>
            </GuideSection>
            <GuideSection title={"Instrucciones de inmediato superior"}>
                <Para>
                    Hasta ahora, solo hemos podido cargar valores inmediatos de
                    12-bit en registros. Típicamente esto se hace con{" "}
                    <code>addi rd, 0, imm</code>, es decir, sumando 0 al valor
                    inmediato. Pero ¿qué pasa si queremos cargar un valor de
                    32-bit? Podríamos hacer varios addi's y shifts, pero RISCV
                    proporciona instrucciones para establecer los 20 bits
                    superiores restantes:
                </Para>

                <InstructionTable>
                    <InstructionDetail name={"lui"} />
                    <InstructionDetail name={"auipc"} />
                </InstructionTable>

                <Para>
                    La primera, <Ins>lui</Ins> (load upper immediate), establece
                    los 20 bits superiores de un registro al valor inmediato
                    proporcionado. Podemos hacer esto simplemente estableciendo
                    el LHS a 0, y el RHS al valor inmediato. Como estos cables
                    tienen 32-bits de ancho, el mapeo a los bits superiores
                    ocurre completamente en INS-decode.
                </Para>

                <Para>
                    La segunda, <Ins>auipc</Ins> (add upper immediate to PC), es
                    esencialmente la misma, excepto que el LHS se establece al
                    PC. Afortunadamente, no necesitamos cambios, ya que ya
                    tenemos el mux usado para seleccionar entre PC y archivo de
                    registros para el LHS.
                </Para>
            </GuideSection>

            <GuideSection title={"Instrucciones Load/Store"}>
                <Para>
                    Ahora mismo, nuestra CPU no puede hacer mucho. Puede cargar
                    valores en registros, operar en ellos, y saltar por el
                    código. La siguiente cosa importante es poder leer y
                    escribir a memoria. Esto es en realidad bastante poderoso,
                    ya que las direcciones no necesariamente necesitan mapear a
                    memoria física, sino que pueden controlar dispositivos
                    externos.
                </Para>
                <Para>
                    Para acceder a memoria, RISCV proporciona un par de tipos de
                    instrucción: load y store.
                </Para>

                <ul className="self-center my-4">
                    <li>
                        <b>Load:</b> memory@address --&gt; register
                    </li>
                    <li>
                        <b>Store:</b> register --&gt; memory@address
                    </li>
                </ul>

                <Para>
                    Así que para hacer cualquier cálculo en datos, primero
                    necesitamos cargarlo en un registro desde memoria, luego
                    operar en él, antes de almacenar el resultado de vuelta en
                    memoria. Las instrucciones RISVC para esto son las
                    siguientes:
                </Para>

                <InstructionTable>
                    <InstructionDetail name={"lb"} />
                    <InstructionDetail name={"lh"} />
                    <InstructionDetail name={"lw"} />
                    <InstructionDetail name={"lbu"} />
                    <InstructionDetail name={"lhu"} />

                    <InstructionDetail name={"sb"} />
                    <InstructionDetail name={"sh"} />
                    <InstructionDetail name={"sw"} />
                </InstructionTable>

                <Para>
                    Hay algunos tipos diferentes de instrucciones load y store.
                    El desglose principal es que hay 3 tamaños diferentes de
                    datos que pueden cargarse/almacenarse: 8-bit (b; "byte"),
                    16-bit (h; "half-word"), y 32-bit (w; "word"). Los tamaños
                    byte y half-word también tienen versiones sin signo, ya que
                    para los otros, extendemos el signo del valor a 32-bits.
                </Para>

                <Para>
                    En todos los casos, la dirección de memoria se calcula como
                    (reg[rs1] + imm). Para nuestra CPU, no usaremos la ALU para
                    esta suma, sino que incluiremos un sumador en el componente
                    load/store. Alimentaremos el valor LHS (reg[rs1]), al
                    load/store. También alimentamos reg[rs2] al load/store para
                    stores. Finalmente, para loads, enviamos el resultado a los
                    registros de la misma manera que los resultados de la ALU.
                </Para>

                <Para>
                    Echemos un vistazo al componente RAM (memoria) con el que
                    estaremos interfazando. Es un componente simple que toma una
                    dirección, algunas líneas de control, y una línea de datos
                    bidireccional. La línea de datos se usa tanto para lecturas
                    como escrituras, así que en cualquier ciclo dado, puede leer
                    o escribir la dirección proporcionada. La elección de leer o
                    escribir (o ninguna) se controla por las líneas de control.
                    Finalmente, la escritura puede hacerse en chunks de 8-bit,
                    16-bit, o 32-bit, también controlado por las líneas de
                    control.
                </Para>

                <SchematicView
                    schematicId={"b-type"}
                    caption={"Control de RAM"}
                />

                <Para>
                    Para conectar esta RAM a nuestra CPU, agregamos nuestro
                    componente load/store y lo conectamos al bus de
                    dirección/datos/ctrl, así como a los internos de la CPU.
                    Ahora podemos ejecutar nuestras instrucciones load y store
                    para leer y escribir a la memoria.
                </Para>

                <SchematicView
                    schematicId={"b-type"}
                    caption={"RAM y load/store conectados"}
                />

                <Para>
                    Esto nos permite escribir programas que pueden acceder a
                    memoria, y por lo tanto hacer cosas útiles. En nuestra
                    configuración aquí, la dirección 0x0 se refiere al primer
                    valor de 32-bit en RAM y 0x4 se refiere al segundo valor de
                    32-bit en RAM. Esto no es tan bueno, ya que nuestra ROM{" "}
                    <em>también</em> tiene su primer valor de 32-bit en la
                    dirección 0x0 (donde el PC se inicializa). Generalmente
                    cuando configuramos un sistema como este, queremos espacios
                    de direcciones no superpuestos para nuestras diferentes
                    regiones de memoria, y los compiladores típicamente se
                    quejarán si este no es el caso.
                </Para>
            </GuideSection>
        </CpuEnabledGuide>
    );
}
