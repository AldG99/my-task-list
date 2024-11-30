import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa AsyncStorage, una librería para manejar almacenamiento persistente en React Native.

import { Task } from '../types/task';
// Importa el tipo `Task` desde los tipos definidos en el proyecto para tipar las funciones de manera estricta.

// Función para cargar las tareas almacenadas en AsyncStorage.
export const loadTasks = async (): Promise<Task[]> => {
  try {
    // Intenta obtener las tareas almacenadas con la clave 'tasks'.
    const savedTasks = await AsyncStorage.getItem('tasks');
    // Si existen tareas guardadas, las parsea de formato JSON a un arreglo de objetos `Task`.
    // Si no hay datos guardados, retorna un arreglo vacío.
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    // Manejo de errores: si ocurre algún problema al cargar las tareas, lo registra en la consola.
    console.error('Error al cargar tareas', error);
    return [];
    // Retorna un arreglo vacío como fallback para evitar que la aplicación falle.
  }
};

// Función para guardar las tareas en AsyncStorage.
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    // Convierte el arreglo de tareas a formato JSON y lo almacena con la clave 'tasks'.
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    // Manejo de errores: si ocurre algún problema al guardar las tareas, lo registra en la consola.
    console.error('Error al guardar tareas', error);
  }
};
