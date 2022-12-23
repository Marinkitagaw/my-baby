import * as api from '@/common/services/toolset/list/task';

export default {
  namespace: 'task',
  state: {
    tasks: {},
    pending: [],
    completed: [],
    taskData: [],
  },

  effects: {
    *tasks({ payload }, { call, put }) {
      const res = yield call(api.listTasks, payload);
      yield put({
        type: 'updateState',
        payload: {
          tasks: res,
          // searchParams: response,
        },
      });
      return res;
    },
    *pending({ payload, callback }, { call, put }) {
      const res = yield call(api.listTasks, payload);
      yield put({
        type: 'updateState',
        payload: {
          pending: res,
        },
      });
      return res;
    },

    *completed({ payload, callback }, { call, put }) {
      const res = yield call(api.listTasks, payload);
      yield put({
        type: 'updateState',
        payload: {
          completed: res,
        },
      });
      return res;
    },
    *getTaskData({ payload }, { call, put }) {
      const res = yield call(api.getTaskData, payload);
      yield put({
        type: '$tasks',
        payload: {
          taskData: res,
        },
      });
      return res;
    },
    *ApplyBefore({ payload }, { call, put }) {
      const res = yield call(api.ApplyBefore, payload);
      return res;
    },

    *ApplyOk({ payload, callback }, { call }) {
      const response = yield call(api.ApplyOk, payload);
      if (response && response.status !== 500) {
        yield callback && callback(response);
      }
      return response;
    },
  },

  reducers: {
    $tasks(state, action) {
      return { ...state, tasks: action.payload };
    },
    updateState: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        loading: true,
      };
    },
  },
};
