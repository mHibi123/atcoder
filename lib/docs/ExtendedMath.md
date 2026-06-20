# ExtendedMath

JavaScript 標準の `Math` にない数学関数を提供する静的ユーティリティクラスです。

## 概要

- 最大公約数・最小公倍数
- 拡張ユークリッド互除法
- 約数列挙、整数平方根
- 繰り返し二乗法による mod 累乗
- ミラー・ラビン素数判定
- popcount（32bit）

典型問題: 数論、GCD/LCM、素数判定、約数、累乗 mod

## AtCoder への組み込み方

1. [ExtendedMath.ts](../ExtendedMath.ts) の内容をコピー
2. `InputScanner` クラスの直後、`export {}` より前に貼り付け

`ModOps` や `Combination` を使う場合は、**ExtendedMath を先に**貼る。

## 依存関係

なし（他ライブラリから参照される側）

## API 一覧

| メソッド                     | 引数                         | 戻り値                 | 計算量          |
| ---------------------------- | ---------------------------- | ---------------------- | --------------- |
| `gcd(a, b)`                  | `number \| bigint`           | 最大公約数             | O(log min(a,b)) |
| `lcm(a, b)`                  | `number \| bigint`           | 最小公倍数             | O(log min(a,b)) |
| `extendedGCD(a, b)`          | `bigint, bigint`             | `[g, x, y]`（ax+by=g） | O(log min(a,b)) |
| `getDivisors(n)`             | `number` (n≥1)               | 正の約数の昇順配列     | O(√n)           |
| `isqrt(n)`                   | `bigint` (n≥0)               | 整数平方根             | O(M(log n))     |
| `modPow(a, n, m)`            | `bigint, bigint, bigint`     | a^n mod m              | O(log n)        |
| `isProbablyPrime(n, bases?)` | `bigint`, 基数配列（省略可） | 素数らしければ true    | O(b log n)      |
| `popcount32(n)`              | `number` (0≤n<2^32)          | 立っているビット数     | O(1)            |

## 使用例

```typescript
ExtendedMath.gcd(48, 18); // 6
ExtendedMath.lcm(12n, 18n); // 36n
ExtendedMath.getDivisors(28); // [1, 2, 4, 7, 14, 28]
ExtendedMath.isqrt(10n); // 3n
ExtendedMath.modPow(3n, 200n, 50n); // 1n

const [g, x, y] = ExtendedMath.extendedGCD(30n, 21n);
// g=3n, 30*x + 21*y = g

ExtendedMath.isProbablyPrime(17n); // true
ExtendedMath.popcount32(0b10101010); // 4
```

## 注意点

- `gcd(0, 0) = 0`、`lcm(a, 0) = 0` と定義
- `getDivisors(n)` は n < 1 のとき空配列
- `isqrt` は n < 0 で `RangeError`
- `modPow` は n < 0 または m ≤ 0 で `RangeError`
- `isProbablyPrime`: `false` なら確実に合成数。`true` でも確率的（ただし **n < 2^64 かつ bases 省略時は決定的**）
- `popcount32` は 0 ≤ n < 2^32 以外は未定義動作
