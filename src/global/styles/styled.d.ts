import 'styled-components';
import theme from './theme';

//Arquivo para sobrescrever o tema de styled components

declare module 'styled-components' {
    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType {}
}