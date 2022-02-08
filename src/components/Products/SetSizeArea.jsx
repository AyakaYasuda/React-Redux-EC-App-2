import React, { useState, useCallback, useEffect } from 'react';
import { Paper } from '@mui/material';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { TextInput } from '../UI';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
});

const SetSizeArea = props => {
  const classes = useStyles();

  const [index, setIndex] = useState(0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    event => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputQuantity = useCallback(
    event => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const addSize = (index, size, quantity) => {
    if (size === '' || quantity === '') {
      // required input is blank
      return false;
    } else {
      if (index === props.sizes.length) {
        // when adding new size
        props.setSizes(prevState => [
          ...prevState,
          { size: size, quantity: quantity },
        ]);
        setIndex(index + 1);
        setSize('');
        setQuantity(0);
      } else {
        // when editing the existing size
        const newSizes = props.sizes;
        newSizes[index] = { size: size, quantity: quantity };
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity(0);
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = deleteIndex => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon
                        className={classes.iconCell}
                        onClick={() => editSize(i, item.size, item.quantity)}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteIcon
                        className={classes.iconCell}
                        onClick={() => deleteSize(i)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fillWidth={false}
            label={'Size'}
            multiline={false}
            required={true}
            rows={1}
            value={size}
            type={'text'}
            onChange={inputSize}
          />
          <TextInput
            fillWidth={false}
            label={'Quantity'}
            multiline={false}
            required={true}
            rows={1}
            value={quantity}
            type={'number'}
            onChange={inputQuantity}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
