import { getTaskForm } from '@/common/services/dashboard';

export default {
  namespace: 'taskForm',
  state: {
    taskForm: {},
  },
  effects: {
    *getTaskForm({ payload }, { call, put }) {
      const response = yield call(getTaskForm, payload);
      yield put({
        type: '$getTaskForm',
        payload: response,
      });
    },
  },

  reducers: {
    $getTaskForm(state, action) {
      return {
        ...state,
        taskForm: action.payload,
      };
    },
  },
};
