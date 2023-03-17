import { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChatTeardropText: FC<SvgProps> = (props) => (
  <Svg width={96} height={96} viewBox="0 0 256 256" {...props}>
    <Path d="M172 108a12 12 0 0 1-12 12H96a12 12 0 0 1 0-24h64a12 12 0 0 1 12 12Zm-12 28H96a12 12 0 0 0 0 24h64a12 12 0 0 0 0-24Zm76-12a104.11 104.11 0 0 1-104 104H47.67A19.69 19.69 0 0 1 28 208.33V124a104 104 0 0 1 208 0Zm-24 0a80 80 0 0 0-160 0v80h80a80.09 80.09 0 0 0 80-80Z" />
  </Svg>
);
