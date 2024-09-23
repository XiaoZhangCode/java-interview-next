import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from '@bytemd/plugin-highlight-ssr'
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import { setTheme } from "bytemd-plugin-theme";
import {useEffect, useRef} from "react";
import highlightMap from "bytemd-plugin-highlight/dist/constant";
import code from '../../bytemdPlugin/ByteCode'
type ThemeKeys = keyof typeof highlightMap;

interface Props {
  value?: string;
  theme?: string;
  themeHighlight?: ThemeKeys;
}

const plugins = [
  gfm(),
  highlight(),
  code(),
];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer = (props: Props) => {
  const viewerRef = useRef();
  const {
    value = "",
    theme = "channing-cyan",
  } = props;
  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className="md-viewer" >
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};

export default MdViewer;
