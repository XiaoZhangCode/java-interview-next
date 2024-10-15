import { Button, Form, message, Modal } from "antd";
import React, { useState} from "react";
import { batchRemoveQuestionsFromBank } from "@/api/question";
import DebounceSelect from "@/components/DebounceSelect";
import { fetchUserList } from "@/app/admin/question/components/UpdateQuestionBanksModal";

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量向添加题目到题库弹窗
 * @param props
 * @constructor
 */
const BatchRemoveQuestionsToBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();

  interface UserValue {
    label: string;
    value: string;
  }

  const [value, setValue] = useState<UserValue[]>([]);

  /**
   * 提交
   * @param fields
   */
  const doSubmit = async (fields: API.QuestionBankQuestionBatchReqDTO) => {
    const hide = message.loading("正在操作");
    if (!value ?? "") {
      message.error("请选择题库");
      return;
    }
    const questionBankIds = value.map((item) => {
      // @ts-ignore
      return item.value as number;
    });
    try {
      await batchRemoveQuestionsFromBank({
        questionIds: questionIdList,
        questionBankIds: questionBankIds as number[],
      });
      hide();
      message.success("操作成功");
      setValue([])
      form.resetFields();
      onSubmit?.();
      console.log(value)
    } catch (error: any) {
      hide();
      setValue([])
      form.resetFields();
      message.error("操作失败，" + error.message);
    }
  };



  return (
    <Modal
      destroyOnClose
      title={"批量向题库移除题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        form.resetFields();
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }} onFinish={doSubmit}>
        <Form.Item label="选择题库" name="questionBankId">
          <DebounceSelect
            mode="multiple"
            placeholder="请输入题库名称"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue as UserValue[]);
            }}
            value={value}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BatchRemoveQuestionsToBankModal;
