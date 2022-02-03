import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageArea from '../components/Products/ImageArea';
import { TextInput, SelectBox, PrimaryButton } from '../components/UI';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [images, setImages] = useState([]);

  const categories = [
    { id: 'tops', name: 'tops' },
    { id: 'shirt', name: 'shirt' },
    { id: 'pants', name: 'pants' },
  ];

  const genders = [
    { id: 'all', name: 'all' },
    { id: 'male', name: 'mens' },
    { id: 'female', name: 'womens' },
  ];

  const inputName = useCallback(
    event => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    event => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    event => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  return (
    <section>
      <h2 className='u-text__headline u-text-center'>Add and Edit Products</h2>
      <div className='c-section-container'>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'Product Name'}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={'text'}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={'Product Description'}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={'text'}
          onChange={inputDescription}
        />
        <SelectBox
          label={'Category'}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={'Gender'}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label={'Price'}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={'number'}
          onChange={inputPrice}
        />
      </div>
      <div className='module-spacer--medium' />
      <div className='center'>
        <PrimaryButton
          label={'Save'}
          onClick={() =>
            dispatch(saveProduct(name, description, category, gender, price))
          }
        />
      </div>
    </section>
  );
};

export default ProductEdit;
