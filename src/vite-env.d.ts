/// <reference types="vite/client" />

declare module 'virtual:project-meta' {
    const meta: unknown;
    export default meta;
}

declare const __APP_NAME__: string;
declare const __BASE__: string;
declare const __PROJECT_DIR__: string;