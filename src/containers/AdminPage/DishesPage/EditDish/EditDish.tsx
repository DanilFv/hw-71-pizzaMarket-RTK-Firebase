import {useParams} from 'react-router-dom';
import DishForm from '../../../../components/DishForm/DishForm.tsx';
import {useEffect} from 'react';
import {selectOneDish} from '../DishesSelectors.ts';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks.ts';
import {fetchOneDish} from '../../../../app/store/Dishes/DishesSlice.ts';


const EditDish = () => {
    const {id} = useParams<{ id: string }>();
    const dish = useAppSelector(selectOneDish);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchOneDish(id));
        }
    },[id, dispatch]);

    return (
        <div>
            <DishForm isEdit={true} dishId={id} initialValue={dish} />
        </div>
    );
};

export default EditDish;