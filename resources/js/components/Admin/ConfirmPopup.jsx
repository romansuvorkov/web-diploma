import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';
import closeImage from '../../../images/admin/close.png';
import Api from '../../functions/Api';

function ConfirmPopup(props) {

    const { reset, submit, data, actionName, question, name } = props;
        
    return (
        <div className="popup active">
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            {actionName}
                            <a className="popup__dismiss" href="#"><img src={closeImage} alt="Закрыть" onClick={reset}/></a>
                        </h2>
                    </div>
                    <div className="popup__wrapper">
                        <form action="hall" method="post" acceptCharset="utf-8" onSubmit={(e) => submit(e, data)}>
                            <p className="conf-step__paragraph">{question}<span>{name}</span>?</p>
                            <div className="conf-step__buttons text-center">
                                <input type="submit" value="Удалить" className="conf-step__button conf-step__button-accent" />
                                <button className="conf-step__button conf-step__button-regular" onClick={reset}>Отменить</button>            
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

  }
  
  export default ConfirmPopup;