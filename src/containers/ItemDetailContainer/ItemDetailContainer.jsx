import './ItemDetailContainer.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import useAppContext from '../../contexts/AppContext';

const ItemDetailContainer = () => {
    const { itemId } = useParams();
    const ctx = useAppContext();


    useEffect(()=>{
        ctx.getProductById(itemId);
    },[])

    return(
      <main className="item-detail-container container fix-container">
            {
              ctx.product.name?
              <ItemDetail id={itemId} />:
              <>
                <h3 className="item-detail-container__not-found">Producto no encontrado</h3>
                <Link className="item-detail-container__link" to={'/'}>Volver al inicio</Link>
              </>
            }
      </main>
    );
}

export default ItemDetailContainer;