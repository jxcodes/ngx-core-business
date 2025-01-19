import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';

import { NgBizNavListModule } from './nav-list.module';
import { NavListComponent } from './nav-list.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<NavListComponent> = {
  title: 'Components/NavList',
  tags: ['autodocs'],
  component: NavListComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizNavListModule, CommonModule, RouterTestingModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<NavListComponent>;

export const Example: Story = {
  args: {
    activeItemId: 1,
    items: [
      { id: 1, text: 'Home', icon: 'home', route: '/home', children: [] },
      { id: 2, text: 'Inbox', icon: 'inbox', route: '/inbox', children: [] },
      {
        id: 3,
        text: 'Configuration',
        icon: 'settings',
        route: '/config',
        children: [
          {
            id: 4,
            text: 'Credentials',
            icon: 'key',
            route: '/users',
            children: [],
          },
          {
            id: 5,
            text: 'Devices',
            icon: 'display_settings',
            route: '/roles',
            children: [],
          },
        ],
      },
    ],
  },
};
