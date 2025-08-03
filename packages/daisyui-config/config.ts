import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export const config: Config = {
	content: ['./src/**/*.{ts,tsx}', '../../apps/**/*.{ts,tsx,svelte}'],
	plugins: [daisyui],
	theme: {
		extend: {},
	},
};
