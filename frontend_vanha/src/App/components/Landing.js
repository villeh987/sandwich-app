import React, { Component, Fragment } from 'react'
import { getProfile } from './UserFunctions'

import WeekContainer from './WeekContainer';


class Landing extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         loading: true,
         error: ''
      }
      this.onChange = this.onChange.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }

   componentDidMount() {
      const token = localStorage.usertoken
   }
   componentWillUnmount() {
   }

   render() {
      const { error } = this.state

      return (
         <div className="cards" >
            <section className="card card--weather">
               <header>
                  <h1 className="text-center">Tilaa poeka leippä</h1>
               </header>
               <ul>
                  <li>Täs vois olla jottai</li>
                  <li></li>
                  <li></li>
                  <li>Juupsis</li>

               </ul>
               <div className="App">
                  <WeekContainer />
               </div>
            </section>
            <section className="card card--egain">
               <header>
                  <h1 className="text-center">Maiskis</h1>
               </header>
               <ul>
                  <li id='feels'>Leib1 </li>
                  <li id='feels'>Leib2 </li>
                  <li id='feels'>Leib3 </li>
                  <li id='feels'>... </li>
               </ul>
               <span>
                  {error}
               </span>
            </section >
         </div >
      )
   }
}

export default Landing
