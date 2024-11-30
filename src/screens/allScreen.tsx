import React, { useState, useEffect } from 'react';
// Importa las dependencias necesarias para usar componentes, estados y efectos en React.

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';
// Importa los componentes esenciales de React Native para diseñar la interfaz.

import { Ionicons } from '@expo/vector-icons';
// Importa el paquete de íconos de Expo para añadir iconos personalizados.

import { Task } from '../types/task';
// Importa el tipo Task para tipar correctamente las tareas.

import { TaskItem } from '../components/taskItem';
// Importa el componente TaskItem para renderizar las tareas individuales.

import { loadTasks, saveTasks } from '../utils/storage';
// Importa las funciones para cargar y guardar tareas desde el almacenamiento local.

export const AllScreen: React.FC = () => {
  // Declara el componente funcional principal.

  const [tasks, setTasks] = useState<Task[]>([]);
  // Estado que almacena la lista de tareas.

  const [newTask, setNewTask] = useState('');
  // Estado para manejar el texto de una nueva tarea.

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // Estado para manejar la tarea que se está editando.

  const [modalVisible, setModalVisible] = useState(false);
  // Estado para controlar si el modal de edición está visible o no.

  useEffect(() => {
    // Efecto que se ejecuta al montar el componente.
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks(); // Carga las tareas del almacenamiento.
      setTasks(loadedTasks); // Actualiza el estado con las tareas cargadas.
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    // Efecto que se ejecuta cada vez que cambia la lista de tareas.
    saveTasks(tasks); // Guarda las tareas actualizadas en el almacenamiento.
  }, [tasks]);

  const addTask = () => {
    // Función para añadir una nueva tarea.
    if (newTask.trim()) {
      // Verifica que el texto no esté vacío.
      const newTaskItem: Task = {
        id: Date.now(), // Genera un ID único usando la marca de tiempo.
        text: newTask, // Asigna el texto de la nueva tarea.
        completed: false, // Marca la tarea como no completada por defecto.
      };
      setTasks([...tasks, newTaskItem]); // Añade la nueva tarea al estado.
      setNewTask(''); // Limpia el campo de entrada.
    }
  };

  const deleteTask = (id: number) => {
    // Función para eliminar una tarea por su ID.
    setTasks(tasks.filter(task => task.id !== id)); // Filtra las tareas excluyendo la que coincide con el ID.
  };

  const toggleComplete = (id: number) => {
    // Función para alternar el estado de completado de una tarea.
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openEditModal = (task: Task) => {
    // Función para abrir el modal de edición.
    setEditingTask(task); // Establece la tarea que se va a editar.
    setModalVisible(true); // Muestra el modal.
  };

  const saveEditedTask = () => {
    // Función para guardar los cambios en una tarea editada.
    if (editingTask) {
      setTasks(
        tasks.map(task => (task.id === editingTask.id ? editingTask : task))
      );
      setModalVisible(false); // Oculta el modal.
      setEditingTask(null); // Resetea el estado de la tarea en edición.
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Contenedor principal seguro para dispositivos con "notch". */}
      <Text style={styles.title}>Mi Lista de Tareas</Text>
      {/* Título de la pantalla. */}

      <View style={styles.inputContainer}>
        {/* Contenedor para el campo de entrada y botón de agregar. */}
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Añadir nueva tarea"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          {/* Botón para añadir una nueva tarea. */}
          <Ionicons name="add" size={30} color="white" />
          {/* Icono de "+" para indicar acción de añadir. */}
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onEdit={openEditModal}
          />
        )}
        keyExtractor={item => item.id.toString()}
        style={styles.taskList}
      />
      {/* Lista de tareas renderizada con FlatList para optimización. */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Tarea</Text>
            <TextInput
              style={styles.editInput}
              value={editingTask?.text || ''}
              onChangeText={text =>
                setEditingTask(editingTask ? { ...editingTask, text } : null)
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={saveEditedTask}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal para editar una tarea existente. */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Contenedor principal que abarca toda la pantalla.
    flex: 1, // Ocupa todo el espacio disponible.
    backgroundColor: '#f0f0f5', // Color de fondo claro.
    paddingHorizontal: 20, // Margen horizontal interno.
    paddingTop: 40, // Margen superior para evitar la superposición con la barra de estado.
  },
  title: {
    // Estilo para el título principal de la pantalla.
    fontSize: 28, // Tamaño grande para destacar.
    fontWeight: '600', // Peso de fuente semi-negrita.
    color: '#333', // Color oscuro para buena legibilidad.
    textAlign: 'center', // Centra el texto horizontalmente.
    marginBottom: 30, // Separación inferior del título con otros elementos.
  },
  inputContainer: {
    // Contenedor para el campo de entrada y el botón de añadir.
    flexDirection: 'row', // Disposición horizontal.
    alignItems: 'center', // Alinea verticalmente al centro.
    marginBottom: 30, // Espaciado inferior entre el contenedor y otros elementos.
    paddingHorizontal: 10, // Espaciado interno horizontal.
  },
  input: {
    // Estilo para el campo de texto donde el usuario ingresa tareas.
    flex: 1, // Ocupa todo el ancho disponible dentro del contenedor.
    height: 45, // Altura del campo de texto.
    backgroundColor: '#fff', // Fondo blanco para contraste.
    borderRadius: 12, // Bordes redondeados.
    borderColor: '#ccc', // Color del borde.
    borderWidth: 1, // Grosor del borde.
    paddingHorizontal: 15, // Espaciado interno para el texto.
    fontSize: 18, // Tamaño de fuente adecuado para visibilidad.
    color: '#333', // Color del texto.
    marginRight: 10, // Espaciado derecho entre el campo de texto y el botón.
    elevation: 3, // Sombra sutil para dar profundidad.
  },
  addButton: {
    // Botón para añadir nuevas tareas.
    backgroundColor: '#007AFF', // Color azul vibrante.
    height: 45, // Altura igual al campo de entrada.
    width: 45, // Anchura igual a la altura (botón cuadrado).
    borderRadius: 22, // Bordes redondeados, lo que lo hace circular.
    justifyContent: 'center', // Centra el icono verticalmente.
    alignItems: 'center', // Centra el icono horizontalmente.
    shadowColor: '#007AFF', // Color de la sombra.
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra.
    shadowOpacity: 0.2, // Opacidad de la sombra.
    shadowRadius: 4, // Difuminado de la sombra.
    elevation: 5, // Sombra visible en Android.
  },
  taskList: {
    // Estilo para la lista de tareas.
    flex: 1, // Ocupa el espacio restante en la pantalla.
    marginTop: 10, // Margen superior para separar de otros elementos.
  },
  modalContainer: {
    // Contenedor para el modal de edición.
    flex: 1, // Ocupa toda la pantalla.
    justifyContent: 'center', // Centra el modal verticalmente.
    alignItems: 'center', // Centra el modal horizontalmente.
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente oscuro.
  },
  modalContent: {
    // Contenedor principal del contenido del modal.
    width: '85%', // Ocupa el 85% del ancho de la pantalla.
    backgroundColor: '#fff', // Fondo blanco para contraste.
    borderRadius: 20, // Bordes redondeados.
    padding: 20, // Espaciado interno.
    shadowColor: '#000', // Color de la sombra.
    shadowOffset: { width: 0, height: 6 }, // Desplazamiento de la sombra.
    shadowOpacity: 0.3, // Opacidad de la sombra.
    shadowRadius: 10, // Difuminado de la sombra.
    elevation: 10, // Sombra visible en Android.
    marginHorizontal: 20, // Margen horizontal interno para evitar bordes extremos.
  },
  modalTitle: {
    // Estilo para el título del modal.
    fontSize: 22, // Tamaño de fuente más pequeño que el título principal.
    fontWeight: '500', // Peso semi-negrita.
    marginBottom: 15, // Separación inferior con otros elementos.
    color: '#333', // Color oscuro.
  },
  editInput: {
    // Estilo para el campo de texto en el modal.
    height: 50, // Altura del campo de texto.
    backgroundColor: '#f8f8f8', // Fondo gris claro.
    borderRadius: 12, // Bordes redondeados.
    borderColor: '#ccc', // Color del borde.
    borderWidth: 1, // Grosor del borde.
    paddingHorizontal: 15, // Espaciado interno para el texto.
    fontSize: 18, // Tamaño de la fuente.
    color: '#333', // Color del texto.
    marginBottom: 25, // Separación inferior con otros elementos.
    elevation: 2, // Sombra leve para dar profundidad.
  },
  modalButtons: {
    // Contenedor de los botones del modal.
    flexDirection: 'row', // Acomoda los botones en una fila.
    justifyContent: 'space-between', // Espaciado uniforme entre botones.
  },
  modalButton: {
    // Estilo para los botones del modal.
    flex: 1, // Cada botón ocupa el mismo ancho.
    backgroundColor: '#007AFF', // Fondo azul vibrante.
    paddingVertical: 12, // Relleno vertical.
    borderRadius: 12, // Bordes redondeados.
    alignItems: 'center', // Centra el texto horizontalmente.
    marginHorizontal: 5, // Espaciado horizontal entre botones.
  },
  modalButtonText: {
    // Estilo para el texto dentro de los botones del modal.
    color: '#fff', // Color blanco para contraste.
    fontSize: 18, // Tamaño adecuado para lectura.
    fontWeight: '500', // Peso semi-negrita.
  },
});
