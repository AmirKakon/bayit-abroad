import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

const InformationSection = ({ order }) => {
  return (
    <>
    <TableHead>
      <TableRow>
        <TableCell colSpan={2} style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
          <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
            Information
          </Typography>
        </TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
        {[
          ['Name:', order.fullName],
          ['Email:', order.email],
          ['Phone:', order.phoneNumber],
          ['Address:', order.deliveryAddress],
          ['Delivery Date:', dayjs(order.dateRange.delivery).format('ddd MMM D YYYY')],
          ['Pickup Date:', dayjs(order.dateRange.pickup).format('ddd MMM D YYYY')],
          ['Additional Notes:', order.additionalNotes],
        ].map((row) => (
          <TableRow key={row[0]}>
            <TableCell width="10%">{row[0]}</TableCell>
            <TableCell>{row[1]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </>
  );
};

const ItemsSection = ({ items, totalPrice }) => {
    let totalAmountOfItems = 0;

  const itemList = items.map((item) => {
    totalAmountOfItems += item.amount;

    return <TableRow key={item.name}>
      <TableCell width="40%">{item.name}</TableCell>
      <TableCell width="10%">${item.price.usd}</TableCell>
      <TableCell>₪{item.price.nis}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell width="10%">${item.amount*item.price.usd}</TableCell>
      <TableCell>₪{item.amount*item.price.nis}</TableCell>
    </TableRow>
});

  return (
    <>
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
          <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
            Items
          </Typography>
        </TableCell>
        <TableCell colSpan={2} style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
          <Typography variant="body1" sx={{ marginLeft: 2, fontWeight: 'bold' }}>
            Price Per Item
          </Typography>
        </TableCell>
        <TableCell style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
          <Typography variant="body1" sx={{ paddingRight: 3, fontWeight: 'bold' }}>
            Amount
          </Typography>
        </TableCell>
        <TableCell colSpan={2} style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
          <Typography variant="body1" sx={{ marginLeft: 3, fontWeight: 'bold' }}>
            Total Price
          </Typography>
        </TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
        {itemList}
        <TableRow>
          <TableCell colSpan={3}>
            <strong>Total:</strong>
          </TableCell>
          <TableCell>{totalAmountOfItems}</TableCell>
          <TableCell>${totalPrice.usd}</TableCell>
          <TableCell>₪{totalPrice.nis}</TableCell>
        </TableRow>
      </TableBody>
      </>
  );
};

const OrderSummary = ({ order }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} style={{ backgroundColor: '#2c3c30', padding: '10px' }}>
                <Typography variant="h5" color="#e6deca" sx={{ marginLeft: 1 }}>
                  Order Summary
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <InformationSection order={order} />
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table size="small">
          <ItemsSection items={order.selectedItems} totalPrice={order.totalPrice} />
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderSummary;
