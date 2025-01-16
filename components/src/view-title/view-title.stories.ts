import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizViewTitleModule } from './view-title.module';
import { ViewTitleComponent } from './view-title.component';

const meta: Meta<ViewTitleComponent> = {
  title: 'Components/ViewTitle',
  tags: ['autodocs'],
  component: ViewTitleComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizViewTitleModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<ViewTitleComponent>;

// Stories
export const Default: Story = {
};
