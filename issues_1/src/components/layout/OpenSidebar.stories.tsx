import type { Meta, StoryObj } from '@storybook/react';
import { OpenSidebar } from './OpenSidebar';

const meta: Meta<typeof OpenSidebar> = {
  title: 'Components/OpenSidebar',
  component: OpenSidebar,
};

export default meta;

type Story = StoryObj<typeof OpenSidebar>;

export const Purchase: Story = {
  args: {
    menu: 'purchase',
    onMouseEnter: () => {},
    onMouseLeave: () => {},
  },
};
