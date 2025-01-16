(self.webpackChunkunity=self.webpackChunkunity||[]).push([[460],{"./projects/ngx-core-business/components/src/grid/grid.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/ngx-core-business/components/src/grid/grid.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>grid_stories});var dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");var grid_componentngResource=__webpack_require__("./projects/ngx-core-business/components/src/grid/grid.component.scss?ngResource"),grid_componentngResource_default=__webpack_require__.n(grid_componentngResource),paginator=__webpack_require__("./node_modules/@angular/material/fesm2022/paginator.mjs");let GridComponent=class GridComponent{constructor(){this.data=[],this.size="medium",this.displayedColumns=[],this.selectedRowIndex=-1,this.cols=[],this.pageIndex=0,this.pageSize=10}set columns(columns){this.cols=columns.map((column=>(column.field?(column.type="data",column.name=column.field):column.type="actions",column))),this.displayedColumns=Array.from(this.cols,(column=>column.name))}getTableCls(){return["ngbiz-custom-material__mat-table--lite",this.size]}getActionsColWidth(col){return 48*col.actions.length}getPageIndex(){return this.paginator?this.paginator.pageIndex:this.pageIndex}getPageSize(){return this.paginator?this.paginator.pageSize:this.pageSize}getItemNumber(index){return this.getPageIndex()*this.getPageSize()+index+1}static{this.propDecorators={data:[{type:core.Input}],size:[{type:core.Input}],columns:[{type:core.Input}],pageIndex:[{type:core.Input}],pageSize:[{type:core.Input}],paginator:[{type:core.ViewChild,args:[paginator.iy]}]}}};GridComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ngbiz-grid",template:'<table mat-table [dataSource]="data" matSort [ngClass]="getTableCls()">\n  <caption></caption>\n  \x3c!-- Fila de cabecezas--\x3e\n  <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true;"></tr>\n\n  \x3c!-- Fila de cuerpo --\x3e\n  <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="selectedRowIndex = row.id"\n    [ngClass]="{\'row-selected\': selectedRowIndex == row.id}"></tr>\n\n  \x3c!-- Columns --\x3e\n  <ng-container *ngFor="let col of cols" [matColumnDef]="col.name" [stickyEnd]="col.stickyEnd">\n    @if (col.type===\'data\') {\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{col.text}}</th>\n    <td mat-cell *matCellDef="let row; let i=index;">\n      @if(col.field==\'_rowNumber\'){\n      {{getItemNumber(i)}}\n      }@else{\n      {{row[col.field]}}\n      }\n    </td>\n    } @else if(col.type===\'actions\') {\n    <th mat-header-cell *matHeaderCellDef class="row-actions-header-cell">\n      <div>\n        <div [style.width.px]="getActionsColWidth(col)">{{col.text}}</div>\n      </div>\n    </th>\n    <td mat-cell *matCellDef="let row; let i=index;" class="row-actions-cell">\n      <div class="row-actions-container">\n        <button *ngFor="let action of col.actions" mat-icon-button [class]="\'row-action-button\' + action.cls"\n          (click)="action.handler(row)" [matTooltip]="action.tooltip||\'\'">\n          <mat-icon>{{action.icon}}</mat-icon>\n        </button>\n      </div>\n    </td>\n    }\n  </ng-container>\n</table>\n',standalone:!1,styles:[grid_componentngResource_default()]})],GridComponent);var table=__webpack_require__("./node_modules/@angular/material/fesm2022/table.mjs"),sort=__webpack_require__("./node_modules/@angular/material/fesm2022/sort.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),tooltip=__webpack_require__("./node_modules/@angular/material/fesm2022/tooltip.mjs"),fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs");let NgBizGridModule=class NgBizGridModule{};NgBizGridModule=(0,tslib_es6.Cg)([(0,core.NgModule)({declarations:[GridComponent],imports:[common.CommonModule,fesm2022_button.Hl,icon.m_,sort.NQ,table.tP,tooltip.uc],exports:[GridComponent]})],NgBizGridModule);const grid_stories={title:"Components/Grid",tags:["autodocs"],component:GridComponent,decorators:[(0,dist.moduleMetadata)({imports:[NgBizGridModule]})]},Default={},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}}}}]);