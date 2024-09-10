import { addUser } from "@/api/user";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import PictureUploader from "@/components/PictureUploader";

interface Props {
  visible: boolean;
  columns: ProColumns<API.UserVo>[];
  onSubmit: (values: API.UserAddReqDTO) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserAddReqDTO) => {
  const hide = message.loading("正在添加");
  try {
    await addUser(fields);
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

  const [userAvatar, setUserAvatar] = useState<string>("");

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
                value={userAvatar}
              />
            ),
          },
        ]}
        onSubmit={async (values: API.UserAddReqDTO) => {
          values.userAvatar = userAvatar;
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
