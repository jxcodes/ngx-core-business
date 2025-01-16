import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizDataErrorViewModule } from './data-error-view.module';
import { DataErrorViewComponent } from './data-error-view.component';

const meta: Meta<DataErrorViewComponent> = {
  title: 'Components/DataErrorView',
  tags: ['autodocs'],
  component: DataErrorViewComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizDataErrorViewModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<DataErrorViewComponent>;

// Stories
export const Default: Story = {
};
