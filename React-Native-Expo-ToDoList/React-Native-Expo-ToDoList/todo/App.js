import React, {useReducer} from 'react';
import TodoList from './src/TodoList';
import { TodosContext } from './src/TodosContext'

//default todos

const todosInitialState = {
  todos:[{id: '1', text:'react native project'},
    {id: '2', text:'codding'},
    {id: '3', text:'read book'}
  ]
};

export default function App(){
  const [state, dispatch] = useReducer(todosReducer, todosInitialState)
  return(
    <TodosContext.Provider value={{state, dispatch}}>
      <TodoList/>
    </TodosContext.Provider>
  )
}

function todosReducer(state, action){
  switch(action.type){
    case 'add':
      //add new todo onto array
      const addedTodos = [...state.todos, action.payload]
      //spread our state and assing todos
      return {...state, todos: addedTodos}
    
    case 'edit':
      const updatedTodo = {...action.payload}
      const updatedTodoIndex = state.todos.findIndex(t => t.id === action.payload.id)
      const updatedTodos = [
        ...state.todos.slice(0,updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];
      return {...state, todos: updatedTodos}
    case 'delete':
      const filteredTodoState = state.todos.filter(todo => todo.id !== action.payload.id)
      return {...state, todos:filteredTodoState}

    default:
      return todosInitialState
  }
}