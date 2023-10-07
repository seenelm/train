import React from "react";
import { fireEvent, waitFor, screen, act } from "@testing-library/react-native";
import SignUp from "../signUp";
import { renderWithProviders } from "../../../mocks/renderWithProviders";
import * as Keychain from "react-native-keychain";

describe("SignUp", () => {
  it("should login user when username, password, and name are valid", async () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <SignUp onSignUp />
    );

    const signUpButton = getByText("Sign up");

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Name"), "Name");
      fireEvent.changeText(getByPlaceholderText("Username"), "Username");
      fireEvent.changeText(getByPlaceholderText("Password"), "Password123!");
      fireEvent.press(signUpButton, mockEvent);
    });
  });
});
