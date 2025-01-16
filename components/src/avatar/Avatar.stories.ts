import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizAvatarModule } from './avatar.module';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
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
export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};
