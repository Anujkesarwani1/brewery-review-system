import { Configuration } from 'webpack'
import { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: Configuration) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      components: path.resolve(__dirname, '../src/components'),
      themes: path.resolve(__dirname, '../src/themes'),
      pages: path.resolve(__dirname, '../src/pages'),
      public: path.resolve(__dirname, '..', 'public'),
      services: path.resolve(__dirname, '../src/services'),
    }
    return config
  },
}

export default config
