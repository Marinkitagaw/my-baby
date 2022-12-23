import * as api from '@/common/services/workflow';
import { message } from 'antd';
import { history } from 'umi';

export default {
  namespace: 'processInstance',
  state: {
    page: {},
    allTasks: [],
  },
  effects: {
    *listProcessInstances({ payload, callback }, { call, put }) {
      const response = yield call(api.listProcessInstances, payload);
      if (callback) {
        callback(response);
      }
      yield put({
        type: '$listProcessInstances',
        payload: response,
      });
    },
    *listAllTasks({ payload, callback }, { call, put }) {
      const response = yield call(api.listAllTasks, payload);
      if (callback) {
        callback(response);
      }
      yield put({
        type: '$listAllTasks',
        payload: response,
      });
    },
    *deleteProcessInstance({ payload, callback }, { call }) {
      yield call(api.deleteProcessInstance, payload);
      const response = yield call(api.listProcessInstances, payload);
      if (response.status !== 500) {
        message.success('流程实例刪除成功');
        callback(response);
      }
    },
    // 批量删除流程实例
    *deleteProcessInstances({ payload, callback }, { call }) {
      const response = yield call(api.deleteProcessInstances, payload);
      if (response.status !== 500) {
        message.success('流程实例刪除成功');
        callback(response);
      }
    },

    *suspendProcessInstance({ payload }, { call, put }) {
      yield call(api.deleteProcessInstance, payload);
      const response = yield call(api.suspendProcessInstance, payload);
      yield put({
        type: '$listProcessInstances',
        payload: response,
      });
    },
    *activateProcessInstance({ payload }, { call, put }) {
      yield call(api.activateProcessInstance, payload);
      const response = yield call(api.listProcessInstances, payload);
      yield put({
        type: '$listProcessInstances',
        payload: response,
      });
    },
    *getDefinitionInfo({ payload, callback }, { call, put }) {
      const response = yield call(api.getDefinitionInfo, payload);
      yield put({
        type: '$getDefinitionInfo',
        payload: response,
      });
      if (callback) callback(response);
    },

    // 获取任务流程图
    *getProcessXml({ payload }, { call, put }) {
      yield put({ type: 'clear' });
      const response = yield call(api.getProcessXml, payload);
      if (response && !(response.status === 500)) {
        yield put({
          type: '$getProcessXml',
          payload: response,
        });
      }
    },

    // 创建流程图模板
    *createProcessDefinition({ payload }, { call }) {
      const res = yield call(api.createProcessDefinition, payload);
      if (res.status === 500) return;
      history.go(-1);
      message.success('保存成功');
    },

    // 编辑流程图模板
    *modifyProcessDefinition({ payload }, { call }) {
      const res = yield call(api.modifyProcessDefinition, payload);
      if (res.status === 500) return;
      history.go(-1);
      message.success('保存成功');
    },

    // 获取流程图模板详情
    *getProcessDefinition({ payload }, { call, put }) {
      const res = yield call(api.getProcessDefinition, payload);
      if (res.status === 500) return;
      yield put({
        type: '$getProcessDefinition',
        payload: res,
      });
    },
    // 激活流程实例
    *activateProcessInstances({ payload }, { call, put }) {
      const result = yield call(api.activateProcessInstances, payload);
      if (!result) {
        message.success('已成功激活流程实例');
        yield put({ type: 'listProcessInstances' });
      }
    },
    // 挂起流程实例
    *hangProcessInstances({ payload }, { call, put }) {
      const result = yield call(api.hangProcessInstances, payload);
      if (!result) {
        message.success('已成功挂起流程实例');
        yield put({ type: 'listProcessInstances' });
      }
    },

    // 更新流程
    *evaluateParticipants({ payload }, { call }) {
      yield call(api.evaluateParticipants, payload);
    },

    // 获取外单位协同会签
    *getSupplierDescription({ payload }, { call, put }) {
      const res = yield call(api.getSupplierDescription, payload);
      if (Array.isArray(res)) {
        yield put({ type: '$getSupplierDescription', payload: res });
      }
    },

    // 保存外单位协同会签
    *saveSupplierDescription({ payload, callback }, { call }) {
      const res = yield call(api.saveSupplierDescription, payload);
      if (res && res.status === 500) return;
      if (callback) {
        yield callback();
      }
    },
    // 删除外单位协同会签
    *deleteSupplierDescription({ payload, callback }, { call }) {
      const res = yield call(api.deleteSupplierDescription, payload);
      if (res && res.status === 500) return;
      if (callback) {
        yield callback();
      }
    },
  },
  reducers: {
    $listProcessInstances(state, action) {
      return {
        ...state,
        page: action.payload,
      };
    },
    $listAllTasks(state, action) {
      return {
        ...state,
        allTasks: action.payload,
      };
    },
    $getDefinitionInfo(state, action) {
      return {
        ...state,
        definitionInfo: action.payload,
      };
    },
    $getProcessXml(state, action) {
      return {
        ...state,
        xml: action.payload,
      };
    },
    $getProcessDefinition(state, action) {
      return {
        ...state,
        definitionChartInfo: action.payload,
      };
    },
    $getSupplierDescription(state, action) {
      return {
        ...state,
        supplierDescriptionList: action.payload,
      };
    },
    clear(state) {
      return {
        ...state,
        xml: {},
      };
    },
  },
};
