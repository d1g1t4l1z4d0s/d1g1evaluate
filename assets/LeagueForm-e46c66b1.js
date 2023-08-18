import{u as h,r as p,n as f,j as n,a as e,M as a}from"./index-c055e0ee.js";import{e as x}from"./league-operations-f51f2236.js";function C({leagueId:s,teams:r,mode:i,mutate:c}){const{formState:{errors:t},reset:l,handleSubmit:m,register:u}=x(),{state:{token:d}}=h();p.useEffect(()=>{if(i==="post")return l(f)},[i,l]);const g=o=>{c({token:d,leagueId:s,body:o})};return n("form",{onSubmit:o=>void m(g)(o),className:"league-form",children:[n("div",{className:"form-group",children:[e("label",{htmlFor:"league-name",children:"Name"}),e("input",{type:"text",...u("name",{required:!0}),id:"league-name"}),t.name&&e(a,{text:t.name.message,kind:"error"})]}),n("div",{className:"form-group",children:[e("label",{htmlFor:"league-logo",children:"Logo"}),e("input",{type:"text",...u("logo",{required:!0}),id:"league-logo"}),t.logo&&e(a,{text:t.logo.message,kind:"error"})]}),n("div",{className:"form-group",children:[e("label",{htmlFor:"league-crr-champ",children:"Current champion"}),n("select",{...u("currentChampion",{required:!0}),id:"league-crr-champ",children:[((r==null?void 0:r.length)===0||!r)&&e("option",{value:"Insert teams",defaultChecked:!0,children:"Insert teams"}),r==null?void 0:r.map(o=>e("option",{value:o.name,children:o.name},o.teamId))]}),t.currentChampion&&e(a,{text:t.currentChampion.message,kind:"error"})]}),Object.keys(t).length>0?e(a,{text:"Check point error to continue",kind:"warning"}):e("input",{type:"submit",className:"button",value:"Send"})]})}export{C as L};