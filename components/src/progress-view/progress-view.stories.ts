import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizProgressViewModule } from './progress-view.module';
import { ProgressViewComponent } from './progress-view.component';

const meta: Meta<ProgressViewComponent> = {
  title: 'Components/ProgressView',
  tags: ['autodocs'],
  component: ProgressViewComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizProgressViewModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<ProgressViewComponent>;

// Stories
export const Default: Story = {
};
