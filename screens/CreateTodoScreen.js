// screens/CreateTodoScreen.js
import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';

const CreateTodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        'https://my-json-server.typicode.com/AdewaleNath/DCToDoApp/todos',
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    try {
      const response = await fetch(
        'https://my-json-server.typicode.com/AdewaleNath/DCToDoApp/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            dueDate,
            priority,
          }),
        },
      );
      const data = await response.json();
      console.log('Todo created:', data);
      fetchTodos(); // Fetch updated todos after creating a new one
      // Reset input fields
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async id => {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/AdewaleNath/DCToDoApp/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            dueDate,
            priority,
          }),
        },
      );
      const data = await response.json();
      console.log('Todo updated:', data);
      fetchTodos(); // Fetch updated todos after updating
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async id => {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/AdewaleNath/DCToDoApp/todos/${id}`,
        {
          method: 'DELETE',
        },
      );
      const data = await response.json();
      console.log('Todo deleted:', data);
      fetchTodos(); // Fetch updated todos after deleting
    } catch (error) {
      console.error(error);
    }
  };

  const renderTodo = ({item}) => (
    <View>
      <Text>{item.title}</Text>
      <Button title="Update" onPress={() => updateTodo(item.id)} />
      <Button title="Delete" onPress={() => deleteTodo(item.id)} />
    </View>
  );

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Due Date"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <TextInput
        placeholder="Priority"
        value={priority}
        onChangeText={setPriority}
      />
      <Button title="Create Todo" onPress={createTodo} />
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CreateTodoScreen;
