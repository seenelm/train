import { render } from "@testing-library/react-native";
import { setupStore } from "../api/store.js";
import { Provider } from "react-redux";

export function renderWithProviders(component) {
  let initialState = {};

  const store = setupStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
}
