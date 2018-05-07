const MIDNIGHT_HOURS = '00:00:00';

export const noop = () => {};

export const toHtml = string => {
  const template = document.createElement('template');
  template.innerHTML = string.trim();

  return template.content;
};

export const clearChildren = node => {
  node.innerHTML = '';
  return node;
};

export const append = (node, child) => {
  if (Array.isArray(child)) {
    node.append(...child);
  } else {
    node.append(child);
  }

  return node;
};

export const getCoordinates = (resolve, reject) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve);
  });
};

export const bindAll = (context, ...names) => {
  names.forEach(name => {
    if (typeof context[name] === 'function') {
      context[name] = context[name].bind(context);
    } else {
      throw Error(
        `Expected function ${name}. Instead received: ${typeof context[name]}`
      );
    }
  });
};

export const getMidnightWeather = list => {
  return list.filter(({ dt_txt: date }) => date.includes(MIDNIGHT_HOURS));
};

export function RequestError(response) {
  this.status = response.statusText;
  this.code = response.status;
}

RequestError.prototype.toString = function() {
  return `${this.code} - ${this.status}`;
};
