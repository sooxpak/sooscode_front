import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import {useState} from "react";

const CodePanel = () => {
    const [code, setCode] = useState("// write code");

    /**
     * 모나코 에디터 내장 옵션
     */
    const options = {
        minimap: { enabled: false },
        fontSize: 14,
        tabSize: 2,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
    };
    //    theme="vs-dark"

    return (
        <Editor
            height="90vh"
            language="javascript"
            value={code}
            onChange={(value) => setCode(value)}
            options={options}
        />
    )
}

export default CodePanel;