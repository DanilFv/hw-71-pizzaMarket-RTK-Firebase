import {Box, Button, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectDishes, selectIsDeleteLoading} from './DishesSelectors.ts';
import AdminDishCard from '../../../components/AdminDishCard/AdminDishCard.tsx';
import {useEffect} from 'react';
import {useAppDispatch} from '../../../app/hooks.ts';
import {fetchAllDishes, fetchDeleteDish} from './DishesSlice.ts';


const DishesPage = () => {
    const isDeleteLoading = useSelector(selectIsDeleteLoading);
    const dishes = useSelector(selectDishes);
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='h5' variant='h5' sx={{ fontWeight: 'bold' }}>
                    Dishes
                </Typography>

                <Button type='type' variant='outlined' component={NavLink} to='/admin/dishes/new-dish'>
                    Add new dish
                </Button>
            </Box>

            <AdminDishCard dishes={dishes} isLoading={isDeleteLoading} onDelete={onDeleteDish} />
        </>
    );
};

export default DishesPage;