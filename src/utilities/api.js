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
