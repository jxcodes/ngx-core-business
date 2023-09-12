import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizAvatarModule } from './avatar.module';
import { AvatarComponent } from './avatar.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<AvatarComponent> = {
  title: 'Forms/EditionPin',
  tags: ['autodocs'],
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizAvatarModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AvatarComponent>;

// Stories
export const Add: Story = {
  args: {
    icon: 'add',
  },
};

export const Edit: Story = {
  args: {
    icon: 'edit',
  },
};

export const Delete: Story = {
  args: {
    icon: 'delete',
  },
};

