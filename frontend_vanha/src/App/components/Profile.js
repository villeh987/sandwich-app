import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'
import { getProfile, changeUserData } from './UserFunctions'

class Profile extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         error: ''
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }
   onSubmit(e) {
      e.preventDefault()
      console.log(this.state);

      const data = {
         username: this.state.username
      }

      changeUserData(data).then(status => {
         if (status === 'Wrong password') {
            this.setState({ error: status })
         } else if (status === 'User does not exist') {
            this.setState({ error: status })
         } else {
            //this.props.history.push(`/profile`)
         }
      })
   }

   // sivulle tullessa hakee tietokannasta käyttäjän nimen sekä zip koodin 
   componentDidMount() {
      this.setState({ theme: localStorage.theme })
      const token = localStorage.usertoken
      // const decoded = jwt_decode(token)
      // this.setState({
      // username: decoded.username
      getProfile(token).then(res => {
         this.setState({
            username: res.username
         })
      })
   }

   render() {
      const { username, location, staticZip, theme, error } = this.state
      return (
         <div className="container" >
            <div className="jumbotron mt-5">
               <div className="col-sm-8 mx-auto">
                  <h1 className="text-center">PROFILE</h1>
               </div>
               <form noValidate onSubmit={this.onSubmit}>
                  <table className="table col-md-6 mx-auto">
                     <tbody>
                        <tr>
                           <td>Username</td>
                           <td>{username}</td>
                        </tr>
                        <span>
                           {error}
                        </span>
                     </tbody>
                  </table>
               </form>
            </div>
         </div>
      )
   }
}

export default Profile
