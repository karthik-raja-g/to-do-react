import React,{useReducer,useState} from 'react';
import './App.css';
import ListComponent from './components/ListComponent';
import TasksComponent from './components/TasksComponent';
import TaskDetail from './components/TaskDetail';
import Classnames from 'classnames/bind'

export const TodoContext = React.createContext();
const initialState = {
  owner:'karthik',
  id:1,
  createdOn:'',
  list:[],
  currentItemId: 0,
  currentTaskId: 0,
  currentSubTaskId: 0
}

const reducer = (prevState,action) => {
  switch(action.type) {
      case 'ADD_ITEM':
        const item = {
          id:Math.floor(Math.random() * 100),
          task:action.task,
          tasks:[],
          taskCount:0,
          isCompleted:false
        }
        const newList = [...prevState.list]
        newList.push(item)
        return {
          ...prevState,
          list: newList
        }

      case 'SELECT_ITEM':
        return {
          ...prevState,
          currentItemId:action.id
        }

      case 'ADD_TASK': 
        const task = {
          id:Math.floor(Math.random() * 100),
          title:action.task,
          reminder:'',
          isCompleted: false,
          dueDate:'',
          notes:''
        }
        const oldItem = prevState.list.find(task => task.id === action.id)
        const oldTasks = prevState.list.filter(task => task.id !== action.id)
        oldItem.tasks = oldItem.tasks.concat(task)
        oldItem.taskCount = oldItem.tasks.length;
        oldItem.completedTasks = oldItem.tasks.filter(task => task.isCompleted === true).length
        return{
          ...prevState,
          list:oldTasks.concat(oldItem)
        }

      case 'TOGGLE_TASK':{  
        console.log(action.taskId)
        const itemIndex = prevState.list.findIndex(item => item.id === action.itemId)
        const taskIndex = prevState.list[itemIndex].tasks.findIndex(task => task.id === action.taskId)
        console.log(prevState.list[itemIndex].tasks[taskIndex])
        prevState.list[itemIndex].tasks[taskIndex].isCompleted = !prevState.list[itemIndex].tasks[taskIndex].isCompleted
        console.log(prevState.list[itemIndex].tasks[taskIndex])
        return {...prevState}
      }

      case 'SELECT_TASK':
        const id = parseInt(action.taskId)
        return {
          ...prevState,
          currentTaskId:id
        }

      case 'UPDATE_TASK':{
        const itemIndex = prevState.list.findIndex(item => item.id === action.itemId)
        const taskIndex = prevState.list[itemIndex].tasks.findIndex(task => task.id === action.taskId)
        const currentTask = {
          ...prevState.list[itemIndex].tasks[taskIndex],
          notes:action.notes,
          dueDate:action.dueDate
        }
        prevState.list[itemIndex].tasks[taskIndex] = currentTask
        return {...prevState}
      }

      case 'DELETE_TASK': {
        const itemIndex = prevState.list.findIndex(item => item.id === action.itemId)
        // const taskIndex = prevState.list[itemIndex].tasks.findIndex(task => task.id === action.taskId)
        const otherTasks = prevState.list[itemIndex].tasks.filter(task => task.id !== action.taskId)
       
        prevState.list[itemIndex].tasks = otherTasks
        prevState.list[itemIndex].taskCount = otherTasks.length
        console.log(prevState)
        action.handleToggle()
        return {...prevState}
      }

      default:
        return prevState
  }
}

function App() {
  const [currentState,dispatch] = useReducer(reducer, initialState)
  const [showDetails,toggleDetails] = useState(true)
  const listClass = Classnames({
    "col-lg-3 ":true,
    "itemList":true,
    "appHeight":true
  })
  const details = Classnames({
    "d-none":!showDetails
  })
  const task = Classnames({
    "col-lg-9":!showDetails
  })


  return (
    <div className="App">
        <div className="todo-header p-2 text-left">
          To-Do
        </div>
        <div className="container-fluid">
        <div className="row">
          <TodoContext.Provider value={{state:currentState, actionDispatcher:dispatch}}>
            <div className={listClass}>
              <ListComponent/>
            </div>
            <div className={"taskDetails appHeight col-lg-6 p-0 "+task}>
              <TasksComponent itemId={currentState.currentItemId} handleToggle={() => toggleDetails(true)}/>
            </div>
            <div className={"taskDetails appHeight col-lg-3 p-0 relPos " + details}>
              <TaskDetail itemId={currentState.currentItemId} taskId={currentState.currentTaskId} handleToggle={() => toggleDetails(false)}/>
            </div>
          </TodoContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
