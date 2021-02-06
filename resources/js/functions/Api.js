export default class Api {
    constructor() {
      this.server = 'http://localhost:8000/api';
    //   this.server = 'https://ahj-diploma-serv.herokuapp.com';
    }

    static async getItems(address) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // xhr.open('GET', `${this.server}/${address}`);
        xhr.open('GET', `http://localhost:8000/api/${address}`);
        xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
        xhr.addEventListener('load', () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                // console.log(xhr);
                const data = JSON.parse(xhr.responseText);
                // console.log(data);
                return resolve(data.data);
                }
            }
            return reject(xhr.responseText);
        });
        xhr.send();
      });
    }

    static async getShow(address, number) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          // xhr.open('GET', `${this.server}/${address}/${number}`);
          xhr.open('GET', `http://localhost:8000/api/${address}/${number}`);
          xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
          xhr.addEventListener('load', () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
              // console.log(xhr);
              const data = JSON.parse(xhr.responseText);
              // console.log(data.data);
              return resolve(data.data);
              }
            }
            return reject(xhr.responseText);
          });
          xhr.send();
        });
    }

    static async updateItem(address, id, array, row, seats) {
      const dataString = JSON.stringify(array);
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('status', dataString);
        params.append('row', row);
        params.append('seats', seats);
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', `http://localhost:8000/api/${address}/${id}`);
        xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            return resolve(xhr.responseText);
          }
          return reject(xhr.responseText);
        });
        xhr.send(params);
      });
    }

    // sendOrder(name, phone, email) {
    //   return new Promise((resolve, reject) => {
    //     const params = new URLSearchParams();
    //     params.append('name', name);
    //     params.append('phone', phone);
    //     params.append('email', email);
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', `${this.server}/test`);
    //     xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
    //     xhr.addEventListener('load', () => {
    //       if (xhr.status === 204) {
    //         return resolve(xhr.responseText);
    //       }
    //       return reject(xhr.responseText);
    //     });
    //     xhr.send(params);
    //   });
    // }
  
}
// const axios = window.axios;
// console.log(axios);

// const BASE_API_URL = 'http://localhost:8000/api';

// export default {
//   getAllPosts: (teset) =>
//   window.axios.get(`${BASE_API_URL}/${teset}`)
// }