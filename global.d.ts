// global.d.ts
declare module "react-syntax-highlighter" {
  import * as React from "react";

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: React.ReactNode;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    PreTag?: string | React.ComponentType<any>;
    CodeTag?: string | React.ComponentType<any>;
  }

  // ✅ Correct: Function components, not class components
  export const Prism: React.FC<SyntaxHighlighterProps>;
  export const Light: React.FC<SyntaxHighlighterProps>;
  export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps>;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const styles: Record<string, any>;
  export = styles;
}

declare module "react-syntax-highlighter/dist/esm/styles/hljs" {
  const styles: Record<string, any>;
  export = styles;
}

