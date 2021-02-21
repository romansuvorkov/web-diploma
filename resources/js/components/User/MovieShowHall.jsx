import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import Api from '../../functions/Api';
import { v4 as uuidv4 } from 'uuid';

function MovieShowHall({ match, history }) {

  const { setOrderData} = useContext(UserContext);

  const [seats, setSeats] = useState([]);
  const [seatsSource, setSeatsSoucre] = useState([]);
  
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderSum, setOrderSum] = useState(0);
  const [occupied, setOccupied] = useState([]);
  const [order, setOrder] = useState([]);

    useEffect(async () => {
        const data = await Api.getMovie('movie_seats', match.params.id);
        console.log(data);
        setData(data);
        const occupiedArr = JSON.parse(data.movieShow.ordered);
        setOccupied(occupiedArr);
        const newArray = data.seats.map(a => ({...a}));
        setSeatsSoucre(newArray);
          const tableSeat = [];
            let counter = 0;
            for (let i = 1; i <= data.hall.row; i += 1) {
              let row = [];
              for (let y = 1; y <= data.hall.seats; y += 1) {
                const seatData = data.seats[counter];
                if (occupiedArr.indexOf(seatData.seat_number) !== -1) {
                  seatData.status = 3;
                }
                row.push(seatData);
                counter += 1;
              }
              tableSeat.push(row);
            }
            setSeats(tableSeat);
            setIsLoaded(true);
    }, []);

    const handleClick = (status, seatNumb) => {
      if (status === 3) {
        return
      }
      if (status === 0) {
        return
      }
      let index = order.indexOf(seatNumb);
      if (index === -1) {
        setOrder(prevState => ([
          ...prevState,
          seatNumb
        ]));
        // const newArray = seatsSource.map(a => ({...a}));
        const newArr = [...seatsSource];
        console.log(newArr);
        newArr[seatNumb - 1].status = 4;
        
        setIsLoaded(false);
        const tableSeat = [];
        let counter = 0;
        for (let i = 1; i <= data.hall.row; i += 1) {
          let row = [];
          for (let y = 1; y <= data.hall.seats; y += 1) {
            const seatData = newArr[counter];
            if (occupied.indexOf(seatData.seat_number) !== -1) {
              seatData.status = 3;
            }
            if (order.indexOf(seatData.seat_number) !== -1) {
              seatData.status = 4;
            }
            row.push(seatData);
            counter += 1;
          }
          tableSeat.push(row);
        }
        setSeats(tableSeat);
        // seats = tableSeat;
        setIsLoaded(true);




        if (status === 2) {
          const sum = orderSum + data.hall.vip_price;
          setOrderSum(sum);
        } else if (status === 1) {
          const sum = orderSum + data.hall.price;
          setOrderSum(sum);
        }
      } else {
        const reducedOrder = [...order]
        reducedOrder.splice(index, 1);
        setOrder(reducedOrder);
        // console.log(data.seats[seatNumb - 1].status);
        if (data.seats[seatNumb - 1].status === 2) {
          seatsSource[seatNumb - 1].status = 2;
          const sum = orderSum - data.hall.vip_price;
          setOrderSum(sum);
        } else if (data.seats[seatNumb - 1].status === 1) {
          seatsSource[seatNumb - 1].status = 1;
          const sum = orderSum - data.hall.price;
          setOrderSum(sum);
        }
      }
    }

    const handleSubmit = () => {
      const output = {
        film: data.movieShow.film_name,
        seats: order,
        hall: data.hall.name,
        hallId: data.hall.id,
        movieShowId: data.movieShow.id,
        startDay: data.movieShow.start_day,
        startTime: data.movieShow.start_time,
        orderSum: orderSum
      };
      setOrderData(output);
      history.push("/payment");
    }

    

    return (
      isLoaded && <section className="buying">
      <div className="buying__info">
        <div className="buying__info-description">
          <h2 className="buying__info-title" onClick={() => console.log(data.seats)}>{data.movieShow.film_name}</h2>
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
                      <span className="buying-scheme__chair buying-scheme__chair_standart" 
                      className={`buying-scheme__chair
                      ${o.status === 1 ? 'buying-scheme__chair_standart' : 'page-nav__day'} 
                      ${o.status === 0 ? 'buying-scheme__chair_disabled' : ''} 
                      ${o.status === 2 ? 'buying-scheme__chair_vip' : ''}
                      ${o.status === 3 ? 'buying-scheme__chair_taken' : ''}
                      ${o.status === 4 ? 'buying-scheme__chair_selected' : ''}
                      `}
                      key={uuidv4()}
                      onClick={() => {handleClick(o.status, o.seat_number)}}></span>
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
      <button className="acceptin-button" onClick={handleSubmit}>Забронировать</button>
    </section>     
    )
}

export default MovieShowHall;