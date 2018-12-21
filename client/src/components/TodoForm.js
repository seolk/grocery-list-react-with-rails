import React, { Component } from 'react';
import { Button, Form } from "semantic-ui-react";

class TodoForm extends Component {
  state = { name: '', price: '' };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.name, this.state.price)
    this.setState({ name: '', price: '' })
  }

  render() {
    const { name, price } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label="Enter Item"
            name='name'
            value = {name}
            required
            placeholder="Add Item"
            onChange={this.handleChange}
            />
          <Form.Input
            label="Enter Price"
            name='price'
            value = {price}
            required
            placeholder='Add Price' 
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button size="small" type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default TodoForm;