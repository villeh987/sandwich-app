import axios from 'axios'

export const register = newUser => {
   return axios
      //sends the body data to backend
      .post('users/register', {
         username: newUser.username,
         password: newUser.password
      })
      .then(response => {
         if (response.data.status === 'Registered!') {
            return 'success';
         } else if (response.data.error === 'User already exists') {
            return 'User already exists'
         } else {
            return 'error'
         }
      })
}

export const login = user => {
   return axios
      .post('users/login', {
         username: user.username,
         password: user.password
      })
      .then(response => {
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

export const getProfile = token => {
   return axios
      .get('users/profile', {
         headers: { Authorization: ` ${token}` }
      })
      .then(response => {
         return response.data
      })
      .catch(err => {
         console.log(err)
      })
}

export const changeUserData = data => {
   return axios
      .post('users/changeUserData', {
         username: data.username,
         zip: data.zip
      })
      .then(response => {
         if (response.status === 200) {
            // palauttaa zip koodin stringinä
            return response.data;
         }
      })
      .catch(err => {
         console.log(err)
      })
}