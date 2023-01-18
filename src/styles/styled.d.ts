import globalStyle from './globalStyle';
import 'styled-components';

declare module 'styled-components' {
	type ThemeType = typeof globalStyle;

	export type DefaultTheme = ThemeType;
}
