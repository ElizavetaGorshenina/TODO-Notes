import React from 'react';
//import logo from './logo.svg';
import './App.css';
import MenuItem from './components/Menu.js'
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import UserProjectList from './components/UserProject.js'
import ToDoList from './components/ToDo.js'
import NotFound404 from './components/NotFoundPage'
import FooterItem from './components/Footer.js'
//import axios from 'axios'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    const user1 = {username: "Max", firstname: "Maxim", lastname: "Aleksandrov", email: "max_1980@gmail.com"}
    const user2 = {username: "Innes", firstname: "Inna", lastname: "Belskaya", email: "innes_bell@mail.ru"}
    const users = [user1, user2]
    const project1 = {name: "Group Work", user: [user1, user2], link_to_repo: "group_work_link"}
    const project2 = {name: "Home Study", user: [user2], link_to_repo: "innas_home_study_link"}
    const projects = [project1, project2]
    const todo1 = {project: project2, text: "To watch the video (lesson1)", created: "2023-01-10T20:39:32.372302Z", updated: "i2023-01-10T20:39:32.375008Z", user: user2, active: 'False'}
    const todo2 = {project: project2, text: "To watch the video (lesson2)", created: "2023-01-10T20:39:32.372302Z", updated: "i2023-01-10T20:39:32.375008Z", user: user2, active: 'True'}
    const todoes = [todo1, todo2]
    this.state = {
      'users': users,
      'projects': projects,
      'todoes': todoes
//      'users': []

    }
  }

  // componentDidMount() {
  //   axios.get('http://127.0.0.1:8000/users/users')
  //     .then(response => {
  //       const users = response.data
  //         this.setState(
  //         {
  //           'users': users
  //         }
  //       )
  //     }).catch(error => console.log(error))
  // }
    

  render () {
    return (
      <div>
        <HashRouter>
          <MenuItem />
          <Switch>
            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
            <Route exact path='/user/:username' component={() => <UserProjectList projects={this.state.projects} />} />
            <Route exact path='/todoes' component={() => <ToDoList todoes={this.state.todoes} />} />
            <Redirect from='/todos' to='/todoes' />
            <Route component={NotFound404} />
          </Switch>
          <FooterItem />
        </HashRouter>
      </div>
    )
  }
}


export default App;