import React from 'react';

class Overview extends React.Component {

  renderTask(task, i) {
    let deletePart = <span onClick={ () => this.props.onClickDelete(i) }>  X</span>
    let ret;
    if (task.edit === true) {
      ret =
        <li key={i} id={i} > {i}
          <form onSubmit={ (e) => this.props.onSubmit(i, e) }>
            <input
              type="text"
              value={ this.props.tasksBuffer[i] }
              onChange={ (e) => this.props.onChange(i, e) }
              autoFocus
            />
            <button type="submit">
              Envoyer
            </button>
            <button type="button" onClick= { () => this.props.onCancel(i) }>
              Annuler
            </button>
          </form>
          {deletePart}
        </li>
    }
    else {
      ret = <li key={i} id={i} > {i} {task.text} {deletePart} <span onClick={ () => this.props.onClickEdit(i) }> Edit</span></li>
    }
  return(ret);
  }

  render () {
    const { tasks } = this.props
    let taskrender;

    if (tasks && tasks.length > 0) {
      taskrender = tasks.map(
        (task, i) => this.renderTask(task, i)
      )
    }
    return (
      <ul>
      { taskrender }
      </ul>
    )
  }
}

export default Overview;