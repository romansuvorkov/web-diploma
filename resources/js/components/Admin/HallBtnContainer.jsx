import React, { useEffect } from 'react';
import { useContext } from 'react';
import HallButton from './HallButton';
import AdminContext from './AdminContext';

function HallBtnContainer(props) {

    const { halls } = useContext(AdminContext);
    const {active, setActive, setHallForRender} = props;

    return (
        <ul className="conf-step__selectors-box">
            {halls.map(o => (
                <HallButton key={o.id} name={o.name} id={o.id} active={active} setActive={setActive} setHallForRender={setHallForRender}/>
            ))}
        </ul>
    );
  }
  
  export default HallBtnContainer;