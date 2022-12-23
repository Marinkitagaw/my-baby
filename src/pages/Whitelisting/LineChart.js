import { Pie } from '@ant-design/plots';
import { connect, withRouter } from 'umi';
import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { getDashboard } from '@/services/dashboard';
const LineChart = props => {
  const { dispatch, name, data, color } = props;
  const [statusSum, setStatusSum] = useState(0);
  const [majorSum, setMajorSum] = useState(0);
  const [toolSum, setToolSum] = useState(0);
  const [applicantSum, setApplicantSum] = useState(0);
  const [statusConfig, setStatusConfig] = useState({});
  const [majorConfig, setMajorConfig] = useState({});
  const [toolConfig, setToolConfig] = useState({});
  const [applicantConfig, setApplicantConfig] = useState({});
  const [majorList, setMajorList] = useState([]);
  const [toolList, setToolList] = useState([]);
  const [statusList, setStatusList] = useState([
    {
      type: '正在工作',
      value: 0,
    },
    {
      type: '已发布',
      value: 0,
    },
    {
      type: '正在审阅',
      value: 0,
    },
    {
      type: '已禁用',
      value: 0,
    },
  ]);
  const [applicantList, setApplicantList] = useState([
    {
      type: '四院',
      value: 0,
    },
    {
      type: '四部',
      value: 0,
    },
    {
      type: '17所',
      value: 0,
    },
    {
      type: '307所',
      value: 0,
    },
    {
      type: '晨信',
      value: 0,
    },
  ]);
  const DemoPie = (dataList, sumNum) => {
    const config = {
      legend: {
        layout: 'horizontal',
        position: 'bottom',
        flipPage: false,
        // maxRow: 6,
      },
      appendPadding: 10,
      data: dataList,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      },

      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: `总数\n${sumNum}个`,
        },
      },
    };
    return config;
  };

  const setData = (val, data) => {
    let newStatus = [];
    let newSum = 0;
    val.forEach(j => {
      let obj = { ...j };

      Object.keys(data).forEach(v => {
        if (j.type === v) {
          obj.value = data[v];
          newSum += data[v];
        }
      });

      newStatus.push(obj);
    });
    return { data: newStatus, sum: newSum };
  };
  const setMiddleData = value => {
    let newStatus = [];
    let newSum = 0;
    Object.keys(value).forEach(temp => {
      newStatus.push({ type: temp, value: value[temp] });
      newSum += value[temp];
    });
    return { data: newStatus, sum: newSum };
  };

  const getData = async () => {
    const res = await getDashboard();
    if (res.status) {
      const newData = setMiddleData(res.status);
      setStatusList([...newData.data]);
      setStatusSum(newData.sum);
    }
    if (res.AppToolApplicant) {
      const newData = setMiddleData(res.AppToolApplicant);
      setApplicantList([...newData.data]);
      setApplicantSum(newData.sum);
    }
    if (res.major) {
      const newData = setMiddleData(res.major);
      setMajorList([...newData.data]);
      setMajorSum(newData.sum);
    }
    if (res.SoftwareTool) {
      const newData = setMiddleData(res.SoftwareTool);
      setToolList([...newData.data]);
      setToolSum(newData.sum);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setStatusConfig(DemoPie(statusList, statusSum));
    setMajorConfig(DemoPie(majorList, majorSum));
    setToolConfig(DemoPie(toolList, toolSum));
    setApplicantConfig(DemoPie(applicantList, applicantSum));
  }, [statusSum, majorSum, toolSum, applicantSum, statusList, applicantList, majorList, toolList]);

  return (
    <Row>
      <Col span={6}>
        <p style={{ textAlign: 'center', position: 'absolute', left: '40%', fontWeight: 'bold' }}>
          按状态
        </p>
        {statusConfig.legend ? <Pie {...statusConfig} height={350} padding={[0, 0, 0, 0]} /> : ''}
      </Col>
      <Col span={6}>
        <p style={{ textAlign: 'center', position: 'absolute', left: '38%', fontWeight: 'bold' }}>
          按专属专业
        </p>
        {majorConfig.legend ? <Pie {...majorConfig} height={350} padding={[0, 0, 0, 0]} /> : ''}
      </Col>
      <Col span={6}>
        <p style={{ textAlign: 'center', position: 'absolute', left: '38%', fontWeight: 'bold' }}>
          按工具类别
        </p>
        {toolConfig.legend ? <Pie {...toolConfig} height={350} padding={[0, 0, 0, 0]} /> : ''}
      </Col>
      <Col span={6}>
        <p style={{ textAlign: 'center', position: 'absolute', left: '38%', fontWeight: 'bold' }}>
          按申请单位
        </p>
        {applicantConfig.legend ? (
          <Pie {...applicantConfig} height={350} padding={[0, 0, 0, 0]} />
        ) : (
          ''
        )}
      </Col>
    </Row>
  );
};
export default withRouter(LineChart);
