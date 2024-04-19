import api from "../api";

export const register = async (data: any) => {
  try {
    return await api.post("/register", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Define the register function that performs the API call.
// const register = async ({ username, password, name }) => {
//   const response = await fetch('/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username,
//       password,
//       name,
//     }),
//   });

//   if (!response.ok) {
//     // Assuming your API returns error messages in a specific format.
//     // You may need to adjust this based on your API's actual error response structure.
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to register');
//   }

//   return response.json();
// };


export const login = async (data: any) => {
  return await api.post("/login", data);
};

