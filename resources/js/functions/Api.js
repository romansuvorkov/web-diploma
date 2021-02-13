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

    static async updateSeats(address, id, array, row, seats) {
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

    static async updateHallPrice(address, id, price, vipPrice) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('price', price);
        params.append('vip_price', vipPrice);
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

    static async storeFilm(address, object, poster) {
      // const formData = new FormData();
      // formData.append('name', object.name);
      // formData.append('description', object.description);
      // formData.append('duration', object.duration);
      // formData.append('country', object.country);
      // formData.append('poster', poster);
    //   for (var value of formData.values()) {
    //     console.log(value);
    //  }
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('name', object.name);
        formData.append('description', object.description);
        formData.append('duration', object.duration);
        formData.append('country', object.country);
        formData.append('poster', poster);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost:8000/api/${address}`);
        xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            return resolve(xhr.responseText);
          }
          return reject(xhr.responseText);
        });
        xhr.send(formData);
      });
    }

    static async getMovie(address, date) {
      return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        // params.append('date', date);
        // console.log(date);
        const xhr = new XMLHttpRequest();
        // xhr.open('GET', `${this.server}/${address}`);
        xhr.open('GET', `http://localhost:8000/api/${address}/${date}`);
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


    static async storeMovie(address, filmId, hallId, start, filmDuration, date) {
      // const formData = new FormData();
      // formData.append('name', object.name);
      // formData.append('description', object.description);
      // formData.append('duration', object.duration);
      // formData.append('country', object.country);
      // formData.append('poster', poster);
    //   for (var value of formData.values()) {
    //     console.log(value);
    //  }
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('film_id', filmId);
        formData.append('hall_id', hallId);
        formData.append('start_time', start);
        formData.append('movie_show_duration', filmDuration);
        formData.append('start_day', date);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost:8000/api/${address}`);
        xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            return resolve(xhr.responseText);
          }
          return reject(xhr.responseText);
        });
        xhr.send(formData);
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