import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {MODAL_STYLES} from '../../../Constants.ts';
import {Button, Typography} from '@mui/material';
import * as React from 'react';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CartItem from '../../Cart/CartItem/CartItem.tsx';


interface Props {
    open: boolean;
    onClose: () => void;
    cartDishes: ICartDish[];
    onDelete?: (dish: ICartDish) => void;
}


const ModalWindow: React.FC<Props> = ({open, cartDishes, onClose, onDelete}) => {
    const total = cartDishes.reduce((acc, item) => {
        acc += item.price;
        return acc;
    }, 150);

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={MODAL_STYLES}>

                    {cartDishes.map(dish => (
                        <CartItem dish={dish} onDelete={onDelete} />
                    ))}

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" component="p">
                            Delivery: <strong>150 KGS</strong>
                        </Typography>

                        <Typography variant="h6" component="p">
                            Total: <strong>{total} KGS</strong>
                        </Typography>
                    </Box>


                    <Box sx={{ mt: 3 }}>
                        <Button
                            sx={{ mr: 1 }}
                            type='button'
                            startIcon={<EditDocumentIcon />}
                            variant="outlined"
                            color="error"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                         <Button
                            type='button'
                            startIcon={<DeleteForeverIcon />}
                            variant="outlined"
                            // loading={isLoading}
                            // loadingPosition="start"
                        >
                            Order
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalWindow;
