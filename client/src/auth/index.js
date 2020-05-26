import { NODE_API } from "../config";

/*******    SIGNIN      ******/
export const signUp = (user) => {
  console.log(user);

  //Put ${NODE_API} in before when running on localhost
  return fetch("/api/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .catch((err) => {
      console.log(err);
    });
};

/******     LOGIN   ********/
export const login = (user) => {
  console.log(user);

  return fetch("/api/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })

    .catch((err) => {
      console.log(err);
    });
};

/*******  AUTHENTICATE  ********/
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

/*******  SIGN OUT  ********/
export const signOut = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch("api/signout", {
      method: "GET",
    })
      .then((res) => {
        console.log("signout", res);
      })
      .catch((err) => console.log(err));
  }
};

/****** isAuthenticated *******/
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
