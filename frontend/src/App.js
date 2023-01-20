import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuItem from './components/Menu.js'
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import UserProjectList from './components/UserProject.js'
import ToDoList from './components/ToDo.js'
import NotFound404 from './components/NotFoundPage'
import FooterItem from './components/Footer.js'
import axios from 'axios'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todoes': []
    }
  }
  
  componentDidMount() {
    axios.all([
      axios.get('http://127.0.0.1:8000/users/'),
      axios.get('http://127.0.0.1:8000/projects/'),
      axios.get('http://127.0.0.1:8000/todo/')
    ]).then(axios.spread((res_users, res_projects, res_todoes) => {
      const users = res_users.data.results
      const projects = res_projects.data.results
      const todoes = res_todoes.data.results
        this.setState({
          'users': users,
          'projects': projects,
          'todoes': todoes
        });
      })
      ).catch(error => console.log(error))
  }

  render () {
    return (
      <div className='App'>
        <BrowserRouter>
          <MenuItem />
          <Switch>
            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
            <Route exact path='/user/:username' component={() => <UserProjectList projects={this.state.projects} />} />
            <Route exact path='/todoes' component={() => <ToDoList todoes={this.state.todoes} />} />
            <Redirect from='/todos' to='/todoes' />
            <Redirect from='/' to='/users' />
            <Route component={NotFound404} />
          </Switch>
          <FooterItem />
        </BrowserRouter>
      </div>
    )
  }
}


export default App;