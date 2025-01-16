import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizGridModule } from './grid.module';
import { GridComponent } from './grid.component';

const meta: Meta<GridComponent> = {
  title: 'Components/Grid',
  tags: ['autodocs'],
  component: GridComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizGridModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<GridComponent>;

// Stories
export const Default: Story = {
};
