import schemaSnippetsEpart from './epart';
import schemaSnippetsStructureDocument from './StructureDocument';
import schemaSnippetsDesignPart from './Dpart';
import schemaSnippetsFunctionPart from './Fpart';
import schemaSnippetsFactPart from './FApart';
import schemaSnippetsProcessPart from './Ppart';
import schemaSnippetsBatchPart from './Bpart';
import schemaSnippetsDocumentQualityPacket from './QualityPacket';
import schemaSnippetsComponents from './Components';
import schemaSnippetsDesignComponents from './DesignComponents';
import schemaSnippetsFactComponents from './FactComponents';
import schemaSnippetsTechnicalNotice from './TechnicalNotice';
import schemaSnippetsDrawingComponents from './Drawing';
import schemaSnippetsDocument from './Documents';
import schemaSnippetsDataSendComponents from './DataSend';
import schemaSnippetsKnowledgeDocuments from './KnowledgeDocuments';

const schemaSnippets = {
  'DESIGN-DOCS': schemaSnippetsDocument,
  'FUNCTION-DOCS': schemaSnippetsDocument,
  'PROCESS-DOCS': schemaSnippetsDocument,
  'FACT-DOCS': schemaSnippetsDocument,
  'COMMON-DOCS': schemaSnippetsDocument,
  'STRUCTURE-DOCS': schemaSnippetsStructureDocument,
  'INSIDE-DOCS': schemaSnippetsDocument,
  'OUTSIDE-DOCS': schemaSnippetsDocument,
  'KNOWLEDGE-DOCS': schemaSnippetsKnowledgeDocuments,
  'QUALITY-PACKET': schemaSnippetsDocumentQualityPacket,
  TECHNICAL: schemaSnippetsTechnicalNotice,
  EPART: schemaSnippetsEpart,
  DESIGN: schemaSnippetsDesignPart,
  FUNCTION: schemaSnippetsFunctionPart,
  PROCESS: schemaSnippetsProcessPart,
  FACT: schemaSnippetsFactPart,
  SERVICE: schemaSnippetsFactPart,
  BATCH: schemaSnippetsBatchPart,
  COMPONENTS: schemaSnippetsComponents,
  'DESIGN-COMPONENTS': schemaSnippetsDesignComponents,
  'FACT-COMPONENTS': schemaSnippetsFactComponents,
  DRAWING: schemaSnippetsDrawingComponents,
  'DATA-SEND': schemaSnippetsDataSendComponents,
};

export function getSchemaSnippet(dataTypeIdentifier, screenType) {
  return schemaSnippets[dataTypeIdentifier][screenType];
}
export const SCREEN_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DETAIL: 'DETAIL',
  RENAME: 'RENAME',
  LIST: 'LIST',
};

export default schemaSnippets;

// 例如，获取E部件的创建页面布局
// const epartSchemaSnippet = getSchemaSnippet("EPART", "CREATE");
