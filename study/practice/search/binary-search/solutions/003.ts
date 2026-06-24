// ================================================================
// study/search/binary-search - 003: 値 X の個数
// (URL: study/practice/search/binary-search/problems/003/problem.md)
// TypeScript (Bun) Submission [using InputScanner]
// Get-Content study/practice/search/binary-search/problems/003/tests/sample.in | bun run study/practice/search/binary-search/solutions/003.ts
// ================================================================

function Main(inputText: string): void {
    const scanner = new InputScanner(inputText);
    // Add your code here

    const N = scanner.int()!;
    const A = scanner.int(N);
    const Q = scanner.int()!;

    for (let i = 0; i < Q; i++) {
        const X = scanner.int()!;
        let count = 0;

        let low = 0;
        let high = A.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const cmp = A[mid]! - X;
            if (cmp === 0) count++;
            if (cmp < 0) low = mid + 1;
            else high = mid - 1;
            if (low > high) break;
        }
        console.log(count);
    }
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
// BinarySearch — jsr:@ayaexptech/arcane@1.0.0-alpha.7
// Copy into your submission file (after InputScanner, before export {}).

/**
 * 二分探索を行うためのメソッド群を提供するユーティリティクラスです。
 * - 比較関数
 * - ソート済み配列の二分探索
 */
class BinarySearch {
    /**
     * 「数値の昇順」で比較するための比較関数です。
     *
     * @example Array#sort()の比較関数として使用する例
     * ```ts
     * const arr = [5, 2, 9, 1, 5];
     * arr.sort(BinarySearch.COMPARE_NUMBER_ASCENDING);
     * console.log(arr); // [1, 2, 5, 5, 9]
     * ```
     *
     * @param a - 比較対象の値1
     * @param b - 比較対象の値2
     * @return `a`が`b`より小さい場合は負の数、等しい場合は0、大きい場合は正の数
     */
    static COMPARE_NUMBER_ASCENDING(a: number, b: number): number {
        return a - b;
    }

    /**
     * 「数値の降順」で比較するための比較関数です。
     *
     * @example Array#sort()の比較関数として使用する例
     * ```ts
     * const arr = [5, 2, 9, 1, 5];
     * arr.sort(BinarySearch.COMPARE_NUMBER_DESCENDING);
     * console.log(arr); // [9, 5, 5, 2, 1]
     * ```
     *
     * @param a - 比較対象の値1
     * @param b - 比較対象の値2
     * @return `a`が`b`より大きい場合は負の数、等しい場合は0、小さい場合は正の数
     */
    static COMPARE_NUMBER_DESCENDING(a: number, b: number): number {
        return b - a;
    }

    /**
     * JavaScriptの`Array#sort()`のデフォルトの挙動と同様に2要素を比較するための比較関数です。
     * 「文字列の辞書順」(Unicode Code Unit 昇順) で比較します。
     *
     * @example Array#sort()の比較関数として使用する例
     * ```ts
     * const arr = ["banana", "apple", "cherry"];
     * arr.sort(BinarySearch.COMPARE_SORT_DEFAULT);
     * console.log(arr); // ["apple", "banana", "cherry"]
     * ```
     *
     * @param a - 比較対象の値1
     * @param b - 比較対象の値2
     * @return `a`が`b`より"小さい"場合は負の数、等しい場合は0、"大きい"場合は正の数
     */
    static COMPARE_SORT_DEFAULT(a: unknown, b: unknown): number {
        const [A, B] = [String(a), String(b)];
        return A < B ? -1 : A > B ? 1 : 0;
    }

