import React from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const OrdersList = ({ orders }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <List>
        {orders.map((order) => (
          <Paper key={order.id} elevation={2} sx={{ marginBottom: 2, padding: 2, backgroundColor: "#e6deca" }}>
            <ListItem>
              <ListItemText
                primary={`Order ID: ${order.id}`}
                secondary={`Full Name: ${order.fullName}`}
              />
            </ListItem>

            <Typography variant="body2" color="textSecondary">
              Delivery Address: {order.deliveryAddress}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: {order.phone}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {order.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {order.status}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date Range: {order.dateRange.delivery} - {order.dateRange.return}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Additional Notes: {order.additionalNotes}
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" component="h3">
              Items:
            </Typography>
            {order.selectedItems.map((item) => (
              <Box key={item.id} sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  {item.name} - Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${item.price.usd} / ₪{item.price.nis}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {item.category}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" component="h3">
              Total Price: ${order.totalPrice.usd} / ₪{order.totalPrice.nis}
            </Typography>
          </Paper>
        ))}
      </List>
    </Paper>
  );
};

export default OrdersList;
