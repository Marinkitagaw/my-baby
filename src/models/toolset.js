import * as service from '@/common/services/toolset/list/toolset';
import { message } from 'antd';

export default {
  namespace: 'toolset',
  state: {
    page: {},
    List: [],
    treeData: [],
    dataSource: [],
    toolSetPage: '',
    size: '',
    loading: false,
    majorData: [],
    classificationData: [],
    stepData: [],
    searchParams: {
      pageSize: 10,
      pageNum: 1,
      bool: '',
      name: '',
      applicant: '',
      stateIdentifier: '',
    },
    category: [],
    lifeState: [],
    majorDict: [],
    appDict: [],
  },

  effects: {
    //获取工具集列表
    *getToolList({ payload }, { call, put }) {
      const response = yield call(service.getToolList, payload);
      yield put({
        type: 'updateState',
        payload: {
          List: response,
          // searchParams: response,
        },
      });
      return response;
    },
    //加载数据
    *loadingData({ payload }, { call, put }) {
      const response = yield call(service.loadingData, payload);
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response,
        },
      });
      return response;
    },

    //获取申请单列表
    *getApplyList({ payload }, { call, put }) {
      const response = yield call(service.getApplyList, payload);
      yield put({
        type: 'updateState',
        payload: {
          List: response,
        },
      });
      return response;
    },
    //创建工具集
    *createToolSet({ payload, callback }, { call }) {
      const response = yield call(service.createToolSet, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },

    //编辑工具集
    *editToolSet({ payload, callback }, { call }) {
      const response = yield call(service.editToolSet, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },

    //编辑工具集
    *fixToolSet({ payload, callback }, { call }) {
      const response = yield call(service.fixToolSet, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },
    //创建时提交流程申请
    *subApply({ payload, callback }, { call }) {
      const response = yield call(service.subApply, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },
    //提交更新流程申请
    *subUpdateApply({ payload, callback }, { call }) {
      const response = yield call(service.subUpdateApply, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },
    //提交禁用流程申请
    *subDisableApply({ payload, callback }, { call }) {
      const response = yield call(service.subDisableApply, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },
    //获取树结点
    *getTreeData({ payload, callback }, { call, put }) {
      const response = yield call(service.getTreeData, payload);
      yield put({
        type: 'updateState',
        payload: {
          treeData: response,
        },
      });
    },
    //获得CategoryId
    *getCategoryId({ payload }, { call, put }) {
      const response = yield call(service.getCategoryId, payload);
      yield put({
        type: 'updateState',
        payload: {
          category: response,
        },
      });
      return response;
    },
    *getCreateForm({ payload, callback }, { call }) {
      const response = yield call(service.getCreateForm, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },

    //获取分类数据
    *getMajorData({ payload }, { call, put }) {
      const response = yield call(service.getMajorData, payload);
      yield put({
        type: 'updateState',
        payload: {
          majorData: response,
        },
      });
    },
    //获取分类数据
    *getStepData({ payload }, { call, put }) {
      const response = yield call(service.getStepData, payload);
      yield put({
        type: 'updateState',
        payload: {
          stepData: response,
        },
      });
    },

    //获取分类数据
    *getClassificationData({ payload }, { call, put }) {
      const response = yield call(service.getClassificationData, payload);
      yield put({
        type: 'updateState',
        payload: {
          classificationData: response,
        },
      });
    },

    //获取状态
    *getState({ payload }, { call, put }) {
      const response = yield call(service.getState, payload);
      yield put({
        type: 'updateState',
        payload: {
          lifeState: response,
        },
      });
    },
    *getMajorDictionary({ payload }, { call, put }) {
      const response = yield call(service.getMajorDictionary, payload);
      yield put({
        type: 'updateState',
        payload: {
          majorDict: response,
        },
      });
    },
    *getAppDictionary({ payload }, { call, put }) {
      const response = yield call(service.getMajorDictionary, payload);
      yield put({
        type: 'updateState',
        payload: {
          appDict: response,
        },
      });
    },
    //删除工作集
    *deleteToolSet({ payload }, { call }) {
      const response = yield call(service.deleteToolSet, payload) ?? {};
      return response;
    },
  },
  reducers: {
    updateState: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: true,
      };
    },
    // search: (state, { payload }) => {
    //   return {
    //     ...state,
    //     ...payload,
    //     loading: true,
    //   };
    // },
  },
};
