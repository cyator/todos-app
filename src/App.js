import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Todos from './components/Todos';
import Header from './components/layout/header';
import AddTodo from './components/AddTodo';
import About from './components/pages/about';
import axios from 'axios';

//const uuid = require('uuid');

class App extends Component {
	state = {
		todos: [],
	};

	componentDidMount() {
		axios
			.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
			.then((res) => this.setState({ todos: res.data }));
	}

	//toggle complete
	markComplete = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			}),
		});
	};
	// deleteTodo
	deleteTodo = (id) => {
		axios
			.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
			.then((res) =>
				this.setState({
					todos: [...this.state.todos.filter((todo) => todo.id !== id)],
				})
			);
	};
	//addTodo
	addTodo = (title) => {
		axios
			.post('http://jsonplaceholder.typicode.com/todos', {
				title,
				completed: false,
			})
			.then((res) =>
				this.setState({
					todos: [...this.state.todos, res.data],
				})
			);
	};

	render() {
		return (
			<Router>
				<div className='App'>
					<div className='container'>
						<Header />
						<Route
							exact
							path='/'
							render={(props) => (
								<React.Fragment>
									<AddTodo addTodo={this.addTodo} />
									<Todos
										todos={this.state.todos}
										markComplete={this.markComplete}
										deleteTodo={this.deleteTodo}
									/>
								</React.Fragment>
							)}
						/>
						<Route path='/about' component={About} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
