import React, { useContext, useEffect, useState } from "react";
import { getFirestore } from "../database/firebase";


const AppContext = React.createContext();
const useAppContext = () => useContext(AppContext);

export const AppProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [load, setLoad] = useState(false);
    const [cartList, setCartList] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [orderNumber, setOrderNumber] = useState();

    const getProducts = ( catId = 0 ) => {
        const db = getFirestore();
       if( catId==0 ) {
        const itemCollection = db.collection("products");
         itemCollection.get().then((response)=>{
            const aux = response.docs.map(element => {
                return {id:element.id ,...element.data()};
            });
            setProducts(aux);
        });
       }else { 
        const itemCollection = db.collection("products").where('categoryId','==',catId);
         itemCollection.get().then((response)=>{
            const aux = response.docs.map(element => {
                return {id:element.id ,...element.data()};
            });
            setFilteredProducts(aux);
        });
       }
    }

    const getCategories = () => {
        const db = getFirestore();
        const itemCollection = db.collection("categories");
        
        itemCollection.get().then((response)=>{
            const aux = response.docs.map(element => {
                return element.data();
            });
            setCategories(aux);
        });
    }

    const getProductById = (id) => {
        setLoad(true);
        const db = getFirestore();
        const itemCollection = db.collection("products");
        const item = itemCollection.doc(id);
        item.get().then((doc) => {
           if(doc.data()){
            setProduct({ id: doc.id, ...doc.data() });
           }            
           setLoad(false);
        });
    }

    const addCart = (productToBuy, quantityToBuy) => {
        const productInCart = cartList.find( (p) => (p.id===productToBuy.id))
        
        setCartQuantity( cartQuantity + quantityToBuy );
        setTotalPurchase(totalPurchase + (productToBuy.price*quantityToBuy));

        if(productInCart) {
            productInCart.quantityToBuy += quantityToBuy;
            setCartList([...cartList]);
        } else {
            setCartList([...cartList,{...productToBuy, quantityToBuy}]);
        }       
    }

    const removeCart = (productToRemove) => {

        setCartQuantity( cartQuantity - productToRemove.quantityToBuy );
        setTotalPurchase(totalPurchase - (productToRemove.price*productToRemove.quantityToBuy));

        cartList.splice(
            cartList.findIndex(p => p.id === productToRemove.id),1
        )
        setCartList([...cartList]);
    }

    const generateOrder = async(buyer) => {
        setLoad(true);
        let order = {
            buyer: buyer, 
            items: cartList, 
            total: totalPurchase
        }

        const db = getFirestore();
        await db.collection('orders').add(order)
        .then(({id})=> {
            setOrderNumber(id);
        });
        setLoad(false);
        setCartList([]);
        setCartQuantity(0);
        setTotalPurchase(0);
    }

    return <AppContext.Provider value={{
        load, 
        products, 
        product, 
        filteredProducts, 
        categories, 
        cartList, 
        cartQuantity,
        totalPurchase,
        orderNumber,
        setFilteredProducts,
        getProducts, 
        getCategories, 
        getProductById, 
        addCart,
        removeCart,
        generateOrder
    }} >{children}</AppContext.Provider>
}



export default useAppContext;