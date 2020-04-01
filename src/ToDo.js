import React, { useState, useEffect, useRef } from 'react';

function ToDoList(props) {
  //   const [tasks, setTasks] = useState([]);
  const [list, setList] = useState([]);
  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(true);
  const textInput = useRef(null);
  const apiUri = process.env.REACT_APP_API_URI;

  console.log('apiUri', apiUri);

  const fetchTask = () => {
    fetch(`${apiUri}task`) // ascii for backtick = 96, hold ALT+96
      .then(res => res.json())
      .then(data => {
        // setTasks(res.data);
        console.log(data);
        let tasks = data.data;
        let L = tasks.map((v, i) => {
          return <Task key={v._id} onDelete={onDelete} onEdit={onEdit} data={v} />;
        });
        setTasks(tasks);
        setList(L);
      });
  }

  useEffect(() => {
    console.log('useEffect');
    fetchTask();
  }, []);

  const onDelete = (data) => {
    let deleteTask = data;
    fetch(`${apiUri}task`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(deleteTask)
    })
      .then(res => res.json())
      .then(res => {
        fetchTask();
      });

    setTask({});
    setAdding(true);
  }

  const onEdit = (data) => {
    console.log('onEdit', data);
    textInput.current.value = data.name;
    setAdding(false);
    setTask(data);
  };

  const updateTask = () => {
    let updateTask = task;
    updateTask.name = textInput.current.value;
    console.log('updateTask', updateTask);
    fetch(`${apiUri}task`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(updateTask)
    })
      .then(res => res.json())
      .then(res => {
        fetchTask();
      });

    setTask({});
    setAdding(true);
  }

  const addTask = () => {
    let newTask = textInput.current.value;
    console.log('addTask', newTask);
    console.log('\t', JSON.stringify({ name: newTask }))

    fetch(`${apiUri}task`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ name: newTask })
    })
      .then(res => res.json())
      .then(res => {
        fetchTask();
      })

  }

  return (
    <div>
      <ul>{list}</ul>
      New Task: <input name="task" ref={textInput} />
      {adding && <button onClick={addTask}>Add Task</button>}
      {!adding && <button onClick={updateTask}>Update Task</button>}
    </div>
  );
}

const Task = ({ data, onEdit, onDelete }) => (
  <li>
    <button onClick={() => onEdit(data)}>Edit</button>
    <button onClick={() => onDelete(data)}>Delete</button>
    &nbsp;&nbsp;&nbsp;
    {data.name}
  </li>
)
export default ToDoList;
