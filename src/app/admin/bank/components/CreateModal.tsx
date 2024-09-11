import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React, { useState } from "react";
import PictureUploader from "@/components/PictureUploader";
import { addQuestionBank } from "@/api/questionBank";

interface Props {
  visible: boolean;
  columns: ProColumns<API.QuestionBankVo>[];
  onSubmit: (values: API.QuestionBankAddReqDTO) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.QuestionBankAddReqDTO) => {
  const hide = message.loading("正在添加");
  try {
    await addQuestionBank(fields);
    hide();
    message.success("创建成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("创建失败，" + error.message);
    return false;
  }
};

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  const [picture, setPicture] = useState<string>("");

  return (
    <Modal
      destroyOnClose
      title={"创建"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={[
          ...columns.filter((column) => column.dataIndex !== "picture"),
          {
            title: "图片",
            dataIndex: "picture",
            valueType: "image",
            fieldProps: {
              width: 64,
            },
            hideInSearch: true,
            renderFormItem: (schema, options) => (
              <PictureUploader
                biz={"user_avatar"}
                onChange={(url) => {
                  setPicture(url);
                }}
                value={picture}
              />
            ),
          },
        ]}
        onSubmit={async (values: API.QuestionBankAddReqDTO) => {
          values.picture = picture;
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
