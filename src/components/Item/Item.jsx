import { Link } from 'react-router-dom';
import './Item.scss';

const Item = ({product}) => {

    return(
        <Link className="link" to={'/detalle/'+product.id}>       
        <div className="item ">
            <div className="item__header">
                <img className="item__img" src={product.img} alt={product.name}/>
            </div>
            <hr className="item__divider"/>
            <div className="item__body">
                <h3 className="item__price">{`$${product.price.toFixed(2)}`}</h3>
                <p className="item__name ellipsis">{product.name}</p>
            </div>
        </div>
        </Link>                                   
    );
}

export default Item;