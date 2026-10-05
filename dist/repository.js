// Replace these read-only queries with an API adapter when connecting a database.
let cache;
async function data(){if(!cache){const response=await fetch('data.json?v=eworld2');if(!response.ok)throw new Error('콘텐츠를 불러오지 못했어요.');cache=await response.json();}return cache;}
export async function getProfile(){return (await data()).profile;}
export async function getProjects(category){return (await data()).projects.filter(p=>p.is_published&&p.category===category).sort((a,b)=>a.sort_order-b.sort_order);}
export async function getProject(slug){return (await data()).projects.find(p=>p.is_published&&p.slug===slug);}
export async function getImages(id){return (await data()).project_images.filter(i=>i.project_id===id).sort((a,b)=>a.sort_order-b.sort_order);}
