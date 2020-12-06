import React, { useMemo } from 'react';
import styled from 'styled-components';

const TitleH1 = ({ children, level, ...props }) => <h1 {...props}>{children}</h1>;
const TitleH2 = ({ children, level, ...props }) => <h2 {...props}>{children}</h2>;
const TitleH3 = ({ children, level, ...props }) => <h3 {...props}>{children}</h3>;
const TitleH4 = ({ children, level, ...props }) => <h4 {...props}>{children}</h4>;
const TitleH5 = ({ children, level, ...props }) => <h5 {...props}>{children}</h5>;
const TitleH6 = ({ children, level, ...props }) => <h6 {...props}>{children}</h6>;

const CustomizeTitle = (props) => {
  const Component = useMemo(() => {
    switch (props.level) {
      case 2:
      case '2':
        return TitleH2;
      case 3:
      case '3':
        return TitleH3;
      case 4:
      case '4':
        return TitleH4;
      case 5:
      case '5':
        return TitleH5;
      case 6:
      case '6':
        return TitleH6;
      default:
        return TitleH1;
    }
  }, []);

  return <Component {...props} />;
};

const Title = styled(CustomizeTitle)`
   padding: 0.5em;
   padding-bottom: 1.5em;
   text-align: center;
`;

export default Title;
