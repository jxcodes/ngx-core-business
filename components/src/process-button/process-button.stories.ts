import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizProcessButtonModule } from './process-button.module';
import { ProcessButtonComponent } from './process-button.component';

const meta: Meta<ProcessButtonComponent> = {
  title: 'Components/ProcessButton',
  tags: ['autodocs'],
  component: ProcessButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizProcessButtonModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<ProcessButtonComponent>;

// Stories
export const Default: Story = {
};
