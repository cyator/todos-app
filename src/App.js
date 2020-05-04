import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Todos from './components/Todos';
import Header from './components/layout/header';
import AddTodo from './components/AddTodo';
import About from './components/pages/about';

const uuid = require('uuid');

class App extends Component {
	state = {
		todos: [
			{
				id: uuid.v4(),
				title: 'take out the trash',
				completed: false,
			},
			{
				id: uuid.v4(),
				title: 'dinner with wife',
				completed: false,
			},
			{
				id: uuid.v4(),
				title: 'meeting with boss',
				completed: false,
			},
		],
	};
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
		this.setState({
			todos: [...this.state.todos.filter((todo) => todo.id !== id)],
		});
	};
	//addTodo
	addTodo = (title) => {
		const newTodo = {
			id: uuid.v4(),
			title,
			completed: false,
		};
		this.setState({
			todos: [...this.state.todos, newTodo],
		});
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
