import './ItemDetail.scss';
import { useEffect, useState } from "react";
import useAppContext from "../../contexts/AppContext";
import ItemCounter from '../ItemCounter/ItemCounter';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';



const ItemDetail = ({id}) => {
    const [counter, setCounter] = useState(1);
    const ctx = useAppContext();

    useEffect(()=>{
        ctx.getProductById(id);
    },[]);

    const setQuantity = (e) => {
        switch ( e.target.id ) {

            case "increment":
                if( counter < ctx.product.quantity ) {
                    setCounter(counter + 1);
                }
                break;

            case "decrement":
                if( counter > 0 ) {
                    setCounter(counter - 1);
                }
                break;
        }
    }

    const addToCart = () => {
        ctx.addCart(ctx.product,counter);
    }

    return(
        ctx.load?
        <div className="item-detail">
            <Spinner/>
        </div>:
        <div className="item-detail">
            <div className="item-detail__media">
                <img className="item-detail__img" src={ctx.product.img} alt={ctx.product.name}/>
                <ItemCounter
                    onAdd={(e)=>setQuantity(e)}
                    initialValue={counter}
                    maxValue={ctx.product.quantity}
                />
                <Button className="item-detail__addCart" onClick={addToCart}>Agregar al carrito</Button>
            </div>
            <div className="item-detail__content">
                <p className="item-detail__name">
                    {ctx.product.name}
                </p>
                <p className="item-detail__specs">
                    {`Marca: ${ctx.product.brand}`} <br/>
                    {`Modelo: ${ctx.product.model}`} <br/>
                    {`Linea: ${ctx.product.line}`} <br/>
                </p>
                <p className="item-detail__descrip">{ctx.product.description}</p>
                <p className="item-detail__price">{`$ ${ctx.product.price}`}</p>
            </div>
        </div>
    );
}

export default ItemDetail;