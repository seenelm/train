import { server } from "./mocks/server";
import "@testing-library/jest-native/extend-expect";
import { setupStore } from "./api/store";
import { apiSlice } from "./api/apiSlice";

const store = setupStore({});

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState()); // Clear RTK Query cache after each test
});

afterAll(() => server.close());
