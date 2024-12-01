import React from 'react';
// Importa React para usar componentes funcionales.

import { AllScreen } from './src/screens/allScreen';
// Importa el componente `AllScreen` desde su ruta correspondiente.
// `AllScreen` es la pantalla principal de la aplicación, que muestra la lista de tareas.

export default function App() {
  // Define el componente principal de la aplicación.

  return <AllScreen />;
  // Retorna el componente `AllScreen` como la interfaz principal que se renderiza.
  // Este será el punto de entrada de la aplicación.
}
