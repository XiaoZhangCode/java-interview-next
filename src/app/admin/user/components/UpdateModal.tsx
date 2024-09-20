import { updateUser } from "@/api/user";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React, { useState } from "react";
import PictureUploader from "@/components/PictureUploader";

interface Props {
  oldData?: API.UserVo;
  visible: boolean;
  columns: ProColumns<API.UserVo>[];
  onSubmit: (values: API.UserAddReqDTO) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.UserUpdateReqDTO) => {
  const hide = message.loading("正在更新");
  try {
    await updateUser(fields);
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
  const [userAvatar, setUserAvatar] = useState<string>("");

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
          ...columns.filter((column) => column.dataIndex !== "userAvatar"),
          {
            title: "头像",
            dataIndex: "userAvatar",
            valueType: "image",
            fieldProps: {
              width: 64,
            },
            hideInSearch: true,
            renderFormItem: (schema, options) => (
              <PictureUploader
                biz={"user_avatar"}
                onChange={(url) => {
                  setUserAvatar(url);
                }}
                value={userAvatar || oldData?.userAvatar}
              />
            ),
          },
        ]}
        form={{
          initialValues: {
            ...oldData,
          },
        }}
        onSubmit={async (values: API.UserUpdateReqDTO) => {
          values.userAvatar = userAvatar;
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
