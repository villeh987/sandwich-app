import React from 'react';
import DayCard from './DayCard';


class WeekContainer extends React.Component {
   state = {
      error: ''
   }
   constructor(props) {
      super(props);
   }

   componentDidMount = () => {
   }

   componentWillUnmount() {
   }

   render() {
      return (
         <div className="container">
            <span>
            </span>
         </div>
      )
   }
}

export default WeekContainer;