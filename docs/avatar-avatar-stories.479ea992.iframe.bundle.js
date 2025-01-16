(self.webpackChunkunity=self.webpackChunkunity||[]).push([[14],{"./projects/ngx-core-business/components/src/avatar/avatar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: inline-block;\n  border-radius: 50%;\n  position: relative;\n}\n:host img {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n}\n\n.avatar-name {\n  display: flex;\n  border-radius: 50%;\n  background: #616161;\n  color: #fff;\n  width: 100%;\n  height: 100%;\n  font-size: 12px;\n}\n.avatar-name .initials {\n  height: 100%;\n  width: 100%;\n  top: 0;\n  justify-content: center;\n  display: flex;\n  align-items: center;\n  left: 0;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/ngx-core-business/components/src/avatar/avatar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{f:()=>AvatarComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var avatar_componentngResource=__webpack_require__("./projects/ngx-core-business/components/src/avatar/avatar.component.scss?ngResource"),avatar_componentngResource_default=__webpack_require__.n(avatar_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let AvatarComponent=class AvatarComponent{constructor(){this.size=32}get height(){return this.size}get width(){return this.size}getAvarType(){return this.src?"image":"text"}getInitials(){if(this.name){const names=this.name.split(" ");let initials="";return names.forEach((name=>{initials+=name[0]})),initials}return""}static{this.propDecorators={src:[{type:core.Input}],name:[{type:core.Input}],size:[{type:core.Input}],height:[{type:core.HostBinding,args:["style.height.px"]}],width:[{type:core.HostBinding,args:["style.width.px"]}]}}};AvatarComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ngbiz-avatar",template:'<img *ngIf="getAvarType()==\'image\'" [src]="src" alt="Avatar" />\r\n<span *ngIf="getAvarType()==\'text\'" class="avatar-name" [style]="{\'lineHeigth.px\':size }">\r\n    <span class="initials">{{getInitials()}}</span>\r\n</span>',standalone:!1,styles:[avatar_componentngResource_default()]})],AvatarComponent)},"./projects/ngx-core-business/components/src/avatar/avatar.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>NgBizAvatarModule});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),_avatar_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/ngx-core-business/components/src/avatar/avatar.component.ts");let NgBizAvatarModule=class NgBizAvatarModule{};NgBizAvatarModule=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({declarations:[_avatar_component__WEBPACK_IMPORTED_MODULE_2__.f],imports:[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.m_],exports:[_avatar_component__WEBPACK_IMPORTED_MODULE_2__.f]})],NgBizAvatarModule)},"./projects/ngx-core-business/components/src/avatar/avatar.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_avatar_module__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./projects/ngx-core-business/components/src/avatar/avatar.module.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Avatar",tags:["autodocs"],component:__webpack_require__("./projects/ngx-core-business/components/src/avatar/avatar.component.ts").f,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_avatar_module__WEBPACK_IMPORTED_MODULE_2__.Q]})]},Default={args:{name:"John Doe"}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    name: 'John Doe'\n  }\n}",...Default.parameters?.docs?.source}}}}}]);