import type { Meta, StoryObj } from '@storybook/react';
import { UserSearchPage } from '@/components/UserSearchPage';

const meta: Meta<typeof UserSearchPage> = {
  title: 'Pages/UserSearch',
  component: UserSearchPage,
};

export default meta;
type Story = StoryObj<typeof UserSearchPage>;

export const Default: Story = {};
