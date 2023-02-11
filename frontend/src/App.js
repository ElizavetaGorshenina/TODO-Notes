import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ProjectForm from './components/ProjectForm.js'
import UserProjectList from './components/UserProject.js'
import ToDoList from './components/ToDo.js'
import ToDoForm from './components/ToDoForm'
import NotFound404 from './components/NotFoundPage.js'
import LoginForm from './components/Login.js'
import FooterItem from './components/Footer.js'
import axios from 'axios'
import {Route, Switch, Redirect, BrowserRouter, Link} from 'react-router-dom'
import Cookies from 'universal-cookie'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todoes': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, () => this.load_data())
    }

  is_authenticated() {
    return this.state.token != ''
    }

  logout() {
    this.set_token('')
  }      

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, () => this.load_data())
    }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/auth-jwt/', {username: username, password: password})
      .then(response => {
        console.log(response.data)
        this.set_token(response.data['access'])
      }).catch(error => alert('Incorrect login or password'))
    }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated())
    {
      headers['Authorization'] = 'Bearer ' + this.state.token
      console.log(headers)
    }
    return headers
  }
  
  load_data(){
    const headers = this.get_headers()
    axios.all([
      axios.get('http://127.0.0.1:8000/users/', {headers}),
      axios.get('http://127.0.0.1:8000/projects/', {headers}),
      axios.get('http://127.0.0.1:8000/todo/', {headers})
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
      ).catch(error => {
        console.log(error)
        this.setState({
          'users': [],
          'projects': [],
          'todoes': []
        });
      })
  }

  createProject(name, user_email, link_to_repo) {
    const headers = this.get_headers()
    console.log(this.state)
    const user = this.state.users.filter((user) => user.email === user_email)[0]
    console.log(user)
    const data = {name: name, user: [user], link_to_repo: link_to_repo}
    console.log(data)
    axios.post(`http://127.0.0.1:8000/projects/`, data, {headers, headers})
      .then(response => {
        let new_prodj = response.data
        new_prodj.user[0] = user
        this.setState({projects: [...this.state.projects, new_prodj]})
      }).catch(error => console.log(error.response))
  }

  deleteProject(url) {
    const headers = this.get_headers()
    axios.delete(`${url}`, {headers})
    .then(response => {
    this.setState({projects: this.state.projects.filter((project)=>project.url !==
    url)})
    }).catch(error => console.log(error))
  }

  searchProject(text) {
    const target_projects = this.state.projects.filter((project) => (project.name.indexOf(text) + 1) !== 0)
    this.setState({projects: target_projects})
  }

  createToDo(text, user_email, project_link_to_repo) {
    const headers = this.get_headers()
    const user = this.state.users.filter((user) => user.email === user_email)[0]
    const project = this.state.projects.filter((project) => project.link_to_repo === project_link_to_repo)[0]
    const data = {text: text, user: user, project: project}
    axios.post(`http://127.0.0.1:8000/todo/`, data, {headers, headers})
      .then(response => {
        let new_todo = response.data
        new_todo.user = user
        new_todo.project = project
        this.setState({todoes: [...this.state.todoes, new_todo]})
      }).catch(error => console.log(error.response))
  }

  deleteToDo(url) {
    const headers = this.get_headers()
    axios.delete(`${url}`, {headers})
    .then(response => {
    this.setState({todoes: this.state.todoes.filter((todo)=>todo.url !==
    url)})
    }).catch(error => console.log(error))
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render () {
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
              <ul>
                  <li>
                      <Link to='/users'>Users</Link>
                  </li>
                  <li>
                      <Link to='/projects'>Projects</Link>
                  </li>
                  <li>
                      <Link to='/todoes'>ToDo Notes</Link>
                  </li>
                  <li>
                      {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : 
                          <Link to='/login'>Login</Link>}
                  </li>
              </ul>
          </nav>
          <Switch>
            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(url)=>this.deleteProject(url)} searchProject={(text)=>this.searchProject(text)} />} />
            <Route exact path='/projects/create' component={() => <ProjectForm
              users={this.state.users} createProject={(name, user, link_to_repo) => this.createProject(name, user, link_to_repo)} />} />
            <Route exact path='/user/:username' component={() => <UserProjectList projects={this.state.projects} />} />
            <Route exact path='/todoes' component={() => <ToDoList todoes={this.state.todoes} deleteToDo={(url)=>this.deleteToDo(url)}/>} />
            <Route exact path='/todoes/create' component={() => <ToDoForm
              users={this.state.users} projects={this.state.projects} createToDo={(text, user, project) => this.createToDo(text, user, project)} />} />
            <Route exact path='/login' component={() => <LoginForm 
              get_token={(username, password) => this.get_token(username, password)} />} />
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