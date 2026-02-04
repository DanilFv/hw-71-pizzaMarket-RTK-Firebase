import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {noImage} from '../../../Constants.ts';

const DishesPage = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='h5' variant='h5' sx={{ fontWeight: 'bold' }}>
                    Dishes
                </Typography>

                <Button type='type' variant='outlined' component={NavLink} to='/admin/dishes/new-dish'>
                    dd new Dish
                </Button>
            </Box>

             <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    mb: 2,
                    mt: 4,
                    boxShadow: 6,
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    '&:hover': {
                        boxShadow: 12,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease-in-out',
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: 120,
                            height: 120,
                            objectFit: 'cover',
                        }}
                        image={noImage}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = noImage;
                        }}
                        alt='dwq'
                    />

                     <Typography
                         variant="h5"
                         sx={{ fontWeight: 'bold', mx: 2}}
                     >
                         name
                     </Typography>
                </Box>


                <Box sx={{ flex: 1, px: 2 }}>
                    <CardContent sx={{ p: '0 !important' }}>

                    </CardContent>
                </Box>
            </Card>
        </>

    );
};

export default DishesPage;