import {Box, Button, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

interface Props {
    dishes: IDish[];
}


const AdminDishButtonContainer: React.FC<Props> = ({dishes}) => {
    return (
        <>
            {dishes.length === 0 &&
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='p' variant='h6'>No dishes.</Typography>
                <Button type='type' variant='outlined' component={NavLink} to='/admin/dishes/new-dish'>
                  Add new dish
                </Button>
              </Box>
            }


            {dishes.length >= 1 &&
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component='h5' variant='h5' sx={{ fontWeight: 'bold' }}>
                        Dishes
                    </Typography>

                    <Button type='type' variant='outlined' component={NavLink} to='/admin/dishes/new-dish'>
                        Add new dish
                    </Button>
              </Box>
            }
        </>
    );
};

export default AdminDishButtonContainer;