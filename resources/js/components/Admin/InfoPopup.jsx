import React, { useEffect, useState, useRef } from 'react';
import closeImage from '../../../images/admin/close.png';

function InfoPopup(props) {

    const { handleClose, text } = props;

    return (
        <div className="popup active">
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                        {text}
                        <a className="popup__dismiss" href="#" onClick={() => handleClose(false)}><img src={closeImage} alt="Закрыть" /></a>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )

  }
  
  export default InfoPopup;