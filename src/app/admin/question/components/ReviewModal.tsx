import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { reviewQuestion } from "@/api/question";

interface Props {
  oldData?: API.QuestionVo;
  visible: boolean;
  columns: ProColumns<API.QuestionVo>[];
  onSubmit: (values: API.QuestionReviewReqDTO) => void;
  onCancel: () => void;
}

/**
 * 审核题目
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionReviewReqDTO) => {
  const hide = message.loading("正在更新");
  try {
    await reviewQuestion(fields);
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
          },
        ]}
        form={{
          initialValues: {
            ...oldData,
            // reviewStatus 是Number 类型 valueEnum 的key应该是字符串类型 否则渲染有问题
            reviewStatus: oldData.reviewStatus + "",
          },
        }}
        onSubmit={async (values: API.QuestionReviewReqDTO) => {
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
