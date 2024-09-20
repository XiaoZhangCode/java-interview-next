import {MenuDataItem} from "@ant-design/pro-layout";
import {menus} from "../../config/menu";
import {checkAccess} from "@/access/checkAccess";

/**
 * 获取当前用户可访问的菜单列表
 * @param LoginUser 当前用户信息
 * @param menuList 菜单列表
 */
const getAccessibleMenuList = (
  LoginUser: API.LoginUserVO,
  menuList: MenuDataItem[] = menus,
) => {
  return menuList.filter((item) => {
    if (!checkAccess(LoginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = getAccessibleMenuList(LoginUser, item.children);
    }
    return true;
  });
};

export default getAccessibleMenuList;
