import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizDialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';

const meta: Meta<DialogComponent> = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  component: DialogComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizDialogModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<DialogComponent>;

// Stories
export const Default: Story = {
};
