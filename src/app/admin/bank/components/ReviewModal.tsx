import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { reviewQuestionBank } from "@/api/questionBank";

interface Props {
  oldData?: API.QuestionBankVo;
  visible: boolean;
  columns: ProColumns<API.QuestionBankVo>[];
  onSubmit: (values: API.QuestionBankReviewReqDTO) => void;
  onCancel: () => void;
}

/**
 * 审核
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionBankReviewReqDTO) => {
  const hide = message.loading("正在更新");
  try {
    await reviewQuestionBank(fields);
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
const ReviewModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;
  console.log("oldData", oldData);
  console.log("typeof oldData?.reviewStatus", typeof oldData?.reviewStatus);
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
            valueEnum: {
              0: {
                text: "待审核",
                status: "Default",
              },
              1: {
                text: "通过",
                status: "Success",
              },
              2: {
                text: "拒绝",
                status: "Error",
              },
            },
          },
          {
            title: "审核信息",
            sorter: true,
            dataIndex: "reviewMessage",
            valueType: "text",
            hideInSearch: true,
          },
        ]}
        form={{
          initialValues: {
            ...oldData,
            // reviewStatus 是Number 类型 valueEnum 的key应该是字符串类型 否则渲染有问题
            reviewStatus: oldData.reviewStatus + "",
          },
        }}
        onSubmit={async (values: API.QuestionBankReviewReqDTO) => {
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
export default ReviewModal;
