import axios from 'axios'

export const register = newUser => {
   return axios
      //sends the body data to backend
      .post('http://localhost:5000/v1/user', {
         headers: {
            'Accept': 'application/json',
         },
         data: {
            "username": newUser.username,
            "email": "omar@salem.pappaodottaautossa",
            "password": newUser.password
         }
      })
      // ei katota tässä response.data.status === 'Registered!' 
      // vaan writeJson tekemiä status codeja ja niiden perusteella iffihelvetit
      .then(response => {
         console.log(response);
         if (response.status === 200) {
            console.log("200");
            return 'success';
         } else if (response.data.error === 'User already exists') {
            return 'User already exists'
         } else {
            console.log("error");
            return 'error'
         }
      })
}

export const login = user => {
   return axios
      .post('http://localhost:5000/v1/loginUser', {
         headers: {
            'Accept': 'application/json',
         },
         data: {
            "username": user.username,
            "password": user.password
         }
      })
      .then(response => {
         console.log(response);
         if (response.data.error) {
            return response.data.error
         } else {
            localStorage.setItem('usertoken', response.data)
            return response.data
         }
      })
      .catch(err => {
         console.log(err)
      })
}

export const getProfile = user => {
   return axios
      .get('users/profile', {
         //headers: { Authorization: ` ${this.getToken()}` }
      })
      .then(response => {
         console.log(response)
         return response.data
      })
      .catch(err => {
         console.log(err)
      })
}
