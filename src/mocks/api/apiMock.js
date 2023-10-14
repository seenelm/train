import { useDispatch } from "react-redux";

// Mocking useDispatch
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

// Then in your test:
await waitFor(async () => {
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoggedIn(true));
});
