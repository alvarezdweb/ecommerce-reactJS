import { Link } from 'react-router-dom';
import useAppContext from '../../contexts/AppContext';
import './CartContainer.scss';
import Icon from '../../components/Icon/Icon';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';

const CartContainer = () => {
    const [buyer, setBuyer] = useState({});

    const ctx = useAppContext();
    
    const goOrder = () => {
        document.querySelector('#end-purchase').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    const changeInput = (e) => {
        let input = e.target.id;

        switch(input) {
            case 'name':
                setBuyer(
                    {
                        ...buyer,
                        name: e.target.value
                    }
                );
                break;
            case 'adress':
            setBuyer(
                {
                    ...buyer,
                    adress: e.target.value
                }
            );
            break;
        case 'tel':
            setBuyer(
                {
                    ...buyer,
                    tel: e.target.value
                }
            );
            break;
        case 'mail1':
            setBuyer(
                {
                    ...buyer,
                    mail1: e.target.value
                }
            );
            break;
        case 'mail2':
        setBuyer(
            {
                ...buyer,
                mail2: e.target.value
            }
        );
        break;
        }
    }

    const validateBuyer = () => {
        
        if(
             buyer.name &&
            buyer.adress &&
            buyer.tel &&
            buyer.mail1 &&
            (buyer.mail1 == buyer.mail2)
        ) {
            return true;
        } else { 
            return false; 
        }
    } 

    const confirmPurchase = () => {
        ctx.generateOrder(buyer);
        document.querySelector('#end-purchase').style.display = 'none';
        document.querySelector('#order-ok').style.display = 'block';
    }

    return(
        <div className='cart-container container fix-container'>
            <Modal id={'end-purchase'}>
                <h3 className='subtitle2'>Datos del comprador</h3>
                <hr/>
                <form className='form'>
                    <div className='form-content form-content--full-width'>
                        <label className='form-content__label' htmlFor='name'>Nombre y Apellido:</label>
                        <input onChange={changeInput} className='form-content__field' id='name' type="text"/>
                    </div>
                    <div className='form-content'>
                        <label className='form-content__label' htmlFor='adress'>Direccion:</label>
                        <input onChange={changeInput} className='form-content__field' id='adress' type='text'/>
                    </div>
                    <div className='form-content'>
                        <label className='form-content__label' htmlFor='te'>Telefono:</label>
                        <input onChange={changeInput} className='form-content__field' id='tel' type='tel'/>
                    </div>
                    <div className='form-content'>
                        <label className='form-content__label' htmlFor='mail1'>Mail:</label>
                        <input onChange={changeInput} className='form-content__field' id='mail1' type='email'/>
                    </div>
                    <div className='form-content'>
                        <label className='form-content__label' htmlFor='mail2'>Confirme su mail:</label>
                        <input onChange={changeInput} className='form-content__field' id='mail2' type="email"/>
                    </div>
                </form>
                <hr/>
                {
                    validateBuyer()?
                    <Button className={' cart-container__button cart-container__button--success'} onClick={confirmPurchase}>Confirmar</Button>:
                    <Button className={' cart-container__button button--disabled'}>Confirmar</Button>
                }
            </Modal>
            <Modal id={'order-ok'}>
                {
                    ctx.load?
                    <Spinner/>:
                    <>
                        <h3 className='subtitle2'>Gracias por tu compra</h3>
                        <p>Tu numero de orden es: <strong>{ctx.orderNumber}</strong></p>
                    </>
                }
            </Modal>

           
            {
                ctx.cartList==0?
                <>
                    <div className='cart-container__content'>
                        <h3 className='subtitle2'>No hay productos en el carrito.</h3>
                        <Link className='cart-container__link' to={'/'}>Seguir comprando</Link>
                    </div>
                    <hr/>   
                </> 
                :
                <>
                    <h3 className='subtitle2'>Mi Carrito.</h3>
                    <hr/>
                    <table className='cart-container__table'>
                        <thead>
                            <tr>
                                <th className='cart-container__cell-title text-center'>#</th>
                                <th className='cart-container__cell-title text-left'>Producto</th>
                                <th className='cart-container__cell-title text-left'>Cantidad</th>
                                <th className='cart-container__cell-title text-left'>Subtotal</th>
                                <th className='cart-container__cell-title text-center'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            ctx.cartList.map(element => {
                                return(
                                    <tr key={element.id}>
                                        <td className='cart-container__cell text-center'>
                                            <img className='cart-container__img' src={element.img} alt=''/>
                                        </td>
                                        <td className='cart-container__cell' ><p className='cart-container__cell-detail margin-0'>{element.name}</p></td>
                                        <td className='cart-container__cell' ><p className='cart-container__cell-detail margin-0'>{element.quantityToBuy}</p></td>
                                        <td className='cart-container__cell' ><p className='cart-container__cell-detail margin-0'>{`$ ${element.price * element.quantityToBuy}`}</p></td>
                                        <td className='cart-container__cell text-center'>
                                            <button className='cart-container__cell-button' onClick={()=>ctx.removeCart(element)}><Icon className={'cart-container__cell-icon'} icon={'trash'}/></button>
                                        </td>
                                    </tr>                                    
                                    );
                            }) 
                        }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='cart-container__total text-left'><hr className='cart-container__divider'/>{`TOTAL= $${ctx.totalPurchase}`}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <hr/>
                    <Button onClick={goOrder} className='cart-container__button'>Finalizar compra</Button>
                </>              
            }
           

        </div>
    );
}

export default CartContainer;
