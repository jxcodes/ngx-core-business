import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { AppHeaderComponent } from './app-header.component';
import { NgBizAppHeaderModule } from './app-header.module';

const defaultArgs = {
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
  },
};

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<AppHeaderComponent> = {
  title: 'Components/AppHeader',
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
  args: defaultArgs,
};

export const WithCustomSlots: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ngbiz-app-header
        [appName]="appName"
        [user]="user"
        (menuButtonClick)="menuButtonClick()"
        (logoutButtonClick)="logoutButtonClick()"
      >
        <div beforeAppName style="border: 1px dashed white;">-- beforeAppName --</div>
        <div afterAppName style="border: 1px dashed white;">-- afterAppName --</div>
        <div content style="border: 1px dashed white; width: 100%; text-align:center;">-- content --</div>
        <div beforeUser style="border: 1px dashed white;">-- beforeUser --</div>
        <div afterUser style="border: 1px dashed white;">-- afterUser --</div>
      </ngbiz-app-header>
    `,
  }),
  args: defaultArgs,
};
