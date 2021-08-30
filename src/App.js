import './App.css';
import React from 'react';
import Overview from './components/Overview.js'

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: { text: '', edit: false },
      tasksBuffer: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      task: {text: e.target.value, edit: false },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.task.text !== '') {
      this.setState({
        tasks: this.state.tasks.concat(this.state.task),
        task: {text: '', edit: false },
        tasksBuffer: this.state.tasksBuffer.concat(this.state.task.text),
      })
    }
  }

  handleClickDelete(i) { //TODO: Je delete la task, qu'est-ce qu'il reste dans le Buffer ?
    const temp = this.state.tasks.slice();
    temp.splice(i, 1);

    this.setState({
      tasks: temp,
    })
  }

  handleClickEdit(i) {
    let tasks = this.state.tasks.slice();
    tasks[i] = { text: tasks[i].text, edit: true }; //TODO: réécrire -> task[i].edit = true ?

    this.setState({
      tasks: tasks,
    })
  }

  handleChangeEdit = (i, e) => {
    const task = e.target.value;
    const tasksBuffer = this.state.tasksBuffer.slice();
    tasksBuffer[i] = task;

    this.setState({
      tasksBuffer: tasksBuffer,
    })
  }

  handleSubmitEdit = (i, e) => {
    e.preventDefault();

    const tasks = this.state.tasks.slice();
    const tasksBuffer = this.state.tasksBuffer.slice();
    tasks[i] = { text: tasksBuffer[i], edit: false } ;

    this.setState({
      tasks: tasks,
    })
  }

  handleCancelEdit = (i) => {
    const tasksBuffer = this.state.tasksBuffer.slice();
    const tasks = this.state.tasks.slice();
    tasksBuffer[i] = tasks[i].text
    tasks[i].edit = false;

    this.setState ({
      tasksBuffer: tasksBuffer,
    })
  }

  render() {
    const { task } = this.state

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="taskInput">Ajouter une tache</label>
          <input
            type="text"
            id="taskInput"
            value={ task.text }
            onChange={ this.handleChange }
          />
          <button type="submit">
            Envoyer
          </button>
        </form>
        <Overview
            tasks={ this.state.tasks }
            tasksBuffer= { this.state.tasksBuffer }
            onClickDelete={ (i) => this.handleClickDelete(i) }
            onClickEdit= { (i) => this.handleClickEdit(i) }
            onChange={ this.handleChangeEdit }
            onSubmit={ this.handleSubmitEdit }
            onCancel={ (i) => this.handleCancelEdit(i) }
          />
      </div>
    )
  }
}

function App() {

  return (
    <TodoList />
  );
}

export default App;
