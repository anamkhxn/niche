import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
  const [userProfile, setProfile] = useState(null)
  const {state, dispatch} = useContext(UserContext)
  const {userid} = useParams()
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      setProfile(result)
    })
  }, [])
  return (
    <>
    {userProfile ? 
    
    <div style={{maxWidth:"550px", margin:"0px auto"}}>
      <div style={{
        display:"flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"
      }}>
        <div>
          <img style={{width:"160px", height:"160px", borderRadius:"80px"}}src={userProfile.user.pic} 
          />
        </div>
        <div>
          <h4>{userProfile.user.name}</h4>
          <h5>{userProfile.user.email}</h5>
          <h5>{userProfile.user.name}</h5>
          <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
            <h6>{userProfile.posts.length} posts</h6>
          </div>
        </div>
      </div>
      
      <div className="gallery"> 
      {
        userProfile.posts.map(item => {
          return  (
            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
          )
        })
      }
      </div>
    </div>
    
      : <h5>Loading...</h5>}
    
    </>
  )
}

export default Profile

// {"_id":{"$oid":"5f3d4047d3d1e93c749102a1"},"email":"anamkhan@anam.com","password":"$2a$12$3cqs83mBl27iZ5hEE9Ljy.R2y.ullr3ZOf/BArua.B2GT6q09UsV.","name":"Anam","username":"anamz","__v":{"$numberInt":"0"}} {"_id":{"$oid":"5f3fcb951c07d64c3809c7e1"},"email":"anees@gmail.com","password":"$2a$12$6pfa5Fb2.33HUhzpaUuhquXHIcrcWVMOwdMzuiIW3nXK7.MFytGLi","name":"Anees Khan","username":"aneeszoa","__v":{"$numberInt":"0"}}