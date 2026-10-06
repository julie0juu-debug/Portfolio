export function mountImageViewer(root){
const dialog=document.createElement('dialog');dialog.className='image-viewer';dialog.setAttribute('aria-label','작업 이미지 확대 보기');
dialog.innerHTML='<div class="iv-toolbar"><span class="iv-counter" aria-live="polite"></span><div><button type="button" data-iv="zoom">원본 크기</button><button type="button" data-iv="close" aria-label="확대 보기 닫기">닫기 ×</button></div></div><div class="iv-canvas"><img class="iv-image" alt=""></div><div class="iv-bottom"><button type="button" data-iv="prev" aria-label="이전 이미지">← 이전</button><span class="iv-caption"></span><button type="button" data-iv="next" aria-label="다음 이미지">다음 →</button></div>';
document.body.append(dialog);
const image=dialog.querySelector('.iv-image'),canvas=dialog.querySelector('.iv-canvas'),counter=dialog.querySelector('.iv-counter'),caption=dialog.querySelector('.iv-caption'),zoomButton=dialog.querySelector('[data-iv="zoom"]');
let items=[],index=0,zoomed=false,origin=null,oldOverflow='';
const close=()=>{if(dialog.open)dialog.close();};
const setZoom=value=>{zoomed=value;canvas.classList.toggle('iv-zoomed',value);image.style.width=value&&image.naturalWidth?image.naturalWidth+'px':'';zoomButton.textContent=value?'화면에 맞추기':'원본 크기';zoomButton.setAttribute('aria-pressed',String(value));canvas.scrollTop=canvas.scrollLeft=0;};
const show=()=>{setZoom(false);const item=items[index];image.alt=item.dataset.ivAlt||item.alt;image.src=item.currentSrc||item.src;counter.textContent=(index+1)+' / '+items.length;caption.textContent=image.alt;dialog.querySelector('[data-iv="prev"]').disabled=index===0;dialog.querySelector('[data-iv="next"]').disabled=index===items.length-1;};
const move=step=>{const next=index+step;if(next>=0&&next<items.length){index=next;show();}};
const open=item=>{items=[...root.querySelectorAll('img[data-iv-ready]')];index=items.indexOf(item);if(index<0)return;origin=item;oldOverflow=document.body.style.overflow;show();dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('[data-iv="close"]').focus();};
image.addEventListener('load',()=>{if(zoomed)setZoom(true);});
image.addEventListener('error',()=>{caption.textContent='이미지를 불러오지 못했어요. 닫고 다시 시도해 주세요.';});
dialog.addEventListener('click',e=>{const action=e.target.closest('[data-iv]')?.dataset.iv;if(action==='close')close();else if(action==='zoom')setZoom(!zoomed);else if(action==='prev')move(-1);else if(action==='next')move(1);else if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();move(e.key==='ArrowLeft'?-1:1);}else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}});
dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;setZoom(false);image.removeAttribute('src');if(origin?.isConnected)origin.focus({preventScroll:true});items=[];});
root.addEventListener('click',e=>{const item=e.target.closest('img[data-iv-ready]');if(item)open(item);});
root.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('img[data-iv-ready]')){e.preventDefault();open(e.target);}});
const prepare=()=>{root.querySelectorAll('img:not([data-iv-ready])').forEach(item=>{if(item.closest('a'))return;item.dataset.ivReady='true';item.dataset.ivAlt=item.alt;item.tabIndex=0;item.setAttribute('role','button');item.setAttribute('aria-label',item.alt+' — 이미지 확대 보기');item.title='클릭하면 크게 볼 수 있어요';});if(root.querySelector('img[data-iv-ready]')&&!root.querySelector('.iv-hint')){const hint=document.createElement('p');hint.className='iv-hint';hint.textContent='이미지를 클릭하면 크게 볼 수 있어요 · 확대 보기에서 원본 크기로 전환할 수 있습니다.';const first=root.querySelector('img[data-iv-ready]');const heroCopy=first.closest('.bn-hero')?.querySelector('.bn-hero-copy');if(heroCopy){heroCopy.append(hint);}else{const section=first.closest('figure,section')||first;section.before(hint);}}};
new MutationObserver(prepare).observe(root,{childList:true,subtree:true});prepare();
return {close,isOpen:()=>dialog.open};
}
