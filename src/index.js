import MultiKeyMap from './MultiKeyMap';

/**
 * Sample:
 *     onClick={this.onClick.bind(this, item)}
 * =>
 *     onClick={bindx(this, this.onClick, item)}
 * Or
 *     onClick={this.onClick.bind(this, item)}
 * =>
 *     onClick={bindx(this, this.onClick, item)}
 * @param  {object}    context : this
 * @param  {function}  func    : to bind function
 * @param  {...args}   rest    : args
 * @return {function}          : return a memorized function
 */
const multiKeyMap = new MultiKeyMap();
export default function bindContext(context, func, ...rest) {
    let cached = multiKeyMap.get([context, func, ...rest]);
    if (!cached) {
        cached = func.bind(context, ...rest);
        multiKeyMap.set([context, func, ...rest], cached);
    }

    return cached;
}
