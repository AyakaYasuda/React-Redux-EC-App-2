import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ImageArea, SetSizeArea } from "../components/Products";
import { TextInput, SelectBox, PrimaryButton } from "../components/UI";
import { saveProduct } from "../reducks/products/operations";
import { db } from "../firebase/index";

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState("");
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);

  const genders = [
    { id: "all", name: "all" },
    { id: "male", name: "mens" },
    { id: "female", name: "womens" },
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

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then(snapshot => {
          const data = snapshot.data();
          console.log(data);
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">Add and Edit Products</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"Product Name"}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={"Product Description"}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
        <SelectBox
          label={"Category"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={"Gender"}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label={"Price"}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={"number"}
          onChange={inputPrice}
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"Save"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  price,
                  category,
                  gender,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
