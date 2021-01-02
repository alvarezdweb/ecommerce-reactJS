import './MenuBar.scss';
import Icon from '../Icon/Icon';
import { Link } from 'react-router-dom';
import useAppContext from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';

const MenuBar = () => {

  const ctx = useAppContext();
  const [selectCat, setSelectCat] = useState('Categorias');
  const [dropdown, setDropdown] = useState(false);

  useEffect( () => { 
    ctx.getCategories();
   },[selectCat])

  const handleClick = (e, category) => {
    if( e.target.className == 'menu-bar__dropdown-link' ) {
      if( selectCat != category ) {
        ctx.setFilteredProducts([]);
      }
      setSelectCat(category);    
      
    } else {
      setSelectCat('Categorias');
    } 
  }

  const dropMenu = (e) => {
    if( dropdown ) {
      document.querySelector('.menu-bar__dropdown-content').style.display = 'none';
      setDropdown(false);
    } else {
      document.querySelector('.menu-bar__dropdown-content').style.display = 'block';
      setDropdown(true);
    }
  }

  return (
    <div className='menu-bar'>
     <nav className='menu-bar__container container'>
      <div className='menu-bar__brand'>
            <Link onClick={handleClick} className='menu-bar__item menu-bar__item--brand' to={'/'}>
                <img className='menu-bar__brand-logo' src={logo} alt=''/>
                <span className='menu-bar__brand-text'>HARDSOLO</span>
            </Link>
        </div>
        <div className='menu-bar__links'>
          <div onClick={dropMenu} className='menu-bar__dropdown'>
            <span className='menu-bar__dropdown-title'>
              {selectCat==0?
              'Ver todos...':
              selectCat}
              <Icon icon={'chevron-down'}/>
            </span>
            <div className='menu-bar__dropdown-content'>
              <span>
              <Link onClick={(e) => handleClick(e,0)} key={0} to={'/categoria/'+0}className='menu-bar__dropdown-link'>Ver todos...</Link>
              {
                ctx.categories.map(element => {
                  return(
                    
                      <Link onClick={(e) => handleClick(e,element.category)} key={element.categoryId} to={'/categoria/'+element.categoryId} className='menu-bar__dropdown-link'>
                        {element.category}
                      </Link> 
                  );
                })
              }
              </span>
            </div>
          </div>
            <Link onClick={handleClick} className='menu-bar__item' to={'/cart'}>
              <Icon icon={'shopping-cart'}/>
              <span className='menu-bar__cart-count'>{ctx.cartQuantity}</span>
            </Link>
        </div>
     </nav>
    </div>
    );
  }

export default MenuBar;