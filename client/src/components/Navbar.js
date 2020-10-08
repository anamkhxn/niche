import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = () => {
    if(state) {
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Add New Post</Link></li>,
        <li>
          <button className="btn #c62828 red darken-2" onClick={() => {
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
          }}>
            Logout
          </button>
        </li>
      ]
    } else {
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return(
    <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Niche</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
  )
}

export default Navbar