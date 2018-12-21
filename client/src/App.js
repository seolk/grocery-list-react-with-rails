import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container, } from "semantic-ui-react";
import axios from "axios";

class App extends Component {
  state = { todos: [] }
  
  componentDidMount() {
    axios.get('/api/items')
      .then( res => {
        this.setState({ todos: res.data, });
      })
      .catch( err => {
        console.log(err);
      })
  }

  addItem = (name, price) => {
    axios.post('/api/items', { name, price })
      .then( res => {
        const { todos } = this.state;
        this.setState({ todos: [...todos, res.data] })
      })
      .catch( err => {
        console.log(err);
    })
  }

  updateTodo = (id) => {
    axios.put(`/api/items/${id}`)
      .then( res => {
        const todos = this.state.todos.map( t => {
        if (t.id === id)
          return res.data;
        return t;
      });
      this.setState({ todos });
    })
  }

  deleteTodo = (id) => {
    axios.delete(`/api/items/${id}`)
      .then( res => {
        const { todos } = this.state;
        this.setState({ todos: todos.filter(t => t.id !== id) })
    })
  }

  render() {
    return (
      <Container style={{ padding: "30px 0" }}>
        <TodoForm addItem={this.addItem} />
        <br />
        <div>
          <h1>Grocery Items</h1>
        </div>
        <br />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
      </Container>
    );
  }
}

export default App;