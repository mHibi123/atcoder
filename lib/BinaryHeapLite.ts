// BinaryHeapLite — jsr:@ayaexptech/arcane@1.0.0-alpha.7
// Copy into your submission file (after InputScanner, before export {}).

class BinaryHeapLite<T> {
    /** ヒープの要素を格納する配列 0番目は現在の要素数 */
    #elements: [number, ...T[]];
    /** 比較関数(aの優先度が高いなら負、bの優先度が高いなら正、等しいなら0) */
    #compareFn: (a: T, b: T) => number;

    /**
     * 新しいBinaryHeapLiteインスタンスを生成します。
     * 初期値を与えた場合は、その配列の要素をヒープに追加します。
     *
     * 時間計算量: 初期値を与えない場合O(1)、初期値を与える場合初期値の長さをNとしてO(N)
     *
     * @example 数値の昇順でソートする二分ヒープを作る場合
     * ```ts
     * const minHeap = new BinaryHeapLite<number>((a, b) => a - b);
     * ```
     *
     * @example 初期値を与える場合
     * ```ts
     * const minHeap = new BinaryHeapLite<number>((a, b) => a - b, [5, 3, 8, 1]);
     * console.log(minHeap.pop()); // => 1
     * console.log(minHeap.pop()); // => 3
     * ```
     *
     * @param compareFn - 比較関数 (aの優先度が高いなら負、bの優先度が高いなら正、等しいなら0を返す関数)
     * @param [initialValues] - 初期値の配列 (省略可)
     * @constructor
     */
    constructor(compareFn: (a: T, b: T) => number, initialValues: T[] = []) {
        this.#compareFn = compareFn;
        this.#elements = [initialValues.length, ...initialValues];
        // initialValuesのheapify
        for (let i = Math.floor(this.#elements[0] / 2); i >= 1; i--) {
            this.#downHeap(i);
        }
    }

    /**
     * ヒープの要素数を取得します。
     *
     * 時間計算量: O(1)
     *
     * @example
     * ```ts
     * const heap = new BinaryHeapLite<number>((a, b) => a - b);
     * console.log(heap.size); // => 0
     * heap.push(5);
     * console.log(heap.size); // => 1
     * heap.push(3);
     * console.log(heap.size); // => 2
     * heap.pop();
     * console.log(heap.size); // => 1
     * ```
     *
     * @returns ヒープの要素数
     */
    get size(): number {
        return this.#elements[0];
    }

    /**
     * @private
     * 指定要素をdown-heapで再配置する (プライベートメソッド)
     * @param startIndex - down-heapを開始するインデックス
     * @returns 最終的な配置先インデックス
     */
    #downHeap(startIndex: number): number {
        let currentIndex = startIndex;
        while (true) {
            const leftChildIndex = currentIndex * 2;
            const rightChildIndex = currentIndex * 2 + 1;
            if (leftChildIndex > this.#elements[0]) {
                break; // 子がいない
            }
            let compareTargetChildIndex: number;
            if (rightChildIndex > this.#elements[0]) {
                // 右の子がいない場合は左の子と比較で確定する
                compareTargetChildIndex = leftChildIndex;
            } else {
                // 左右の子で優先度が高い方を比較対象にする
                if (
                    this.#compareFn(
                        this.#elements[leftChildIndex] as T,
                        this.#elements[rightChildIndex] as T,
                    ) < 0
                ) {
                    compareTargetChildIndex = leftChildIndex;
                } else {
                    compareTargetChildIndex = rightChildIndex;
                }
            }
            // 親より子の方が優先度高ければ交換
            if (
                this.#compareFn(
                    this.#elements[compareTargetChildIndex] as T,
                    this.#elements[currentIndex] as T,
                ) < 0
            ) {
                // indexMapを先に更新
                const currentElement = this.#elements[currentIndex]!;
                const childElement = this.#elements[compareTargetChildIndex]!;
                // 交換
                [this.#elements[currentIndex], this.#elements[compareTargetChildIndex]] = [
                    childElement,
                    currentElement,
                ];
                currentIndex = compareTargetChildIndex;
            } else {
                break;
            }
        }
        return currentIndex;
    }

    /**
     * @private
     * 指定要素をup-heapで再配置する (プライベートメソッド)
     * @param startIndex - up-heapを開始するインデックス
     * @returns 最終的な配置先インデックス
     */
    #upHeap(startIndex: number): number {
        let currentIndex = startIndex;
        while (currentIndex > 1) {
            const parentIndex = Math.floor(currentIndex / 2);
            // 子の方が優先度高ければ交換
            if (
                this.#compareFn(
                    this.#elements[currentIndex] as T,
                    this.#elements[parentIndex] as T,
                ) < 0
            ) {
                // indexMapを先に更新
                const currentElement = this.#elements[currentIndex]!;
                const parentElement = this.#elements[parentIndex]!;
                // 交換
                [this.#elements[currentIndex], this.#elements[parentIndex]] = [
                    parentElement,
                    currentElement,
                ];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
        return currentIndex;
    }

    /**
     * このBinaryHeapLiteに要素を追加します。
     * 追加された要素はヒープの条件を満たす位置に配置されます。
     *
     * 時間計算量: 要素数をNとして、最悪O(log N)
     *
     * @example
     * ```ts
     * const heap = new BinaryHeapLite<number>((a, b) => a - b);
     * heap.push(5);
     * heap.push(3);
     * heap.push(8);
     * console.log(heap.peek()); // => 3 (最小値がルートに来るため)
     * ```
     *
     * @param value - 追加する要素
     */
    push(value: T): void {
        // 要素を追加
        this.#elements.push(value);
        this.#elements[0]++;
        // up-heap
        this.#upHeap(this.#elements[0]);
    }

    /**
     * このBinaryHeapLiteから最優先(ルート)の要素を削除して返します。
     * 削除せず参照だけしたい場合は`peek()`を使用してください。
     * ヒープが空の場合は`undefined`を返します。
     *
     * 時間計算量: 要素数をNとして、最悪O(log N)
     *
     * @example
     * ```ts
     * const heap = new BinaryHeapLite<number>((a, b) => a - b, [5, 3, 8]);
     * console.log(heap.pop()); // => 3 (最小値が削除されて返される)
     * console.log(heap.pop()); // => 5
     * console.log(heap.pop()); // => 8
     * console.log(heap.pop()); // => undefined (ヒープが空の場合)
     * ```
     *
     * @returns 最優先(ルート)の要素。ヒープが空の場合は`undefined`
     */
    pop(): T | undefined {
        if (this.#elements[0] === 0) {
            return undefined;
        }
        // ルート要素を退避
        const topElement = this.#elements[1];
        // 最後の要素をルートに移動し、要素数を1減らす
        const lastElement = this.#elements.pop() as T;
        this.#elements[0]--;
        if (this.#elements[0] > 0) {
            this.#elements[1] = lastElement;
            // down-heap
            this.#downHeap(1);
        }
        return topElement;
    }

    /**
     * このBinaryHeapLiteの最優先(ルート)の要素を参照します。
     * 参照だけでなく削除もしたい場合は`pop()`を使用してください。
     * ヒープが空の場合は`undefined`を返します。
     *
     * 時間計算量: O(1)
     *
     * @example
     * ```ts
     * const heap = new BinaryHeapLite<number>((a, b) => a - b, [5, 3, 8]);
     * console.log(heap.peek()); // => 3 (最小値がルートに来るため)
     * heap.pop();
     * console.log(heap.peek()); // => 5 (次の最小値がルートに来るため)
     * ```
     *
     * @returns 最優先(ルート)の要素。ヒープが空の場合は`undefined`
     */
    peek(): T | undefined {
        if (this.#elements[0] === 0) {
            return undefined;
        }
        return this.#elements[1];
    }

    /**
     * このBinaryHeapLiteを空にします。
     *
     * 時間計算量: O(1)
     *
     * @example
     * ```ts
     * const heap = new BinaryHeapLite<number>((a, b) => a - b, [5, 3, 8]);
     * console.log(heap.size); // => 3
     * heap.clear();
     * console.log(heap.size); // => 0
     * console.log(heap.peek()); // => undefined
     * ```
     */
    clear() {
        this.#elements = [0];
    }
}
