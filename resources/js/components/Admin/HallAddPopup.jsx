import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import closeImage from '../../../images/admin/close.png';
import Api from '../../functions/Api';

function HallAddPopup(props) {

    const { handleClose, handleSubmit } = props;

    const [name, setName] = useState('');

    const handleChange = (e) => {
        const {value} = e.target;
        setName(value);
    }
        
    return (
        <div className="popup active">
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Добавление зала
                            <a className="popup__dismiss" href="#"><img src={closeImage} onClick={handleClose} alt="Закрыть" /></a>
                        </h2>
                    </div>
                    <div className="popup__wrapper">
                        <form action="add_hall" method="post" acceptCharset="utf-8" onSubmit={(e) => handleSubmit(e, name)}>
                            <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
                                Название зала
                                <input className="conf-step__inputв" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="name" required value={name} onChange={(e) => handleChange(e)}/>
                            </label>
                            <div className="conf-step__buttons text-center">
                                <input type="submit" value="Добавить зал" className="conf-step__button conf-step__button-accent" />
                                <button className="conf-step__button conf-step__button-regular" onClick={handleClose}>Отменить</button>            
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

  }
  
  export default HallAddPopup;