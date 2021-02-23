import React, { useEffect } from 'react';
import { useContext } from 'react';
import HallButton from './HallButton';
import AdminContext from './AdminContext';

function HallBtnContainer(props) {

    const { halls } = useContext(AdminContext);
    const {active, setActive, name} = props;

    return (
        <ul className="conf-step__selectors-box">
            {halls.map(o => (
                // <HallButton key={o.id} name={o.name} id={o.id} active={active} setActive={setActive} setHallForRender={setHallForRender}/>
                <li key={o.id}>{o.id === active ? <input type="radio" className="conf-step__radio" name={name} value={o.name} onClick={() => setActive(o.id)} defaultChecked /> :
                <input type="radio" className="conf-step__radio" name={name} value={o.name} onClick={() => setActive(o.id)} />}<span className="conf-step__selector">{o.name}</span></li>
            ))}
        </ul>
    );
  }
  
  export default HallBtnContainer;