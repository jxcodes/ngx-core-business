import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizEditionPinModule } from './edition-pin.module';
import { EditionPinComponent } from './edition-pin.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<EditionPinComponent> = {
  title: 'Forms/EditionPin',
  tags: ['autodocs'],
  component: EditionPinComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizEditionPinModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<EditionPinComponent>;

// Stories
export const Add: Story = {
  args: {
    icon: 'add',
  },
};

export const Edit: Story = {
  args: {
    icon: 'edit',
  },
};

export const Delete: Story = {
  args: {
    icon: 'delete',
  },
};

