import {Box, Grid, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {EMPTY_VALUES} from '../../Constants.ts';

interface Props {
    isEdit?: boolean;
    initialValue?: IDishForm | null;
    dishId?: string;
}


const DishForm: React.FC<Props> = ({isEdit, initialValue, dishId}) => {

    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<IDishForm>({
        defaultValues: EMPTY_VALUES
    });

    const photoUrl = watch('image');

    const onSubmit = (data: IDishForm) => {

    }


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
                        />

                         {photoUrl && (
                            <img
                                src={photoUrl}
                                alt="Preview"
                                style={{ width: 120, height: 120, objectFit: 'cover', marginTop: 10 }}
                            />
                         )}
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default DishForm;