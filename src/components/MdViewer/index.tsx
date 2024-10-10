import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import code from "../../bytemdPlugin/ByteCode";
import mediumZoom from "@bytemd/plugin-medium-zoom";

import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "juejin-markdown-themes/dist/juejin.css"
import "./index.css"
import React, {useEffect} from "react";
import {setTheme} from "bytemd-plugin-theme";


interface Props {
  value?: string;
  theme?: string;
}

const plugins = [code(),gfm(), highlight(),  mediumZoom()];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer = (props: Props) => {
  const { value = "", theme = "juejin" } = props;
  const viewerRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    setTheme(theme);
    // @ts-ignore
    plugins[0].viewerEffect({ markdownBody: viewerRef.current });
    // @ts-ignore
    plugins[2].viewerEffect({ markdownBody: viewerRef.current });
  }, [theme,plugins,viewerRef]);

  return (
    // @ts-ignore
    <div className="md-viewer" ref={viewerRef}>
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};

export default MdViewer;
