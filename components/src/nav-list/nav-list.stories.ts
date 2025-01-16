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
    items: [
      { text: 'Item 2', icon: 'home', route: 'abc', children: [] },
      { text: 'Item 1', icon: 'person', route: 'def', children: [] },
    ],
  },
};
