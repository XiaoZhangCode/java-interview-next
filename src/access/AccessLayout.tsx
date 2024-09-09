import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { findAllMenuItemByPath } from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import { checkAccess } from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

/**
 * 全局初始化组件
 * @param children 子组件
 */
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const pathname = usePathname();
  // 获取当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 获取当前登录用户所需要的权限
  const menu = findAllMenuItemByPath(pathname);
  const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return children;
};

export default AccessLayout;
