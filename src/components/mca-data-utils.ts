export const isNumber = (value: any) => typeof value === 'number' && !Number.isNaN(value);

export const isEmptyArray = (arr: any) => Array.isArray(arr) && arr.length < 1;

export const isValidString = (str: any) => typeof str === 'string' && str.length > 0;

export const isObject = (obj: any) => typeof obj === 'object' && obj instanceof Object && Object.keys(obj).length > 0;

export const snakeToTitleCase = (str: string) => str
  .replace('_', ' ')
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1, word.length))
  .join(' ')

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
