import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { AppHeaderComponent } from './app-header.component';
import { NgBizAppHeaderModule } from './app-header.module';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<AppHeaderComponent> = {
  title: 'Components/Header',
  tags: ['autodocs'],
  component: AppHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizAppHeaderModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppHeaderComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Default: Story = {
  args: {
    appName: 'MY AWESOME APP',
    user: {
      email: 'jhon.doe@example.com',
      name: 'Jhon Doe',
    },
    menuButtonClick: () => {
      alert('Menu button clicked');
    },
    logoutButtonClick: () => {
      alert('Logout button clicked');
    }
  },
};
