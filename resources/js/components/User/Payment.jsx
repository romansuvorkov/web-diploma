import React, { useEffect, useState, useContext } from 'react';
import UserContext from './UserContext';
import Api from '../../functions/Api';

function DateNavigation() {

  const { orderData } = useContext(UserContext);


  const handleSubmit = () => {
      
  }

    return (
        <section className="ticket">
      
        <header className="tichet__check">
          <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
        </header>
        
        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{orderData.film}</span></p>
          <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{ orderData.seats.map((o) => (`${o}, `))}</span></p>
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{orderData.hall}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{parseInt(orderData.startTime / 60)}:{(orderData.startTime % 60) < 10 ? ('0' + orderData.startTime % 60) : (orderData.startTime % 60)}</span></p>
          <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{orderData.orderSum}</span> рублей</p>
  
          <button className="acceptin-button" >Получить код бронирования</button>
  
          <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>  
    );
  }
  
  export default DateNavigation;