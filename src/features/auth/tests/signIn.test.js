// import React from "react";
// import { fireEvent, waitFor, screen, act } from "@testing-library/react-native";
// import SignIn from "../signIn";
// import { renderWithProviders } from "../../../mocks/renderWithProviders";
// import { server } from "../../../mocks/server";
// import { rest } from "msw";

// describe("SignIn", () => {
//   it("should login user when username and password are valid", async () => {
//     const { getByPlaceholderText, getByText } = renderWithProviders(<SignIn />);

//     const signInButton = getByText("Sign in");

//     const mockEvent = {
//       preventDefault: jest.fn(),
//     };

//     await act(async () => {
//       fireEvent.changeText(
//         getByPlaceholderText("Email or Username"),
//         "Username"
//       );
//       fireEvent.changeText(getByPlaceholderText("Password"), "Password123!");
//       fireEvent.press(signInButton, mockEvent);
//     });

//     await waitFor(() => {});
//   });
//   describe("when username or password are not valid", () => {
//     it("should return error response when username and password are missing", async () => {
//       server.use(
//         rest.post("http://192.168.1.59:3000/api/login", (req, res, ctx) => {
//           return res(
//             ctx.status(400),
//             ctx.json({
//               errors: {
//                 username: "Username is required",
//                 password: "Password is required",
//               },
//             })
//           );
//         })
//       );

//       const { getByPlaceholderText, getByText } = renderWithProviders(
//         <SignIn />
//       );

//       const signInButton = getByText("Sign in");

//       const mockEvent = {
//         preventDefault: jest.fn(),
//       };

//       await act(async () => {
//         fireEvent.changeText(getByPlaceholderText("Email or Username"), "");
//         fireEvent.changeText(getByPlaceholderText("Password"), "");

//         fireEvent.press(signInButton, mockEvent);
//       });

//       await waitFor(() => {
//         expect(getByText("Username is required")).toBeVisible();
//         expect(getByText("Password is required")).toBeVisible();
//       });
//     });
//   });
//   describe("when the username or password is incorrect", () => {
//     it("should display an error when the credentials are wrong", async () => {
//       // 1. Set up the mock server to return an error response for incorrect credentials
//       server.use(
//         rest.post("http://192.168.1.59:3000/api/login", (req, res, ctx) => {
//           if (
//             req.username !== "correctUsername" ||
//             req.password !== "correctPassword"
//           ) {
//             return res(
//               ctx.status(401), // Unauthorized
//               ctx.json({
//                 errors: {
//                   message: "Incorrect username or password",
//                 },
//               })
//             );
//           }
//           // You can also return a successful response here if needed.
//           return res(ctx.status(200));
//         })
//       );

//       const { getByPlaceholderText, getByText } = renderWithProviders(
//         <SignIn />
//       );

//       const signInButton = getByText("Sign in");
//       const mockEvent = { preventDefault: jest.fn() };

//       // 2. Input incorrect credentials
//       await act(async () => {
//         fireEvent.changeText(
//           getByPlaceholderText("Email or Username"),
//           "wrongUsername"
//         );
//         fireEvent.changeText(getByPlaceholderText("Password"), "wrongPassword");
//         // 3. Trigger the login attempt
//         fireEvent.press(signInButton, mockEvent);
//       });

//       // 4. Check for the expected error message in the rendered output
//       await waitFor(() => {
//         expect(getByText("Incorrect username or password")).toBeVisible();
//       });
//     });
//   });
// });

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignIn from "../signIn";
import { Provider } from "react-redux";
import { store, persistor } from "../../../api/store";
import { PersistGate } from "redux-persist/integration/react";

import { renderWithProviders } from './path-to-renderWithProviders';

describe('SignIn', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithProviders(<SignIn />);

    expect(getByText('Sign in')).toBeTruthy();
  });

  // other tests...
});



  // it("allows entering a username", () => {
  //   const { getByPlaceholderText } = render(
  //     <Provider store={store}>
  //       <SignIn />
  //     </Provider>
  //   );

  //   const usernameInput = getByPlaceholderText("Email or Username");
  //   fireEvent.changeText(usernameInput, "testuser");

  //   expect(usernameInput.props.value).toBe("testuser");
  // });

  // it("allows entering a password", () => {
  //   const { getByPlaceholderText } = render(
  //     <Provider store={store}>
  //       <SignIn />
  //     </Provider>
  //   );

  //   const passwordInput = getByPlaceholderText("Password");
  //   fireEvent.changeText(passwordInput, "testpassword");

  //   expect(passwordInput.props.value).toBe("testpassword");
  // });

  // it("calls the login function when the sign in button is pressed", () => {
  //   const { getByText, getByPlaceholderText } = render(
  //     <Provider store={store}>
  //       <SignIn />
  //     </Provider>
  //   );

  //   const usernameInput = getByPlaceholderText("Email or Username");
  //   const passwordInput = getByPlaceholderText("Password");
  //   const signInButton = getByText("Sign in");

  //   fireEvent.changeText(usernameInput, "testuser");
  //   fireEvent.changeText(passwordInput, "testpassword");
  //   fireEvent.press(signInButton);

  //   // Here you would typically expect some action to have happened, like navigation,
  //   // but as the actual implementation of the SignIn component is not provided,
  //   // I can't provide a specific expectation.
  // });
});
