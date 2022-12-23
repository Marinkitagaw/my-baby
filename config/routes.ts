export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: '../components/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  //总览
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: '总览',
    component: './Whitelisting/Dashboard',
    icon: 'AppstoreOutlined',
  },
  //任务
  {
    path: '/task',
    name: '我的任务',
    icon: 'PieChartOutlined',
    routes: [
      {
        path: '/task/pending',
        name: '待办任务',
        component: './Whitelisting/Task/Pending',
      },
      {
        path: '/task/completed',
        name: '已办任务',
        component: './Whitelisting/Task/Completed',
      },
      {
        path: '/task/:taskId/info',
        name: '审批详情',
        component: './Whitelisting/Task/ToolSetReviewIndex',
        hideInMenu: true,
      },
    ],
  },
  //工具集
  {
    path: '/toolset/list',
    name: '工具集列表',
    icon: 'FileOutlined',
    component: './Whitelisting/ToolSetList/ManageList',
  },
  {
    path: '/toolset/add',
    name: '工具入库',
    icon: 'FormOutlined',
    component: './Whitelisting/ToolSetList/ToolSetAdd',
  },
  {
    path: '/toolset/update',
    name: '工具更新',
    icon: 'RedoOutlined',
    component: './Whitelisting/ToolSetList/ToolSetUpdate',
  },
  {
    path: '/toolset/disabled',
    name: '工具禁用',
    icon: 'StopOutlined',
    component: './Whitelisting/ToolSetList/ToolSetDisable',
  },
  {
    path: '/toolset/create',
    name: '新建工具集',
    component: './Whitelisting/ToolSetList/ToolSetCreate/index',
    hideInMenu: true,
  },
  {
    path: '/toolset/:id/info',
    name: '工具集详情',
    component: './Whitelisting/ToolSetList/ToolSetInfo/index',
    hideInMenu: true,
  },
  {
    path: '/toolset/:id/modify',
    name: '编辑工具集',
    component: './Whitelisting/ToolSetList/ToolSetCreate/index',
    hideInMenu: true,
  },
  {
    path: '/toolset/:id/revision',
    name: '修订工具集',
    component: './Whitelisting/ToolSetList/ToolSetCreate/fix',
    hideInMenu: true,
  },
  //流程申请单
  // {
  //   path: '/toolsetapply',
  //   name: '流程申请单',
  //   component: './Whitelisting/ToolSetApply',
  //   routes: [
  //     {
  //       path: '/toolsetapply',
  //       name: '流程申请单列表',
  //       component: './Whitelisting/ToolSetApply',
  //     },
  //     {
  //       path: '/toolsetapply/create',
  //       name: '新建流程申请单',
  //       component: './Whitelisting/ToolSetApply/Create',
  //     },
  //     {
  //       path: '/toolsetapply/:id/info',
  //       name: '流程申请单详情',
  //       component: './Whitelisting/ToolSetApply/ApplyInfo',
  //     },
  //   ],
  // },
];
