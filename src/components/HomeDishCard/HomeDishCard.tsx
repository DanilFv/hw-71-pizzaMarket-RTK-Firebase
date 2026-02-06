import {Box, Typography} from '@mui/material';
import HomeDishCardItem from './HomeDishCardItem/HomeDishCardItem.tsx';
import * as React from 'react';
import type {IDish} from '../../types';

interface Props {
    dish: IDish[]
    onClick: (dish: IDish) => void;
}

const HomeDishCard: React.FC<Props> = ({dish, onClick}) => {
    return (
        <>
            <Typography variant='h4' component='h4' sx={{ fontWeight: 'bold' }}>
                  Dishes:
            </Typography>
            {dish.map((dish) => (
                <Box key={dish.id}>
                    <HomeDishCardItem dish={dish} onClick={onClick} />
                </Box>
            ))}

        </>
    );
};

export default HomeDishCard;