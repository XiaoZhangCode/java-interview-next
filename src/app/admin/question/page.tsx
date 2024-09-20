"use client";
import {CheckSquareOutlined, PlusOutlined} from "@ant-design/icons";
import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {Button, message, Modal, Space, Typography} from "antd";
import React, {useRef, useState} from "react";
import {deleteQuestion, getQuestionPage, reviewQuestionBatch,} from "@/api/question";
import TagList from "@/components/TagList/TagList";
import CreateModal from "@/app/admin/question/components/CreateModal";
import UpdateModal from "@/app/admin/question/components/UpdateModal";
import MdEditor from "@/components/MdEditor";
import ReviewModal from "@/app/admin/question/components/ReviewModal";
import DetailModal from "@/app/admin/question/components/DetailModal";

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.QuestionVo>();
  // 用户选中的数据
  const [mySelectedRowKeys, setMySelectedRowKeys] = useState<React.Key[]>([]);
  const [reviewBatchModalVisible, setReviewBatchModalVisible] =
    useState<boolean>(false);
  // review组件加载
  const [loading, setLoading] = useState<boolean>(false);
  // 是否显示审核窗口
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
  // detail组件显示
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [currentDetailId, setCurrentDetailId] = useState<string | number>(0);

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.QuestionVo) => {
    try {
      const confirmed = Modal.confirm({
        title: `确认删除名为${row.title}的题目吗？`,
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
            await deleteQuestion({
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

  const columns: ProColumns<API.QuestionVo>[] = [
    {
      title: "编号",
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
      title: "标签",
      dataIndex: "tags",
      hideInSearch: true,
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tags} />;
      },
    },
    {
      title: "题目内容/详情",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      hideInTable: true,
      width: 240,
      renderFormItem: (_, fieldProps, form) => {
        return (
          // value 和 onchange 会通过 form 自动注入。
          <MdEditor
            // 组件的配置
            {...fieldProps}
          />
        );
      },
    },
    {
      title: "审核状态",
      dataIndex: "reviewStatus",
      hideInForm: true,
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
      title: "审核时间",
      sorter: true,
      dataIndex: "reviewTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "审核人",
      dataIndex: "reviewer",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "审核信息",
      dataIndex: "reviewMessage",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "仅会员可见",
      sorter: true,
      dataIndex: "needVip",
      valueEnum: {
        true: {
          text: "是",
        },
        false: {
          text: "否",
        },
      },
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "浏览量",
      dataIndex: "viewNum",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "点赞量",
      dataIndex: "thumbNum",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "收藏量",
      dataIndex: "thumbNum",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "题目来源",
      dataIndex: "source",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "答案",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
      hideInTable: true,
      width: 640,
      renderFormItem: (_, fieldProps, form) => {
        return (
          // value 和 onchange 会通过 form 自动注入。
          <MdEditor
            // 组件的配置
            {...fieldProps}
          />
        );
      },
    },

    {
      title: "创建人",
      dataIndex: "creatorName",
      valueType: "text",
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setDetailModalVisible(true);
              setCurrentDetailId(record.id as number);
            }}
          >
            详情
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setReviewModalVisible(true);
            }}
          >
            审核
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
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
      <ProTable<API.QuestionVo>
        headerTitle={"题目信息"}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        rowSelection={{
          selectedRowKeys: mySelectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setMySelectedRowKeys([...selectedRowKeys]);
          },
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
          <Button
            disabled={mySelectedRowKeys.length === 0}
            key="default"
            onClick={() => {
              setReviewBatchModalVisible(true);
            }}
          >
            <CheckSquareOutlined />
            一键审核
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const { data } = await getQuestionPage({
            questionPageReqDTO: {
              ...params,
              pageNo: params.current || 1,
              pageSize: params.pageSize || 10,
            } as API.QuestionPageReqDTO,
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
        visible={reviewModalVisible}
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
      <Modal
        title={"一键审核"}
        open={reviewBatchModalVisible}
        footer={null}
        onCancel={() => {
          setReviewBatchModalVisible(false);
        }}
      >
        <ProTable
          type="form"
          columns={[
            {
              title: "审核状态",
              dataIndex: "reviewStatus",
              valueEnum: {
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
          loading={loading}
          onSubmit={async (values: API.QuestionBatchReviewReqDTO) => {
            setLoading(true);
            const success = await reviewQuestionBatch({
              reviewStatus: values.reviewStatus,
              reviewMessage: values.reviewMessage,
              idList: mySelectedRowKeys,
            } as API.QuestionBatchReviewReqDTO);
            if (success) {
              setLoading(false);
              setMySelectedRowKeys([]);
              setReviewBatchModalVisible(false);
              actionRef.current?.reload();
            }
          }}
        />
      </Modal>
      <DetailModal
        id={currentDetailId}
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
      />
    </PageContainer>
  );
};
export default QuestionAdminPage;
