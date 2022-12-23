import moment from 'moment';
import { stringify } from 'qs';

/**
 * 通用工具类
 */
export default class Func {
  /**
   * 不为空
   * @param val
   * @returns {boolean}
   */
  static notEmpty(val) {
    return !this.isEmpty(val);
  }

  /**
   * 为空
   * @param val
   * @returns {boolean}
   */
  static isEmpty(val) {
    if (
      val === null ||
      typeof val === 'undefined' ||
      (typeof val === 'string' && val === '' && val !== 'undefined')
    ) {
      return true;
    }
    return false;
  }

  /**
   * 强转int型
   * @param val
   * @param defaultValue
   * @returns {number}
   */
  static toInt(val, defaultValue) {
    if (this.isEmpty(val)) {
      return defaultValue === undefined ? -1 : defaultValue;
    }
    const num = parseInt(val, 2);
    if (Number.isNaN(num)) {
      return defaultValue === undefined ? -1 : defaultValue;
    }
    return num;
  }

  /**
   * Json强转为Form类型
   * @param obj
   * @returns {FormData}
   */
  static toFormData(obj) {
    const data = new FormData();
    Object.keys(obj).forEach(key => {
      data.append(key, Array.isArray(obj[key]) ? obj[key].join(',') : obj[key]);
    });
    return data;
  }

  /**
   * 字符串转为date类
   * @param date
   * @param format
   * @returns {any}
   */
  static moment(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date ? moment(date, format) : null;
  }

  /**
   * date类转为字符串格式
   * @param date
   * @param format
   * @returns {null}
   */
  static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date ? date.format(format) : null;
  }

  /**
   * 根据逗号联合
   * @param arr
   * @returns {string}
   */
  static join(arr) {
    return arr ? arr.join(',') : '';
  }

  /**
   * 根据逗号分隔
   * @param str
   * @returns {string}
   */
  static split(str) {
    return str ? String(str).split(',') : '';
  }

  /**
   * 跳转路径
   * @param str 类型
   * @param str id
   * @returns {string}
   */
  static urlForInfo(objectType, id, data = {}) {
    if (!objectType || !id) return '';
    let url = '';
    const dataType = objectType.toLowerCase();
    if (objectType === 'Document' || objectType === 'Part' || objectType === 'Drawing') {
      url = `/data/${objectType.toLowerCase()}/${id}`;
    }
    if (objectType === 'ChangeRequest') {
      url = `/configuration/change-request-order/${id}/info`;
    }
    if (
      objectType === 'ChangeOrder' ||
      objectType === 'DeviationOrder' ||
      objectType === 'DataSendOrder' ||
      objectType === 'Baseline'
    ) {
      let type = objectType.replace(objectType[0], objectType[0].toLowerCase());
      type = type.replace(/([A-Z])/g, '-$1').toLowerCase();
      url = `/configuration/${type}/${id}/info`;
    }
    if (objectType === 'code') {
      url = `/data/EncodingRule/${id}/info`;
    }
    if (objectType === 'Baseline') {
      url = `/configuration/${objectType.toLowerCase()}/${id}/info`;
    }
    if (objectType.includes('Baseline')) {
      url = `/configuration/baseline/${id}/info`;
    }

    if (dataType.includes('requirement')) {
      url = `/app/requirement/${id}/info`;
    }

    if (dataType.includes('document')) {
      url = `/data/document/${id}${stringify({ objectType }, { addQueryPrefix: true })}`;
    }

    if (dataType.includes('designpart')) {
      url = `/data/bom/design/BOM/${id}`;
    }

    if (dataType.includes('functionpart')) {
      if (data?.infoUrl) {
        url = data.infoUrl;
        return url;
      }
      url = `/data/bom/function/BOM/${id}`;
    }
    return url;
  }
}
