import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React, { useState } from "react";
import PictureUploader from "@/components/PictureUploader";
import { updateQuestionBank } from "@/api/questionBank";

interface Props {
  oldData?: API.QuestionBankVo;
  visible: boolean;
  columns: ProColumns<API.QuestionBankVo>[];
  onSubmit: (values: API.QuestionBankAddReqDTO) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionBankUpdateReqDTO) => {
  const hide = message.loading("正在更新");
  try {
    await updateQuestionBank(fields);
    hide();
    message.success("更新成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("更新失败，" + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;
  const [picture, setPicture] = useState<string>("");

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={"更新"}
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
                value={picture || oldData?.picture}
              />
            ),
          },
        ]}
        form={{
          initialValues: {
            ...oldData,
            // reviewStatus 是Number 类型 valueEnum 的key应该是字符串类型 否则渲染有问题
            reviewStatus:oldData.reviewStatus + ""
          },
        }}
        onSubmit={async (values: API.QuestionBankUpdateReqDTO) => {
          values.picture = picture;
          const success = await handleUpdate({
            ...values,
            id: oldData?.id as any,
          } as any);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
