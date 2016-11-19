/**
 * @module components/Base
 **/

/**
 * fired when template is rendered into DOM
 * @event module:components/Base#render
 **/

/**
 * Base class of component, implements basic event emitter (pub/sub)
 * and some required interface
 **/
class Base {
  /**
   * @constructor
   * @param {object} [params={}]
   **/
  constructor(params) {
    this.params = params || {};
    this.__listeners = {};

    if (this.constructor === Base) {
      throw new TypeError('Can not construct abstract class.');
    }

    ['render']
      .forEach((name) => {
        if (this[name] === Base.prototype[name]) {
          throw new TypeError(`Please implement abstract method ${name}`);
        }
      });

    return this;
  }

  /**
   * @callback onEventCallback
   * @param {...*} params - any number of params
   **/

  /**
   * @param {String} name - name of event to listen for
   * @param {onEventCallback} func - callback
   **/
  on(name, func) {
    if (!this.__listeners[name]) {
      this.__listeners[name] = [];
    }

    this.__listeners[name].push(func);
  }

  /**
   * Event emitter
   * @param {String} name - name of event to emit
   * @param {...*} params - any number of params
   **/
  emit(name, ...args) {
    if (this.__listeners[name]) {
      this.__listeners[name].forEach(fn => fn(...args));
    }

    console.log('Emitted', name, ...args);
  }
  /**
   * Render Helper
   * @protected
   * @param {HTMLElement} placeholder - node to append to
   * @param {Function} template - template function
   * @param {Object} context - context to pass to template
   * @fires module:components/Base#render
   * @returns {HTMLNode} - rendered content
   **/
  _render(placeholder, template, context) {
    context = context || {};

    const replacement = document.createElement('div');

    placeholder.innerHTML = '';
    replacement.innerHTML = template(context);
    placeholder.appendChild(replacement);

    this.emit('render');
    return replacement;
  }
}

export default Base;
