(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{42:function(n,e,t){"use strict";t.r(e);var o=t(3),r=t(2),c=t(17),a=t.n(c),i=t(0),u=function(n){var e=n.filter,t=n.onChange;return Object(i.jsxs)("div",{children:[" filter shown with: ",Object(i.jsx)("input",{value:e,onChange:t})," "]})},l=function(n){var e=n.info;return Object(i.jsxs)(i.Fragment,{children:[e.name," | tel: ",e.number]})},s=t(4),d=t.n(s),f="http://localhost:3001/api/persons",b=function(){return d.a.get(f).then((function(n){return n.data}))},j=function(n){return d.a.post(f,n).then((function(n){return n.data}))},h=function(n,e){return d.a.put("".concat(f,"/").concat(n),e).then((function(n){return n.data}))},m=function(n){return d.a.delete("".concat(f,"/").concat(n)).then((function(n){return n}))},p=function(n){var e=n.persons,t=n.filter,o=n.handler,r=n.notificationHandler;return Object(i.jsx)("ul",{children:e.filter((function(n){return n.name.toLowerCase().includes(t.toLowerCase())})).map((function(n){return Object(i.jsxs)("li",{children:[Object(i.jsx)(l,{info:n})," ",Object(i.jsx)("button",{onClick:function(){return e=n.id,t=n.name,void(window.confirm("Do you want to delete ".concat(t," ?"))&&m(e).then((function(n){console.log(n),r({content:"".concat(t," deleted"),color:"green"})})).catch((function(n){console.log("deletion error",n),r({content:"Couldn't delete ".concat(t,", resource already deleted, taking it off the list"),color:"red"})})).finally(o(e)));var e,t},children:"delete"})]},n.id)}))})},O=t(5),g=t(8),v=t(18),x=function(n){var e=n.persons,t=n.personHandler,c=n.notificationHandler,a=Object(r.useState)({name:"",number:0}),u=Object(o.a)(a,2),l=u[0],s=u[1],d=function(n,e){s(Object(g.a)(Object(g.a)({},l),{},Object(O.a)({},n,e.target.value)))};return Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:l.name,onChange:function(n){return d("name",n)}})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:l.number||"",onChange:function(n){return d("number",n)}})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",onClick:function(n){return function(n,o){if(n.preventDefault(),!l.name||!l.number)return alert("there are fields left blank");var r,a=Object(v.a)(e);try{var i=function(){var n=r.value;if((n.name===l.name||n.number===l.number)&&window.confirm("".concat(n.name," already contains the info you are trying to add, update contact?")))return h(n.id,o).then((function(o){console.log("data",o),t(e.map((function(e){return e.id===n.id?o:e}))),s({name:"",number:0}),c({content:"".concat(n.name," updated"),color:"green"})})).catch((function(e){console.log(e),c({content:"There was a problem updating ".concat(n.name),color:"red"})})),{v:null}};for(a.s();!(r=a.n()).done;){var u=i();if("object"===typeof u)return u.v}}catch(d){a.e(d)}finally{a.f()}j(l).then((function(n){console.log("data",n),t(e.concat(n)),s({name:"",number:0}),c({content:"".concat(l.name," created successfully"),color:"green"})})).catch((function(n){console.log("create error",n),c({content:"There was a problem creating ".concat(l.name," contact"),color:"red"})}))}(n,l)},children:"add"})})]})},w=function(n){var e=n.content,t=n.color,o={color:t,border:"20px solid",fontSize:"x-large",borderWidth:"thick",backgroundColor:"transparent"===t?t:"antiquewhite",borderColor:t,padding:"5px"};return Object(i.jsx)("div",{style:o,children:e})},y=function(){var n=Object(r.useState)([]),e=Object(o.a)(n,2),t=e[0],c=e[1],a=Object(r.useState)(""),l=Object(o.a)(a,2),s=l[0],d=l[1],f=Object(r.useState)({content:"",color:"transparent"}),j=Object(o.a)(f,2),h=j[0],m=j[1],O=function(n){m(n),setTimeout((function(){m({content:"",color:"transparent"})}),5e3)};return Object(r.useEffect)((function(){b().then((function(n){console.log("getAll",n),c(n)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)(w,{color:h.color,content:h.content}),Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(u,{filter:s,onChange:function(n){return d(n.target.value)}}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(x,{persons:t,personHandler:function(n){return c(n)},notificationHandler:O}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(p,{persons:t,filter:s,handler:function(n){return c(t.filter((function(e){return e.id!==n})))},notificationHandler:O})]})};a.a.render(Object(i.jsx)(y,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.39fad7ba.chunk.js.map