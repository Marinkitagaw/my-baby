import React from 'react';
import { registerFormFields, connect, createVirtualBox } from '@formily/antd';
import {
  SingleCheckbox,
  PreviewValue,
  Category,
  ButtonGroup,
  CategoryState,
  SelectCategory,
  Maturity,
  Level,
  PrimaryCause,
  ModelType,
  Severity,
  Opportunity,
  ModelPhaseMark,
  ProblemNature,
  QbsWhetherOrNot,
  QbdIsThreeCategories,
  DesignPart,
  Batch,
  ExperimentBatch,
  ClassificationAttrPanel,
} from '@/cpdm-components/FormItem';
import { Cascader } from 'antd';
import { Input, Select, ArrayTable, Radio } from '@formily/antd-components';
import {
  Repository,
  PhaseMark,
  ResponsibleUnit,
  View,
  SecretLevel,
  Purpose,
  InputNumber,
  Department,
  SendTo,
  Content,
  Folder,
  Code,
  Dictionary,
} from '@cpdm/components';
import { ProductCategory, ProductType, Unit, SelectEnum } from '@/pages/Cmis/Part/Form/FormItem';
import TechCode from '@/pages/ChangeConfiguration/TechnicalNotice/TechnicalNoticeCreate/TechCode'; // 编号
import RelatedParts from '@/pages/ChangeConfiguration/TechnicalNotice/TechnicalNoticeCreate/RelatedParts'; // 关联部件
import RelatedDocs from '@/pages/ChangeConfiguration/TechnicalNotice/TechnicalNoticeCreate/RelatedDocs'; // 关联文档
import { PreviewText } from '@formily/react-shared-components';
import BraftEditor from '@/pages/ChangeConfiguration/TechnicalNotice/TechnicalNoticeCreate/TechBraftEditor'; // 富文本
import ReviewRecords from '@/pages/Cmis/Document/Info/ReviewRecords'; // 流程签审记录
import { Fieldset } from '@cpdm/components';

const register = {
  done: false,
};

const setup = () => {
  registerFormFields({
    SecretLevel: connect()(SecretLevel.WithOption),
    ConfidentialityPeriod: connect()(InputNumber),
    PhaseMark: connect()(PhaseMark.WithOption),
    Purpose: connect()(Purpose),
    repository: connect()(Repository),
    folder: connect()(Folder),
    primaryContent: connect()(Content),
    reviewRecords: connect()(ReviewRecords),
    secondaryContents: connect()(Content),
    printContent: connect()(Content),
    View: connect()(View.WithOption),
    ProductCategory: connect()(ProductCategory),
    productLevel: connect()(ProductType),
    endItem: connect()(SingleCheckbox),
    Unit: connect()(Unit),
    respDept: Input,
    code: connect()(Code),
    techCode: connect()(TechCode),
    sendTo: connect()(SendTo.WithOption),
    department: connect()(Department.WithOption), // 所属部门--
    PreviewValue: connect()(PreviewValue),
    cascader: connect()(Cascader),
    category: connect()(Category),
    arraytable: ArrayTable,
    radioGroup: Radio.Group,
    radio: Radio.Group,
    select: Select,
    PreviewText,
    Input,
    input: Input,
    textArea: Input.TextArea,
    targetOrgId: connect()(ResponsibleUnit),
    sourceOrgId: connect()(ResponsibleUnit),
    partCode: connect()(RelatedParts), // 选择关联部件
    relationDoc: connect()(RelatedDocs), // 选择关联文档
    content: connect()(BraftEditor),
    buttonGroup: connect()(ButtonGroup),
    CategoryState: connect()(CategoryState),
    SelectEnum: connect()(SelectEnum),
    SelectCategory: connect()(SelectCategory),
    Maturity: connect()(Maturity),
    Level: connect()(Level),
    PrimaryCause: connect()(PrimaryCause),
    ModelType: connect()(ModelType),
    Severity: connect()(Severity),
    Opportunity: connect()(Opportunity),
    ModelPhaseMark: connect()(ModelPhaseMark),
    ProblemNature: connect()(ProblemNature),
    QbsWhetherOrNot: connect()(QbsWhetherOrNot),
    QbdIsThreeCategories: connect()(QbdIsThreeCategories),
    DesignPart: connect()(DesignPart),
    Batch: connect()(Batch),
    ExperimentBatch: connect()(ExperimentBatch),
    Dictionary: connect()(Dictionary),
  });
  createVirtualBox('FieldsetLayout', ({ children, title }) => (
    <Fieldset legend={title} style={{ marginBottom: 16 }}>
      {children}
    </Fieldset>
  ));
  createVirtualBox('ClassificationAttrLayout', ({ ...reset }) => (
    <ClassificationAttrPanel {...reset} />
  ));
};

/**
 * 注册自定义组件，如果注册过则略过
 */

const doRegister = () => {
  if (!register.done) {
    setup();
    register.done = true;
  }
};

export { register, doRegister };
