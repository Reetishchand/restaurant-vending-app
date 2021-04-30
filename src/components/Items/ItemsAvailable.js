import Card from '../UI/Card';
import ItemCard from './FoodItem/ItemCard';
import classes from './ItemsAvailable.module.css';
import {useEffect,useState} from 'react';


const ItemsAvailable = () => {
  const [items, setItems] = useState([]);
  const[isLoading,setIsLoading] =useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const getItemsFromBackend = async () => {
      const response = await fetch('https://food-order-project-fd90d-default-rtdb.firebaseio.com/Items.json');

      if (!response.ok) {
        throw new Error('Hmm.. There seems to be a problem at our end..!');
      }
      const responseData = await response.json();

      const loadedItems = [];

      for (const key in responseData) {
        loadedItems.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setItems(loadedItems);
      setIsLoading(false);

    };
    getItemsFromBackend().catch((error) => {
      setIsLoading(false);
      setHttpError('Hmm.. There seems to be a problem at our end..!');
    });
  }, []);
if(isLoading){
  return (<section><div className={classes.loader}>Loading...</div></section>);
}

  if (httpError) {
    return (
        <section className={classes.error}>
          <p>{httpError}</p>
        </section>
    );
  }

  const foodItemsList = items.map((foodItems) => (
    <ItemCard
      key={foodItems.id}
      id={foodItems.id}
      name={foodItems.name}
      description={foodItems.description}
      price={foodItems.price}
    />
  ));

  return (

    <section className={classes.items}>
      <Card>
        <ul>{foodItemsList}</ul>
      </Card>
    </section>
  );
};

export default ItemsAvailable;
