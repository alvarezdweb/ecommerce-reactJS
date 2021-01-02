import { Children } from 'react';
import './Button.scss';

const Button = ({id,onClick,children,className}) => {
    return(
        <button id={id} onClick={onClick} type="button" className={`${className} button`}>{children}</button>
    );
}

export default Button;