import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  black: "#222222",
  tabbar: "#000000",
  primary: "#45d279",
  white: "#FFFFFF",
  error: "#E24C4B",
  warning: "#FFC048",
  lightGray: "#64676D",
  lightGray2: "#EFEFF0",
  lightGray3: '#D4D5D6',
  lightGray4: '#7D7E84',
  gray: "#2D3038",
  gray1: "#282C35",
  darkRed: "#31262F",
  lightRed: "#C5505E",
  darkBlue: "#22273B",
  lightBlue: "#424BAF",
  darkGreen: "#213432",
  lightGreen: "#31Ad66",
  blue: '#007EFA'
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height
};
export const FONTS = {
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h2_light: { fontFamily: "Roboto-Light", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h3_light: { fontFamily: "Roboto-Light", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  h4_light: { fontFamily: "Roboto-Light", fontSize: SIZES.h4, lineHeight: 22 },
  body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
