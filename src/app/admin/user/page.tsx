"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  deleteUser,
  getUserPage,
  resetUserPassword,
  updateUser,
} from "@/api/user";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import PictureUploader from "@/components/PictureUploader";

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.UserVo>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.UserVo) => {
    try {
      const confirmed = Modal.confirm({
        title: `确认删除名为${row.userName}的用户吗？`,
        content: "删除后不可恢复",
        okText: "确认",
        cancelText: "取消",
        okButtonProps: {
          danger: true,
        },
        onOk: async () => {
          const hide = message.loading("正在删除...");
          if (!row) return true;
          try {
            await deleteUser({
              id: row.id as any,
            });
            hide();
            message.success("删除成功");
            actionRef.current?.reload();
            return true;
          } catch (error: any) {
            hide();
            message.error("删除失败：" + error.message);
            return false;
          }
        },
        onCancel() {
          return false;
        },
      });

      if (!confirmed) {
        // 用户取消了删除操作
        return false;
      }
    } catch (error: any) {
      message.error("删除操作出错：" + error.message);
      return false;
    }
  };

  const handleResetUserPassword = async (row: API.UserVo) => {
    try {
      const hide = message.loading("正在重置密码...");
      if (!row) return true;
      try {
        await resetUserPassword({
          userId: row.id as any,
        });
        hide();
        message.success("重置成功,新密码为123456789");
        actionRef.current?.reload();
        return true;
      } catch (error: any) {
        hide();
        message.error("重置密码失败：" + error.message);
      }
    } catch (error: any) {
      message.error("重置密码操作出错：" + error.message);
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.UserVo>[] = [
    {
      title: "用户编号",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "账号",
      dataIndex: "userAccount",
      valueType: "text",
      hideInSearch: true,
    },
    {
      title: "用户名",
      dataIndex: "userName",
      valueType: "text",
    },
    {
      title: "头像",
      dataIndex: "userAvatar",
      valueType: "image",
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: "简介",
      dataIndex: "userProfile",
      valueType: "textarea",
      hideInSearch: true,
    },
    {
      title: "权限",
      dataIndex: "userRole",
      hideInSearch: true,
      valueEnum: {
        user: {
          text: "用户",
        },
        admin: {
          text: "管理员",
        },
        vip: {
          text: "会员",
        },
      },
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              handleResetUserPassword(record);
            }}
          >
            重置密码
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.UserVo>
        headerTitle={"用户信息"}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data } = await getUserPage({
            userPageReqDTO: {
              pageNo: params.current || 1,
              pageSize: params.pageSize || 10,
              userName: params.userName,
              id: params.id,
            },
          });
          return {
            success: data.code === 0,
            data: data.data?.list || [],
            total: Number(data.data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default UserAdminPage;
