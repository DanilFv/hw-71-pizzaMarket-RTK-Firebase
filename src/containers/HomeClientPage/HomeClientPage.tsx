import HomeDishCard from '../../components/HomeDishCard/HomeDishCard.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectDishes,
    selectLoading
} from '../AdminPage/DishesPage/DishesSelectors.ts';
import {useEffect, useState} from 'react';
import {fetchAllDishes} from '../../app/store/Dishes/DishesSlice.ts';

import {selectCart} from '../../app/store/Cart/CartSelectors.ts';
import Cart from '../../components/Cart/Cart.tsx';
import {Box} from '@mui/material';
import ModalWindow from '../../components/UI/ModalWindow/ModalWindow.tsx';
import {
    addToCart,
    clearCart,
    deleteFromCart
} from '../../app/store/Cart/CartSlice.ts';
import type {ICartDish, IDish} from '../../types';
import {sendOrder} from '../../app/store/Orders/OrderSlice.ts';
import {selectSendLoading} from '../../app/store/Orders/ordersSelectors.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const HomeClientPage = () => {
    const homeDishes = useAppSelector(selectDishes);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const [modalWindow, setModalWindow] = useState<boolean>(false);
    const sendLoading = useAppSelector(selectSendLoading);
    const loading = useAppSelector(selectLoading);

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

    const onSendOrder = async () => {
        if (cart.length === 0) return;
        await dispatch(sendOrder(cart));
        dispatch(clearCart());
        setModalWindow(false);
    };

    let dishesRender = (
        <Box sx={{ display: 'flex', alignItems: 'start', gap: 10, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1 }}>
                    <HomeDishCard dish={homeDishes} onClick={onAddToCart} />
                </Box>

                {cart.length > 0 &&
                    <Box sx={{ flex: 1 }}>
                        <Cart cart={cart} checkout={true} onClick={() => openModalWindow()} onClear={() => dispatch(clearCart())} />
                    </Box>
                }
                <ModalWindow
                    open={modalWindow}
                    onClose={() => setModalWindow(false)}
                    cartDishes={cart}
                    onDelete={onRemoveFromCart}
                    onOrder={() => onSendOrder()}
                    loading={sendLoading}
                />
        </Box>
    );

    if (loading) {
        dishesRender = <Spinner />;
    }


    return (
        <>
            {dishesRender}
        </>
    );
};

export default HomeClientPage;