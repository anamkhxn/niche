import React,{useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Signin = () => {
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const PostData = ()=> {
    fetch("http://localhost:3000/signin", { 
      method:"post",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error) {
        M.toast({html: data.error, classes:"#c62828 red darken-3"})
      }
      else {
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        dispatch({type:"USER", payload:data.user})
        M.toast({html: "Signed in successfully", classes:"#43a047 green darken-1"})
        history.push('/')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Niche</h2>
        <input 
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />
        <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #00838f cyan darken-3" onClick={() => PostData()}>
          Sign in
        </button>
        <h6>
          <Link to="/signup">Don't have an account?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Signin