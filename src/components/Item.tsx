import Button from '@material-ui/core/Button';

import { CartItemType } from '../App';

import { Wrapper } from './Item.styles';

type Props = {
    item: CartItemType,
    handleAddToCart: (clickItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => {
    return(
        <Wrapper>
            <img src={item.image} alt={item.title}/>
            <div className="">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h4>${item.price}</h4>
            </div>
            <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
        </Wrapper>
    )
}

export default Item;