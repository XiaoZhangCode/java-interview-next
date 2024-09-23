import type { BytemdPlugin } from "bytemd";
import hljs from "highlight.js";
import ReactDOMServer from "react-dom/server";
import "./index.css";

// 拷贝代码
const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
// 渲染页面元素
export const renderEle = function (code: HTMLElement, key: number) {
  let className: string = code.className;
  if (!className ?? "") {
    return;
  }
  // 使用正则表达式匹配以 "language-" 开头的类名
  const match = className.match(/language-(.+)/);
  // 如果匹配成功，提取语言部分并转换为大写
  let lan = match ? match[1].toUpperCase() : "";
  const parentNode: any = code.parentNode;
  // 获取计算后的样式
  const style = window.getComputedStyle(code);
  // 获取背景色
  const backgroundColor = style.backgroundColor;
  parentNode.removeChild(code);
  parentNode.innerHTML =
    ReactDOMServer.renderToString(codeText(code, key, backgroundColor, lan)) +
    '<code id="code-' +
    key +
    '"  class="' +
    code.className +
    '">' +
    code.innerHTML +
    "</code>";

  let btn: any = document.getElementsByClassName(
    "code-block-extension-copy-" + key,
  )[0];
  let timeoutID: any = null; // 用于存储 setTimeout 的 ID
  const restoreText = () => {
    btn.innerHTML = "复制代码";
  };
  const timeout = () => {
    timeoutID = setTimeout(restoreText, 3000); // 设置定时器，三秒后执行 restoreText 函数
  };
  btn.addEventListener("click", () => {
    clearTimeout(timeoutID); // 清除之前的定时器
    copyToClipboard(code.innerText); // 执行复制操作
    btn.innerHTML = "Copied"; // 立即更改按钮文本
    timeout(); // 设置新的定时器，三秒后恢复按钮文本
  });

  // 旋转隐藏code
  let foldBtn: any = document.getElementsByClassName("foldBtn-" + key)[0];

  // 最上层的父类的盒子阴影也去掉
  let codeHeader: any = document.getElementsByClassName(
    "code-header-" + key,
  )[0];

  foldBtn.addEventListener("click", () => {
    let codeEle = document.getElementById("code-" + key);
    codeEle?.classList.toggle("hidden");
    foldBtn.classList.toggle("rotate90");
    codeHeader.classList.toggle("boxShadowNone");
  });

  // document.querySelectorAll("code").forEach((el: any) => {
  //   hljs.highlightElement(el);
  // });
};

// innerHTML 布局
const codeText: any = (
  innerHTML: HTMLElement,
  key: number,
  backgroundColor: string,
  lan: string,
) => {
  return (
    <div
      className={"code-block-extension-header code-header-" + key}
      style={{ backgroundColor }}
    >
      <div className="code-block-extension-headerLeft">
        <div className={"code-block-extension-foldBtn foldBtn-" + key}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z"
              data-name="Down"
            ></path>
          </svg>
        </div>
      </div>
      <div className="code-block-extension-headerRight">
        <span className="code-block-extension-lang">{lan}</span>
        <span
          className={
            "code-block-extension-lang code-block-extension-copy code-block-extension-copy-" +
            key
          }
        >
          复制代码
        </span>
      </div>
    </div>
  );
};

export default function code(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }): void | (() => void) {
      const codes = markdownBody.querySelectorAll("code");
      codes.forEach((code, key) => {
        renderEle(code, key);
      });
    },
  };
}


