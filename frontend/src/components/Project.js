import React from 'react'


const ProjectItem = ({project}) => {
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
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
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
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList