import{l as c,r as l,p as x,h as i,u as d,m as g,n as m}from"./index-d0b13413.js";import{u as k,t as p}from"./check-authentication-actions-36eaf182.js";const v=r=>c.get("https://d1g1t4l1z4d0s.onrender.com/api/leagues",{headers:{Authorization:`Bearer ${r}`}}).then(e=>e.data).then(e=>e.data),L=({token:r,leagueId:e})=>c.get(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/${e}`,{headers:{Authorization:`Bearer ${r}`}}).then(t=>t.data).then(t=>t.data),f=({token:r,body:e})=>c.post("https://d1g1t4l1z4d0s.onrender.com/api/leagues",e,{headers:{Authorization:`Bearer ${r}`}}).then(t=>t.data),z=({token:r,leagueId:e,body:t})=>c.patch(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/${e}`,t,{headers:{Authorization:`Bearer ${r}`}}).then(s=>s.data),S=({token:r,leagueId:e})=>c.delete(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/${e}`,{headers:{Authorization:`Bearer ${r}`}}).then(t=>t.data),T=()=>{const r=l.useContext(x);if(!r)throw new Error("useLeagueContext must be used inside an LeagueContextProvider");return r},M=()=>{const{setStatus:r}=i(),{state:{token:e},dispatch:t}=d(),s=g();return k({queryKey:"leagues",queryFn:()=>v(e),refetchOnWindowFocus:!1,onError:a=>{var n;const o=(n=a.response)==null?void 0:n.data;(o.error==="Token expired"||o.error==="Token error")&&p({navigate:s,dispatch:t}),r({activeMessage:!0,message:o.error,kind:"error"})}})},$=r=>{const{reset:e}=T(),{state:{token:t},dispatch:s}=d(),{setStatus:a}=i(),o=g();return k({queryKey:["league-administration",r],queryFn:()=>L({token:t,leagueId:r}),onSuccess:({name:n,logo:u,currentChampion:h})=>{e({name:n,logo:u,currentChampion:h})},onError:n=>{var h;const u=(h=n.response)==null?void 0:h.data;(u.error==="Token expired"||u.error==="Token error")&&p({navigate:o,dispatch:s}),a({activeMessage:!0,message:u.error,kind:"error"})}})},F=()=>{const{dispatch:r}=d(),{setStatus:e}=i(),t=g();return m({mutationFn:f,onSuccess:({data:s})=>{e({activeMessage:!0,message:s,kind:"success"})},onError:(s,{body:{name:a}})=>{var n;const o=(n=s.response)==null?void 0:n.data;(o.error==="Token expired"||o.error==="Token error")&&p({navigate:t,dispatch:r}),o.error.includes("E11000")&&(o.error=`${a} already exists`),e({activeMessage:!0,message:o.error,kind:"error"})}})},C=()=>{const{dispatch:r}=d(),{setStatus:e}=i(),t=g();return m({mutationFn:z,onSuccess:({data:s})=>{e({activeMessage:!0,message:s,kind:"success"})},onError:s=>{var o;const a=(o=s.response)==null?void 0:o.data;(a.error==="Token expired"||a.error==="Token error")&&p({navigate:t,dispatch:r}),e({activeMessage:!0,message:a.error,kind:"error"})}})},A=()=>{const{dispatch:r}=d(),{setStatus:e}=i(),t=g();return m({mutationFn:S,onSuccess:({data:s})=>{e({activeMessage:!0,message:s,kind:"success"})},onError:s=>{var o;const a=(o=s.response)==null?void 0:o.data;(a.error==="Token expired"||a.error==="Token error")&&p({navigate:t,dispatch:r}),e({activeMessage:!0,message:a.error,kind:"error"})}})};export{A as a,$ as b,C as c,F as d,T as e,M as u};
