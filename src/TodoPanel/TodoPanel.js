import React from 'react';
import TaskList from "../TaskList/TaskList";
import styles from './TodoPanel.module.css'
import taskList from "../TaskList/TaskList";


class TodoPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            taskList:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value})
    }
    addTask(el){
        this.setState({taskList: taskList.apply(this.state.value)})
        console.log(this.state.taskList)
        this.input.value = ''
    }
    render(){
        return (
            <div className={styles.wrapper}>
                <div className={styles.addPanel}>
                    <input type="text"
                           id='input'
                           value={this.state.value}
                           onChange={this.handleChange}
                           ref={el => this.input = el}/>
                    <span onClick={this.addTask}> </span>
                </div>
                <TaskList taskList={this.taskList}/>
            </div>
        );
    }

};

export default TodoPanel;