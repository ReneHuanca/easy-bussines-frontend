(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20fdaafa"],{1784:function(t,e,a){"use strict";a("b0c0");var o=a("d4ec"),r=a("bee2"),n=a("eeb9"),s=a("2c6e"),c=function(){function t(){Object(o["a"])(this,t)}return Object(r["a"])(t,[{key:"getAllCategories",value:function(){return n["a"].get("/categories",{headers:Object(s["a"])()})}},{key:"getOneCategory",value:function(t){return n["a"].get("/categories/".concat(t),{headers:Object(s["a"])()})}},{key:"addCategory",value:function(t){return n["a"].post("/categories",{name:t.name},{headers:Object(s["a"])()})}},{key:"updateCategory",value:function(t,e){return n["a"].put("/categories/".concat(t),{name:e.name},{headers:Object(s["a"])()})}},{key:"deleteCategory",value:function(t,e){return n["a"].delete("/categories/".concat(t),{headers:Object(s["a"])(),data:{last_user:e}})}}]),t}();e["a"]=new c},2487:function(t,e,a){"use strict";a.r(e);var o=function(){var t,e=this,a=e.$createElement,o=e._self._c||a;return o("v-container",{attrs:{id:"regular-tables",fluid:"",tag:"section"}},[o("base-material-snackbar",e._b({attrs:{type:e.alert.color},model:{value:e.alert.state,callback:function(t){e.$set(e.alert,"state",t)},expression:"alert.state"}},"base-material-snackbar",(t={},t[e.alert.x]=!0,t[e.alert.y]=!0,t),!1),[e._v(" "+e._s(e.alert.text)+" ")]),o("base-v-component",{attrs:{heading:"Administrar Categorias",link:"components/simple-tables"}}),o("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"primary",icon:"mdi-apps",title:"CATEGORIAS"}},[o("v-data-table",{attrs:{headers:e.headers,items:e.categories,search:e.search,id:"dtCliente"},scopedSlots:e._u([{key:"top",fn:function(){return[o("v-toolbar",{staticClass:"mt-6 toolbar",attrs:{flat:""}},[o("v-spacer"),o("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Buscar","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),o("v-spacer"),o("v-btn",{attrs:{color:"indigo",to:"/dashboard/categories/create"}},[o("v-icon",{attrs:{color:"white",left:""}},[e._v("mdi-plus")]),e._v(" AGREGAR ")],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var a=t.item;return[o("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[o("v-btn",e._g(e._b({attrs:{color:"elevation-2 info mx-2",small:""},on:{click:function(t){return e.showCategory(a)}}},"v-btn",n,!1),r),[o("v-icon",[e._v(" mdi-eye ")])],1)]}}],null,!0)},[o("span",[e._v("Mostrar")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[o("v-btn",e._g(e._b({staticClass:"elevation-2 mx-2",attrs:{color:"orange",small:"",to:"/dashboard/categories/edit/"+a.id}},"v-btn",n,!1),r),[o("v-icon",[e._v("mdi-pencil")])],1)]}}],null,!0)},[o("span",[e._v("Editar")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[o("v-btn",e._g(e._b({staticClass:"elevation-2 mx-2",attrs:{color:"red",small:""},on:{click:function(t){return e.openModalDelete(a.id)}}},"v-btn",n,!1),r),[o("v-icon",[e._v(" mdi-delete ")])],1)]}}],null,!0)},[o("span",[e._v("Eliminar")])])]}},{key:"no-data",fn:function(){return[o("v-btn",{attrs:{color:"primary"},on:{click:e.loadCategories}},[e._v("Actualizar")])]},proxy:!0}])})],1),o("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[o("show",{attrs:{category:e.category},on:{closeShowModal:e.closeShowModal}})],1),o("v-dialog",{attrs:{"max-width":"380"},model:{value:e.deleteModal,callback:function(t){e.deleteModal=t},expression:"deleteModal"}},[o("v-card",[o("v-card-title",[e._v(" ¿Estas Seguro? "),o("v-spacer"),o("v-icon",{attrs:{"aria-label":"Close"},on:{click:function(t){e.deleteModal=!1}}},[e._v(" mdi-close ")])],1),o("v-card-text",{staticClass:"pb-2 pt-2 text-center"},[o("v-row",[o("v-col",{attrs:{cols:"12"}},[o("v-icon",{staticStyle:{"font-size":"100px",opacity:".5"},attrs:{color:"warning"}},[e._v("mdi-alert-circle-outline")]),o("br"),e._v(" ¡No podrás revertir esto! ")],1)],1),o("v-row",[o("v-col",{attrs:{cols:"12",sm:"6"}},[o("v-btn",{staticClass:"mr-3",attrs:{color:"red"},on:{click:function(t){e.deleteModal=!1}}},[o("v-icon",{attrs:{left:""}},[e._v("mdi-cancel")]),e._v(" Cancelar ")],1)],1),o("v-col",{attrs:{cols:"12",sm:"6"}},[o("v-btn",{attrs:{color:"indigo"},on:{click:function(t){return e.deleteCategory()}}},[o("v-icon",{attrs:{left:""}},[e._v("mdi-delete")]),e._v(" Si, Eliminar ")],1)],1)],1)],1)],1)],1)],1)},r=[],n=(a("96cf"),a("1da1")),s=a("1784"),c=a("60e7"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("MOSTRANDO CATEGORIA")])]),a("v-card-text",[a("v-list-item",[a("v-list-item-icon",[a("v-icon",{attrs:{color:"info"}},[t._v(" mdi-apps ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(t.category.name))]),a("v-list-item-subtitle",[t._v("Nombre")])],1)],1)],1),a("v-card-actions",[a("v-btn",{staticClass:"ml-3",attrs:{color:"muted"},on:{click:t.closeShowModal}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-cancel")]),t._v(" CERRAR ")],1),a("v-spacer"),a("v-btn",{attrs:{color:"warning",to:"/dashboard/categories/edit/"+t.category.id}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v(" EDITAR ")],1)],1)],1)},i=[],d={props:{category:Object},methods:{closeShowModal:function(){this.$emit("closeShowModal")}}},u=d,v=a("2877"),m=a("6544"),p=a.n(m),b=a("8336"),f=a("b0af"),g=a("99d9"),h=a("132d"),_=a("da13"),C=a("5d23"),x=a("34c3"),y=a("2fa4"),w=Object(v["a"])(u,l,i,!1,null,null,null),k=w.exports;p()(w,{VBtn:b["a"],VCard:f["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VIcon:h["a"],VListItem:_["a"],VListItemContent:C["a"],VListItemIcon:x["a"],VListItemSubtitle:C["b"],VListItemTitle:C["c"],VSpacer:y["a"]});var M=a("a189"),V={components:{show:k},mixins:[M["a"]],data:function(){return{search:"",headers:[{text:"ID",value:"id"},{text:"Nombre",align:"start",sortable:!0,value:"name"},{text:"Creado en",align:"start",sortable:!0,value:"created_at"},{text:"Acción",value:"actions",sortable:!1}],categories:[],category:new c["a"]("","","","","","","","","","",1),categoryId:null,showModal:!1,deleteModal:!1,alert:{state:!1,color:"success",text:"",x:"right",y:"top"}}},methods:{showCategory:function(t){Object.assign(this.category,t),this.showModal=!0},closeShowModal:function(){this.showModal=!1},openModalDelete:function(t){this.deleteModal=!0,this.CategoryId=t},loadCategories:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s["a"].getAllCategories();case 3:a=e.sent,t.categories=a.data.categories,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),t.showSessionExpiredModal(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},deleteCategory:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s["a"].deleteCategory(t.CategoryId);case 3:e.sent,t.deleteModal=!1,t.loadCategories(),t.alert.color="success",t.alert.text="ÉXITO : Se eliminó correctamente",t.alert.state=!0,e.next=17;break;case 11:e.prev=11,e.t0=e["catch"](0),t.showSessionExpiredModal(e.t0),t.alert.color="error",t.alert.text="ERROR : No se pudo eliminar",t.alert.state=!0;case 17:case"end":return e.stop()}}),e,null,[[0,11]])})))()}},mounted:function(){this.loadCategories()}},O=V,S=a("62ad"),R=a("a523"),I=a("8fea"),A=a("169a"),j=a("0fd9"),E=a("8654"),T=a("71d9"),D=a("3a2f"),L=Object(v["a"])(O,o,r,!1,null,null,null);e["default"]=L.exports;p()(L,{VBtn:b["a"],VCard:f["a"],VCardText:g["b"],VCardTitle:g["c"],VCol:S["a"],VContainer:R["a"],VDataTable:I["a"],VDialog:A["a"],VIcon:h["a"],VRow:j["a"],VSpacer:y["a"],VTextField:E["a"],VToolbar:T["a"],VTooltip:D["a"]})},"60e7":function(t,e,a){"use strict";a("b0c0");var o=a("d4ec"),r=function t(e){Object(o["a"])(this,t),this.name=e};e["a"]=r}}]);
//# sourceMappingURL=chunk-20fdaafa.da6ce3f5.js.map