import CartItem from './CartItem';

//Styles
import { Wrapper } from './Cart.styles';

//Types
import { CartItemType } from '../App';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart }) => {

    const getTotal = (cartItems: CartItemType[]):number => cartItems.reduce((ack: number, item) => ack + (item.quantity * item.price), 0);
    return(
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No Items In Cart.</p> : null}
            {cartItems.map(item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart} />
            ))}
            <h2>
                Total: $ {getTotal(cartItems).toFixed(2)}
            </h2>
        </Wrapper>
    )
}

export default Cart;