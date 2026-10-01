# gyuyeon interactive portfolio

로컬 JSON 데이터로 작동하는 반응형 포트폴리오입니다. 서버에서 `dist` 폴더를 정적 제공하면 됩니다. `file://`에서 직접 열면 JSON 조회가 제한될 수 있으므로 HTTP 서버를 사용하세요.

## 콘텐츠 수정

- `dist/data.json`의 profile, projects, project_images에서 콘텐츠를 수정합니다.
- 초기 프로젝트는 모두 SAMPLE입니다. 실제 작업 이미지, 설명, 기간, 역할, 연도로 교체하세요.
- profile의 소개, skills, tools도 임시 예시입니다.
- 이미지를 `dist`에 넣고 해당 이미지 경로를 JSON에 지정하세요.
- `is_published: false`인 프로젝트는 표시하지 않습니다.
- 프로젝트는 `#/project/slug` 주소로 직접 접근할 수 있습니다. 해시 라우팅이라 정적 서버에서 새로고침도 동작합니다.
- DB 연결 시 `dist/repository.js`의 네 조회 함수만 API 호출로 변경하세요. 현재 버전에는 DB와 관리자 수정 화면이 없습니다.

## 조작

방향키 / WASD, Enter / Space, Esc. 화면 방향 버튼은 길게 누를 수 있습니다. 공간을 클릭하면 캐릭터가 이동 후 입장합니다. MENU에서는 이동 없이 모든 카테고리를 선택합니다.

사운드 기본값 OFF. 부화 시청, 사운드 설정, 마지막 캐릭터 위치, 방문 카테고리는 브라우저에 저장합니다. OS 움직임 감소 설정을 지원합니다.

폰트: Paperlogy 웹폰트. 캐릭터: 이 사이트를 위해 생성한 자체 캐릭터. 샘플 이미지는 코드로 작성한 UI 디자인 예시입니다.

## 고양이형 3D 게임기

`dist/cat-device-3d.png`는 내장 ImageGen으로 생성한 투명 배경의 게임기 렌더입니다. 화면과 버튼 위치는 `dist/device.css`에서 조정합니다. 첫 화면에서는 전체 제품을 표시하고, 탐색 화면에서는 화면과 버튼을 중심으로 확대합니다.

생성 프롬프트 요약: High-end 3D product render, straight-on front view, fully visible plump oval icy-blue cat-shaped digital pet device, softly rounded ears, pearlescent glossy plastic, top metallic silver ball-chain, three buttery yellow buttons, blank pale-yellow display, transparent background, no logos or text.

## GitHub Pages 배포

1. 이 폴더를 GitHub 저장소의 main 브랜치에 업로드합니다.
2. 저장소 Settings → Pages → Build and deployment → Source에서 GitHub Actions를 선택합니다.
3. Actions 탭에서 Deploy portfolio to GitHub Pages를 실행합니다. 이후 main 브랜치에 푸시하면 자동 배포됩니다.

사이트는 dist 폴더를 배포합니다. 프로젝트 상세는 해시 주소를 사용하므로 GitHub Pages에서도 직접 접근과 새로고침이 동작합니다. `.openai`는 GitHub 업로드 대상에서 제외됩니다.

공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
