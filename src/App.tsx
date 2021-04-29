import { useState } from 'react';
import { useQuery } from 'react-query';

import { fetchFakeProducts } from './API/fakeapistore';

//components
import Item from './components/Item';
import Cart from './components/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//styles
import { Wrapper, StyledButton } from './App.styles';

//types

export type CartItemType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  quantity: number;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    fetchFakeProducts
  )

  const getTotalItems = (items: CartItemType[]):number => items.reduce((ack: number, item) => ack + item.quantity, 0);

  const handleAddToCard = (clickItem: CartItemType) => {
    setCartItems(prevState => {
      //is the item in the cart? 
      const itemInCart = prevState.find(item => item.id === clickItem.id);
      if(itemInCart) {
        return prevState.map(item => (item.id === clickItem.id) 
        ? {...item, quantity: item.quantity + 1}
        : item
        );
      }
      return [...prevState, { ...clickItem, quantity: 1}]

    });
  };

  const handleRemoveFromCart = (id: number) => {
    // setCartItems(prevState => prevState.filter(item => item.id !== id))

    //is item at 1? 
    setCartItems(prevState => {

      let hasmorethanone = prevState.find(item => (item.id === id && item.quantity > 1))
      if(hasmorethanone) {
       return prevState.map(item => (item.id === id)
       ? {...item, quantity: item.quantity + -1}
       : item
       )
      }
      return prevState.filter(item => item.id !== id);
    })
  }

  if(isLoading) return <LinearProgress />;
  if(error) return <div>There is an error</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>  
        <Cart 
          cartItems={cartItems}
          addToCart={handleAddToCard}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'> 
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}> 
            <Item item={item} handleAddToCart={handleAddToCard}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
};

export default App;
