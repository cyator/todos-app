import React, { Component } from 'react';
import Todos from './components/Todos';
import './App.css';

class App extends Component {
	state = {
		todos: [
			{
				id: 1,
				title: 'take out the trash',
				completed: false,
			},
			{
				id: 2,
				title: 'dinner with wife',
				completed: true,
			},
			{
				id: 3,
				title: 'meeting with boss',
				completed: false,
			},
		],
	};
	render() {
		return (
			<div className='App'>
				<Todos todos={this.state.todos} />
			</div>
		);
	}
}

export default App;
