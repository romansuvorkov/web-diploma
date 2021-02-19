import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import Api from '../../functions/Api';
import { v4 as uuidv4 } from 'uuid';

function MovieShowHall({ match, history }) {

  const [seats, setSeats] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderSum, setOrderSum] = useState(0);

    useEffect(async () => {
        // loadMovies();
        const data = await Api.getMovie('movie_seats', match.params.id);
        setData(data);
        console.log('data');
        console.log(data);
        // console.log(match);
          // const movies = await Api.getMovie('movie', today);
          // calendarLoad();
          const tableSeat = [];
            let counter = 0;
            for (let i = 1; i <= data.hall.row; i += 1) {
              let row = [];
              for (let y = 1; y <= data.hall.seats; y += 1) {
                row.push(data.seats[counter]);
                counter += 1;
              }
              tableSeat.push(row);
            }
            setSeats(tableSeat);
            setIsLoaded(true);
    }, []);

    

    return (
      isLoaded && <section className="buying">
      <div className="buying__info">
        <div className="buying__info-description">
          <h2 className="buying__info-title" onClick={() => console.log(seats)}>{data.movieShow.film_name}</h2>
          <p className="buying__info-start">Начало сеанса: {parseInt(data.movieShow.start_time / 60)}:{(data.movieShow.start_time % 60) < 10 ? ('0' + data.movieShow.start_time % 60) : (data.movieShow.start_time % 60)}</p>
          <p className="buying__info-hall">{data.hall.name}</p>          
        </div>
        <div className="buying__info-hint">
          <p>Тапните дважды,<br/>чтобы увеличить</p>
        </div>
      </div>
      <div className="buying-scheme">
        <div className="buying-scheme__wrapper">
          {seats.length > 0 && seats.map((row) => (
                  <div className="buying-scheme__row" key={uuidv4()}>
                    { row.map((o) => (
                      <span className="buying-scheme__chair buying-scheme__chair_standart" key={uuidv4()}></span>
                    ))}
                  </div>
                ))}
          
            {/* <div className="buying-scheme__row">
              <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
              <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
              <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
            </div> */}
        </div>
        <div className="buying-scheme__legend">
          <div className="col">
            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span className="buying-scheme__legend-value">{data.hall.price}</span>руб)</p>
            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span className="buying-scheme__legend-value">{data.hall.vip_price}</span>руб)</p>            
          </div>
          <div className="col">
            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
            <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано на {orderSum} руб.</p>                    
          </div>
        </div>
      </div>
      <button className="acceptin-button">Забронировать</button>
    </section>     
    )
}

export default MovieShowHall;