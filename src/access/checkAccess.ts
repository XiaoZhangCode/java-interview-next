import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 校验权限 返回某个用户是否具有权限
 * @param loginUser 登录用户
 * @param needAccess 需要的权限
 * @return boolean 是否具有权限
 */
export const  checkAccess = (
  loginUser: API.LoginUserVO,
  needAccess = ACCESS_ENUM.NOT_LOGIN,
) => {
  // 获取当前登录用户具有的权限
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // 如何不需要任何权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  // 如何用户需要登录
  if (needAccess === ACCESS_ENUM.USER) {
    return loginUserAccess == ACCESS_ENUM.NOT_LOGIN;
  }

  if (needAccess === ACCESS_ENUM.VIP) {
    return !(
      loginUserAccess == ACCESS_ENUM.NOT_LOGIN ||
      loginUserAccess == ACCESS_ENUM.USER
    );
  }

  if (needAccess === ACCESS_ENUM.ADMIN) {
    return loginUserAccess === ACCESS_ENUM.ADMIN;
  }

  return false;
};
