import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    selectDeleteOrderLoading,
    selectLoadingOrders,
    selectOrder
} from '../../../app/store/Orders/ordersSelectors.ts';
import {selectDishes} from '../DishesPage/DishesSelectors.ts';
import {useEffect} from 'react';
import {
    deleteOrder,
    fetchOrders
} from '../../../app/store/Orders/OrderSlice.ts';
import {fetchAllDishes} from '../../../app/store/Dishes/DishesSlice.ts';
import type {IOrder, IUpdateOrder} from '../../../types';
import OrderCard from '../../../components/OrderCard/OrderCard.tsx';
import {Box} from '@mui/material';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrder);
    const dishes = useAppSelector(selectDishes);
    const loading = useAppSelector(selectLoadingOrders);
    const deleteLoading = useAppSelector(selectDeleteOrderLoading);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchAllDishes());
    },[dispatch]);

    const orderItems = (order: IOrder): IUpdateOrder[] => {
        return Object.entries(order.dishes).reduce<IUpdateOrder[]>((acc, [dishId, count]) => {
            const dish = dishes.find((d) => d.id === dishId);

            if (dish) {
                acc.push({
                    title: dish.title,
                    price: dish.price,
                    count: count,
                    total: dish.price * count,
                });
            }
            return acc;
        }, []);
    };

    const onCompleteOrder = async (id: string) => {
      await dispatch(deleteOrder(id));
      dispatch(fetchOrders());
    };

    let order = (
         <Box sx={{ p: 2 }}>
            {orders.map((order) => {
                const items = orderItems(order);
                const total = items.reduce((acc, item) => acc + item.total, 0);

                return (
                    <OrderCard
                        key={order.id}
                        items={items}
                        allOrdersTotal={total}
                        onCompleted={onCompleteOrder}
                        id={order.id}
                        loading={deleteLoading}
                    />
                );
            })}
        </Box>
    );

    if (loading) {
        order = <Spinner />;
    }

    return (
        <>
            {order}
        </>
    );
};

export default OrdersPage;