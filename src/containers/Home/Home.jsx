import './Home.scss';
import ItemList from '../../components/ItemList/ItemList';

const Home = () => {

    return(
        <main className="home container fix-container">
            <ItemList/>      
        </main>
    );
}

export default Home;