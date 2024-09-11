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
 * 审核
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
      title={"审核"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={[
          {
            title: "id",
            dataIndex: "id",
            valueType: "text",
            hideInForm: true,
          },
          {
            title: "审核状态",
            dataIndex: "reviewStatus",
            hideInForm: true,
            valueEnum: {
              0: {
                text: "待审核",
              },
              1: {
                text: "通过",
              },
              2: {
                text: "拒绝",
              },
            },
          },
          {
            title: "审核信息",
            sorter: true,
            dataIndex: "reviewMessage",
            valueType: "text",
            hideInSearch: true,
            hideInForm: true,
          },
        ]}
        form={{
          initialValues: oldData,
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
