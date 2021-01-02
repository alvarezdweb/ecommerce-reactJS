import Button from '../Button/Button';
import './ItemCounter.scss';

const ItemCounter = ({initialValue, onAdd}) => {
    return(
        <div className='item-counter'>
            <Button id='decrement' className='item-counter__button' onClick={onAdd}>-</Button>
            <p className='item-counter__counter'><span>{initialValue}</span></p>
            <Button id='increment' className='item-counter__button' onClick={onAdd}>+</Button>
        </div>      
    );
}

export default ItemCounter;