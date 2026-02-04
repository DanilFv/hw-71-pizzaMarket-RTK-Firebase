import * as React from 'react';
import AdminDishCardItem from './AdminDishCardItem/AdminDishCardItem.tsx';
import {Box} from '@mui/material';

interface Props {
    dishes: IDish[];
    isLoading: boolean;
    onDelete: (id: string) => void;
}


const AdminDishCard: React.FC<Props> = ({dishes, isLoading, onDelete}) => {
    return (
        <>
            {dishes.map((dish) => (
                <Box key={dish.id}>
                    <AdminDishCardItem dish={dish} isLoading={isLoading} onDelete={onDelete} />
                </Box>
            ))}
        </>
    );
};

export default AdminDishCard;