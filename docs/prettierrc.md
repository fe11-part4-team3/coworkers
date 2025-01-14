# Prettier 룰셋

### 작은 따옴표
```json
  "singleQuote": true, 
```

### 문장 끝에 세미콜론
```json
  "semi": true,
```

### 들여쓰기 스페이스 사용
```json
  "useTabs": false,
```

### 들여쓰기 간격 2칸
```json
  "tabWidth": 2,
```

### 객체 및 배열 등 마지막 항목 뒤에 쉼표 추가
```json
  "trailingComma": "all",
```

### 한 줄 최대 길이 100자로 제한
```json
  "printWidth": 100,
```

### 객체 리터럴의 중괄호 내부에 공백 추가
```json
  "bracketSpacing": true,
```

### JSX 요소 마지막 `>` 다음 줄로 내림
```json
  "bracketSameLine": false,
```

### Tailwind CSS 관련 포맷팅 규칙 적용
```json
  "plugins": [
    "prettier-plugin-tailwindcss"
  ]
```