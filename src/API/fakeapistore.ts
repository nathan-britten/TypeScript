import { CartItemType } from '../App';

export const fetchFakeProducts = async (): Promise<CartItemType[]> => {
  const url = "https://fakestoreapi.com/products";
  const data = await (await fetch(url)).json(); //the nested await is for the fetch. The outside await is for the conversion to json
  return data;
};
