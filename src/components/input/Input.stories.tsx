import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Input from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: "radio",
      options: ["text", "email", "password"],
    },
    placeholder: {
      control: "text",
    },
    value: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    className: {
      control: "text",
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => {
  const [inputValue, setInputValue] = useState(args.value || "");

  return (
    <Input
      {...args}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  type: "text",
  placeholder: "Escribe aquí...",
  disabled: false,
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  placeholder: "Introduce tu email...",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Introduce tu contraseña...",
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: "text",
  placeholder: "No editable",
  disabled: true,
};
