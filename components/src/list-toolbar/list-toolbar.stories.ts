import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizListToolbarModule } from './list-toolbar.module';
import { ListToolbarComponent } from './list-toolbar.component';

const meta: Meta<ListToolbarComponent> = {
  title: 'Components/ListToolbar',
  tags: ['autodocs'],
  component: ListToolbarComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizListToolbarModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<ListToolbarComponent>;

// Stories
export const Default: Story = {
};
