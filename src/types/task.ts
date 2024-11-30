// Define la interfaz `Task`, que representa la estructura de una tarea en la aplicación.
export interface Task {
  id: number;
  // Identificador único para cada tarea. Es un número (por ejemplo, generado con `Date.now()`).

  text: string;
  // El texto descriptivo de la tarea, que indica qué debe hacerse. Es una cadena de texto.

  completed: boolean;
  // Indica si la tarea está completada o no. Es un valor booleano (`true` o `false`).
}
