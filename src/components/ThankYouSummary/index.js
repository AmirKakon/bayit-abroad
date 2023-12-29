import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const InformationSection = ({ order }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell
            colSpan={2}
            style={{ backgroundColor: "#d5d5d5", padding: "5px" }}
          >
            <Typography
              variant="body1"
              sx={{ marginLeft: 1, fontWeight: "bold" }}
            >
              Information
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          ["Tracking Number:", order.id],
          ["Name:", order.fullName],
          ["Email:", order.email],
          ["Phone in Israel:", order.phone],
          ["Delivery Address:", order.deliveryAddress],
          [
            "Delivery Date:",
            dayjs.unix(order.deliveryDate._seconds).format("ddd MMM D YYYY"),
          ],
          [
            "Return Date:",
            dayjs.unix(order.returnDate._seconds).format("ddd MMM D YYYY"),
          ],
          ["Additional Notes:", order.additionalNotes],
        ].map((row) => (
          <TableRow key={row[0]}>
            <TableCell width="20%">{row[0]}</TableCell>
            <TableCell>{row[1]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

const ItemsSection = ({ items, totalPrice }) => {
  let totalQuantityOfItems = 0;

  const itemList = items.map((item) => {
    totalQuantityOfItems += item.quantity;

    return (
      <TableRow key={item.name}>
        <TableCell width="40%">{item.name}</TableCell>
        <TableCell width="10%" sx={{ textAlign: "center" }}>
        &#36;{item.price.usd}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>&#8362;{item.price.nis}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
        <TableCell width="10%" sx={{ textAlign: "center" }}>
        &#36;{item.quantity * item.price.usd}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
        &#8362;{item.quantity * item.price.nis}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell style={{ backgroundColor: "#d5d5d5", padding: "5px" }}>
            <Typography
              variant="body1"
              sx={{ marginLeft: 1, fontWeight: "bold" }}
            >
              Items
            </Typography>
          </TableCell>
          <TableCell
            colSpan={2}
            style={{
              backgroundColor: "#d5d5d5",
              padding: "5px",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Price Per Item
            </Typography>
          </TableCell>
          <TableCell
            style={{
              backgroundColor: "#d5d5d5",
              padding: "5px",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Quantity
            </Typography>
          </TableCell>
          <TableCell
            colSpan={2}
            style={{
              backgroundColor: "#d5d5d5",
              padding: "5px",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Total Price
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itemList}
        <TableRow style={{ backgroundColor: "#d5d5d5" }}>
          <TableCell colSpan={3}>
            <strong>Subtotal:</strong>
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            <strong>{totalQuantityOfItems}</strong>
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            <strong>&#36;{totalPrice.usd}</strong>
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            <strong>&#8362;{totalPrice.nis}</strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

const ThankYouSummary = ({ order }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                style={{
                  backgroundColor: "#2c3c30",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
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
          <ItemsSection
            items={order.selectedItems}
            totalPrice={order.totalPrice}
          />
        </Table>
      </TableContainer>

      <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="body1" align="left" paragraph>
          * Please note that delivery is only in Jerusalem. Drop off is
          dependent on our availability and your preference.
          <br />* Payment is at time of delivery via cash, bit or bank transfer.
        </Typography>
      </Paper>
    </div>
  );
};

export default ThankYouSummary;
