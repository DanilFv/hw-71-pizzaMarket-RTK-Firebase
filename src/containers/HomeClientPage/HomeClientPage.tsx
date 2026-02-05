import HomeDishCard from '../../components/HomeDishCard/HomeDishCard.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectDishes} from '../AdminPage/DishesPage/DishesSelectors.ts';
import {useEffect, useState} from 'react';
import {fetchAllDishes} from '../../app/store/DishesSlice.ts';
import {addToCart, deleteFromCart} from '../../app/store/CartSlice.ts';
import {selectCart} from '../../app/store/CartSelectors.ts';
import Cart from '../../components/Cart/Cart.tsx';
import {Box} from '@mui/material';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';

const HomeClientPage = () => {
    const homeDishes = useAppSelector(selectDishes);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const [modalWindow, setModalWindow] = useState<boolean>(false);

    useEffect(() => {
        if (homeDishes.length === 0) dispatch(fetchAllDishes());
    },[dispatch, homeDishes]);


    const onAddToCart = (dish: IDish) => {
      dispatch(addToCart(dish));
    };

    const onRemoveFromCart = (dish: ICartDish) => {
        dispatch(deleteFromCart(dish));
    }

    const openModalWindow = () => {
      setModalWindow(true);
    };


    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 10, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1 }}>
                    <HomeDishCard dish={homeDishes} onClick={onAddToCart} />
                </Box>

                <Box sx={{ flex: 1 }}>
                    {cart.length > 0 && <Cart cart={cart} checkout={true} onClick={() => openModalWindow()} />}
                </Box>

                <ModalWindow open={modalWindow} onClose={() => setModalWindow(false)} cartDishes={cart} onDelete={onRemoveFromCart} />
            </Box>
        </>
    );
};

export default HomeClientPage;