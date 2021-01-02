import './Modal.scss';
import Button from '../Button/Button';

const Modal = ({id,children}) => {

    const closeModal = (e) => {
        
        document.querySelector('.modal').style.display = 'none';
        document.body.style.overflow = 'visible';

        document.querySelector('#order-ok').style.display = 'none';
        document.body.style.overflow = 'visible';
    }

    return(
        <div id={id} className="modal">
            <div className="modal__msg">
                <Button className="modal__button" onClick={closeModal}>X</Button>
                {children}
            </div>
        </div>
    );
}

export default Modal;