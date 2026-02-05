import {noImage} from '../../../Constants.ts';
import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import * as React from 'react';

interface Props {
    dish: IDish;
    onClick: (dish: IDish) => void;
}

const AdminDishCardItem: React.FC<Props> = ({dish, onClick}) => {
      return (
          <>
            <Card onClick={() => onClick(dish)}
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
                  cursor: 'pointer',
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
                    <CardContent>
                        <Typography component='p' variant='h6' sx={{ fontWeight: 'bold' }}>
                            {dish.price} KGS
                        </Typography>
                    </CardContent>
                </Box>
          </Card>
          </>
    );
};

export default AdminDishCardItem;