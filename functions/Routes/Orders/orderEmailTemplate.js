const dayjs = require("dayjs");

const bayitAbroadLogoUrl =
  "https://firebasestorage.googleapis.com/v0/b/bayitabroad-jkak.appspot.com/o/logo%2Fbayit-abroad-logo.png?alt=media&token=ca798017-62a0-4190-a1e9-eedaba78f18d";

const setDateString = (date) => {
  const d = dayjs(date);
  const formatedD = d.format("ddd MMM D YYYY");
  return formatedD;
};

const selectedItemsList = (selectedItems, totalQuantity) =>
  selectedItems
    .map((item) => {
      totalQuantity += item.quantity;
      return `<tr style="border: 1px solid #ddd;">
      <td style="padding-left: 10px">${item.name}</td>
      <td style="text-align: center">&#36;${item.price.usd}</td>
      <td style="text-align: center">&#8362;${item.price.nis}</td>
      <td style="text-align: center">${item.quantity}</td>
      <td style="text-align: center">
      &#36;${item.price.usd * item.quantity}
      </td>
      <td style="text-align: center">
      &#8362;${item.price.nis * item.quantity}
      </td>
    </tr>`;
    })
    .join("");

const getOrderEmailTemplate = (order, url) => `
<table width="100%" cellspacing="0" cellpadding="0">
<tr>
  <td align="left" style="background-color: #2c3c30; padding: 10px">
    <img src="${bayitAbroadLogoUrl}"
    alt="BayitAbroad Logo"
    width="100"
    height="100"
    align="left"
    style="vertical-align: middle">
    <h1 style="color: #c49f79; margin-left: 10px; padding-top: 15px"
    >BayitAbroad New Order</h1>
  </td>
</tr>
</table>

<!-- Information Table -->
<table
width="100%"
cellspacing="0"
cellpadding="5"
style="border: 1px solid #ddd; border-collapse: collapse">
<tr>
  <td colspan="2" style="background-color: #f2f2f2; padding: 10px">
    <strong>Information</strong>
  </td>
</tr>
<tr>
  <td width="30%"><strong>Tracking Number:</strong></td>
  <td>${order.id}</td>
</tr>
<tr>
  <td><strong>Name:</strong></td>
  <td>${order.fullName}</td>
</tr>
<tr>
  <td><strong>Email:</strong></td>
  <td>${order.email}</td>
</tr>
<tr>
  <td><strong>Phone:</strong></td>
  <td>${order.phone}</td>
</tr>
<tr>
  <td><strong>Delivery Address:</strong></td>
  <td>${order.deliveryAddress}</td>
</tr>
<tr>
  <td><strong>Delivery on:</strong></td>
  <td>${setDateString(order.deliveryDate.toDate())}</td>
</tr>
<tr>
  <td><strong>Return on:</strong></td>
  <td>${setDateString(order.returnDate.toDate())}</td>
</tr>
</table>

<!-- Items Table -->
<table
width="100%"
cellspacing="0"
cellpadding="5"
style="border: 1px solid #ddd; border-collapse: collapse">
<tr>
  <td style="background-color: #f2f2f2; padding: 10px">
    <strong>Items</strong>
  </td>
  <td colspan="2" style="background-color: #f2f2f2; text-align: center">
    <strong>Price per Item</strong>
  </td>
  <td style="background-color: #f2f2f2; text-align: center">
    <strong>Quantity</strong>
  </td>
  <td colspan="2" style="background-color: #f2f2f2; text-align: center">
    <strong>Total</strong>
  </td>
</tr>
${selectedItemsList(order.selectedItems, order.totalQuantity)}
<tr style"border: 1px solid #ddd;">
  <td colspan="4"><strong>Total per Week:</strong></td>
  <td style="text-align: center">
  <strong>&#36;${order.totalPrice.usd}</strong>
  </td>
  <td style="text-align: center">
  <strong>&#8362;${order.totalPrice.nis}</strong>
  </td>
</tr>
<tr style"border: 1px solid #ddd;">
  <td colspan="3"></td>
  <td colspan="3"><strong>x${order.weeks} Weeks</strong></td>
</tr>
<tr style"border: 1px solid #ddd;">
  <td colspan="3"><strong>Subtotal:</strong></td>
  <td style="text-align: center"><strong>${order.totalQuantity}</strong></td>
  <td style="text-align: center"><strong>&#36;${
  order.subtotal.usd
}</strong></td>
  <td style="text-align: center">
  <strong>&#8362;${order.subtotal.nis}</strong>
  </td>
</tr>
<tr style"border: 1px solid #ddd;">
  <td colspan="6" style="background-color: #f2f2f2; padding: 10px">
    <strong>Additional Notes</strong>
  </td>
</tr>
<tr>
  <td colspan="6">${order.additionalNotes}</td>
</tr>
<tr>
  <td style="background-color: #f2f2f2; padding: 10px">
    <strong>Last Updated:</strong>
  </td>
  <td colspan="5" style="background-color: #f2f2f2">
  ${order.lastUpdated.toDate()}
  </td>
</tr>
</table>

<!-- Additional Notes -->
<br />
<br />
<p>&#42; Please note that delivery is only in Jerusalem. Drop off
is dependent on our availability and your preference.
<br />
&#42; Payment will be available after confirmation of the order
by our team. Payment options include cash, bit, or PayPal.
</p>
<br />
<a href="${url}" style="
display: block;
padding: 10px;
background-color: #2c3c30;
color: #ffffff;
text-align: center;
text-decoration: none;
border-radius: 5px;
margin: 10px auto;
width: 100%;
max-width: 300px;">View Order</a>
`;

module.exports = getOrderEmailTemplate;
