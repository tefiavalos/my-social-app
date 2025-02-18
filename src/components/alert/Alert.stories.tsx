import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    message: {
      description: 'The message to display in the alert.',
      type: 'string', // Explicitly define the type
    },
    type: {
      description: 'The type of alert.',
      control: { type: 'select' }, // Use a select control
      options: ['base', 'error', 'success', 'warning', 'info'], // Provide options
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    message: 'This is a base alert.',
    type: 'base',
  },
};

export const Error: Story = {
  args: {
    message: 'This is an error alert.',
    type: 'error',
  },
};

export const Success: Story = {
  args: {
    message: 'This is a success alert.',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning alert.',
    type: 'warning',
  },
};

export const Info: Story = {
  args: {
    message: 'This is an info alert.',
    type: 'info',
  },
};