import {selectDishes, selectIsDeleteLoading} from './DishesSelectors.ts';
import AdminDishCard from '../../../components/AdminDishCard/AdminDishCard.tsx';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {
    fetchAllDishes,
    fetchDeleteDish
} from '../../../app/store/Dishes/DishesSlice.ts';
import AdminDishButtonContainer
    from '../../../components/AdminDishButtonContainer/AdminDishButtonContainer.tsx';


const DishesPage = () => {
    const isDeleteLoading = useAppSelector(selectIsDeleteLoading);
    const dishes = useAppSelector(selectDishes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllDishes());
    }, [dispatch]);

    const onDeleteDish =  async (id: string) => {
        await dispatch(fetchDeleteDish(id));
        dispatch(fetchAllDishes());
    };

    return (
        <>
            <AdminDishButtonContainer dishes={dishes} />
            <AdminDishCard dishes={dishes} isLoading={isDeleteLoading} onDelete={onDeleteDish} />
        </>
    );
};

export default DishesPage;