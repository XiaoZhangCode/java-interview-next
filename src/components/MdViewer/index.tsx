import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight-ssr";
import { setTheme } from "bytemd-plugin-theme";
import { useEffect, useRef } from "react";
import code from "../../bytemdPlugin/ByteCode";
import mediumZoom from "@bytemd/plugin-medium-zoom";

import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";

interface Props {
  value?: string;
  theme?: string;
}

const plugins = [gfm(), highlight(), code(), mediumZoom()];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer = (props: Props) => {
  const { value = "", theme = "channing-cyan" } = props;
  const viewerRef = useRef();
  useEffect(() => {
    setTheme(theme);
    // @ts-ignore
    plugins[2].viewerEffect({ markdownBody: viewerRef.current });
  }, [theme]);

  return (
    // @ts-ignore
    <div className="md-viewer" ref={viewerRef}>
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};

export default MdViewer;
