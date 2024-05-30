(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[913],{205:function(e,t,s){Promise.resolve().then(s.bind(s,717))},717:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return b}});var r=s(3827),l=s(5994),n=s(4090),a=s(4907),o=s(7535);function i(e){let[t,s]=(0,n.useState)("overview"),l=(t,s,r,l)=>{console.log(t);let n=document.getElementById(t);if(!n)return;let a=document.getElementsByClassName("button");for(let e=0;e<a.length;e++)a[e].classList.remove("font-semibold");n.classList.add("font-semibold"),null==e||e.budget(s),null==e||e.invite(r),null==e||e.settings(l),i()},i=()=>{var e,t,s,r;null===(e=document.getElementById("slideover-container"))||void 0===e||e.classList.toggle("invisible"),null===(t=document.getElementById("slideover-bg"))||void 0===t||t.classList.toggle("opacity-0"),null===(s=document.getElementById("slideover-bg"))||void 0===s||s.classList.toggle("opacity-50"),null===(r=document.getElementById("slideover"))||void 0===r||r.classList.toggle("translate-x-full")};return(0,r.jsxs)("div",{className:"float-right top-0 right-0",children:[(0,r.jsx)(a.G,{icon:o.xiG,onClick:i,className:"cursor-pointer ml-auto mr-4 my-4 text-3xl hover:text-ocean hover:bg-white p-2 rounded-lg"}),(0,r.jsxs)("div",{id:"slideover-container",className:"w-full h-full fixed inset-0 invisible",children:[(0,r.jsx)("div",{id:"slideover-bg",className:"w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 opacity-0"}),(0,r.jsxs)("div",{id:"slideover",className:"bg-white h-full absolute right-0 duration-300 ease-out transition-all translate-x-full p-4",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center text-black mb-4",children:[(0,r.jsx)("p",{className:"text-4xl font-extrabold mr-4 text-sky-500",children:"BB"}),(0,r.jsx)(a.G,{onClick:i,icon:o.EOp,className:"text-2xl ml-auto cursor-pointer hover:border-black border-2 border-transparent rounded p-1"})]}),(0,r.jsxs)("div",{className:"text-black h-full w-full flex flex-col items-between pr-2",children:[(0,r.jsxs)("div",{className:"flex items-center justify-start hover:text-sky-600",children:[(0,r.jsx)(a.G,{icon:o.FVb,className:"mr-2 text-2xl"}),(0,r.jsx)("button",{id:"budgets",className:"button text-left text-xl mr-4 my-4 hover:text-sky-600",onClick:e=>{l(e.currentTarget.id,!0,!1,!1)},children:"Organizations"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-start hover:text-sky-500",children:[(0,r.jsx)(a.G,{icon:o.b7W,className:"mr-2 text-2xl"}),(0,r.jsx)("button",{id:"settings",className:"button text-left text-xl mr-4 my-4",onClick:e=>{l(e.currentTarget.id,!1,!1,!0)},children:"Settings"})]})]})]})]})]})}var c=s(7907),d=s(4870);function u(){let[e,t]=(0,n.useState)(!1),[s,l]=(0,n.useState)({isActive:!1,OrgID:0}),i=e=>{l(t=>({...t,isActive:!t.isActive,OrgID:e}))},u=()=>{l({isActive:!s.isActive,OrgID:0})},[m,x]=(0,n.useState)({isActive:!1,OrgID:0}),h=e=>{x(t=>({...t,isActive:!t.isActive,OrgID:e}))},b=()=>{x({isActive:!m.isActive,OrgID:0})},f=(0,d.Eu)(),g=(0,c.useRouter)(),[p,j]=(0,n.useState)(""),[v,w]=(0,n.useState)([]),N=e=>2==e?"Owner":1==e?"Admin":"Member",y=async()=>{let e=await fetch("http://localhost:3000/user/"+f.user.uid+"?token=atoken"),t=await e.json();w(await Promise.all(t.data.orgs.map(async e=>{let t=await fetch("http://localhost:3000/org/"+e+"?token=atoken"),s=await t.json(),r=await fetch("http://localhost:3000/org/".concat(e,"/user/").concat(f.user.uid)),l=await r.json();return{oid:e,orgname:s.data.orgname,access:l.data.admin}})))},k=async e=>{console.log("Inside delete Org"),await fetch("http://localhost:3000/org/".concat(e,"/?token=").concat(f.user.accessToken),{method:"DELETE"}),b(),y()},E=async e=>{console.log("Inside Leave Org"),await fetch("http://localhost:3000/org/".concat(e,"/user/").concat(f.user.uid,"?token=").concat(f.user.accessToken),{method:"DELETE"}),u(),y()},C=async e=>{e.preventDefault(),console.log("We got a submission"),await fetch("http://localhost:3000/org?token=".concat(f.user.accessToken),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orgname:e.currentTarget.elements[0].value,uid:f.user.uid})}),t(!1),y(),j("")};return(0,n.useEffect)(()=>{(async()=>{let e=await fetch("http://localhost:3000/user/"+f.user.uid+"?token=atoken"),t=await e.json();w(await Promise.all(t.data.orgs.map(async e=>{let t=await fetch("http://localhost:3000/org/"+e+"?token=atoken"),s=await t.json(),r=await fetch("http://localhost:3000/org/".concat(e,"/user/").concat(f.user.uid)),l=await r.json();return{oid:e,orgname:s.data.orgname,access:l.data.admin}})))})()},[f.user.uid]),(0,r.jsxs)("div",{className:"rounded-2xl w-11/12 sm:w-5/6 m-auto mt-10 border",children:[(0,r.jsxs)("div",{className:"flex flex-col md:flex-row justify-between mx-10 items-center",children:[(0,r.jsx)("div",{className:"flex text-2xl sm:text-4xl font-bold my-5",children:"Organizations"}),(0,r.jsx)("p",{onClick:()=>t(!0),className:"flex justify-center rounded-lg border-2 w-full md:w-fit border-green-500 p-2 hover:bg-green-500 cursor-pointer mb-1",children:"Create Organization"})]}),(0,r.jsx)("div",{className:"m-10 mt-0 border-t pt-3 pl-1",children:v.map((e,t)=>(0,r.jsxs)("div",{className:"flex flex-col sm:flex-row justify-start sm:justify-between items-start mb-1",children:[(0,r.jsx)("p",{onClick:()=>g.push("/organization/".concat(e.oid)),className:"flex cursor-pointer text-lg font-semibold hover:underline text-left",children:e.orgname}),(0,r.jsxs)("div",{className:"flex justify-between items-center w-full sm:w-1/2",children:[(0,r.jsx)("p",{className:"text-left italic",children:N(e.access)}),2==e.access&&(0,r.jsxs)("div",{onClick:()=>h(e.oid),className:"flex justify-between round border-2 border-red-500 rounded-lg text-center cursor-pointer hover:bg-red-500 p-1",children:[(0,r.jsx)("p",{className:"hidden sm:flex justify-center",children:"Delete?"}),(0,r.jsx)(a.G,{icon:o.$aW,className:"sm:hidden"})]}),2!=e.access&&(0,r.jsxs)("div",{onClick:()=>i(e.oid),className:"flex justify-between round border-2 border-red-500 rounded-lg text-center cursor-pointer hover:bg-red-500 p-1",children:[(0,r.jsx)("p",{className:"hidden sm:flex justify-center",children:"Leave?"}),(0,r.jsx)(a.G,{icon:o.mXR,className:"sm:hidden"})]})]})]},t))}),e&&(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold",children:"Create Organization"}),(0,r.jsx)(a.G,{icon:o.EOp,onClick:()=>t(!1),className:"text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1"})]}),(0,r.jsxs)("form",{onSubmit:C,className:"flex flex-col ",children:[(0,r.jsx)("label",{className:"mb-2",children:"Organization name:"}),(0,r.jsx)("input",{className:"border rounded-md p-2 mb-4 text-black",type:"text",id:"name",name:"name",value:p,onChange:e=>j(e.target.value),placeholder:"Organization Name"}),(0,r.jsx)("button",{className:"bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700",type:"submit",style:{backgroundColor:"#3b82f6"},onClick:()=>{},children:"Create"})]})]})}),s.isActive&&(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold",children:"Are you sure you want to leave this organization?"}),(0,r.jsx)(a.G,{icon:o.EOp,className:"text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1",onClick:u})]}),(0,r.jsxs)("div",{className:"flex w-full justify-between",children:[(0,r.jsx)("button",{className:"flex items-center w-1/2 bg-gray-600 text-white font-bold mr-2 py-2 px-4 rounded hover:bg-gray-700",type:"submit",onClick:u,children:"No, don't leave"}),(0,r.jsxs)("button",{className:"flex items-center w-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700",type:"submit",onClick:()=>{E(s.OrgID)},children:[(0,r.jsx)("p",{children:"Yes, leave"}),(0,r.jsx)(a.G,{icon:o.x21,className:"text-2xl scale-y-1 ml-auto cursor-pointer p-1"})]})]})]})}),m.isActive&&(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold",children:"Are you sure you want to DELETE this organization?"}),(0,r.jsx)(a.G,{icon:o.EOp,className:"text-2xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded p-1",onClick:b})]}),(0,r.jsxs)("div",{className:"flex w-full justify-between",children:[(0,r.jsx)("button",{className:"flex items-center w-1/2 bg-gray-600 text-white font-bold mr-2 py-2 px-4 rounded hover:bg-gray-700",type:"submit",onClick:b,children:"No, don't delete"}),(0,r.jsxs)("button",{className:"flex items-center w-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700",type:"submit",onClick:()=>{k(m.OrgID)},children:[(0,r.jsx)("p",{children:"Yes, delete"}),(0,r.jsx)(a.G,{icon:o.$aW,className:"text-2xl scale-y-1 ml-auto cursor-pointer p-1"})]})]})]})})]})}function m(e){return(0,n.useEffect)(()=>{localStorage.setItem("fontRatio",e.font.toString()),document.documentElement.style.fontSize="".concat(localStorage.getItem("fontRatio"),"px")},[e.font]),(0,r.jsxs)("div",{className:"rounded-2xl w-11/12 sm:w-5/6 m-auto mt-10 border p-8",children:[(0,r.jsx)("div",{className:"text-4xl font-bold",children:"Settings"}),(0,r.jsx)("h2",{className:"text-4 font-bold",children:"Feedback:"}),(0,r.jsxs)("ul",{className:"border-t",children:[(0,r.jsxs)("li",{className:"grid grid-cols-12 mt-1",children:[(0,r.jsx)("p",{className:"col-span-8",children:"Email: bbsupport@gmail.com"}),(0,r.jsx)("a",{target:"_blank",href:"mailto:bbsupport@gmail.com",className:"col-span-4 border border-r-stone-50 rounded text-center hover:bg-slate-100 hover:text-black",children:"Send email"})]}),(0,r.jsxs)("li",{className:"grid grid-cols-12 mt-1",children:[(0,r.jsx)("p",{className:"col-span-8",children:"Email: bbbugs@gmail.com"}),(0,r.jsx)("a",{target:"_blank",href:"mailto:bbbugs@gmail.com",className:"col-span-4 border border-r-stone-50 rounded text-center hover:bg-slate-100 hover:text-black",children:"Report security issue"})]})]})]})}var x={src:"/_next/static/media/undraw_small_town_re_7mcn.af45be2c.svg"},h=s(703);function b(){let{user:e}=(0,d.Eu)(),t=(0,c.useRouter)();(0,n.useEffect)(()=>{e||t.push("/"),console.log(e)},[t,e]);let[s,a]=(0,n.useState)(!1),[o,b]=(0,n.useState)(!1),[f,g]=(0,n.useState)(!1),[p,j]=(0,n.useState)(()=>{let e=localStorage.getItem("fontSize");return e?parseInt(e,10):16});return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.Z,{showProfile:!0}),(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsx)(i,{budget:a,invite:b,settings:g}),(0,r.jsxs)("div",{className:"flex flex-wrap justify-evenly w-11/12 sm:w-5/6 h-[calc(100vh-56px)] mx-auto",children:[!s&&!o&&!f&&(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,r.jsx)(h.default,{src:x.src,height:500,width:500,alt:"Waiting Image"}),(0,r.jsx)("div",{children:"Nothing selected"})]}),s&&(0,r.jsx)(u,{}),f&&(0,r.jsx)(m,{font:p,fontSet:j})]})]})]})}},5994:function(e,t,s){"use strict";s.d(t,{Z:function(){return m}});var r=s(3827),l=s(4090),n=s(8792),a=s(3819),o=s(7907),i=s(4907),c=s(7535),d=s(4870);let u={showProfile:!1,isProfilePage:!1};function m(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{...u},[t,s]=(0,l.useState)(!1),[m,x]=(0,l.useState)([]),{user:h}=(0,d.Eu)(),b=(0,o.useRouter)(),f=async()=>{console.log("hellooo i am coming to log out now");let{result:e,error:t}=await (0,a.Z)();console.log("response: ",e),console.log("error: ",t),b.push("/")};return(0,r.jsxs)("nav",{className:"flex border-b-4 border-b-white py-2 items-center",children:[(0,r.jsx)(n.default,{href:"../welcome",className:"items-center flex flex-1 ml-4",children:(0,r.jsx)("p",{className:"text-4xl font-extrabold",children:"Budget Buddy"})}),e.showProfile&&!e.isProfilePage&&(0,r.jsxs)("div",{className:"flex items-center justify-end flex-1",children:[(0,r.jsx)(i.G,{icon:c.wK3,onClick:()=>{s(!0)},className:"mr-4 text-2xl cursor-pointer rounded-lg hover:bg-white hover:text-black p-1"}),(0,r.jsxs)(n.default,{href:"../profile",className:"text-white font-medium rounded-2xl px-3 mr-4 float-right border-white border-2 hover:cursor-pointer hover:bg-white hover:text-sky-900 ",children:[(0,r.jsx)(i.G,{icon:c.ILF,className:"sm:hidden"}),(0,r.jsx)("p",{className:"hidden sm:block",children:"Profile"})]})]}),e.isProfilePage&&(0,r.jsxs)("button",{onClick:f,className:"text-white font-medium rounded-2xl px-3 mr-4 float-right border-white border-2 hover:cursor-pointer hover:bg-white hover:text-sky-900 ",children:[(0,r.jsx)(i.G,{icon:c.HEx,className:"sm:hidden"}),(0,r.jsx)("p",{className:"hidden sm:block",children:"Logout?"})]}),t&&(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"outline bg-black/20 p-6 rounded-xl w-11/12 sm:w-3/5 md:w-1/2",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsx)("h2",{className:"text-3xl font-bold",children:"Messages"}),(0,r.jsx)(i.G,{icon:c.EOp,onClick:()=>s(!1),className:"text-xl ml-auto cursor-pointer hover:border-white border-2 border-transparent rounded px-1"})]}),(0,r.jsx)("hr",{className:"mb-4"}),m.map((e,t)=>(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsx)("p",{className:"text-2xl font-semibold",children:e.title}),(0,r.jsx)("p",{className:"italic",children:new Date(e.time).toLocaleString()})]}),(0,r.jsx)("p",{className:"py-1 px-2 border rounded-md bg-black/70 mb-2",children:e.text}),e.link&&(0,r.jsxs)("div",{className:"flex w-full justify-between gap-2",children:[(0,r.jsxs)("div",{className:"flex gap-2 items-center w-1/2 bg-green-500 font-bold py-2 px-4 rounded hover:bg-green-700 cursor-pointer",children:[(0,r.jsx)(i.G,{icon:c.LEp,className:"text-2xl scale-y-1 cursor-pointer"}),(0,r.jsx)("p",{children:"Accept"})]}),(0,r.jsxs)("div",{className:"flex gap-2 items-center w-1/2 bg-red-600  font-bold py-2 px-4 rounded hover:bg-red-800 cursor-pointer",children:[(0,r.jsx)(i.G,{icon:c.EOp,className:"text-2xl scale-y-1 cursor-pointer"}),(0,r.jsx)("p",{children:"Reject"})]})]})]},t))]})})]})}},4870:function(e,t,s){"use strict";s.d(t,{Eu:function(){return c},HD:function(){return d}});var r=s(3827),l=s(4090),n=s(2730),a=s(9557);let o=(0,n.v0)(a.Z),i=l.createContext({}),c=()=>l.useContext(i),d=e=>{let{children:t}=e,[s,a]=l.useState(null),[c,d]=l.useState(!0);return l.useEffect(()=>{let e=(0,n.Aj)(o,e=>{e?a(e):a(null),d(!1)});return()=>e()},[]),(0,r.jsx)(i.Provider,{value:{user:s},children:c?(0,r.jsx)("div",{children:"Loading..."}):t})}},3819:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});var r=s(9557),l=s(2730);let n=(0,l.v0)(r.Z);async function a(){let e=null;return(0,l.w7)(n).then(()=>{e="yippe"}).catch(t=>{e="error happened."}),{result:e,error:null}}},9557:function(e,t,s){"use strict";var r=s(6142);let l=0===(0,r.C6)().length?(0,r.ZF)({apiKey:"AIzaSyC-Sn8RuFy4Tpq8T43s-0EwH6wmbAsuNIc",authDomain:"josh-b240a.firebaseapp.com",projectId:"josh-b240a",storageBucket:"josh-b240a.appspot.com",messagingSenderId:"1030936495421",appId:"1:1030936495421:web:734c0da55458cbfb463154"}):(0,r.C6)()[0];t.Z=l}},function(e){e.O(0,[54,676,498,250,640,971,69,744],function(){return e(e.s=205)}),_N_E=e.O()}]);