import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Importa componentes de React Native para diseñar y estructurar la interfaz.
import { Ionicons } from '@expo/vector-icons';
// Importa íconos de Ionicons para agregar elementos gráficos como botones.
import { Task } from '../types/task';
// Importa la interfaz `Task` para tipar correctamente las props.

interface TaskItemProps {
  task: Task;
  // La tarea que se mostrará en este componente.
  onToggleComplete: (id: number) => void;
  // Función que se llama para marcar o desmarcar una tarea como completada.
  onDelete: (id: number) => void;
  // Función que se llama para eliminar la tarea.
  onEdit: (task: Task) => void;
  // Función que se llama para editar la tarea.
}

// Define un componente funcional `TaskItem` que recibe `TaskItemProps`.
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <View style={styles.taskContainer}>
      {/* Checkbox para marcar/desmarcar la tarea como completada */}
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => onToggleComplete(task.id)}
      >
        {/* Muestra el ícono de checkmark si la tarea está completada */}
        {task.completed && (
          <Ionicons name="checkmark" size={20} color="white" />
        )}
      </TouchableOpacity>

      {/* Texto de la tarea, con estilo dinámico si está completada */}
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>
        {task.text}
      </Text>

      {/* Botones para editar y eliminar la tarea */}
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Ionicons name="pencil" size={20} color="blue" />
          {/* Ícono de lápiz para editar */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Ionicons name="trash" size={20} color="red" />
          {/* Ícono de papelera para eliminar */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    // Ordena los elementos en una fila.
    alignItems: 'center',
    // Alinea verticalmente los elementos al centro.
    backgroundColor: 'white',
    // Fondo blanco para la tarjeta de tarea.
    padding: 15,
    // Espaciado interno para el contenido.
    borderRadius: 10,
    // Bordes redondeados para el contenedor.
    marginBottom: 10,
    // Separación entre las tarjetas de tareas.
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    // Ancho del borde del checkbox.
    borderColor: '#007bff',
    // Color azul para el borde del checkbox.
    marginRight: 10,
    // Espacio entre el checkbox y el texto de la tarea.
    justifyContent: 'center',
    // Centra el contenido dentro del checkbox (ícono).
    alignItems: 'center',
    // Alinea horizontalmente el contenido.
  },
  taskText: {
    flex: 1,
    // Ocupa el espacio restante disponible.
    fontSize: 16,
    // Tamaño del texto de la tarea.
  },
  completedTask: {
    textDecorationLine: 'line-through',
    // Aplica una línea que atraviesa el texto.
    color: '#888',
    // Color gris para tareas completadas.
  },
  taskActions: {
    flexDirection: 'row',
    // Coloca los botones de acciones en una fila.
    gap: 10,
    // Espaciado entre los botones (puede requerir configuración adicional en algunas versiones de React Native).
  },
});
