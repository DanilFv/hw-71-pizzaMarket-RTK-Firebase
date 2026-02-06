import {Box, Button, Paper, Stack, Typography} from '@mui/material';
import type {IUpdateOrder} from '../../types';
import * as React from 'react';

interface Props {
  id: string;
  items: IUpdateOrder[];
  allOrdersTotal: number;
  onCompleted: (orderId: string) => void;
  loading: boolean;
}

const OrderCard: React.FC<Props> = ({ items, allOrdersTotal, onCompleted, id, loading }) => {
  const deliveryPrice = 150;

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, border: '2px solid black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack spacing={1} sx={{ flexGrow: 1 }}>
          {items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', pr: 4 }}>
              <Typography>{item.count} x {item.title}</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>{item.total} KGS</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pr: 4 }}>
            <Typography>Delivery</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{deliveryPrice} KGS</Typography>
          </Box>
        </Stack>

        <Box sx={{ textAlign: 'right', minWidth: '150px' }}>
          <Typography variant="body2">Order total:</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {allOrdersTotal + deliveryPrice} KGS
          </Typography>
          <Button type='button' loading={loading} loadingPosition='center' sx={{ textTransform: 'none', textDecoration: 'underline' }} onClick={() => onCompleted(id)}>
            Complete order
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderCard;