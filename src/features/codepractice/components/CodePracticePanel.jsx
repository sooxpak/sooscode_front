import { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import styles from './CodePracticePanel.module.css';
import { useDarkMode } from "@/hooks/useDarkMode";

export default function CodePracticePanel() {
  const { darkMode } = useDarkMode();
  const [editorInstance, setEditorInstance] = useState(null);
  const [monacoInstance, setMonacoInstance] = useState(null);

  const [code, setCode] = useState(
`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`
  );

  // 테마 생성 함수 (라이트/다크 자동 적용)
  const applyTheme = (monaco) => {
    if (!monaco) return;

    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-primary")
      .trim();

    const baseTheme = darkMode ? "vs-dark" : "vs";

    monaco.editor.defineTheme("customTheme", {
      base: baseTheme,
      inherit: true,
      rules: [],
      colors: {
        "editor.background": bg,
      },
    });

    monaco.editor.setTheme("customTheme");
  };

  // Editor 로딩 시 실행
  const handleEditorMount = (editor, monaco) => {
    setEditorInstance(editor);
    setMonacoInstance(monaco);
    applyTheme(monaco); // 초기 적용
  };

  // ★ 다크모드 바뀔 때마다 테마 재적용
  useEffect(() => {
    if (monacoInstance) {
      applyTheme(monacoInstance);
    }
  }, [darkMode]);

  return (
    <div className={styles.practicePanel}>
      <div className={styles.header}>codePracticeHeader</div>

      <div className={styles.codeContainer}>
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="java"
          value={code}
          onChange={(v) => setCode(v)}
          onMount={handleEditorMount}
          theme="customTheme"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbersMinChars: 2,
            lineDecorationsWidth: 5,
            glyphMargin: false,
            folding: false,
            renderLineHighlight: "none",
          }}
        />
      </div>

      <div className={styles.compileContainer}>ddd</div>
    </div>
  );
}
