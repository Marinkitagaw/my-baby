import React from 'react';
import { Pie, measureTextWidth, PieConfig, Column, ColumnConfig } from '@ant-design/plots';

const PersonalToDo = props => {
  const { pendingNumber, completedNumber, stepData, dispatch } = props;
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }
  const data = stepData.map(item => {
    return { type: `${item.name}`, value: item.number };
  });
  const config = {
    appendPadding: 10,
    autoFit: true,
    data,
    height: 230,
    legend: false,
    angleField: 'value',
    colorField: 'type',
    radius: 1.0,
    innerRadius: 0.618,
    meta: {
      value: {
        formatter: v => `${v} ¥`,
      },
    },
    label: {
      type: 'spider',

      style: {
        textAlign: 'center',
      },
      //  autoRotate: false,
      content: '{name}:{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? ` ${datum.value}` : ` ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 30,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return (
    <div style={{ width: '100%' }}>
      <Pie {...config} />
    </div>
  );
};

const PersonalData = () => {
  const data = [
    {
      type: '工艺路线',
      sales: 38,
    },
    {
      type: '工艺规程',
      sales: 52,
    },
    {
      type: '工序',
      sales: 61,
    },
    {
      type: '工步',
      sales: 145,
    },
  ];

  const config = {
    data,
    height: 210,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return <Column {...config} />;
};

// export PersonalToDo;
// export PersonalData;

export default { PersonalToDo, PersonalData };
