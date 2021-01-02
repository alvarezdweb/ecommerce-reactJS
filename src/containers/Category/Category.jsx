import { useParams } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList';
import './Category.scss';

const Category = () => {

const {categoryId} = useParams();


return(
        <div className='category container fix-container'>
            <ItemList catId={parseInt(categoryId)}/>
        </div>
    );
}

export default Category;