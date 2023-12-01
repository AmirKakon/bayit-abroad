// import * as React from "react";
// import {
//   Unstable_NumberInput as BaseNumberInput,
// } from "@mui/base/Unstable_NumberInput";
// import { styled } from "@mui/system";
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';

// const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
//   return (
//     <BaseNumberInput
//       slots={{
//         root: StyledInputRoot,
//         input: StyledInputElement,
//         incrementButton: StyledButton,
//         decrementButton: StyledButton,
//       }}
//       slotProps={{
//         incrementButton: {
//           children: <AddIcon fontSize="small" />,
//           className: 'increment',
//         },
//         decrementButton: {
//           children: <RemoveIcon fontSize="small" />,
//         },
//       }}
//       {...props}
//       ref={ref}
//     />
//   );
// });

// const NumberInputBasic = () => {
//   const [value, setValue] = React.useState(0);
//   return (
//     <NumberInput
//       aria-label="Amount"
//       value={value}
//       onChange={(event, val) => {
//         const amount = val ?? 0;
//         setValue(amount);
//         console.log(val, amount);
//     }}
//     disabled={false}
//     min={0}
//     max={5}
//     defaultValue={0}
//     />
//   );
// };
  
//   const grey = {
//     1: '#2c3c30',
//     50: '#F3F6F9',
//     100: '#E5EAF2',
//     200: '#DAE2ED',
//     300: '#C7D0DD',
//     400: '#B0B8C4',
//     500: '#9DA8B7',
//     600: '#6B7A90',
//     700: '#434D5B',
//     800: '#303740',
//     900: '#1C2025',
//   };
  
//   const StyledInputRoot = styled('div')(
//     ({ theme }) => `
//     font-family: IBM Plex Sans, sans-serif;
//     font-weight: 400;
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
//     display: flex;
//     align-items: center;
//   `,
//   );
  
//   const StyledInputElement = styled('input')(
//     ({ theme }) => `
//     font-size: 0.875rem;
//     font-family: inherit;
//     font-weight: 400;
//     line-height: 1.375;
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     box-shadow: 0px 2px 4px ${
//       theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
//     };
//     border-radius: 8px;
//     margin: 0 8px;
//     padding: 10px 12px;
//     outline: 0;
//     min-width: 0;
//     width: 4rem;
//     text-align: center;
  
//     &:hover {
//       border-color: ${grey[400]};
//     }
  
//     &:focus {
//       border-color: ${grey[400]};
//       box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     }
  
//     &:focus-visible {
//       outline: 0;
//     }
//   `,
//   );
  
//   const StyledButton = styled('button')(
//     ({ theme }) => `
//     font-family: IBM Plex Sans, sans-serif;
//     font-size: 0.875rem;
//     box-sizing: border-box;
//     line-height: 1.5;
//     border: 1px solid;
//     border-radius: 999px;
//     border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//     background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
//     color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//     width: 32px;
//     height: 32px;
//     display: flex;
//     flex-flow: row wrap;
//     justify-content: center;
//     align-items: center;
//     transition-property: all;
//     transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//     transition-duration: 120ms;
  
//     &:hover {
//       cursor: pointer;
//       background: ${theme.palette.mode === 'dark' ? grey[700] : grey[1]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[500] : grey[400]};
//       color: ${grey[50]};
//     }
  
//     &:focus-visible {
//       outline: 0;
//     }
  
//     &.increment {
//       order: 1;
//     }
//   `,
//   );

//   export default NumberInputBasic;

import { List, ListItem, Button, ListItemText } from "@mui/material";
import React, { useState } from 'react';
import { Unstable_NumberInput as NumberInput} from "@mui/base/Unstable_NumberInput";

const ItemsList = ({ items }) => {
 const [amounts, setAmounts] = useState(() => {
    const initialState = {};
    items.forEach((item) => {
      initialState[item.id] = 0;
    });
    return initialState;
 });

 const handleChange = (event) => {
    const { id, value } = event.target;
    setAmounts((prevAmounts) => ({ ...prevAmounts, [id]: value }));
 };

 const handleSubmit = () => {
    const selectedItems = items.filter((item) => amounts[item.id] > 0);
    console.log('Selected items:', selectedItems);
    console.log('Amounts:', amounts);
 };

 return (
    <div>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`Price: $${item.price}`} />
            <div>
              <NumberInput
                label="Amount"
                value={amounts[item.id]}
                onChange={handleChange}
                min={0}
                max={10}
              />
            </div>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </div>
 );
};

export default ItemsList;