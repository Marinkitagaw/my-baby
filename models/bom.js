import * as api from '@/services/data/bom';

export default {
  namespace: 'bom',
  state: {
    ultraDirectoriesInfo: {},
    list: [],
    code: {},
    rebind: [],
    update: [],
    create: [],
  },

  effects: {
    *importPreviewComponents({ payload, callback }, { call }) {
      const res = yield call(api.DPartImportPreviewComponents, payload);
      if (callback) yield callback(res);
    },
    *uploadComponents({ payload, callback }, { call }) {
      const res = yield call(api.uploadComponents, payload);
      if (callback) yield callback(res);
    },
    *getProcessData({ payload, callback }, { call, put }) {
      const res = yield call(api.getProcessData, payload);
      if (res && Array.isArray(res) && res.length) {
        yield put({ type: 'processData', payload: res });
        if (callback) yield callback(res);
      }
    },
    *getUltraDirectoriesInfo({ payload, callback }, { call, put }) {
      const res = yield call(api.getUltraDirectoriesInfo, payload);
      if (res && res.id) {
        yield put({ type: '$getUltraDirectoriesInfo', payload: res });
        if (callback) yield callback(res);
      }
    },
    *addProcessData({ payload, callback }, { call, put }) {
      const res = yield call(api.addProcessData, payload);
      if (!res) {
        yield put({ type: 'getProcessData', payload: payload.processInstanceId });
        yield callback();
      }
    },
    *removeProcessData({ payload, callback }, { call, put }) {
      const res = yield call(api.removeProcessData, payload);
      if (!res) {
        yield put({ type: 'getProcessData', payload: payload.processInstanceId });
        yield callback();
      }
    },
    // bom视图转换
    *bomViewTurn({ payload, callback }, { call }) {
      const res = yield call(api.bomViewTurn, payload);
      if (res && res.status === 500) return;
      if (callback) {
        callback(res);
      }
    },

    // 获取下游视图
    *getTransformType({ payload, callback }, { call }) {
      const res = yield call(api.getTransformType, payload);
      if (Array.isArray(res)) {
        if (callback) {
          callback(res);
        }
      }
    },
    *lifecycleStates({ payload, callback }, { call }) {
      const res = yield call(api.lifecycleStates, payload);
      if (Array.isArray(res.content)) {
        if (callback) {
          callback(res.content);
        }
      }
    },
    *createUltraDirectory({ payload, callback }, { call }) {
      const res = yield call(api.createUltraDirectory, payload);
      if ((!res.message || res.status !== 500) && callback) {
        callback(res);
      }
    },
    *updateUltraDirectory({ payload, callback }, { call }) {
      const res = yield call(api.updateUltraDirectory, payload);
      if ((!res.message || res.status !== 500) && callback) {
        callback(res);
      }
    },
    *deleteUltraDirectory({ payload, callback }, { call }) {
      const res = yield call(api.deleteUltraDirectory, payload);
      if (!res && callback) {
        callback();
      }
    },
    *ResourceInfoList({ payload, callback }, { call, put }) {
      const res = yield call(api.ResourceInfoList, payload);
      if (res) {
        yield put({ type: 'list', payload: res });
        if (callback) callback(res);
      }
    },
    *ResourceInfo({ payload, callback }, { call, put }) {
      const res = yield call(api.ResourceInfo, payload);
      if (res && res.id) {
        yield put({ type: 'code', payload: res });
        if (callback) callback(res);
      }
    },
    *RebindResourceInfo({ payload, callback }, { call, put }) {
      const res = yield call(api.RebindResourceInfo, payload);
      if (res && res.id) {
        yield put({ type: 'rebind', payload });
        yield callback && callback(res);
      }
    },
    // 创建节点
    *createProduct({ payload, callback }, { call, put }) {
      const response = yield call(api.createProduct, payload);
      if (response && response.id) {
        if (callback) callback(response);
      }
      yield put({ type: '$create', payload: response });
    },
    // 获取设计文档相关准则列表
    *getCriteria({ payload, callback }, { call }) {
      const res = yield call(api.getCriteria, payload);
      if (res && res.status === 500) return;
      if (callback) {
        callback(res);
      }
    },
    // 获取设计文档相关准则列表子集列表
    *getCriteriaChild({ payload, callback }, { call }) {
      const res = yield call(api.getCriteriaChild, payload);
      if (res && res.status === 500) return;
      if (callback) {
        callback(res);
      }
    },
    // 获取文档关联的设计准则设计模式/查阅模式列表
    *getCorrelationCriteria({ payload, callback }, { call }) {
      const res = yield call(api.getCorrelationCriteria, payload);
      if (res && res.status === 500 || res.status === 503) return;
      if (callback) {
        callback(res);
      }
    },
    //创建
    *createCorrelationCriteria({ payload, callback }, { call }) {
      const res = yield call(api.createCorrelationCriteria, payload);
      if (res && res.status === 500) return;
      if (callback) {
        callback(res);
      }
    },
    // 编辑设计准则关联
    *editCorrelationCriteria({ payload, callback }, { call }) {
      const res = yield call(api.editCorrelationCriteria, payload);
      if (res && res.status === 500) return;
      if (callback) {
        callback(res);
      }
    },
    // 移除文档关联设计准则
    *delCorrelationCriteria({ payload, callback }, { call }) {
      const res = yield call(api.delCorrelationCriteria, payload);
      if (res && res.status === 500) return;
      if (callback) {
        callback(res);
      }
    },
  },

  reducers: {
    $create(state, action) {
      return { ...state, create: action.payload };
    },
    processData(state, action) {
      return {
        ...state,
        processData: action.payload,
      };
    },
    $getUltraDirectoriesInfo(state, action) {
      return {
        ...state,
        ultraDirectoriesInfo: action.payload,
      };
    },
    list(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    code(state, action) {
      return {
        ...state,
        code: action.payload,
      };
    },
    rebind(state, action) {
      return {
        ...state,
        rebind: action.payload,
      };
    },
    update(state, action) {
      return {
        ...state,
        update: action.payload,
      };
    },
  },
};
