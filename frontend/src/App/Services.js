import axios from 'axios'

export const getOrders = () => {
   return axios
      .get('http://localhost:5000/v1/order', {
        headers: {
          'Accept': 'application/json',
        }
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      })
}

export const orderSandwich = () => {
  return axios
     .post('http://localhost:5000/v1/order', {
       headers: {
         'Accept': 'application/json',
       },
       data: {
        "id": 0,
        "sandwichId": 0,
        "status": "ordered"
       }
     })
     .then((res) => {
       return res;
     })
     .catch(function (error) {
       console.log(error);
     })
}
