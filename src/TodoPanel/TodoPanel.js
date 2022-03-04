import React from 'react';
import styles from './TodoPanel.module.css'
import Task from './Task/Task';

class TodoPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
        // this.sendValue = this.sendValue.bind(this);
        document.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                this.sendValue()
            }
        })
    }
    sendValue(){
        this.props.addTask(this.state.value)
        this.setState({value: ''})
    }
    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.addPanel}>
                    <input type="text"
                           id='input'
                           ref={el=>this.input = el}
                           onChange={this.handleChange}
                           value={this.state.value || ""}
                    />
                    <span onClick={()=>this.sendValue()}> </span>
                </div>
                {this.props.taskList.map(({text, isComplete, id, timeToDo },i) => {
                        if (!isComplete) {
                            return <Task change={() => this.props.changeIsComplete(i)}
                                         key={id}
                                         taskText={text}
                                         toSelect={()=>this.props.toSelect(i)}
                                         selected={i===this.props.selectedId}
                                         mins = {timeToDo}
                            />
                        }else {return null}
                    }
                )}
                <details>
                    <summary>done</summary>
                    {this.props.taskList.map(({text, isComplete, id, timeToDo},i) => {
                            if (isComplete) {
                                return <Task change={() => this.props.changeIsComplete(i)}
                                             done={true}
                                             key={id}
                                             taskText={text}
                                             toSelect={()=>this.props.toSelect(i)}
                                             selected={i===this.props.selectedId}
                                             close={()=>this.props.toDeleteTask(i)}
                                             mins = {timeToDo}
                                />
                            }else {return null}
                        }
                    )}
                </details>
            </div>
        );
    }
}

export default TodoPanel;