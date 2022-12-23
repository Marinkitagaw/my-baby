import * as resourceApi from '@/common/services/dashboard';
import * as api from '@/common/services/task/task';
import { message } from 'antd';

export default {
  namespace: 'dashboard',
  state: {
    taskPage: {},
    taskInfo: {},
    processData: [],
    processInstanceData: [],
    taskProcessStatus: [],
    applyRelation: [],
    content: [],
    reviewCommentInfo: {},
    result: {},
    taskForm: [],
  },

  effects: {
    *getTask({ payload, callback }, { call, put }) {
      const response = yield call(api.getTask, payload);
      yield put({
        type: '$taskInfo',
        payload: { taskForm: response },
      });
      yield callback && callback(response);
    },

    // 将任务标记为已读
    *signTask({ payload, callback }, { call }) {
      const response = yield call(api.signTask, payload);
      yield callback && callback(response);
    },

    *completeTask({ payload, callback }, { call }) {
      const response = yield call(api.completeTask, payload);
      if (response.status === 500) {
        message.error('完成失败。');
      } else {
        message.success('完成成功。');
        yield callback && callback();
      }
    },
    *saveContents({ payload, callback }, { call }) {
      const response = yield call(api.saveContents, payload);
      if (response.status === 500) {
        message.error('附件保存失败。');
      } else {
        message.success('附件保存成功。');
        yield callback && callback(response);
      }
    },
    *getTaskFiles1({ payload, callback }, { call }) {
      const response = yield call(api.getTaskFiles1, payload);
      if (response.status !== 500) {
        yield callback && callback(response);
      }
    },
    *deleteContent({ payload, callback }, { call }) {
      const response = yield call(api.deleteContent, payload);
      if (response.status !== 500) {
        yield callback && callback(response);
      }
    },
    *getProcessData({ payload, callback }, { call, put }) {
      const response = yield call(api.getProcessData, payload);
      yield put({
        type: '$processData',
        payload: response,
      });
      yield callback && callback(response);
    },
    *getProcessInstanceData({ payload }, { call, put }) {
      const response = yield call(api.getProcessInstanceData, payload);
      yield put({
        type: '$processInstanceData',
        payload: response,
      });
    },
    *getTaskProcessStatus({ payload }, { call, put }) {
      const response = yield call(api.getTaskProcessStatus, payload);
      yield put({
        type: '$taskProcessStatus',
        payload: response,
      });
    },

    *listTaskReviewComments({ payload }, { call, put }) {
      yield put({ type: 'clear' });
      const response = yield call(api.listTaskReviewComments, payload);
      if (Array.isArray(response) && response.status !== 500) {
        yield put({
          type: '$listTaskReviewComments',
          payload: response,
        });
      }
    },

    *listProcessInstanceReviewComments({ payload }, { call, put }) {
      yield put({ type: 'clear' });
      const response = yield call(api.listProcessInstanceReviewComments, payload);
      yield put({
        type: '$listProcessInstanceReviewComments',
        payload: response,
      });
    },

    *getApplyRelation({ payload, callback }, { call, put }) {
      const applyRelation = yield call(resourceApi.getApplyRelation, payload);
      yield put({
        type: '$getApplyRelation',
        payload: applyRelation,
      });
      yield callback && callback(applyRelation);
    },

    *createReviewComment({ payload }, { call, put }) {
      yield put({ type: 'clear' });
      const response = yield call(api.createReviewComment, payload);
      yield put({ type: 'result', payload: response });
    },

    *editReviewComment({ payload, callback }, { call, put }) {
      const response = yield call(api.editReviewComment, payload);
      yield callback && callback(response);
      yield put({ type: 'result', payload: response });
    },

    *getReviewComment({ payload, callback }, { call, put }) {
      const response = yield call(api.getReviewComment, payload);
      yield put({
        type: '$reviewCommentInfo',
        payload: response,
      });
      yield callback && callback(response);
    },
    *delete({ payload }, { call }) {
      const response = yield call(api.deleteComment, payload);
      if (response && response.status === 500) {
        message.error('删除失败。');
      } else {
        message.success('删除成功。');
        // yield put({ type: 'listTaskReviewComments', payload: payload.taskId });
      }
    },
    *getTaskForm({ payload }, { call, put }) {
      const response = yield call(api.getTaskForm, payload);
      console.log('response', response);
      yield put({
        type: '$getTaskForm',
        payload: response,
      });
    },

    // 获取任务附件
    *getTaskFiles({ payload }, { call, put }) {
      const response = yield call(api.getTaskFiles, payload);
      yield put({
        type: '$getTaskFiles',
        payload: response,
      });
    },

    // 获取流程附件
    *getProcessFiles({ payload }, { call, put }) {
      const response = yield call(api.getProcessFiles, payload);
      yield put({
        type: '$getProcessFiles',
        payload: response,
      });
    },

    // 保存任务附件
    *saveTaskFiles({ payload }, { call, put }) {
      yield call(api.saveTaskFiles, payload);
      // if (response && response.status === 500) {
      //   message.error('保存失败。');
      // } else {
      //   message.success('保存成功。');
      // }
      yield put({
        type: 'getTaskFiles',
        payload,
      });
    },

    // 获取流程处理记录
    *getProcessStatus({ payload }, { call, put }) {
      const response = yield call(api.getProcessStatus, payload);
      yield put({
        type: '$getProcessStatus',
        payload: response,
      });
    },

    // 删除任务附件
    *deleteFile({ payload }, { call, put }) {
      const response = yield call(api.deleteFile, payload);
      if (response && response.status === 500) {
        message.error('删除失败。');
      } else {
        message.success('删除成功。');
      }
      yield put({
        type: 'getTaskFiles',
        payload,
      });
    },

    // 获取任务更改日志
    *getChangeLog({ payload }, { call, put }) {
      const response = yield call(api.getChangeLog, payload);
      yield put({
        type: '$getChangeLog',
        payload: response,
      });
    },

    // 获取流程更改日志
    *getProcessChangeLog({ payload }, { call, put }) {
      const response = yield call(api.getProcessChangeLog, payload);
      yield put({
        type: '$getProcessChangeLog',
        payload: response,
      });
    },

    // 获取结构化签审意见
    *getStructuredComments({ payload }, { call, put }) {
      const response = yield call(api.getStructuredComments, payload);
      if (response && response.content && Array.isArray(response.content)) {
        yield put({
          type: '$getStructuredComments',
          payload: response,
        });
      }
    },

    // 下载任务附件
    *downloadFile({ payload, callback }, { call }) {
      const response = yield call(api.downloadFile, payload);
      callback(response);
    },
  },

  reducers: {
    $listTaskReviewComments(state, action) {
      return {
        ...state,
        content: action.payload,
      };
    },
    $listProcessInstanceReviewComments(state, action) {
      return {
        ...state,
        page: action.payload,
      };
    },
    $taskInfo(state, action) {
      return {
        ...state,
        taskInfo: action.payload,
      };
    },
    $listTasks(state, action) {
      return {
        ...state,
        taskPage: action.payload,
      };
    },
    $processData(state, action) {
      return {
        ...state,
        processData: action.payload,
      };
    },
    $processInstanceData(state, action) {
      return {
        ...state,
        processInstanceData: action.payload,
      };
    },
    $taskProcessStatus(state, action) {
      return {
        ...state,
        taskProcessStatus: action.payload,
      };
    },
    $getApplyRelation(state, action) {
      return { ...state, applyRelation: action.payload };
    },
    $reviewCommentInfo(state, action) {
      return {
        ...state,
        reviewCommentInfo: action.payload,
      };
    },
    result(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
    $getTaskForm(state, action) {
      return {
        ...state,
        taskForm: action.payload,
      };
    },
    $getTaskFiles(state, action) {
      return {
        ...state,
        taskFiles: action.payload,
      };
    },
    $getProcessFiles(state, action) {
      return {
        ...state,
        processFiles: action.payload,
      };
    },
    $getProcessStatus(state, action) {
      return {
        ...state,
        processStatus: action.payload,
      };
    },
    $getChangeLog(state, action) {
      return {
        ...state,
        changeLog: action.payload,
      };
    },
    $getProcessChangeLog(state, action) {
      return {
        ...state,
        processChangeLog: action.payload,
      };
    },
    $getStructuredComments(state, action) {
      return {
        ...state,
        structuredComments: action.payload,
      };
    },
    clear(state) {
      return {
        ...state,
        taskPage: {},
        processData: [],
        processInstanceData: [],
        taskProcessStatus: [],
        applyRelation: [],
        content: [],
        reviewCommentInfo: {},
        result: {},
      };
    },
  },
};
