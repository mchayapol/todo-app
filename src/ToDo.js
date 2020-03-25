import React, { useState, useEffect } from 'react';

function ToDoList(props) {
  //   const [tasks, setTasks] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/task')
      .then(res => res.json())
      .then(data => {
        // setTasks(res.data);
        console.log(data);
        let tasks = data.data;
        let L = tasks.map((v, i) => {
          return <li key={i}>{v.name}</li>;
        });
        setList(L);
      });
  },[]);

  return (
    <div>
      <h2>Things To Do</h2>
      <ul>{list}</ul>
    </div>
  );
}

export default ToDoList;
