import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizHttpActivityBarModule } from './http-activity-bar.module';
import { HttpActivityBarComponent } from './http-activity-bar.component';

const meta: Meta<HttpActivityBarComponent> = {
  title: 'Components/HttpActivityBar',
  tags: ['autodocs'],
  component: HttpActivityBarComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizHttpActivityBarModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<HttpActivityBarComponent>;

// Stories
export const Default: Story = {
};
