import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
  const [myprofile, setMyprofile] = useState([])
  const {state, dispatch} = useContext(UserContext)
  const [image, setImage] = useState("")
  useEffect(() => {
    fetch('/profile', {
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      setMyprofile(result.myPost)
    })
  }, [])

  useEffect(() => {
    if(image) {
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
        fetch('/updatepic', {
          method:"put",
          headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            pic:data.url
          })
        }).then(res => res.json())
        .then(result => {
          console.log(result)
          localStorage.setItem("user",JSON.stringify({...state, pic:result.pic}))
          dispatch({type:"UPDATEPIC", payload:result.pic})
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },[image])

  const UpdatePhoto = (file) => {
    setImage(file)
  }
  return (
    <div style={{maxWidth:"550px", margin:"0px auto"}}>
      <div style={{
        margin:"18px 0px",
        borderBottom:"1px solid grey"
      }}>


      <div style={{
        display:"flex",
        justifyContent:"space-around"
      }}>
        <div>
          <img style={{width:"160px", height:"160px", borderRadius:"80px"}}src={state?state.pic:"Loading..."}
          />
          
        </div>
        <div>
          <h4>{state?state.username:"Loading..."}</h4>
          <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
            <h6>{myprofile.length} posts</h6>
          </div>
        </div>
      </div>
        <div className="file-field input-field" style={{margin:"10px"}}>
          <div className="btn #64b5f6 cyan darken-3">
            <span>Update Picture</span>
            <input type="file" onChange={(e) => UpdatePhoto(e.target.files[0])}/>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
          </div>
        </div>
      </div>
      <div className="gallery"> 
      {
        myprofile.map(item => {
          return  (
            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
          )
        })
      }
      </div>
    </div>
  )
}

export default Profile