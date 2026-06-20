// ================================================================
// abc463 - E: Roads and Gates
// (URL: https://atcoder.jp/contests/abc463/tasks/abc463_e)
// TypeScript (Bun) Submission [using InputScanner]
// Get-Content contests/abc463/tests/e.in | bun run contests/abc463/e.ts
// ================================================================

function Main(inputText: string): void {
    const scanner = new InputScanner(inputText);
    // Add your code here
    const [N, M, Y] = scanner.int(3);

    type Edge = { to: number; cost: number };
    type State = { cost: number; node: number };

    const graph: Edge[][] = Array.from({ length: N! + 1 }, () => []);
    const addEdge = (from: number, to: number, cost: number) => {
        graph[from]!.push({ to, cost });
    };

    for (let i = 0; i < M!; i++) {
        const [u, v, T] = scanner.int(3)!;
        addEdge(u! - 1, v! - 1, T!);
        addEdge(v! - 1, u! - 1, T!);
    }
    const X = scanner.int(N!)!;
    for (let i = 0; i < N!; i++) {
        addEdge(i, N!, X[i]!);
        addEdge(N!, i, X[i]! + Y!);
    }

    /** 単源最短距離。graph[v] = v から出る辺のリスト */
    function dijkstra(graph: Edge[][], start: number): number[] {
        const n = graph.length;
        const dist = Array<number>(n).fill(Number.POSITIVE_INFINITY);
        dist[start] = 0;

        const pq = new BinaryHeapLite<State>((a, b) => a.cost - b.cost);
        pq.push({ cost: 0, node: start });

        while (pq.size > 0) {
            const { cost, node } = pq.pop()!;

            // 古い（より大きい）エントリは捨てる（lazy Dijkstra）
            if (cost > dist[node]!) continue;

            for (const { to, cost: w } of graph[node]!) {
                const next = cost + w;
                if (next < dist[to]!) {
                    dist[to] = next;
                    pq.push({ cost: next, node: to });
                }
            }
        }
        return dist;
    }

    const dist = dijkstra(graph, 0);
    console.log(dist.slice(1, N!).join(" "));
}

/**
 * 入力をスキャンして、トークンを順に取得するためのクラスです。
 * (.str(), .num(), .int(), .bigint() / 引数なしで1つ取得、引数(n: number)ありで最大n個を配列として取得)
 */
class InputScanner {
    #str: string;
    #len: number;
    #idx: number;

