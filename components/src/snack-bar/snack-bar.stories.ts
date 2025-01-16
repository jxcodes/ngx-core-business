import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizSnackBarModule } from './snack-bar.module';
import { SnackBarComponent } from './snack-bar.component';

const meta: Meta<SnackBarComponent> = {
  title: 'Components/SnackBar',
  tags: ['autodocs'],
  component: SnackBarComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizSnackBarModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SnackBarComponent>;

// Stories
export const Default: Story = {
};
