import StackNav from "../components/Stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import AuthForm from "../auth/AuthForm";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const getScreens = (onLogin, onSignUp) => [
  {
    name: "AuthForm",
    component: (props) => (
      <AuthForm
        {...props}
        onLoginForm={() => props.navigation.navigate("Login")}
        onSignUpForm={() => props.navigation.navigate("Sign up")}
      />
    ),
  },
  {
    name: "Login",
    component: (props) => <LoginForm {...props} onLogin={onLogin} />,
  },
  {
    name: "Sign up",
    component: (props) => <SignUpForm {...props} onSignUp={onSignUp} />,
  },
];

const options = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
};

const AuthNav = ({ onLogin, onSignUp }) => (
  <StackNav screens={getScreens(onLogin, onSignUp)} options={options} />
);

export default AuthNav;
