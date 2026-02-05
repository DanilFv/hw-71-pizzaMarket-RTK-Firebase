import {Box, Button, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
    dish: ICartDish;
    onDelete?: (dish: ICartDish) => void;
}


const CartItem: React.FC<Props> = ({dish, onDelete}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="h6" component="p">
                {dish.title}
            </Typography>

            <Typography variant="h6" component="p">
                x{dish.count}
            </Typography>

            <Typography variant="h6" component="p">
                {dish.price} KGS
            </Typography>

            {onDelete &&
                <Button type="button" variant="contained" color="error" onClick={() => onDelete(dish)}>
                    <DeleteForeverIcon />
                </Button>
            }
        </Box>
    );
};

export default CartItem;