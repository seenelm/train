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

jest.mock("react-native-gesture-handler");
