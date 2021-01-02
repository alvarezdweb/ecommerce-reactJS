import './App.scss';
import MenuBar from './components/MenuBar/MenuBar';
import Home from './containers/Home/Home';
import {AppProvider} from './contexts/AppContext'
import Footer from './containers/Footer/Footer';
import {BorwserRouter, Switch, Route, BrowserRouter} from 'react-router-dom';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import CartContainer from './containers/CartContainer/CartContainer';
import Category from './containers/Category/Category';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AppProvider>
        <MenuBar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/detalle/:itemId">
            <ItemDetailContainer/>
          </Route>
          <Route exact path="/categoria/:categoryId">
            <Category/>
          </Route>
          <Route exact path="/cart">
            <CartContainer/>
          </Route>
        </Switch>
        <Footer/>
      </AppProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
