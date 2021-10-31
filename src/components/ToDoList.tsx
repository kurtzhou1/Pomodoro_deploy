import React,{useState} from 'react';
import {IState,todos} from '../libs/common';
import { useSelector, useDispatch } from 'react-redux';
import {CHANGE_TEXT,ADD_TODOLIST,DONE_TODOLIST,REMOVE_TODOLIST,SELECT_RADIO_VALUE} from '../constant'
import { PlusOutlined } from '@ant-design/icons';
import './styles/comon.scss'
import styles from './styles/css.module.scss';

const ToDoList:React.FC = () => {

  const inputText = useSelector((state:IState) => state.input.text)
  const toDoList = useSelector((state:IState) => state.todos)
  const radioValue = useSelector((state:IState)=> state.value)
  const dispatch = useDispatch()

  const changeText = (value:string) =>{
      dispatch({
        type: CHANGE_TEXT,
        payload: {input:value}
      })
  }

  const addEvent = () => {
      if(inputText.length > 0) {
          dispatch({
            type: ADD_TODOLIST,
            payload: {addEvent:inputText}
          })
      }
  }

  const removeEvent = (value:number) =>{
    dispatch({
      type: REMOVE_TODOLIST,
      payload: { removeId:value },
    });
  }

  const selectRadioValue = (value:number) => {
    dispatch({
      type: SELECT_RADIO_VALUE,
      payload: { radioValue:value }
    })
  }

  return (
    <div className="Pomodoro_module">
      <input value={inputText} onChange={e=>changeText(e.target.value)} placeholder='type something and add'/>
      <div className='add' onClick={()=>addEvent()}>＋</div>
      <div className='item_wrap'>
        {toDoList.map((data:todos)=>{
          const {id = 0,toDoList = '預設值' , isDone = false} = data;
          return(
          <div className='item'>
              <div className={`id ${radioValue === id ? 'show':''}`}><input name='item' type='radio' value={id} onChange={e=>selectRadioValue(parseInt(e.target.value))}/><span>{id}</span></div>
              <div className='toDoList'>{toDoList}</div>
              <div className={styles.todo_list_cancel} onClick={()=>removeEvent(id)}>
                <PlusOutlined />
              </div>
          </div>
          )})
        }
      </div>
    </div>
  );
}

export default ToDoList;
