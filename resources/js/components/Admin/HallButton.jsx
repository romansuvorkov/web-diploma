import React, { useEffect } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function HallButton(props) {
    const { halls } = useContext(AdminContext);

    // const {active, setActive, id} = props;

    const handleClick = () => {
        console.log(props.id);
        // if (props.id === 0) {
        props.setActive(props.id);
        props.setHallForRender(halls.find(item => item.id == props.id));       
        // } else {
        //     props.setActive(props.id - 1);
        // }

    }

    return (
        <li>{props.id === props.active ? <input type="radio" className="conf-step__radio" name="chairs-hall" value={props.name} onClick={handleClick} defaultChecked /> :
        <input type="radio" className="conf-step__radio" name="chairs-hall" value={props.name} onClick={handleClick} />}<span className="conf-step__selector">{props.name}</span></li>
    )

  }
  
  export default HallButton;