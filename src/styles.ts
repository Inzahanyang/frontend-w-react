import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "white",
  bgColor: "lightgray",
};

export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "white",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing: border-box;
    }
    body {
      background-color: #FAFAFA;
      font-size: 14px;
      font-family: 'Open Sans',sans-serif;
    }
    a {
      text-decoration: none;
    }
`;
