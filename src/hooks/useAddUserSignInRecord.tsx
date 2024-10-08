import { useEffect, useState } from "react";
import { message } from "antd";
import {addUserSignIn} from "@/api/user";

/**
 * 添加用户签到记录钩子
 */
const useAddUserSignInRecord = () => {
    const [loading, setLoading] = useState(false);

    // 请求后端执行签到
    const doFetch = async () => {
        setLoading(true);
        try {
            await addUserSignIn();
        } catch (e:any) {
            message.error("添加刷题签到记录失败，" + e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        doFetch();
    }, []);

    return { loading };
};

export default useAddUserSignInRecord;
