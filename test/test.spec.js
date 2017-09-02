import MultiKeyMap from '../src/MultiKeyMap';
import bindx from '../src/index';

const m = new MultiKeyMap();
const reg = /a/;
const obj = {};
const func = () => {};
const symbol = Symbol('some symbol');

describe('MultiKeyMap test', () => {
    test('MultiKeyMap has set and get', () => {
        expect(typeof MultiKeyMap.prototype.get).toBe('function');
        expect(typeof MultiKeyMap.prototype.set).toBe('function');
    });

    test('MultiKeyMap primitive key(one level)', () => {
        m.set([undefined], 'undefined');
        m.set([null], 'null');
        m.set([true], true);
        m.set([1], 1);
        m.set([NaN], 'NaN');
        m.set(['str'], 'str');
        m.set([symbol], symbol);

        expect(m.get([undefined])).toBe('undefined');
        expect(m.get([null])).toBe('null');
        expect(m.get([true])).toBe(true);
        expect(m.get([1])).toBe(1);
        expect(m.get([NaN])).toBe('NaN');
        expect(m.get(['str'])).toBe('str');
        expect(m.get([symbol])).toBe(symbol);
    });

    test('MultiKeyMap object key(one level)', () => {
        m.set([reg], 'reg');
        m.set([obj], 'obj');
        m.set([func], 'func');

        expect(m.get([reg])).toBe('reg');
        expect(m.get([obj])).toBe('obj');
        expect(m.get([func])).toBe('func');
    });

    test('MultiKeyMap multiple keys', () => {
        m.set([reg, obj, func, undefined, null, true, 1, NaN, 'str', symbol], 'multi level value');

        expect(m.get([reg, obj, func, undefined, null, true, 1, NaN, 'str', symbol])).toBe('multi level value');
    });

    test('MultiKeyMap keys order matters', () => {
        expect(m.get([obj, reg, func, undefined, null, true, 1, NaN, 'str', symbol])).toBe(undefined);
    });
});

class Sample {
    test(...args) {
        return [this, ...args];
    }
}

describe('bindx test', () => {
    test('bindx basic case', () => {
        const sample = new Sample();

        const boundTest = bindx(sample, sample.test, 1, symbol);
        const result = boundTest('str');

        expect(result[0]).toBe(sample);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(symbol);
        expect(result[3]).toBe('str');
    });

    test('bindx should be memorized', () => {
        const sample = new Sample();

        const boundTest1 = bindx(sample, sample.test, 1, symbol);
        const boundTest2 = bindx(sample, sample.test, 1, symbol);
        const boundTest3 = bindx(sample, sample.test, 1);

        expect(boundTest1).toBe(boundTest2);
        expect(boundTest1).not.toBe(boundTest3);
    });
});
