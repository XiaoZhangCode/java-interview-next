import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import zhHans from "bytemd/locales/zh_Hans.json";
import theme, { themeList } from "bytemd-plugin-theme";
import mediumZoom from '@bytemd/plugin-medium-zoom';
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import { uploadFile } from "@/api/file";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}

const plugins = [
  gfm(),
  highlight(),
  theme({
    themeList,
  }),
  mediumZoom(),
];

/**
 * Markdown 编辑器
 * @param props
 * @constructor
 */
const MdEditor = (props: Props) => {
  const { value = "", onChange, placeholder } = props;

  return (
    <div className="md-editor">
      <Editor
        locale={zhHans}
        value={value}
        placeholder={placeholder}
        mode="split"
        plugins={plugins}
        onChange={onChange}
        uploadImages={async (files: any) => {
          let imgUrl = "";
          const res = await uploadFile(
            {
              biz: "user_upload",
            },
            {},
            files[0],
          );
          // @ts-ignore
          if (res.data.code === 0) {
            // @ts-ignore
            imgUrl = res.data.data; // 这里是上传成功后，服务端返回的图片地址
          } else {
            console.log("图片上传失败");
          }
          console.log(res);
          return [
            {
              title: files.map((i: any) => i.name),
              url: imgUrl,
            },
          ];
        }}
      />
    </div>
  );
};

export default MdEditor;
