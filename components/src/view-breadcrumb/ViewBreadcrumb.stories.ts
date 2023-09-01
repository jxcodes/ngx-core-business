import { moduleMetadata } from '@storybook/angular';
import type { Meta } from '@storybook/angular';

import { NgBizBreadcrumbModule } from './view-breadcrumb.module';
import { ViewBreadcrumbComponent } from './view-breadcrumb.component';

const meta: Meta<ViewBreadcrumbComponent> = {
  title: 'Application/ViewBreadcrumb',
  tags: ['autodocs'],
  component: ViewBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [NgBizBreadcrumbModule],
    }),
  ],
};

export default meta;


// Do Pass ng-content into the component
export const ContentProjection = () => ({
  template: `
    <ngbiz-view-breadcrumb>
      <span>SETTINGS</span>
      <ngbiz-view-breadcrumb-separator></ngbiz-view-breadcrumb-separator>
      <span>ACCOUNT</span>
      <ngbiz-view-breadcrumb-separator></ngbiz-view-breadcrumb-separator>
      <span>PROFILE</span>
    </ngbiz-view-breadcrumb>
  `,
  props: {},
});
