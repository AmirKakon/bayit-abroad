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
import dayjs from "dayjs";

const OrderSummary = ({ order, selectedItemsList, totalAmount }) => {
  const setDateString = (date) => {
    // Implement your date formatting logic here
    return date.toLocaleDateString();
  };

  const itemList = order.selectedItems.map((item) => {
    return <TableRow>
    <TableCell width="30%">
      {item.name}
    </TableCell>
    <TableCell width="10%">${item.price.usd}</TableCell>
    <TableCell>₪{item.price.nis}</TableCell>
    <TableCell>{item.amount}</TableCell>
  </TableRow>
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} style={{ backgroundColor: '#2c3c30', padding: '10px' }}>
              <Typography variant="h5" color="#e6deca" sx={{ marginLeft: 1 }}>Order Summary</Typography>
              </TableCell>
            </TableRow>
          </TableHead>


          <TableHead>
            <TableRow>
              <TableCell colSpan={2} style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
              <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: "bold" }}>Information</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell width="10%">
                Name:
              </TableCell>
              <TableCell >{order.fullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                Email:
              </TableCell>
              <TableCell >{order.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                Phone:
              </TableCell>
              <TableCell >{order.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                Address:
              </TableCell>
              <TableCell >{order.deliveryAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                Delivery Date:
              </TableCell>
              <TableCell>{dayjs(order.dateRange.delivery).format("ddd MMM D YYYY")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Pickup Date:
              </TableCell>
              <TableCell >{dayjs(order.dateRange.pickup).format("ddd MMM D YYYY")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
               Additional Notes:
              </TableCell>
              <TableCell >{order.additionalNotes}</TableCell>
            </TableRow>
          </TableBody>
          </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell  style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
              <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: "bold" }}>Items</Typography>
              </TableCell>
              <TableCell colSpan={2} style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
              <Typography variant="body1" sx={{ marginLeft: 5, fontWeight: "bold" }}>Price</Typography>
              </TableCell>
              <TableCell style={{ backgroundColor: '#d5d5d5', padding: '5px' }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>Amount</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemList}
            <TableRow>
              <TableCell >
               <strong>Total:</strong>
              </TableCell>
              <TableCell >${order.totalPrice.usd}</TableCell>
              <TableCell>₪{order.totalPrice.nis}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderSummary;
