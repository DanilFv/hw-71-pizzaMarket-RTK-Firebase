import * as React from 'react';
import {Box, Button, Typography} from '@mui/material';
import CartItem from './CartItem/CartItem.tsx';

interface Props {
    cart: ICartDish[]
    onDelete?: (dish: ICartDish) => void;
    checkout?: boolean;
    onClick?: () => void;
}

const Cart: React.FC<Props> = ({cart, onDelete, checkout, onClick}) => {

    const total = cart.reduce((acc, item) => {
        acc += item.price;
        return acc;
    }, 150);

    return (
        <>
            <Typography variant='h4' component='h4' sx={{ fontWeight: 'bold' }}>
                  Your order:
            </Typography>

            {cart.map((item) => (
                <Box key={item.id}>
                    <CartItem dish={item} onDelete={onDelete} />
                </Box>
            ))}

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" component="p">
                    Total: <strong>{total} KGS</strong>
                </Typography>
            </Box>

            {checkout &&
                <Button sx={{ mt: 2 }} variant='outlined' type='button' onClick={onClick} >
                    Checkout
                </Button>
            }

        </>
    );
};

export default Cart;