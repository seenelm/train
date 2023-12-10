import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Checkbox = ({ isChecked, onCheck }) => {
  return (
    <TouchableOpacity
      style={{
        height: 20,
        width: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: isChecked ? "#000" : "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onCheck}
    >
      <Text style={{ color: "#fff" }}>{isChecked ? "✓" : ""}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

// let store;
// describe("Your test", () => {
//   beforeEach(() => {
//     store = createTestStore();
//   });
//   test('Your component with a full reducer flow', async () => {
//     // Create a redux store
//     const { findByText } = render(
//       <Provider store={store}>
//         <YourComponentToTest />
//       </Provider>
//     );
//     await findByText('This text is now visible because your state was updated by the reducer');
//   });
// });

// export function createTestStore() {
//     const store = createStore(
//       combineReducers({
//         user: userReducer,
//         config: configReducer,
//       })
//     );
//     return store;
//   }
