import React from 'react'


const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.project.name}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
            <td>
                {todo.user.username}
            </td>
            <td>
                {todo.active}
            </td>
        </tr>
    )
}


const ToDoList = ({todoes}) => {
    return (
        <table>
            <th>
                Project 
            </th>
            <th>
                Text
            </th>
            <th>
                Time Created
            </th>
            <th>
                Time Updated
            </th>
            <th>
                User
            </th>
            <th>
                Status
            </th>
            {todoes.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}


export default ToDoList