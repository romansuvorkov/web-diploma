import React, { useEffect } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function HallButton(props) {
    const { halls } = useContext(AdminContext);

    const handleClick = () => {
        console.log(props.id);
        props.setActive(props.id);
        props.setHallForRender(halls.find(item => item.id == props.id));       
    }

    return (
        <li>{props.id === props.active ? <input type="radio" className="conf-step__radio" name="chairs-hall" value={props.name} onClick={handleClick} defaultChecked /> :
        <input type="radio" className="conf-step__radio" name="chairs-hall" value={props.name} onClick={handleClick} />}<span className="conf-step__selector">{props.name}</span></li>
    )

  }
  
  export default HallButton;