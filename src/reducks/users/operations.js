import { signInAction, signOutAction, fetchProductsInCartAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase";

export const addProductToCart = addedProduct => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = db.collection("users").doc(uid).collection("cart").doc();
    addedProduct.cartId = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push("/"));
  };
};

export const fetchProductsInCart = products => {
  return async dispatch => {
    dispatch(fetchProductsInCartAction(products));
  };
};

export const listenAuthState = () => {
  return async dispatch => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        // if a user exists, the authentication completed
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then(snapshot => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        // if not, get back to sign in
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = email => {
  return async dispatch => {
    if (email === "") {
      alert("Required items cannot be blank!");
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("Sent you a confirmation email.");
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert("Failed to reset your password");
        });
    }
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    // Validation
    if (email === "" || password === "") {
      alert("Required items cannot be blank!");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then(result => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then(snapshot => {
            const data = snapshot.data();
            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push("/"));
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async dispatch => {
    // Validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Required items cannot be blank!");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }

    return auth.createUserWithEmailAndPassword(email, password).then(result => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: "customer",
          uid: uid,
          // updated_at: timestamp,
          username: username,
        };

        db.collection("users")
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push("/"));
          });
      }
    });
  };
};

export const signOut = () => {
  return async dispatch => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};
