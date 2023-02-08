import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.user.map((user) => user.username + ' ')}
            </td>
            <td>
                {project.link_to_repo}
            </td>
            <td>
                <button onClick={()=>deleteProject(project.url)} type='button'>Delete</button>
            </td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
        <table>
            <th>
                Project Name
            </th>
            <th>
                Users
            </th>
            <th>
                Link to repository
            </th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList