export const handleAuthError = (errorCode, refs) => {
    const { emailRef, passwordRef, codeRef } = refs;
    if (!errorCode) return null;

    const map = {
        // 이메일 관련
        VALID_005: ["이메일을 입력해주세요.", emailRef],
        VALID_006: ["올바른 이메일 형식이 아닙니다.", emailRef],
        VALID_007: ["이메일은 5자 이상이어야 합니다.", emailRef],
        VALID_008: ["이메일은 50자 이하이어야 합니다.", emailRef],
        AUTH_001: ["가입되지 않은 이메일입니다.", emailRef],

        // 비밀번호 관련
        VALID_009: ["비밀번호를 입력해주세요.", passwordRef],
        VALID_010: ["비밀번호는 6자 이상이어야 합니다.", passwordRef],
        VALID_011: ["비밀번호는 16자 이하이어야 합니다.", passwordRef],
        VALID_012: ["비밀번호는 영문+숫자 조합이어야 합니다.", passwordRef],
        AUTH_004: ["비밀번호가 올바르지 않습니다.", passwordRef],

        // 인증 코드 관련(회원가입)
        CODE_001: ["인증코드를 입력해주세요.", codeRef],
        CODE_002: ["잘못된 인증 코드입니다.", codeRef],
    };

    const result = map[errorCode];
    if (!result) return null;

    const [msg, ref] = result;

    if (ref?.current) ref.current.focus();

    return msg;
};
