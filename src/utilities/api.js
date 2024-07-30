import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchFormItems = async () => {
  const response = await fetch(`${apiBaseUrl}/api/form/form-items/getAll`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const res = await response.json();
  return res.data;
};

export const createOrder = async (submissionData) => {
  const response = await fetch(`${apiBaseUrl}/api/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissionData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export const getCities = async (searchTerm = "", page = 1) => {
  const response = await fetch(
    `${apiBaseUrl}/api/cities/getAll?search=${searchTerm}&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const res = await response.json();
  return res.data;
};

export const addCity = async (city) => {
  const response = await fetch(`${apiBaseUrl}/api/cities/add/${city}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const res = await response.json();
  return res;
};

export const signupViaEmail = async (user) => {
  const response = await fetch(`${apiBaseUrl}/api/user/signupViaEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

export const loginViaEmail = async ({ email, password }) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`Successfully logged in user ${user.uid}`);
    const response = { status: "Success", user: user };
    return response;
  } catch (error) {
    console.log(`Failed to log in user ${email}`, error);
    return { status: "Failed", error: error };
  }
};
