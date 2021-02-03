import React, { useEffect } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function HallSeat(props) {

    const data = props.data;

    return (

        <div className="conf-step__row">
            {data.map(o => (
                // console.log(o)
                <span key={o.id} className="conf-step__chair conf-step__chair_standart"></span>
            ))}
        </div>

    )

  }
  
  export default HallSeat;