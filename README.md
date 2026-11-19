# 🐼 판다마켓 (Panda Market) - React

## 📄 페이지 구성

| 경로 | 페이지 |
| --- | --- |
| `/` | 랜딩 페이지 |
| `/items` | 중고마켓 (상품 목록) |
| `/items/:id` | 상품 상세 (작업 중) |
| `/registration` | 상품 등록 |
| 그 외 (`/login`, `/board` 등) | 준비 중 안내 페이지 |

## ✨ 주요 기능

### 랜딩 페이지
- 히어로 섹션, 서비스 소개(Hot item / Search / Register), 하단 배너로 구성
- "구경하러 가기" 버튼으로 중고마켓 페이지 이동

### 중고마켓 페이지
- **베스트 상품**: 좋아요가 많은 순서로 상품 표시 (`orderBy=favorite`)
- **판매 중인 상품**: 전체 상품 목록
  - **정렬**: 최신순 / 좋아요순 드롭다운 (모바일에서는 아이콘 버튼)
  - **검색**: 검색어 입력 후 Enter로 검색, 결과가 없으면 안내 문구 표시
  - **페이지네이션**: 이전/다음 버튼과 페이지 번호 5개씩 표시, 현재 페이지 강조
  - 정렬이나 검색을 바꾸면 1페이지로 이동
- 상품 이미지가 없거나 불러오지 못하면 기본 이미지(`img_default.png`) 표시

### 상품 등록 페이지
- 상품명, 상품 소개, 판매가격, 태그 입력 폼
- **유효성 검사** (`useProductForm` 커스텀 훅)

  | 항목 | 조건 |
  | --- | --- |
  | 상품명 | 필수, 10자 이내 |
  | 상품 소개 | 10자 이상 100자 이내 |
  | 판매가격 | 필수, 숫자만 입력 |
  | 태그 | 5글자 이내, 1개 이상 등록 |

  - 입력란을 한 번 벗어난(blur) 뒤부터 에러 메시지와 빨간 테두리 표시 (태그는 입력 즉시)
- **태그**: Enter로 추가, 중복 태그는 추가하지 않음, 삭제 버튼으로 제거
  - 한글 입력 중(조합 중) Enter는 무시해 마지막 글자가 중복 입력되지 않도록 처리
- 모든 항목이 채워지고 에러가 없을 때만 등록 버튼 활성화
- 등록 중에는 버튼을 비활성화해 중복 제출 방지
- 등록에 성공하면 해당 상품 상세 페이지로 이동

### 공통
- 헤더: 현재 페이지 메뉴 강조 (`NavLink`), 모바일에서는 텍스트형 로고로 교체
- 레이아웃: 중첩 라우트와 `Outlet`으로 헤더·푸터를 모든 페이지에 공통 적용
- 아직 만들지 않은 페이지나 없는 주소로 이동하면 준비 중 안내 페이지 표시 (`path='*'`)

### 반응형
화면 크기에 따라 레이아웃 열 수와 **API에 요청하는 상품 수(`pageSize`)**가 함께 바뀝니다.

| | 모바일 (~767px) | 태블릿 (768px~) | PC (1200px~) |
| --- | --- | --- | --- |
| 베스트 상품 | 1열 · 1개 | 2열 · 2개 | 4열 · 4개 |
| 판매 중인 상품 | 2열 · 4개 | 3열 · 6개 | 5열 · 10개 |

- `useBreakpoint` 커스텀 훅으로 현재 화면 구분(`mobile` / `tablet` / `pc`)을 반환
  - `resize` 이벤트로 창 크기 변화를 감지하고, 컴포넌트가 사라지면 이벤트 제거(cleanup)
  - 너비 숫자 대신 화면 구분 값을 저장해, 기준 너비를 넘을 때만 다시 렌더링
- 화면 구분이 바뀌면 바뀐 `pageSize`로 상품을 다시 요청

### API 연동
[판다마켓 API](https://panda-market-api.vercel.app/docs)를 사용합니다.

| 함수 | 요청 | 용도 |
| --- | --- | --- |
| `getProducts` | `GET /products` | 상품 목록 조회 |
| `createProduct` | `POST /products` | 상품 등록 |

`getProducts` 파라미터

| 파라미터 | 설명 |
| --- | --- |
| `page` | 페이지 번호 |
| `pageSize` | 한 페이지에 가져올 상품 수 |
| `orderBy` | 정렬 기준 (`recent` / `favorite`) |
| `keyword` | 검색어 |

- `axios.create`로 공통 설정(`baseURL`, `timeout`)을 가진 인스턴스를 만들어 사용
- `baseURL`은 환경 변수 `VITE_API_BASE_URL`을 사용하고, 없으면 기본 API 주소 사용
- 에러는 API 함수가 아닌 컴포넌트에서 `try/catch`로 처리

## 🛠 기술 스택

- **React** – 함수 컴포넌트, `useState` / `useEffect`, 커스텀 훅
- **React Router** – 중첩 라우트와 `Outlet` 레이아웃, `Link` / `NavLink` / `useNavigate` 페이지 이동, 동적 경로(`/items/:id`)
- **Tailwind CSS v4** – `@theme`으로 색상·폰트 디자인 토큰 관리, 반응형 접두어(`md:`, `pc:`)
- **Axios** – API 요청
- **Vite** – 개발 서버, 빌드
- **Vercel** – `main` 브랜치 push 시 자동 배포

## 📁 폴더 구조

```
src
├── api
│   ├── client.js          # axios 인스턴스 (baseURL, timeout)
│   └── productApi.js      # 상품 API 함수
├── assets
│   ├── fonts              # Pretendard 웹폰트
│   └── images             # 아이콘, 로고, 랜딩 이미지
├── components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Button.jsx         # 공통 버튼 (href가 있으면 Link로 렌더링)
│   ├── InputField.jsx     # 라벨 + 입력창 + 에러 메시지 (비밀번호 보기 토글 지원)
│   ├── TextareaField.jsx  # 라벨 + 여러 줄 입력창 + 에러 메시지
│   ├── TagField.jsx       # 태그 입력 및 목록
│   ├── ProductCard.jsx    # 상품 카드 (베스트 / 일반)
│   ├── SortDropdown.jsx   # 정렬 드롭다운
│   └── Pagination.jsx     # 페이지네이션
├── constants
│   └── routes.js          # 페이지 경로 상수
├── hooks
│   ├── useBreakpoint.js   # 반응형 커스텀 훅
│   └── useProductForm.js  # 상품 등록 폼 상태, 유효성 검사
├── layout
│   ├── Layout.jsx         # 헤더 + 본문(Outlet) + 푸터
│   └── Contents.jsx       # 본문 여백 영역
├── pages
│   ├── LandingPage.jsx    # 랜딩 페이지
│   ├── ItemsPage.jsx      # 중고마켓 페이지
│   ├── ItemsDetailPage.jsx # 상품 상세 페이지 (작업 중)
│   ├── RegistrationPage.jsx # 상품 등록 페이지
│   └── ComingSoonPage.jsx # 준비 중 안내 페이지
├── styles
│   ├── global.css         # 기본 스타일, 공통 클래스
│   └── variables.css      # 디자인 토큰 (@theme)
├── App.jsx                # 라우트 설정
└── main.jsx
```
