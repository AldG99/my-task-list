import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => onToggleComplete(task.id)}
      >
        {task.completed && (
          <Ionicons name="checkmark" size={20} color="white" />
        )}
      </TouchableOpacity>
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>
        {task.text}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => onEdit(task)}>
          <Ionicons name="pencil" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007bff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 10,
  },
});
