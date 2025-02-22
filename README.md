# 📝 업무 배정 및 공유 서비스를 제공하는 Coworkers

![Coworkers](https://github.com/user-attachments/assets/7bb3274f-9542-441a-a1ad-8854065a4bfa)

<br>

## 프로젝트 소개

- 업무 배정 및 현황 공유 서비스로, To-do 리스트 형태로 업무 생성 및 공유가 가능합니다.
- 성과 지표를 가시적으로 확인할 수 있어, 업무 진행 상황을 한눈에 파악할 수 있습니다.
- 일관된 UI/UX 유지를 위해 공통 컴포넌트를 반복적으로 사용하여 개발 효율성을 높입니다.
- 외부 라이브러리 활용 능력을 기르기 위해 달력, 팝오버, 모달 등의 UI 요소를 적용합니다.
- 반응형 UI 최적화를 통해 다양한 기기 환경에서도 최적의 사용자 경험을 제공합니다.
- 업무 관리 도구에 관심 있는 학생들에게 적합한 프로젝트로, 실무형 UI/UX 설계 및 외부 패키지 활용 경험을 쌓을 수 있습니다.

<br>

## 팀원 구성

|               **김관호**               |               **신휘철**               |                 **우재현**                 |                   **양정화**                   |                   **최주영**                   |
| :------------------------------------: | :------------------------------------: | :----------------------------------------: | :--------------------------------------------: | :--------------------------------------------: |
| [@Gwanhoo](https://github.com/Gwanhoo) | [@hwiiron](https://github.com/hwiiron) | [@Woolegend](https://github.com/Woolegend) | [@junghwaYang](https://github.com/junghwaYang) | [@JUYOUNG0728](https://github.com/JUYOUNG0728) |

<br>

### 개발 환경

- Front-end : React, Next.js, TypeScript, React Query, Tailwind.CSS, Context API, Zustand, Storybook
- Back-end : 제공된 API 활용
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Discord, Notion, Figma
- 서비스 배포 환경 : Vercel, Netlify

<br>

### ESLint와 Prettier

- 코드 스타일 자동 정리: Prettier 설정을 통해 따옴표, 세미콜론, 줄바꿈, 들여쓰기 등의 스타일을 자동으로 정리하여 일관된 코드 스타일을 유지합니다.
- 협업 시 코드 컨벤션 부담 감소: 개발자가 스타일 규칙을 신경 쓰지 않아도 되도록 ESLint와 Prettier를 설정하여, 협업 시 코드 스타일로 인한 불필요한 수정 요청을 줄입니다.
- Tailwind CSS 정렬 자동화: Prettier와 ESLint 플러그인을 사용하여 Tailwind CSS 클래스를 자동 정렬하고, 일관된 규칙을 적용합니다.
- 코드 품질 향상: 불필요한 console.log 사용 경고, 엄격한 비교 연산자 사용, TypeScript에서 any 사용 금지 등의 규칙을 적용하여 코드의 안정성과 유지보수성을 높입니다.
- 가독성과 유지보수성 강화: import 정렬 규칙을 적용하여 코드 구조를 체계적으로 유지하며, 특정 폴더에서는 일부 규칙을 비활성화하여 유연성을 확보합니다.

<br>

### 브랜치 전략

- Git-flow 전략 기반 브랜치 관리: 체계적인 브랜치 전략을 적용하여 효율적인 협업과 코드 관리가 가능합니다.
- main (최종 배포 브랜치): 배포가 완료된 안정적인 코드만 유지하는 브랜치로, 직접 수정 없이 검증된 코드만 반영됩니다.
- develop (테스트 브랜치): 새로운 기능 개발 및 버그 수정이 이루어지는 브랜치로, 모든 기능이 병합되기 전에 테스트가 진행됩니다.
- feature/issue-번호: 이슈가 생성되면 기능 브랜치를 생성되며, 해당 브랜치에서 작업 완료 후 develop 브랜치에 병합한 뒤 삭제하여 브랜치 관리를 간소화합니다.

<br>

### 프로젝트 구조

```
🗂️
├─ app
│  ├─ [teamId]
│  │  ├─ [taskId]
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  └─ tasklist
│  │     └─ page.tsx
│  ├─ addteam
│  │  └─ page.tsx
│  ├─ boards
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ login
│  │  └─ page.tsx
│  ├─ myhistory
│  │  └─ page.tsx
│  ├─ mypage
│  │  └─ page.tsx
│  ├─ page.tsx
│  └─ signup
│     └─ page.tsx
├─ components
├─ contexts
├─ hooks
├─ lib
├─ public
│  ├─ fonts
│  └─ images
├─ reducer
├─ service
├─ stories
├─ styles
└─ types
└─ utils
```
