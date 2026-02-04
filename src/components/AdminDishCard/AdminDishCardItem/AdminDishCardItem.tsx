import {noImage} from '../../../Constants.ts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import * as React from 'react';
import {NavLink} from 'react-router-dom';

interface Props {
    dish: IDish
    isLoading: boolean
    onDelete: (id: string) => void
}

const AdminDishCardItem: React.FC<Props> = ({dish, isLoading, onDelete}) => {
      return (
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
                        image={dish.image || noImage}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = noImage;
                        }}
                        alt={dish.title}
                    />

                     <Typography
                         variant="h5"
                         sx={{ fontWeight: 'bold', mx: 2}}
                     >
                         {dish.title}
                     </Typography>
                </Box>


                <Box sx={{ px: 3 }}>
                    <CardContent sx={{ p: '0 !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        <Typography component='p' variant='h6' sx={{ fontWeight: 'bold' }}>
                            {dish.price} KGS
                        </Typography>

                        <Box>
                            <Button
                                sx={{ mx: 2 }}
                                type='button'
                                startIcon={<EditIcon />}
                                variant="outlined"
                                component={NavLink}
                                to={`/admin/dishes/${dish.id}/edit-dish`}

                            >
                                Edit
                            </Button>

                            <Button
                                type='button'
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<DeleteForeverIcon />}
                                variant="outlined"
                                color='error'
                                onClick={() => onDelete(dish.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </CardContent>
                </Box>
          </Card>
    );
};

export default AdminDishCardItem;