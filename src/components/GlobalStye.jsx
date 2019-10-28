import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import-normalize;
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #f3f7fa;
    font-family: "Open Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
