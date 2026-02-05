import {Box, Button, Grid, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {EMPTY_VALUES} from '../../Constants.ts';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import {fetchAddDish, fetchEditDish} from '../../app/store/DishesSlice.ts';
import SaveIcon from '@mui/icons-material/Save';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import {
    selectIsAddLoading
} from '../../containers/AdminPage/DishesPage/DishesSelectors.ts';
import * as React from 'react';
import {useEffect} from 'react';

interface Props {
    isEdit?: boolean;
    initialValue?: IDishForm | null;
    dishId?: string;
}


const DishForm: React.FC<Props> = ({isEdit, initialValue, dishId}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAddLoading = useAppSelector(selectIsAddLoading);

    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<IDishForm>({
        defaultValues: EMPTY_VALUES
    });

    const photoUrl = watch('image');

    const onSubmit = (data: IDishForm) => {
        if (isEdit && dishId) {
            dispatch(fetchEditDish({ id: dishId, dish: data }))
        } else {
            dispatch(fetchAddDish(data));
        }
        navigate('/admin');
        toast.success(`Блюдо успешно ${isEdit ? 'изменено' : 'добавлено'}!`);
    }

    useEffect(() => {
        if (isEdit && initialValue) {
            reset(initialValue);
        } else {
            reset(EMPTY_VALUES);
        }
    }, [reset, initialValue, isEdit]);


    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            label='Dish Name'
                            fullWidth
                            variant="outlined"
                            {...register('title', {
                                required: 'Это обязательное поле!',
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 3 символа'
                                },
                                setValueAs: (value: string) => value.trim() ?? ''
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            disabled={isAddLoading}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label='Price'
                            fullWidth
                            variant="outlined"
                            type="number"
                            {...register('price', {
                                required: 'Это обязательное поле!',
                                min: {
                                    value: 1,
                                    message: 'Минимум 1 сом!'
                                },
                                valueAsNumber: true,
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            disabled={isAddLoading}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label='Image'
                            fullWidth
                            variant="outlined"
                            {...register('image', {
                                setValueAs: (value: string) => value.trim() ?? ''
                            })}
                            disabled={isAddLoading}
                        />

                         {photoUrl && (
                            <img
                                src={photoUrl}
                                alt="Preview"
                                style={{ width: 120, height: 120, objectFit: 'cover', marginTop: 10 }}
                            />
                         )}
                    </Grid>

                    <Grid size={12}>
                        <Button
                            type='submit'
                            loading={isAddLoading}
                            loadingPosition="start"
                            startIcon={isEdit ? <EditDocumentIcon /> : <SaveIcon />}
                            variant="outlined"
                        >
                            {isEdit ? 'Edit Dish' : 'Add Dish'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default DishForm;