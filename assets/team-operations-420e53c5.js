import{k as u,r as W,T as j,u as d,g as m,l as h,m as l}from"./index-505097af.js";import{u as k,t as p}from"./check-authentication-actions-95d49ff2.js";const H=({token:s,leagueId:r})=>u.get(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/${r}`,{headers:{Authorization:`Bearer ${s}`}}).then(e=>e.data).then(e=>e.data).then(e=>e.teams),J=({token:s,leagueId:r,teamId:e})=>u.get(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/teams/${r}?tid=${e}`,{headers:{Authorization:`Bearer ${s}`}}).then(t=>t.data).then(t=>t.data),L=({token:s,leagueId:r,body:e})=>u.post(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/teams/${r}`,e,{headers:{Authorization:`Bearer ${s}`}}).then(t=>t.data),R=({token:s,leagueId:r,teamId:e,body:t})=>u.patch(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/teams/${r}?tid=${e}`,t,{headers:{Authorization:`Bearer ${s}`}}).then(a=>a.data),U=({token:s,leagueId:r,teamId:e})=>u.delete(`https://d1g1t4l1z4d0s.onrender.com/api/leagues/teams/${r}?tid=${e}`,{headers:{Authorization:`Bearer ${s}`}}).then(t=>t.data),V=()=>{const s=W.useContext(j);if(!s)throw new Error("useTeamContext must be used inside an TeamContextProvider");return s},Z=s=>{const{state:{token:r},dispatch:e}=d(),{setStatus:t}=m(),a=h();return k({queryKey:["league-compare",s],queryFn:()=>H({token:r,leagueId:s}),enabled:!!s,onError:o=>{var n;const c=(n=o.response)==null?void 0:n.data;(c.error==="Token expired"||c.error==="Token error")&&p({navigate:a,dispatch:e}),t({activeMessage:!0,message:c.error,kind:"error"})}})},_=({leagueId:s,teamId:r})=>{const{reset:e}=V(),{state:{token:t},dispatch:a}=d(),{setStatus:o}=m(),c=h();return k({queryKey:["team",r],queryFn:()=>J({token:t,leagueId:s,teamId:r}),enabled:!!r,onSuccess:({teamId:n,name:i,manager:g,logo:T,stats:{scoredGoals:x,goalsAgainst:v,goalBalance:f,matches:$,wins:B,draws:z,losses:S,pointsAverage:M,yellowCards:E,redCards:F,reliablePerformance:{goalkeeper:{name:y,caughtBalls:C,concededGoals:b,cleanSheets:A},lowBlock:{name:w,behavior:P,tackles:q},midBlock:{name:G,assists:K,completedPasses:D},highBlock:{name:N,scoredGoals:O,shotsOnTarget:Q}}}})=>{e({teamId:n,name:i,manager:g,logo:T,stats:{scoredGoals:x,goalsAgainst:v,goalBalance:f,matches:$,wins:B,draws:z,losses:S,pointsAverage:M,yellowCards:E,redCards:F,reliablePerformance:{goalkeeper:{name:y,caughtBalls:C,cleanSheets:A,concededGoals:b},lowBlock:{name:w,behavior:P,tackles:q},midBlock:{name:G,assists:K,completedPasses:D},highBlock:{name:N,scoredGoals:O,shotsOnTarget:Q}}}})},refetchOnWindowFocus:!1,onError:n=>{var g;const i=(g=n.response)==null?void 0:g.data;(i.error==="Token expired"||i.error==="Token error")&&p({navigate:c,dispatch:a}),o({activeMessage:!0,message:i.error,kind:"error"})}})},I=()=>{const{dispatch:s}=d(),{setStatus:r}=m(),e=h();return l({mutationFn:L,onSuccess:({data:t})=>{e(-1),r({activeMessage:!0,message:t,kind:"success"})},onError:t=>{var o;const a=(o=t.response)==null?void 0:o.data;(a.error==="Token expired"||a.error==="Token error")&&p({navigate:e,dispatch:s}),r({activeMessage:!0,message:a.error,kind:"error"})}})},ee=()=>{const{dispatch:s}=d(),{setStatus:r}=m(),e=h();return l({mutationFn:R,onSuccess:({data:t})=>{e(-1),r({activeMessage:!0,message:t,kind:"success"})},onError:t=>{var o;const a=(o=t.response)==null?void 0:o.data;(a.error==="Token expired"||a.error==="Token error")&&p({navigate:e,dispatch:s}),r({activeMessage:!0,message:a.error,kind:"error"})}})},te=()=>{const{dispatch:s}=d(),{setStatus:r}=m(),e=h();return l({mutationFn:U,onSuccess:({data:t})=>{r({activeMessage:!0,message:t,kind:"success"})},onError:t=>{var o;const a=(o=t.response)==null?void 0:o.data;(a.error==="Token expired"||a.error==="Token error")&&p({navigate:e,dispatch:s}),r({activeMessage:!0,message:a.error,kind:"error"})}})};export{Z as a,te as b,V as c,ee as d,I as e,_ as u};