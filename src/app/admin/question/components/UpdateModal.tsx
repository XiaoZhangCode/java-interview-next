import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";
import { updateQuestion } from "@/api/question";

interface Props {
  oldData?: API.QuestionVo;
  visible: boolean;
  columns: ProColumns<API.QuestionVo>[];
  onSubmit: (values: API.QuestionAddReqDTO) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateReqDTO) => {
  const hide = message.loading("正在更新");
  try {
    await updateQuestion(fields);
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

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      style={{
        width: "100vw",
        maxWidth: "100vw",
        top: 0,
        paddingBottom: 0,
        overflowY: "auto",
      }}
      width={"100vw"}
      destroyOnClose
      title={"更新"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
      centered={false}
    >
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.QuestionUpdateReqDTO) => {
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
