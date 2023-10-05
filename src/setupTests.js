import { server } from "./mocks/server";
import "@testing-library/jest-native/extend-expect";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
