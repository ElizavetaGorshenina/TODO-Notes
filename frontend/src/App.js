import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import UserProjectList from './components/UserProject.js'
import ToDoList from './components/ToDo.js'
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
      'todoes': []
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
        document.getElementById('username').textContent=this.username
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
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
            <Route exact path='/user/:username' component={() => <UserProjectList projects={this.state.projects} />} />
            <Route exact path='/todoes' component={() => <ToDoList todoes={this.state.todoes} />} />
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