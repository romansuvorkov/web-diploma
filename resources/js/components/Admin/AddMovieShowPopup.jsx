import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import closeImage from '../../../images/admin/close.png';
import Api from '../../functions/Api';

function AddMovieShowPopup(props) {

    const { handleClose, handleSubmit, hall, film, error } = props;
    const [time, setTime] = useState('00:00');


    const handleChange = (e) => {
        const {target} = e;
        if (target.value === '') {
            setTime('00:00');
        } else {
            setTime(target.value);            
        }
    }
        
    return (
        <div className="popup active">
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Добавление сеанса
                            <a className="popup__dismiss" href="#" onClick={() => handleClose(false)}><img src={closeImage} alt="Закрыть" /></a>
                        </h2>
                    </div>
                    <div className="popup__wrapper">
                    <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={(e) => handleSubmit(e, film, hall.id, time)}>
                        <p className="conf-step__paragraph">Добавление сеанса в {hall.name}</p>
                        <p className="conf-step__paragraph">Фильм {film.name}</p>
                        {time && <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                            Время начала
                            <input className="conf-step__input" type="time" name="start_time" value={time} onChange={(e) => handleChange(e)} required />
                        </label>}
                        <p className="conf-step__paragraph">{error}</p>
                        <div className="conf-step__buttons text-center">
                            <input type="submit" value="Добавить" className="conf-step__button conf-step__button-accent" />
                            <button className="conf-step__button conf-step__button-regular" onClick={() => handleClose(false)}>Отменить</button>            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        

    )

  }
  
  export default AddMovieShowPopup;