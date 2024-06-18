import { ERROR, SUCCESS, NeutralDark, DENSITY_BACKGROUND, DENSITY_TEXT, DENSITY_MAIN } from "./palleteConstants";

const palette: {
  mode: "dark";
  neutral: any; // Change the type to match your design system
  background: {
    default: string;
    primary: string;
    secondary: string;
    tertiary: string;
    main: string;
    tint4: string;
    success: {
      primary: string;
      secondary: string;
    };
    error: {
      primary: string;
      secondary: string;
    };
  };
  borderColor: {
    primary: string;
  };
  borderRadius: {
    primary: string;
    secondary: string;
  };
  text: {
    main: string;
    primary: string;
    secondary: string;
    tertiary: string;
    regular: string;
    error: string;
    errorDefault: string;

    success: string;
    quaternary: string;
    highlight: string;
    light: string;
    warning: string;
  };
} = {
  mode: "dark",
  neutral: NeutralDark, // Update with the actual type as per your design system
  background: {
    default: NeutralDark.grey1,
    primary: DENSITY_BACKGROUND.primary,
    secondary: DENSITY_BACKGROUND.secondary,
    tertiary: DENSITY_BACKGROUND.tertiary,
    main: DENSITY_BACKGROUND.default,
    tint4: DENSITY_MAIN.tint4,
    success: {
      primary: "#29B57E",
      secondary: "linear-gradient(173.87deg, #29B57E -234.51%, rgba(41, 181, 126, 0) 253.9%)"
    },
    error: {
      primary: "#FF6554",
      secondary: "linear-gradient(173.87deg, #FF6554 -234.51%, rgba(255, 101, 84, 0) 253.9%)"
    }
  },
  borderColor: {
    primary: NeutralDark.grey3
  },
  borderRadius: {
    primary: "8px",
    secondary: "4px"
  },
  text: {
    main: DENSITY_TEXT.main,
    primary: DENSITY_TEXT.default,
    secondary: DENSITY_TEXT.primary,
    tertiary: DENSITY_TEXT.secondary,
    regular: DENSITY_TEXT.tertiary,
    error: ERROR.primary,
    errorDefault: ERROR.default,
    success: SUCCESS.primary,
    quaternary: DENSITY_TEXT.quaternary,
    highlight: DENSITY_TEXT.highlight,
    light: DENSITY_TEXT.light,
    warning: DENSITY_TEXT.warning
  }
};

export { palette };
