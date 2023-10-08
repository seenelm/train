import { render } from "@testing-library/react-native";
import { setupStore } from "../api/store.js";
import { Provider } from "react-redux";

// export function renderWithProviders(component) {
//   let initialState = {};

//   const store = setupStore(initialState);
//   return render(<Provider store={store}>{component}</Provider>);
// }

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
