// ================================================================
// abc464 - C: Plumage Palette
// (URL: https://atcoder.jp/contests/abc464/tasks/abc464_c)
// TypeScript (Bun) Submission [using InputScanner]
// Get-Content contests/abc464/tests/c.in | bun run contests/abc464/c.ts
// ================================================================

function Main(inputText: string): void {
    const scanner = new InputScanner(inputText);
    const N = scanner.int()!;
    const M = scanner.int()!;

    const colors: number[] = [];
    const newColors: number[] = [];
    const changesByDay: number[][] = Array.from({ length: M + 1 }, () => []);

    const ColorMap = new Map<number, number>();
    let distinct = 0;

    for (let i = 0; i < N; i++) {
        const [A, D, B] = scanner.int(3);
        colors[i] = A!;
        newColors[i] = B!;
        changesByDay[D!]!.push(i);

        const a = (ColorMap.get(A!) ?? 0) + 1;
        ColorMap.set(A!, a);
        if (a === 1) distinct++;
    }

    for (let day = 1; day <= M; day++) {
        for (const i of changesByDay[day]!) {
            const old = colors[i]!;
            const nw = newColors[i]!;
            if (old === nw) continue;

            const cOld = ColorMap.get(old)! - 1;
            if (cOld === 0) {
                ColorMap.delete(old);
                distinct--;
            } else {
                ColorMap.set(old, cOld);
            }

            const cNew = (ColorMap.get(nw) ?? 0) + 1;
            ColorMap.set(nw, cNew);
            if (cNew === 1) distinct++;

            colors[i] = nw;
        }
        console.log(distinct);
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
