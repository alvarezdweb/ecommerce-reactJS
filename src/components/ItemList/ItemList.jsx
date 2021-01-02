import useAppContext from '../../contexts/AppContext';
import Item from '../Item/Item';
import './ItemList.scss';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';

const ItemList = ({catId}) => {

    const ctx = useAppContext();

    useEffect(()=>{
        ctx.getProducts(catId);
    },[catId]);

    return(
        
        <div className='itemlist'>
            {
              catId?
              ctx.filteredProducts.length==0?
              <Spinner/>:
              ctx.filteredProducts.map(element => {
                  return ( <Item key={element.id} product={element}></Item>)
               })  
              :   
              ctx.products.length==0?
              <Spinner/>:
              ctx.products.map(element => {
                  return ( <Item key={element.id} product={element}></Item>)
               })       
            }
        </div>
    );
}

export default ItemList;