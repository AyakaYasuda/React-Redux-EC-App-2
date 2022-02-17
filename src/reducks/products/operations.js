import { db, FirebaseTimestamp } from "../../firebase";
import { push } from "connected-react-router";
import { fetchProductsAction } from "./actions";

const productsRef = db.collection("products");

export const fetchProducts = () => {
  return async dispatch => {
    productsRef
      .orderBy("updated_at", "desc")
      .get()
      .then(snapshots => {
        const productList = [];
        snapshots.forEach(snapshot => {
          const product = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

export const saveProduct = (
  id,
  name,
  description,
  price,
  category,
  gender,
  images,
  sizes
) => {
  return async dispatch => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10), // string => number
      sizes: sizes,
      updated_at: timestamp,
    };

    // if id does not exist meaning it's first time to add an item
    if (id === "") {
      const ref = productsRef.doc();
      const id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch(error => {
        throw new Error(error);
      });
  };
};
