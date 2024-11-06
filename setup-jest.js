//Mock react-native-keycahin
jest.mock("react-native-keychain", () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

// Mock createDrawerNavigator
jest.mock("@react-navigation/drawer", () => ({
  createDrawerNavigator: jest.fn(),
}));

// Mock @react-navigation/stack
jest.mock("@react-navigation/stack", () => ({
  createStackNavigator: jest.fn(),
  CardStyleInterpolators: {
    forHorizontalIOS: jest.fn(),
    forVerticalIOS: jest.fn(),
  },
}));

// Mock @react-navigation/bottom-tabs
jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: jest.fn(),
}));

// Mock "react-native-context-menu-view"
jest.mock("react-native-context-menu-view", () => ({
  ContextMenu: jest.fn(),
}));

// Mock "@gorhom/bottom-sheet"
jest.mock("@gorhom/bottom-sheet", () => ({
  BottomSheet: jest.fn(),
}));

jest.mock("react-native-gesture-handler", () => {
  return {
    Swipeable: jest.fn().mockReturnValue(null), // Mock Swipeable component
    Direction: { RIGHT: "RIGHT", LEFT: "LEFT" }, // Mock Direction object
  };
});

// Mock react-native-config
jest.mock("react-native-config", () => ({
  API_URL: "http://localhost:3000",
}));

// mock async storage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// mock redux persist
jest.mock("redux-persist", () => ({
  persistReducer: jest.fn(),
  persistStore: jest.fn(),
}));
