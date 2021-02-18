import React, { useEffect } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function HallManageItem(props) {

    const { handleDeleteHall, target } = props;

    return (

            <li>{target.name}
                <button className="conf-step__button conf-step__button-trash" onClick={() => handleDeleteHall(target)}></button>
            </li>
    )

}
  
  export default HallManageItem;