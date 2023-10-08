import React from "react";
import { fireEvent, waitFor, screen, act } from "@testing-library/react-native";
import SignUp from "../signUp";
import { renderWithProviders } from "../../../mocks/renderWithProviders";
import { server } from "../../../mocks/server";
import { rest } from "msw";

describe("SignUp", () => {
  it("should login user when username, password, and name are valid", async () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <SignUp onSignUp />
    );

    const signUpButton = getByText("Sign up");
    const nameInput = getByPlaceholderText("Name");
    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    await act(async () => {
      fireEvent.changeText(nameInput, "Name");
      fireEvent.changeText(usernameInput, "Username");
      fireEvent.changeText(passwordInput, "Password123!");
      fireEvent.press(signUpButton, mockEvent);
    });

    await waitFor(() => {});
  });
  describe("when username, password, or name are not valid", () => {
    it("should return error response when name, username, and password is missing", async () => {
      server.use(
        rest.post("http://192.168.1.59:3000/api/register", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              errors: {
                name: "Name is required",
                username: "Username is required",
                password: "Password is required",
              },
            })
          );
        })
      );

      const { getByPlaceholderText, getByText } = renderWithProviders(
        <SignUp />
      );

      const signUpButton = getByText("Sign up");

      const mockEvent = {
        preventDefault: jest.fn(),
      };

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText("Name"), "");
        fireEvent.changeText(getByPlaceholderText("Username"), "");
        fireEvent.changeText(getByPlaceholderText("Password"), "");

        fireEvent.press(signUpButton, mockEvent);
      });

      await waitFor(() => {
        expect(screen.getByText("Name is required")).toBeVisible();
        expect(screen.getByText("Username is required")).toBeVisible();
        expect(screen.getByText("Password is required")).toBeVisible();
      });
    });

    it("should return error response when password is missing a special character", async () => {
      const { getByPlaceholderText, getByText } = renderWithProviders(
        <SignUp />
      );

      server.use(
        rest.post("http://192.168.1.59:3000/api/register", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              errors: {
                password:
                  "Password must be a mix of upper & lower case letters, numbers & symbols",
              },
            })
          );
        })
      );

      const signUpButton = getByText("Sign up");

      fireEvent.changeText(getByPlaceholderText("Name"), "Name");
      fireEvent.changeText(getByPlaceholderText("Username"), "Username");
      fireEvent.changeText(getByPlaceholderText("Password"), "Password123");

      const mockEvent = {
        preventDefault: jest.fn(),
      };

      fireEvent.press(signUpButton, mockEvent);

      await waitFor(() => {
        expect(
          screen.getByText(
            "Password must be a mix of upper & lower case letters, numbers & symbols"
          )
        ).toBeOnTheScreen();
      });
    });
    it("should return error response when password is missing a number", async () => {
      const { getByPlaceholderText, getByText } = renderWithProviders(
        <SignUp />
      );

      server.use(
        rest.post("http://192.168.1.59:3000/api/register", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              errors: {
                password:
                  "Password must be a mix of upper & lower case letters, numbers & symbols",
              },
            })
          );
        })
      );

      const signUpButton = getByText("Sign up");

      fireEvent.changeText(getByPlaceholderText("Name"), "Name");
      fireEvent.changeText(getByPlaceholderText("Username"), "Username");
      fireEvent.changeText(getByPlaceholderText("Password"), "Password!");

      const mockEvent = {
        preventDefault: jest.fn(),
      };

      fireEvent.press(signUpButton, mockEvent);

      await waitFor(() => {
        expect(
          screen.getByText(
            "Password must be a mix of upper & lower case letters, numbers & symbols"
          )
        ).toBeOnTheScreen();
      });
    });
    it("should return error response when password is missing an uppercase letter and username is less than 6 characters", async () => {
      const { getByPlaceholderText, getByText } = renderWithProviders(
        <SignUp />
      );

      server.use(
        rest.post("http://192.168.1.59:3000/api/register", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              errors: {
                password:
                  "Password must be a mix of upper & lower case letters, numbers & symbols",
                username: "Username should be at least 6 characters",
              },
            })
          );
        })
      );

      const signUpButton = getByText("Sign up");

      fireEvent.changeText(getByPlaceholderText("Name"), "Name");
      fireEvent.changeText(getByPlaceholderText("Username"), "User");
      fireEvent.changeText(getByPlaceholderText("Password"), "password!");

      const mockEvent = {
        preventDefault: jest.fn(),
      };

      fireEvent.press(signUpButton, mockEvent);

      await waitFor(() => {
        expect(
          screen.getByText(
            "Password must be a mix of upper & lower case letters, numbers & symbols"
          )
        ).toBeOnTheScreen();
        expect(screen.getByText("Username should be at least 6 characters"));
      });
    });
  });
});
