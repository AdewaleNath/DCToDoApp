// screens/HomeScreen.js
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const renderTodo = ({item}) => (
    <View>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id.toString()}
      />
      <Button
        title="Create Todo"
        onPress={() => navigation.navigate('CreateTodo')}
      />
    </View>
  );
};

export default HomeScreen;
