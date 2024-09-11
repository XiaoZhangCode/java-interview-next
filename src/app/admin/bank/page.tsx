"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import { deleteQuestionBank, getQuestionBankPage } from "@/api/questionBank";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import ReviewModal from "@/app/admin/bank/components/ReviewModal";

/**
 * 用户管理页面
 *
 * @constructor
 */
const BankAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示审核窗口
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.QuestionBankVo>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.QuestionBankVo) => {
    try {
      const confirmed = Modal.confirm({
        title: `确认删除名为${row.title}的题库吗？`,
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
            await deleteQuestionBank({
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

  const columns: ProColumns<API.QuestionBankVo>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "描述",
      dataIndex: "description",
      valueType: "text",
      hideInSearch: true,
    },
    {
      title: "图片",
      dataIndex: "picture",
      valueType: "image",
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
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
      title: "审核时间",
      sorter: true,
      dataIndex: "reviewTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "审核信息",
      sorter: true,
      dataIndex: "reviewMessage",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
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
                setCurrentRow(record);
                setReviewModalVisible(true);
              }}
          >
            审核
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
      <ProTable<API.QuestionBankVo>
        headerTitle={"题库信息"}
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

          const { data } = await getQuestionBankPage({
            questionbankPageReqDTO: {
              pageNo: params.current || 1,
              pageSize: params.pageSize || 10,
              id: params.id,
              title: params.title,
              reviewStatus: params.reviewStatus,
            } as API.QuestionBankPageReqDTO,
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
      <ReviewModal
          visible={updateModalVisible}
          columns={columns}
          oldData={currentRow}
          onSubmit={() => {
            setReviewModalVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          onCancel={() => {
            setReviewModalVisible(false);
          }}
      />
    </PageContainer>
  );
};
export default BankAdminPage;
