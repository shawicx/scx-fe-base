import {
  defineConfig,
  presetWind,
  presetAttributify,
  presetIcons,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  presets: [presetWind(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
  rules: [
    [
      'animate-slide-in-right',
      {
        animation: 'slideInRight 0.3s ease-out',
      },
    ],
  ],
  theme: {
    keyframes: {
      slideInRight: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
    },
  },
});
