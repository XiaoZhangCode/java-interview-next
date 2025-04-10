declare namespace API {
  type CommentAddReqDTO = {
    /** 评论用户id */
    userId?: number;
    /** 题目id */
    questionId?: number;
    /** 评论内容 */
    content: string;
    /** 父评论id，用于回复功能 */
    parentId: number;
    /** 点赞数 */
    likeNum?: number;
  };

  type CommentPageReqDTO = {
    /** 页码，从 1 开始 */
    pageNo: number;
    /** 每页条数，最大值为 100 */
    pageSize: number;
    /** id */
    id?: number;
    /** 评论用户id */
    userId?: number;
    /** 题目id */
    questionId?: number;
    /** 评论内容 */
    content: string;
    /** 父评论id，用于回复功能 */
    parentId: number;
    /** 点赞数 */
    likeNum?: number;
  };

  type CommentSimpleVo = {
    /** id */
    id?: number;
    /** 评论用户id */
    userId?: number;
    /** 题目id */
    questionId?: number;
    /** 评论内容 */
    content?: string;
    /** 父评论id，用于回复功能 */
    parentId: number;
    /** 点赞数 */
    likeNum?: number;
  };

  type CommentVo = {
    /** id */
    id?: number;
    /** 评论用户id */
    userId?: number;
    /** 题目id */
    questionId?: number;
    /** 评论内容 */
    content?: string;
    /** 父评论id，用于回复功能 */
    parentId: number;
    /** 点赞数 */
    likeNum?: number;
    /** 当前登录用户是否点赞此评论 */
    isLiked?: boolean;
    /** 用户名称 */
    username?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 创建时间 */
    createTime?: string;
    /** 回复人名称 */
    replyUserName?: string;
    /** 回复人头像 */
    replyUserAvatar?: string;
  };

  type CommonResultBoolean = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: boolean;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultCommentSimpleVo = {
    /** 业务状态 */
    code?: number;
    data?: CommentSimpleVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultCommentVo = {
    /** 业务状态 */
    code?: number;
    data?: CommentVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultListCommentVo = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: CommentVo[];
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultListInteger = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: number[];
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultListQuestionBankVo = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: QuestionBankVo[];
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultListQuestionVo = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: QuestionVo[];
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultLoginUserVO = {
    /** 业务状态 */
    code?: number;
    data?: LoginUserVO;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultLong = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: number;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultMapLocalDateBoolean = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: Record<string, any>;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultPageResultCommentVo = {
    /** 业务状态 */
    code?: number;
    data?: PageResultCommentVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultPageResultQuestionBankVo = {
    /** 业务状态 */
    code?: number;
    data?: PageResultQuestionBankVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultPageResultQuestionVo = {
    /** 业务状态 */
    code?: number;
    data?: PageResultQuestionVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultPageResultThumbVo = {
    /** 业务状态 */
    code?: number;
    data?: PageResultThumbVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultPageResultUserVo = {
    /** 业务状态 */
    code?: number;
    data?: PageResultUserVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultQuestionBankSimpleVo = {
    /** 业务状态 */
    code?: number;
    data?: QuestionBankSimpleVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultQuestionBankVo = {
    /** 业务状态 */
    code?: number;
    data?: QuestionBankVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultQuestionSimpleVo = {
    /** 业务状态 */
    code?: number;
    data?: QuestionSimpleVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultQuestionVo = {
    /** 业务状态 */
    code?: number;
    data?: QuestionVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultString = {
    /** 业务状态 */
    code?: number;
    /** 返回数据 */
    data?: string;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultThumbSimpleVo = {
    /** 业务状态 */
    code?: number;
    data?: ThumbSimpleVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultThumbVo = {
    /** 业务状态 */
    code?: number;
    data?: ThumbVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultUserSimpleVo = {
    /** 业务状态 */
    code?: number;
    data?: UserSimpleVo;
    /** 消息提示 */
    msg?: string;
  };

  type CommonResultUserVo = {
    /** 业务状态 */
    code?: number;
    data?: UserVo;
    /** 消息提示 */
    msg?: string;
  };

  type deleteQuestionBankParams = {
    /** 题库表ID */
    id: number;
  };

  type deleteQuestionParams = {
    /** 题目ID */
    id: number;
  };

  type deleteUserParams = {
    /** 用户ID */
    id: number;
  };

  type FavouriteAddReqDTO = {
    /** 用户id */
    userId?: number;
    /** 题目id */
    questionId: number;
  };

  type getCommentListByQuestionIdParams = {
    /** 题目Id */
    questionId: number;
  };

  type getCommentPageParams = {
    commentPageReqDTO: CommentPageReqDTO;
  };

  type getCommentParams = {
    /** 评论表ID */
    id: number;
  };

  type getCommentVOParams = {
    /** 评论表ID */
    id: number;
  };

  type getQuestionBankIdListParams = {
    /** 题目id */
    id: number;
  };

  type getQuestionBankPageParams = {
    questionBankPageReqDTO: QuestionBankPageReqDTO;
  };

  type getQuestionBankParams = {
    /** 题库表ID */
    id: number;
  };

  type getQuestionBankVOParams = {
    /** 题库表ID */
    id: number;
  };

  type getQuestionListParams = {
    /** 题库id */
    questionBankId: number;
  };

  type getQuestionPageParams = {
    questionPageReqDTO: QuestionPageReqDTO;
  };

  type getQuestionParams = {
    /** 题目ID */
    id: number;
  };

  type getQuestionVOParams = {
    /** 题目ID */
    id: number;
  };

  type getThumbPageParams = {
    thumbPageReqDTO: ThumbPageReqDTO;
  };

  type getThumbParams = {
    /** 点赞表ID */
    id: number;
  };

  type getThumbVOParams = {
    /** 点赞表ID */
    id: number;
  };

  type getUserPageParams = {
    userPageReqDTO: UserPageReqDTO;
  };

  type getUserParams = {
    /** 用户ID */
    id: number;
  };

  type getUserQuestionBankPageParams = {
    pageParam: PageParam;
  };

  type getUserQuestionPageParams = {
    UserQuestionPageReqDTO: UserQuestionPageReqDTO;
  };

  type getUserSignInRecordFinalParams = {
    year: number;
  };

  type getUserSignInRecordOptimizeParams = {
    year: number;
  };

  type getUserSignInRecordParams = {
    year: number;
  };

  type getUserVOParams = {
    /** 用户ID */
    id: number;
  };

  type LoginUserVO = {
    /** 用户 id */
    id?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色：user/admin */
    userRole?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type PageParam = {
    /** 页码，从 1 开始 */
    pageNo: number;
    /** 每页条数，最大值为 100 */
    pageSize: number;
  };

  type PageResultCommentVo = {
    /** 数据 */
    list: CommentVo[];
    /** 总量 */
    total: number;
  };

  type PageResultQuestionBankVo = {
    /** 数据 */
    list: QuestionBankVo[];
    /** 总量 */
    total: number;
  };

  type PageResultQuestionVo = {
    /** 数据 */
    list: QuestionVo[];
    /** 总量 */
    total: number;
  };

  type PageResultThumbVo = {
    /** 数据 */
    list: ThumbVo[];
    /** 总量 */
    total: number;
  };

  type PageResultUserVo = {
    /** 数据 */
    list: UserVo[];
    /** 总量 */
    total: number;
  };

  type QuestionAddReqDTO = {
    /** 标题 */
    title: string;
    /** 内容 */
    content?: string;
    /** 标签列表 */
    tags: string[];
    /** 推荐答案 */
    answer: string;
    /** 题目来源 */
    source: string;
    /** 仅会员可见 */
    needVip?: boolean;
    /** 浏览量 */
    viewNum?: number;
    /** 点赞数 */
    thumbNum?: number;
    /** 收藏数 */
    favourNum?: number;
  };

  type QuestionBankAddReqDTO = {
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 图片 */
    picture: string;
    /** 状态：0-待审核, 1-通过, 2-拒绝 */
    reviewStatus?: number;
    /** 审核信息 */
    reviewMessage: string;
    /** 审核人 id */
    reviewerId: number;
    /** 审核时间 */
    reviewTime: string;
    /** 浏览量 */
    viewNum?: number;
    /** 优先级 */
    priority?: number;
  };

  type QuestionBankBatchReviewReqDTO = {
    /** 审核状态：0-待审核, 1-通过, 2-拒绝 */
    reviewStatus: number;
    /** 审核信息 */
    reviewMessage: string;
    /** 题库id */
    idList: number[];
  };

  type QuestionBankPageReqDTO = {
    /** 页码，从 1 开始 */
    pageNo: number;
    /** 每页条数，最大值为 100 */
    pageSize: number;
    /** id */
    id?: number;
    title: string;
    /** 状态：0-待审核, 1-通过, 2-拒绝 */
    reviewStatus?: number;
  };

  type QuestionBankQuestionAddReqDTO = {
    /** 题库 id */
    questionBankId?: number;
    /** 题目 id */
    questionId?: number;
    /** 题目顺序（题号） */
    questionOrder?: number;
    /** 创建用户 id */
    userId?: number;
  };

  type QuestionBankQuestionBatchRemoveReqDTO = {
    /** 题目id列表 */
    questionIds: number[];
    /** 题库id列表 */
    questionBankIds: number[];
  };

  type QuestionBankQuestionBatchReqDTO = {
    /** 题目id列表 */
    questionIds: number[];
    /** 题库id */
    questionBankIds: number[];
  };

  type QuestionBankReviewReqDTO = {
    /** id */
    id?: number;
    /** 审核信息 */
    reviewMessage: string;
    /** 审核状态：0-待审核, 1-通过, 2-拒绝 */
    reviewStatus?: number;
  };

  type QuestionBankSimpleVo = {
    /** id */
    id?: number;
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 图片 */
    picture: string;
    /** 浏览量 */
    viewNum?: number;
    /** 优先级 */
    priority?: number;
    /** 题目信息 */
    questionVoList?: QuestionVo[];
  };

  type QuestionBankUpdateReqDTO = {
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 图片 */
    picture: string;
    /** 状态：0-待审核, 1-通过, 2-拒绝 */
    reviewStatus?: number;
    /** 审核信息 */
    reviewMessage: string;
    /** 审核人 id */
    reviewerId: number;
    /** 审核时间 */
    reviewTime: string;
    /** 浏览量 */
    viewNum?: number;
    /** 优先级 */
    priority?: number;
    /** id */
    id: number;
  };

  type QuestionBankVo = {
    /** id */
    id?: number;
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 图片 */
    picture: string;
    /** 浏览量 */
    viewNum?: number;
    /** 优先级 */
    priority?: number;
    /** 题目信息 */
    questionList?: QuestionVo[];
    /** 审核状态 */
    reviewStatus?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 审核时间 */
    reviewTime: string;
    /** 审核信息 */
    reviewMessage: string;
    /** 审核人 */
    reviewer?: string;
    /** 审核人id */
    reviewerId?: number;
    /** 创建人id */
    creator?: string;
    /** 创建人名称 */
    creatorName?: string;
  };

  type QuestionBatchReviewReqDTO = {
    /** 审核状态： 1-通过, 2-拒绝 */
    reviewStatus: number;
    /** 审核信息 */
    reviewMessage: string;
    /** 题目id */
    idList: number[];
  };

  type QuestionDeleteReqDTO = {
    /** 题目id列表 */
    idList: number[];
  };

  type QuestionPageReqDTO = {
    /** 页码，从 1 开始 */
    pageNo: number;
    /** 每页条数，最大值为 100 */
    pageSize: number;
    /** id */
    id?: number;
    /** 标题 */
    title: string;
    /** 审核状态 */
    reviewStatus: number;
    /** 题库id */
    questionBankId?: number;
    /** 题目列表 */
    questionIdList?: number[];
  };

  type QuestionReviewReqDTO = {
    /** id */
    id?: number;
    /** 审核信息 */
    reviewMessage: string;
    /** 审核状态：1-通过, 2-拒绝 */
    reviewStatus?: number;
  };

  type QuestionSimpleVo = {
    /** id */
    id?: number;
    /** 标题 */
    title: string;
    /** 内容 */
    content: string;
    /** 标签列表（json 数组） */
    tags: string[];
    /** 推荐答案 */
    answer: string;
    /** 题目来源 */
    source: string;
    /** 仅会员可见（1 表示仅会员可见） */
    needVip?: boolean;
    /** 浏览量 */
    viewNum?: number;
    /** 点赞数 */
    thumbNum?: number;
    /** 收藏数 */
    favourNum?: number;
    /** 当前用户的点赞状态 */
    thumbStatus?: boolean;
    /** 当前用户的收藏状态 */
    favourStatus?: boolean;
  };

  type QuestionUpdateReqDTO = {
    /** 标题 */
    title: string;
    /** 内容 */
    content?: string;
    /** 标签列表 */
    tags: string[];
    /** 推荐答案 */
    answer: string;
    /** 题目来源 */
    source: string;
    /** 仅会员可见 */
    needVip?: boolean;
    /** 浏览量 */
    viewNum?: number;
    /** 点赞数 */
    thumbNum?: number;
    /** 收藏数 */
    favourNum?: number;
    /** id */
    id: number;
  };

  type QuestionVo = {
    /** id */
    id?: number;
    /** 标题 */
    title: string;
    /** 内容 */
    content: string;
    /** 标签列表（json 数组） */
    tags: string[];
    /** 推荐答案 */
    answer: string;
    /** 题目来源 */
    source: string;
    /** 仅会员可见（1 表示仅会员可见） */
    needVip?: boolean;
    /** 浏览量 */
    viewNum?: number;
    /** 点赞数 */
    thumbNum?: number;
    /** 收藏数 */
    favourNum?: number;
    /** 审核状态 */
    reviewStatus?: number;
    /** 审核时间 */
    reviewTime: string;
    /** 审核信息 */
    reviewMessage: string;
    /** 审核人 */
    reviewer?: string;
    /** 审核人头像 */
    reviewerAvatar?: string;
    /** 作者头像 */
    authorAvatar?: string;
    /** 审核人id */
    reviewerId?: number;
    /** 创建人id */
    creator?: string;
    /** 创建人名称 */
    creatorName?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type resetUserPasswordParams = {
    userId: number;
  };

  type searchQuestionBankListParams = {
    keyword: string;
  };

  type ThumbAddReqDTO = {
    /** 用户id */
    userId?: number;
    /** 目标id（题目id或评论id） */
    targetId: number;
    /** 目标类型：0-题目，1-评论 */
    targetType: string;
  };

  type ThumbPageReqDTO = {
    /** 页码，从 1 开始 */
    pageNo: number;
    /** 每页条数，最大值为 100 */
    pageSize: number;
    /** id */
    id?: number;
    /** 用户id */
    userId?: number;
    /** 目标id（题目id或评论id） */
    targetId?: number;
    /** 目标类型：0-题目，1-评论 */
    targetType?: string;
  };

  type ThumbSimpleVo = {
    /** id */
    id?: number;
    /** 用户id */
    userId?: number;
    /** 目标id（题目id或评论id） */
    targetId?: number;
    /** 目标类型：0-题目，1-评论 */
    targetType?: string;
  };

  type ThumbVo = {
    /** id */
    id?: number;
    /** 用户id */
    userId?: number;
    /** 目标id（题目id或评论id） */
    targetId?: number;
    /** 目标类型：0-题目，1-评论 */
    targetType?: string;
  };

  type updateQuestionBank1Params = {
    /** 题目id */
    id: number;
    /** 题目所属题库id */
    questionBankId: number;
  };

  type uploadFileParams = {
    /** 业务枚举 */
    biz: string;
  };

  type UserAddReqDTO = {
    /** 账号 */
    userAccount?: string;
    /** 密码 */
    userPassword?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色 */
    userRole?: string;
  };

  type UserLoginReqDTO = {
    /** 账号 */
    userAccount: string;
    /** 密码 */
    userPassword: string;
  };

  type UserPageReqDTO = {
    /** 页码，从 1 开始 */
    pageNo: number;
    /** 每页条数，最大值为 100 */
    pageSize: number;
    /** id */
    id?: number;
    /** 用户昵称 */
    userName?: string;
  };

  type UserProfileUpdateReqDTO = {
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
  };

  type UserQuestionPageReqDTO = {
    /** 页码，从 1 开始 */
    pageNo: number;
    /** 每页条数，最大值为 100 */
    pageSize: number;
    /** 标题 */
    title?: string;
    /** 是否仅会员可见 */
    needVip?: number;
    /** 标签 */
    tag?: string;
    /** 题库id */
    questionBankId?: number;
  };

  type UserRegisterReqDTO = {
    /** 账号 */
    userAccount: string;
    /** 密码 */
    userPassword: string;
    /** 确认密码 */
    checkPassword: string;
  };

  type UserSimpleVo = {
    /** id */
    id?: number;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色：user/admin/ban */
    userRole?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type UserUpdateReqDTO = {
    /** 账号 */
    userAccount?: string;
    /** 密码 */
    userPassword?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色 */
    userRole?: string;
    /** id */
    id: number;
  };

  type UserVo = {
    /** id */
    id?: number;
    /** 账号 */
    userAccount?: string;
    /** 密码 */
    userPassword?: string;
    /** 微信开放平台id */
    unionId?: string;
    /** 公众号openId */
    mpOpenId?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户简介 */
    userProfile?: string;
    /** 用户角色：user/admin */
    userRole?: string;
    /** 用户状态（0正常 1停用） */
    userStatus?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };
}
