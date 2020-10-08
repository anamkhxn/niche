import React, {useState, useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch('/feed', {
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      setData(result.posts)
    })
  })
  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              <h5><Link to = {item.postedBy._id !== state._id ? "/user/"+item.postedBy._id : "/profile"}>{item.postedBy.username}</Link></h5>
              <div className="card-image">
                <img src={item.photo}/>
              </div>
              <div className="card-content">
                {/* <i className="material-icons" style={{color:"red"}}>favorite</i> */}
                <h6>{item.title}</h6>
                <p>{item.body}</p>
              </div>
            </div>
          )
        })
      }
      
    </div>
  )
}

export default Home