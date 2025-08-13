import React from 'react';
import { LayerView } from '@/src/llm/LayerView';
import { InfoButton } from '@/src/llm/WelcomePopup';

export const metadata = {
  title: 'LLM Visualización',
  description: 'Visualización 3D animada e interactiva de un Modelo de Lenguaje (LLM) con recorrido guiado paso a paso.',
};


import { Header } from '@/src/homepage/Header';

export default function Page() {
    return <>
        <Header title="LLM Visualización">
            <InfoButton />
        </Header>
        <LayerView />
        <div id="portal-container"></div>
    </>;
}
