import { db, FirebaseTimestamp } from '../../firebase';
import { push } from 'connected-react-router';

const productsRef = db.collection('products');

export const saveProduct = (
  name,
  description,
  price,
  category,
  gender,
  images
) => {
  return async dispatch => {
    console.log(name, description, price, category, gender, images);
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10), // string => number
      updated_at: timestamp,
    };

    const ref = productsRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push('/'));
      })
      .catch(error => {
        throw new Error(error);
      });
  };
};
