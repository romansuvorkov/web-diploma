import React, { useEffect } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function HallManageItem(props) {

    const { handleDeleteHall, hallId } = props;

    return (

            <li>{props.name}
                <button className="conf-step__button conf-step__button-trash" onClick={() => handleDeleteHall(hallId)}></button>
            </li>
    )

}
  
  export default HallManageItem;