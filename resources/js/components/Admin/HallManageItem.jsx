import React, { useEffect } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function HallManageItem(props) {

    return (

            <li>{props.name}
                <button className="conf-step__button conf-step__button-trash"></button>
            </li>
    )

  }
  
  export default HallManageItem;