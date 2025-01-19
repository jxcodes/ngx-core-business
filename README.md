# Welcome to `ngx-core-business`

`ngx-core-business` is an Angular library in active development, built on top of `@angular/material`. It aims to provide reusable, enterprise-grade UI components and utilities to streamline the development of scalable Angular applications.

> **Note**: This library is a work in progress. Some features and components are not yet implemented but are planned for future releases. Contributions and feedback are welcome as we shape the library together!

---

## Current Features

While the library is evolving, here’s what’s available so far:

- **Reusable Components**: A growing collection of UI components for Angular applications.
- **Integration with Angular Material**: Extends Angular Material components with additional functionality and styling.

---

## Planned Features

Here’s what we’re working on and planning to add in future updates:

- **Advanced UI Components**: Components like data tables, modals, and form controls with built-in validation and customization options.
- **Layouts**: Pre-defined layouts for dashboards and business workflows.
- **CRUD Utilities**: Simplified patterns for Create, Read, Update, and Delete operations.
- **Theming**: Enhanced support for Angular Material's theming system.
- **Responsive Design**: Improved layouts and components optimized for various screen sizes.

---

## Installation

You can get started with **`ngx-core-business`** and share your feedback as you go by following these steps:

1. **Install the NgBiz**:
   Install NgBiz by running the following command:  
   ```bash
   npm install ngx-core-business
   ```
<br/>
2. **Install Angular Material(If not already installed)**  
   Install Angular Material by running the following command:
    ```bash
    ng add @angular/material
    ```
    For more detailed guidance on setting up Angular Material, you can refer to the 
    official documentation [here](https://material.angular.io/guide/getting-started)
<br/>
3. **Start Using NgBiz**  
   Let’s test out a component! Import the NgBizAvatarModule into your standalone component’s imports and use the ng-biz-avatar component in the template:
   ```typescript
    import { NgBizAvatarModule } from 'ngx-core-business';

    @Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NgBizAvatarModule
    ],
    template: `<ng-biz-avatar name="John Doe"></ng-biz-avatar>`
    })
    export class AppComponent {}
   ```

## Documentation 📚

[ngx-core-business Documentation](https://jxcodes.github.io/ngx-core-business)