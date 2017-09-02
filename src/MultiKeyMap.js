export default class MultiKeyMap {
    constructor() {
        this.weakMap = new WeakMap();
        this.primitiveMap = new Map();
        this.value = undefined;
    }

    getMapByKeyType(key) {
        // Notice: typeof null === 'object';
        if (key !== null && (typeof key === 'object' || typeof key === 'function')) {
            return this.weakMap;
        }
        return this.primitiveMap;
    }

    set(keys, value) {
        if (keys.length === 0) {
            this.value = value;
        } else {
            const [key, ...rest] = keys;
            const map = this.getMapByKeyType(key);
            let childMap = map.get(key);
            if (!childMap) {
                childMap = new MultiKeyMap();
                map.set(key, childMap);
            }

            childMap.set(rest, value);
        }

        return this;
    }

    get(keys) {
        if (keys.length === 0) {
            return this.value;
        }
        const [key, ...rest] = keys;
        const map = this.getMapByKeyType(key);
        const childMap = map.get(key);
        return childMap ? childMap.get(rest) : undefined;
    }
}
