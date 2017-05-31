import Promise from 'promise';
import {AdyenStrategy} from './index';

const debug = require('debug')('recurly:paypal:strategy:direct');

/**
 * Direct Adyen Checkout strategy
 */
export class DirectStrategy extends AdyenStrategy {
  constructor (...args) {
    super(...args);
    this.emit('ready');
  }

  start () {
    // TODO: More parameters here
    const payload = { description: this.config.display.displayName };
    const frame = this.recurly.Frame({ path: '/adyen/start', payload });
    frame.once('error', cause => this.error('paypal-tokenize-error', { cause }));
    frame.once('done', token => this.emit('token', token));
  }
}