    /**
     * JavaScriptの`Array#sort()`のデフォルトの挙動と逆順になるように2要素を比較するための比較関数です。
     * 「文字列の辞書順の逆順」(Unicode Code Unit 降順) で比較します。
     *
     * @example Array#sort()の比較関数として使用する例
     * ```ts
     * const arr = ["banana", "apple", "cherry"];
     * arr.sort(BinarySearch.COMPARE_SORT_REVERSE);
     * console.log(arr); // ["cherry", "banana", "apple"]
     * ```
     *
     * @param a - 比較対象の値1
     * @param b - 比較対象の値2
     * @return `a`が`b`より"大きい"場合は負の数、等しい場合は0、"小さい"場合は正の数
     */
    static COMPARE_SORT_REVERSE(a: unknown, b: unknown): number {
        const [A, B] = [String(a), String(b)];
        return A > B ? -1 : A < B ? 1 : 0;
    }

    /**
     * 配列`array`に`target`と等しい値が存在するかどうかを、二分探索を用いて判定します。
     *
     * 時間計算量: O(log N) (Nは配列の要素数)
     *
     * @example
     * ```ts
     * const arr = [1, 3, 5, 7, 9];
     * console.log(BinarySearch.binary_search(arr, 5, BinarySearch.COMPARE_NUMBER_ASCENDING)); // true
     * console.log(BinarySearch.binary_search(arr, 4, BinarySearch.COMPARE_NUMBER_ASCENDING)); // false
     * ```
     *
     * @param array - ソート済み配列
     * @param target - 探索対象の値
     * @param compareFn - 比較関数
     * @return `target`と等しい値が存在すれば`true`、そうでなければ`false`
     */
    static binary_search<T>(
        array: readonly T[],
        target: T,
        compareFn: (a: T, b: T) => number,
    ): boolean {
        let low = 0;
        let high = array.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const cmp = compareFn(array[mid]!, target);
            if (cmp === 0) return true;
            if (cmp < 0) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }

    /**
     * 配列`array`の中で、`target`以上と判定される最初の要素のインデックスを返します。
     * `array`内に`target`以上の要素が存在しない場合は`array.length`を返します。
     *
     * 時間計算量: O(log N) (Nは配列の要素数)
     *
     * @example
     * ```ts
     * const arr = [1, 3, 5, 7, 9];
     * console.log(BinarySearch.lower_bound(arr, 4, BinarySearch.COMPARE_NUMBER_ASCENDING)); // 2
     * console.log(BinarySearch.lower_bound(arr, 10, BinarySearch.COMPARE_NUMBER_ASCENDING)); // 5
     * ```
     *
     * @param array - ソート済み配列
     * @param target - 探索対象の値
     * @param compareFn - 比較関数
     * @return `target`以上と判定される最初の要素のインデックス または`array.length`
     */
    static lower_bound<T>(
        array: readonly T[],
        target: T,
        compareFn: (a: T, b: T) => number,
    ): number {
        let low = 0;
        let high = array.length;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            const cmp = compareFn(array[mid]!, target);
            if (cmp < 0) low = mid + 1;
            else high = mid;
        }
        return low;
    }

    /**
     * 配列`array`の中で、`target`より大きいと判定される最初の要素のインデックスを返します。
     * `array`内に`target`より大きい要素が存在しない場合は`array.length`を返します。
     *
     * 時間計算量: O(log N) (Nは配列の要素数)
     *
     * @example
     * ```ts
     * const arr = [1, 3, 5, 7, 9];
     * console.log(BinarySearch.upper_bound(arr, 2, BinarySearch.COMPARE_NUMBER_ASCENDING)); // 1
     * console.log(BinarySearch.upper_bound(arr, 5, BinarySearch.COMPARE_NUMBER_ASCENDING)); // 3
     * console.log(BinarySearch.upper_bound(arr, 9, BinarySearch.COMPARE_NUMBER_ASCENDING)); // 5
     * ```
     *
     * @param array - ソート済み配列
     * @param target - 探索対象の値
     * @param compareFn - 比較関数
     * @return `target`より大きいと判定される最初の要素のインデックス または`array.length`
     */
    static upper_bound<T>(
        array: readonly T[],
        target: T,
        compareFn: (a: T, b: T) => number,
    ): number {
        let low = 0;
        let high = array.length;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            const cmp = compareFn(array[mid]!, target);
            if (cmp <= 0) low = mid + 1;
            else high = mid;
        }
        return low;
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
