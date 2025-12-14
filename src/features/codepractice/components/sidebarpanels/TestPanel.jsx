export default function TestPanel() {
  const handleOpenTest = () => {
    window.open("/test", "_blank");
  };

  return (
    <div>
      <h3>🧪 Test</h3>
      <p>여기는 테스트 용도 패널.</p>

      <button onClick={handleOpenTest}>
        코드 테스트 시작
      </button>
    </div>
  );
}
