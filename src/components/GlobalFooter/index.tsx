import "./index.css";

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="GlobalFooter">
      <div>
        <div>© {currentYear} 面试刷题平台</div>
        <div style={{ marginTop: "10px" }}>
          <a href="https://github.com/XiaoZhangCode">
              作者: XiaoZhangCode  Github
          </a>
        </div>
      </div>
    </div>
  );
}
