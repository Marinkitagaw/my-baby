// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./bpmn-js.d.ts" />

import React, { useEffect, useRef } from 'react';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import './index.less';

interface IWorkflowViewerProps {
  diagramXml?: string;
  activeTasks?: string;
}

const WorkflowViewer: React.FunctionComponent<IWorkflowViewerProps> = props => {
  const containerRef = useRef(null);

  useEffect(() => {
    const { diagramXml, activeTasks } = props;
    const container = containerRef.current;
    const viewer = new NavigatedViewer({
      container,
    });
    viewer.importXML(diagramXml, (err: any) => {
      if (!err) {
        const canvas = viewer.get('canvas');
        canvas.zoom('fit-viewport');
        if (activeTasks) {
          const activeId = activeTasks.split(',');
          if (activeId && activeId.length > 0) {
            activeId.map(item => canvas.addMarker(item, 'highlight'));
          }
        }
      }
    });
  }, [props.diagramXml, props.activeTasks]);

  return (
    <div
      className="hiddenImg"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'move',
      }}
      ref={containerRef}
    />
  );
};
WorkflowViewer.displayName = 'WorkflowViewer';
export default WorkflowViewer;
