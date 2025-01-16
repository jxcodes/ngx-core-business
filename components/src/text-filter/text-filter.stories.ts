import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizTextFilterModule } from './text-filter.module';
import { TextFilterComponent } from './text-filter.component';

const meta: Meta<TextFilterComponent> = {
  title: 'Components/TextFilter',
  tags: ['autodocs'],
  component: TextFilterComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizTextFilterModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<TextFilterComponent>;

// Stories
export const Default: Story = {
};
