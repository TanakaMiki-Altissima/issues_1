import type { Meta, StoryObj } from '@storybook/react';
import { AllMenu } from './AllMenu';

const meta: Meta<typeof AllMenu> = {
  title: 'Components/AllMenu',
  component: AllMenu,
};

export default meta;

type Story = StoryObj<typeof AllMenu>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
