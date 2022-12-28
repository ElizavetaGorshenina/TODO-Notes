import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    const users = [
      {
        'username': 'Max',
        'firstname': 'Maxim',
        'lastname': 'Aleksandrov',
        'email': 'max_1980@gmail.com'
      },
      {
        'username': 'Sonya',
        'firstname': 'Sofia',
        'lastname': 'Belskaya',
        'email': 'sonya_nya@mail.ru'
      },
    ]
    this.setState(
      {
        'users': users
      }
    )
  }

  render () {
    return (
      <div>
        <UserList users={this.state.users} />
      </div>
    )
  }
}

export default App;