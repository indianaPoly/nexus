interface ImportMetaEnv {
  readonly VITE_PROJECT_ID: string; // 사용하는 환경 변수 정의
  // 다른 환경 변수가 있으면 여기에 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
