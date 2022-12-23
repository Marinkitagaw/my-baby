import * as api from '@/common/services/revieworder';
import { message } from 'antd';
import { history } from 'umi';

export default {
  namespace: 'reviewTask',

  state: {
    orders: {},
    order: {},
    modelSeries: [],
    repositories: [],
    modelParticipants: [],
    page: {},
    otherComments: [],
    results: [],
    implement: [],
    participants: [],
    commonTeams: {},
    xml: {},
    allImplement: [],
    allExpertComments: [],
    implParticipants: [],
  },

  effects: {
    // 获取专家列表
    *listParticipants({ payload }, { call, put }) {
      const response = yield call(api.listParticipants, payload);
      yield put({ type: '$listParticipants', payload: response });
    },

    // 评审单列表
    *listReviewOrders({ payload }, { call, put }) {
      const response = yield call(api.listReviewOrders, payload);
      yield put({ type: '$listReviewOrders', payload: response });
    },
    // 詳情頁面
    *getReviewOrder({ payload, callback }, { call, put }) {
      const response = yield call(api.getReviewOrder, payload);
      if (response && response.status && response.status === 404) {
        history.push('/app/meeting/not-jurisdiction');
        return;
      }
      if (!response) return;
      if (callback) {
        callback(response);
      }
      yield put({ type: '$getReviewOrder', payload: response });
      if (response && response.repositoryId) {
        yield put({ type: 'getProductInfo', payload: { repositoryId: response.repositoryId } });
      }
    },
    // 创建评审单
    *createReviewOrder({ payload }, { call }) {
      yield call(api.createReviewOrder, payload);
      // yield put({ type: '$save', payload: response });
    },
    // 编辑评审单
    *modifyReviewOrder({ payload }, { call, put }) {
      const response = yield call(api.editReviewOrder, payload);
      if (response.id) yield put({ type: 'listReviewOrders', payload: response });
    },
    // 删除评审单
    *deleteReviewOrder({ payload }, { call, put }) {
      const response = yield call(api.deleteReviewOrder, payload);
      if (response.id) yield put({ type: 'listReviewOrders', payload: response });
    },
    // 获取产品库系列
    *getModelSeries({ payload }, { call, put }) {
      const response = yield call(api.getModelSeries, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getModelSeries',
          payload: response,
        });
      }
    },

    // 产品系列下的产品
    *getRepositories({ payload }, { call, put }) {
      const response = yield call(api.getRepositories, payload);
      yield put({
        type: '$getRepositories',
        payload: response.content,
      });
    },

    // 获取产品库详情
    *getProductInfo({ payload }, { call, put }) {
      const response = yield call(api.getProductInfo, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getProductInfo',
          payload: response,
        });
      }
    },

    // 获取任务流程图
    *getTaskXml({ payload }, { call, put }) {
      yield put({ type: 'clear' });
      const response = yield call(api.getTaskXml, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getTaskXml',
          payload: response,
        });
      }
    },

    // 获取其他专家意见
    *getOtherComments({ payload }, { call, put }) {
      const response = yield call(api.getOtherComments, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getOtherComments',
          payload: response,
        });
      }
    },

    // 获取历史专家意见
    *getHistoryComments({ payload }, { call, put }) {
      const response = yield call(api.getHistoryComments, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getHistoryComments',
          payload: response,
        });
      }
    },

    // 获取任务相关专家意见
    *getResults({ payload }, { call, put }) {
      const response = yield call(api.getResults, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getResults',
          payload: response,
        });
      }
    },

    // 获取代理专家意见
    *getAgency({ payload }, { call, put }) {
      const response = yield call(api.getAgency, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getAgency',
          payload: response,
        });
      }
    },

    // 获取代理专家意见详情
    *getAgencyInfo({ payload, callback }, { call, put }) {
      const response = yield call(api.getAgencyInfo, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getAgencyInfo',
          payload: response,
        });
        callback(response);
      }
    },

    // 获取代理专家意见评审内容
    *getAgencyDataResult({ payload, callback }, { call }) {
      const response = yield call(api.getAgencyDataResult, payload);
      if (response && !(response.status === 500)) {
        callback(response);
      }
    },

    // 删除代理专家意见
    *deleteAgency({ payload }, { call, put }) {
      const response = yield call(api.deleteAgency, payload);
      if (!(response.status === 500)) {
        yield put({
          type: 'getAgency',
          payload,
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },

    // 保存专家意见
    *saveComments({ payload, callback }, { call }) {
      const response = yield call(api.saveComments, payload);
      if (response.status === 500) return;
      if (callback) {
        callback();
      }
    },

    // 获取评审意见落实情况
    *implement({ payload }, { call, put }) {
      const response = yield call(api.implement, payload);
      if (!response || !Array.isArray(response)) return;
      yield put({
        type: '$implement',
        payload: response,
      });
    },

    *allImplement({ payload }, { call, put }) {
      yield put({
        type: 'clear',
      });
      const response = yield call(api.allImplement, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$allImplement',
          payload: response,
        });
      }
    },
    *allExpertComments({ payload }, { call, put }) {
      yield put({
        type: 'clear',
      });
      const response = yield call(api.allExpertComments, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$allExpertComments',
          payload: response,
        });
      }
    },
    *getImplParticipants({ payload }, { call, put }) {
      const response = yield call(api.getImplParticipants, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getImplParticipants',
          payload: response,
        });
      }
    },

    // 修改评审意见落实情况
    *modifyImplement({ payload }, { call, put }) {
      const response = yield call(api.modifyImplement, payload);
      if (response.status === 500) return;
      message.success('保存成功');
      yield put({
        type: 'allImplement',
        payload,
      });
    },
    *onSaveContent({ payload }, { call }) {
      const response = yield call(api.onSaveContent, payload);
      if (response.status === 500) return;
      message.success('保存成功');
      // yield put({
      //   type: 'allImplement',
      //   payload,
      // });
    },

    // 查询任务参与者
    *getParticipants({ payload }, { call, put }) {
      const response = yield call(api.getParticipants, payload);
      if (!response || !Array.isArray(response)) return;
      // yield put({
      //   type: 'clear',
      //   payload: response,
      // });
      yield put({
        type: '$getParticipants',
        payload: response,
      });
    },

    // 创建常用团队
    *createCommonTeams({ payload, callback }, { call }) {
      const response = yield call(api.createCommonTeams, payload);
      if (response && response.id) {
        yield callback && callback(response);
        message.success('创建成功');
      } else {
        message.error('创建失败');
      }
    },

    // 查询常用团队
    *getCommonTeams({ payload }, { call, put }) {
      const response = yield call(api.getCommonTeams, payload);
      yield put({
        type: '$getCommonTeams',
        payload: response,
      });
    },

    // 任务页面批量添加重用模板中的成员
    *addCommonTeams({ payload, callback }, { call, put }) {
      const response = yield call(api.addCommonTeams, payload);
      if (!response) {
        yield put({
          type: '$addCommonTeams',
          payload: response,
        });
        yield callback();
      }
    },

    // 删除团队
    *deleteTeam({ payload, callback }, { call }) {
      const response = yield call(api.deleteTeam, payload);
      if (!response && callback) {
        yield callback();
      }
    },

    // 通过计算返回改系统内所有有关用户
    *getAllUsers({ payload }, { call, put }) {
      const response = yield call(api.getAllUsers, payload);
      if (!response || !Array.isArray(response)) return;
      yield put({
        type: '$getAllUsers',
        payload: response,
      });
    },

    // 添加流程参与者
    *addParticipants({ payload }, { call }) {
      const response = yield call(api.addParticipants, payload);
      if (response && response.status === 500) {
        message.error('添加失败');
        return;
      }
      message.success('添加成功');
    },

    // 任务页面角色移除成员
    *deleteParticipants({ payload }, { call }) {
      const response = yield call(api.deleteParticipants, payload);
      if (response && response.status === 500) {
        message.error('移除失败');
        return;
      }
      message.success('移除成功');
      // yield put({
      //   type: 'getParticipants',
      //   payload,
      // });
    },

    // 流程任务移除参与者
    *deleteProcessParticipants({ payload }, { call }) {
      const response = yield call(api.deleteProcessParticipants, payload);
      if (response && response.status === 500) {
        message.error('移除失败');
        return;
      }
      message.success('移除成功');
    },

    // 任务页面批量添加成员
    *batchAddParticipants({ payload }, { call }) {
      const response = yield call(api.batchAddParticipants, payload);
      if (response && !response.status === 500) {
        message.error('添加失败');
        return;
      }
      message.success('添加成功');
    },

    *batchAddProcessParticipants({ payload }, { call }) {
      const response = yield call(api.batchAddProcessParticipants, payload);
      if (response === undefined) {
        message.error('添加失败');
        return;
      }
      message.success('添加成功');
    },

    // 获取流程团队
    *getProcessParticipants({ payload }, { call, put }) {
      const response = yield call(api.getProcessParticipants, payload);
      yield put({
        type: '$getProcessParticipants',
        payload: response,
      });
    },

    // 获取专家意见
    *getAllComments({ payload }, { call, put }) {
      const response = yield call(api.getAllComments, payload);
      yield put({
        type: '$getAllComments',
        payload: response,
      });
    },

    // 保存上传文件
    *saveCommentFile({ payload, callback }, { call }) {
      const response = yield call(api.saveCommentFile, payload);
      if (response && response.status === 500) return;
      if (callback) {
        callback();
      }
    },

    // 删除上传文件
    *deleteCommentFile({ payload, callback }, { call }) {
      const response = yield call(api.deleteCommentFile, payload);
      if (response && response.status === 500) return;
      if (callback) {
        callback();
      }
    },

    // 获取结论历史记录
    *getConclusionHistory({ payload, callback }, { call, put }) {
      const response = yield call(api.getConclusionHistory, payload);
      if (response && response.content && Array.isArray(response.content)) {
        yield put({
          type: '$getConclusionHistory',
          payload: response,
        });
        if (callback) {
          callback(response);
        }
      }
    },
  },
  reducers: {
    $getProductInfo(state, action) {
      return {
        ...state,
        repositoryIdInfo: action.payload,
      };
    },

    $getModelSeries(state, action) {
      return {
        ...state,
        modelSeries: action.payload,
      };
    },
    $getRepositories(state, action) {
      return {
        ...state,
        repositories: action.payload,
      };
    },
    $getReviewOrder(state, action) {
      return {
        ...state,
        order: action.payload,
      };
    },
    $listReviewOrders(state, action) {
      return {
        ...state,
        orders: action.payload,
        page: action.payload,
      };
    },
    $listParticipants(state, action) {
      return {
        ...state,
        modelParticipants: action.payload,
      };
    },
    $getTaskXml(state, action) {
      return {
        ...state,
        xml: action.payload,
      };
    },
    $getOtherComments(state, action) {
      return {
        ...state,
        otherComments: action.payload,
      };
    },
    $getHistoryComments(state, action) {
      return {
        ...state,
        historComments: action.payload,
      };
    },
    $getResults(state, action) {
      return {
        ...state,
        results: action.payload,
      };
    },
    $implement(state, action) {
      return {
        ...state,
        implement: action.payload,
      };
    },
    $allImplement(state, action) {
      return {
        ...state,
        allImplement: action.payload,
      };
    },
    $allExpertComments(state, action) {
      return {
        ...state,
        allExpertComments: action.payload,
      };
    },
    $getImplParticipants(state, action) {
      return {
        ...state,
        implParticipants: action.payload,
      };
    },
    $getParticipants(state, action) {
      return {
        ...state,
        participants: action.payload,
      };
    },
    $getCommonTeams(state, action) {
      return {
        ...state,
        commonTeams: action.payload,
      };
    },
    $getAllUsers(state, action) {
      return {
        ...state,
        allUsers: action.payload,
      };
    },
    $getProcessParticipants(state, action) {
      return {
        ...state,
        processParticipants: action.payload,
      };
    },
    $getAllComments(state, action) {
      return {
        ...state,
        allComments: action.payload,
      };
    },
    $getAgency(state, action) {
      return {
        ...state,
        agency: action.payload,
      };
    },
    $getAgencyInfo(state, action) {
      return {
        ...state,
        agencyInfo: action.payload,
      };
    },
    $getConclusionHistory(state, action) {
      return {
        ...state,
        conclusionHistory: action.payload,
      };
    },
    clear(state) {
      return {
        ...state,
        xml: {},
        participants: [],
        agencyInfo: null,
        allImplement: [],
        allExpertComments: [],
        implParticipants: [],
        commonTeams: {},
      };
    },
  },
};
