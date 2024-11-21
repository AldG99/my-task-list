import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const savedTasks = await AsyncStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error al cargar tareas', error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error al guardar tareas', error);
  }
};
