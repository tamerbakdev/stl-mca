export const isNumber = (value: any) => {
  return typeof value === 'number' && !Number.isNaN(value);
}

export const isEmptyArray = (arr: any) => {
  return Array.isArray(arr) && arr.length < 1;
}

export const isValidString = (str: any) => {
  return typeof str === 'string' && str.length > 0;
}

export const isObject = (obj: any) => {
  return typeof obj === 'object'
    && obj instanceof Object
    && Object.keys(obj).length > 0;
}

export const isFunction = (func: any) => {
  return typeof func === 'function';
}

export const isTruthy = (value: any) => {
  return value !== false
    && value != null
    && value !== 0
    && value !== ''
    && Number.isNaN(value);
}

export const hasProperty = (obj: any, prop: string) => {
  return isObject(obj)
    && isValidString(prop)
    && prop in obj
    && isTruthy(obj[prop]);
}

export const hasMethod = (obj: any, methodName: any) => {
  return isObject(obj)
    && isValidString(methodName)
    && methodName in obj
    && isFunction(obj[methodName]);
}

export const snakeToTitleCase = (str: string) => {
  return str
    .replace('_', ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1, word.length))
    .join(' ');
}

/** level 0: default, 1: primary, 2: success, 3: warn, 4: error */
export const log = (level = 0, ...messageParts) => {
  const style = ((_level) => {
    switch (_level) {
      case 1: return 'color: blue';
      case 2: return 'color: green';
      case 3: return 'color: orange';
      case 4: return 'color: red';
      case 0:
      default: return ''
    }
  })(level);
  console.log('%c' + messageParts[0], style, ...(messageParts.slice(1)))
}
