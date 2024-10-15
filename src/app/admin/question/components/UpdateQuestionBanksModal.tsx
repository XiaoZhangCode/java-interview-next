import { Form, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getQuestionBankIdList } from "@/api/question";
import DebounceSelect from "@/components/DebounceSelect";
import { searchQuestionBankList } from "@/api/questionBank";
import {
  bindQuestionBankQuestion,
  unBindQuestionBankQuestion,
} from "@/api/questionBankQuestion";

interface Props {
  questionId?: string | number;
  visible: boolean;
  onCancel: () => void;
}

interface UserValue {
  label: string;
  value: string;
}

export async function fetchUserList(keyword: string): Promise<UserValue[]> {
  // @ts-ignore
  return searchQuestionBankList({
    keyword,
  } as API.searchQuestionBankListParams).then((response) => {
    const questionBanks = response.data.data || [];
    return questionBanks.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  });
}

/**
 * 修改所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateQuestionBanksModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;

  const [value, setValue] = useState<UserValue[]>([]);

  // 获取所属题库列表
  const getCurrentQuestionBankIdList = async () => {
    try {
      const res = await getQuestionBankIdList({
        id: questionId as number,
      });
      const list = res.data.data ?? [];
      let map = list.map((item) => ({
        label: item.title,
        value: item.id != null ? item.id.toString() : "",
      })) as UserValue[];
      setValue(map);
    } catch (e: any) {
      console.error("获取题目所属题库列表失败，" + e.message);
    }
  };

  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
  }, [questionId]);

  return (
    <Modal
      destroyOnClose
      title={"修改所属题库"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form style={{ marginTop: 24 }}>
        <Form.Item label="所属题库">
          <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="请输入题库名称"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue as UserValue[]);
            }}
            style={{ width: "100%" }}
            onSelect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await bindQuestionBankQuestion({
                  questionId,
                  questionBankId: value.value as any,
                } as API.QuestionBankQuestionAddReqDTO);
                hide();
                message.success("绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("绑定题库失败，" + error.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await unBindQuestionBankQuestion({
                  questionId,
                  questionBankId: value.value as any,
                } as API.QuestionBankQuestionAddReqDTO);
                hide();
                message.success("取消绑定题库成功");
              } catch (error: any) {
                hide();
                message.error("取消绑定题库失败，" + error.message);
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateQuestionBanksModal;
