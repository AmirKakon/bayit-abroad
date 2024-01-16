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

export const getCities = async (searchTerm = '', page = 1) => {
  const response = await fetch(`${apiBaseUrl}/api/cities/getAll?search=${searchTerm}&page=${page}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const res = await response.json();
  return res;
};