    /** 新しい入力スキャナーインスタンスを生成します。 */
    constructor(str: string) {
        this.#str = str;
        this.#len = str.length;
        this.#idx = 0;
    }
    /** ある文字がトークンの区切りとみなせる文字(' '・'\n'・'\r'・'\t')であるかを判定します。 */
    #isSpace(c: number): boolean {
        return c === 32 || c === 10 || c === 13 || c === 9;
    }
    /** #idxをトークンの区切りとみなせる文字の直後まで進めます。 */
    #skipSpaces() {
        while (this.#idx < this.#len) {
            const c = this.#str.charCodeAt(this.#idx);
            if (!this.#isSpace(c)) break;
            this.#idx++;
        }
    }
    /**
     * 次のトークンをstringで取得します。
     * - 引数なしで呼んだ場合、戻り値は1つのstringです。
     *     - もうトークンが存在しない場合、undefinedを返します。
     * - 引数(n: number)ありで呼んだ場合、戻り値は最大で長さnのstring[]です。
     *     - トークンがn個以上残っていなかった場合、長さn未満のstring[]が返されます。
     *     - 残りトークンが0個の状態で引数ありで呼んだ場合は、空の配列が返されます。
     */
    str(): string | undefined;
    str(n: number): string[];
    str(n?: number): string | string[] | undefined {
        if (n == null) {
            // 1つだけトークンを読む場合
            this.#skipSpaces();
            if (this.#idx >= this.#len) return undefined;
            const startIdx = this.#idx;
            while (this.#idx < this.#len) {
                const c = this.#str.charCodeAt(this.#idx);
                if (this.#isSpace(c)) break;
                this.#idx++;
            }
            return this.#str.substring(startIdx, this.#idx);
        } else {
            // 複数トークンを読む場合 (str()を内部で呼ぶ)
            const result: string[] = [];
            for (let i = 0; i < n; i++) {
                const token = this.str();
                if (token == null) break;
                result.push(token);
            }
            return result;
        }
    }
    /**
     * 次のトークンを(浮動小数点数で表せる)数値とみなし、numberで取得します。
     * - 引数なしで呼んだ場合、戻り値は1つのnumberです。
     *     - もうトークンが存在しない場合、undefinedを返します。
     * - 引数(n: number)ありで呼んだ場合、戻り値は最大で長さnのnumber[]です。
     *     - トークンがn個以上残っていなかった場合、長さn未満のnumber[]が返されます。
     *     - 残りトークンが0個の状態で引数ありで呼んだ場合は、空の配列が返されます。
     */
    num(): number | undefined;
    num(n: number): number[];
    num(n?: number): number | number[] | undefined {
        if (n == null) {
            // 1つだけトークンを読む場合 (str()を内部で呼ぶ)
            const token = this.str();
            if (token == null) return undefined;
            return Number.parseFloat(token);
        } else {
            // 複数トークンを読む場合 (number()を内部で呼ぶ)
            const result: number[] = [];
            for (let i = 0; i < n; i++) {
                const token = this.num();
                if (token == null) break;
                result.push(token);
            }
            return result;
        }
    }
    /**
     * 次のトークンを(浮動小数点数で表せる)整数とみなし、numberで取得します。
     * - 引数なしで呼んだ場合、戻り値は1つのnumberです。
     *     - もうトークンが存在しない場合、undefinedを返します。
     * - 引数(n: number)ありで呼んだ場合、戻り値は最大で長さnのnumber[]です。
     *     - トークンがn個以上残っていなかった場合、長さn未満のnumber[]が返されます。
     *     - 残りトークンが0個の状態で引数ありで呼んだ場合は、空の配列が返されます。
     */
    int(): number | undefined;
    int(n: number): number[];
    int(n?: number): number | number[] | undefined {
        if (n == null) {
            // 1つだけトークンを読む場合 (str()を内部で呼ぶ)
            const token = this.str();
            if (token == null) return undefined;
            return Number.parseInt(token);
        } else {
            // 複数トークンを読む場合 (number()を内部で呼ぶ)
            const result: number[] = [];
            for (let i = 0; i < n; i++) {
                const token = this.int();
                if (token == null) break;
                result.push(token);
            }
            return result;
        }
    }
    /**
     * 次のトークンを(BigIntで表せる)整数とみなし、bigintで取得します。
     * - 引数なしで呼んだ場合、戻り値は1つのbigintです。
     *     - もうトークンが存在しない場合、undefinedを返します。
     * - 引数(n: number)ありで呼んだ場合、戻り値は最大で長さnのbigint[]です。
     *     - トークンがn個以上残っていなかった場合、長さn未満のbigint[]が返されます。
     *     - 残りトークンが0個の状態で引数ありで呼んだ場合は、空の配列が返されます。
     */
    bigint(): bigint | undefined;
    bigint(n: number): bigint[];
    bigint(n?: number): bigint | bigint[] | undefined {
        if (n == null) {
            // 1つだけトークンを読む場合 (str()を内部で呼ぶ)
            const token = this.str();
            if (token == null) return undefined;
            return BigInt(token);
        } else {
            // 複数トークンを読む場合 (number()を内部で呼ぶ)
            const result: bigint[] = [];
            for (let i = 0; i < n; i++) {
                const token = this.bigint();
                if (token == null) break;
                result.push(token);
            }
            return result;
        }
    }
}

// ライブラリが必要なとき必要な部分をコピペ
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

// Please do not change the following code.
export {}; // <- An empty export is required so that ts-check can determine it as a module.

import { readFileSync } from "node:fs";

function readInput(): string {
    try {
        return readFileSync("/dev/stdin", "utf8");
    } catch {
        return readFileSync(0, "utf8");
    }
}

Main(readInput());
