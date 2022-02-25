import React, { useCallback } from "react";
import { storage } from "../../firebase";
import { ImagePreview } from "./index";

import { IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = props => {
  const classes = useStyles();

  const uploadImage = useCallback(
    event => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" });

      // Generate random 16 digits strings
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map(n => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImages(prevState => [...prevState, newImage]);
        });
      });
    },
    [props.setImages]
  );

  const deleteImage = useCallback(
    async id => {
      console.log(id);
      const ret = window.confirm("Are you sure to delete this image?");
      if (!ret) {
        return false;
      } else {
        const newImages = props.images.filter(image => image.id !== id);
        props.setImages(newImages);
        return storage.ref("images").child(id).delete();
      }
    },
    [props.images]
  );

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map(image => (
            <ImagePreview
              id={image.id}
              path={image.path}
              key={image.id}
              delete={deleteImage}
            />
          ))}
      </div>
      <div className="u-text-right">
        <span>Add a product image</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={event => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
