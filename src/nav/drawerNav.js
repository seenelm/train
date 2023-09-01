import {createDrawerNavigator} from '@react-navigation/drawer';
import MainNav from './mainNav';
import Profile from '../features/profile/profile';
import CustomDrawerContent from '../components/customDrawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Main"
        component={MainNav}
        options={{
          headerShown: false,
          drawerLabel: () => null,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          swipeEnabled: false, // Disable swipe for drawer
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
