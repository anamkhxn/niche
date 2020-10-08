import React,{useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
  const history = useHistory()
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)

  useEffect(() => {
    if(url) {
      UploadFields()
    }
  }, [url])

  const UploadPic = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset","niche-images")
    data.append("cloud","nch")
    fetch("https://api.cloudinary.com/v1_1/nch/image/upload", {
      method:"post",
      body:data
    })
    .then(res => res.json())
    .then(data => {
      setUrl(data.url)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const UploadFields = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({html: "Please provide a valid email", classes:"#c62828 red darken-3"})
      return
    }
    fetch("/signup", {
      method:"post",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        username,
        email,
        password,
        pic:url
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error) {
        M.toast({html: data.error, classes:"#c62828 red darken-3"})
      }
      else {
        M.toast({html: data.message, classes:"#43a047 green darken-1"})
        history.push('/signin')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const PostData = ()=> {
    if(image) {
      UploadPic()
    } else {
      UploadFields()
    }
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Niche</h2>
        <input 
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input 
        type="text"
        placeholder="Nickname"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />
        <input 
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 cyan darken-3">
            <span>Upload Concept Picture</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
          </div>
        </div>
        <button className="btn waves-effect waves-light #00838f cyan darken-3" onClick={()=>PostData()}>
          Sign up
        </button>
        <h6>
          <Link to="/signin">Already have an account?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Signup