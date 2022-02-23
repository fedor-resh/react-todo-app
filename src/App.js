import TodoPanel from "./TodoPanel/TodoPanel";
import PomodoroPanel from './PomodoroPanel/PomodoroPanel';
import React from 'react';
import SettingsPanel from './SettingsPanel/SettingsPanel';

class TaskClass {
    constructor(text) {
        this.text = text
        this.isComplete = false
        this.isInPomodoro = false
        this.id = TaskClass.ownId++
        this.date = new Date
    }
    static ownId = 0
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            taskList: JSON.parse(localStorage.taskList),
            selectedId:undefined
        }
        this.addTask = this.addTask.bind(this);
    }
    addTask(value) {
        if (value) {
            this.setState({
                taskList:
                    [new TaskClass(value),
                        ...this.state.taskList]
            })
            console.log(this.state.taskList)


        }
        localStorage.taskList = JSON.stringify(this.state.taskList)
    }
    changeIsComplete(id) {
        const taskList = this.state.taskList.slice()
        taskList[id].isComplete=!taskList[id].isComplete
        this.setState({taskList: taskList})
    }
    toChangeIsInPomodoro(){
        const taskList = this.state.taskList.slice()
        taskList[this.state.selectedId].isInPomodoro=!taskList[this.state.selectedId].isInPomodoro
        this.setState({taskList:taskList})
    }
    updateText(text){
        if(text){
        const taskList = this.state.taskList.slice()
        taskList[this.state.selectedId].text = text
        this.setState({taskList:taskList})
        }
    }
    toSelect(id){
        if (id===this.state.selectedId){
            this.setState({selectedId:undefined})
            console.log('asdfasdf')
        }else{this.setState({selectedId:id})}

    }
  render() {
      return (
          <div className="App">
              <PomodoroPanel
                  taskList={this.state.taskList}
                  changeIsComplete={id=>this.changeIsComplete(id)}
                  toSelect={(id)=>this.toSelect(id)}
              />
              <SettingsPanel
                  selectedId={this.state.selectedId}
                  updateText={(text)=>this.updateText(text)}
                  toChangeIsInPomodoro={()=>this.toChangeIsInPomodoro()}
                  changeIsComplete={id=>this.changeIsComplete(id)}
                  task={this.state.taskList[this.state.selectedId]}
                  id={this.state.selectedId}
              />
              <TodoPanel
                  toSelect={(id)=>this.toSelect(id)}
                  addTask={value=>this.addTask(value)}
                  changeIsComplete={id=>this.changeIsComplete(id)}
                  taskList={this.state.taskList}
              />

          </div>
      );
  }
}

export default App;
