# LinearSieve

線形篩（Linear Sieve）による素数・最小素因数の前処理と素因数分解を提供します。

## 概要

- N 以下の最小素因数（MPF）テーブル
- N 以下の素数リスト
- MPF テーブルを使った高速素因数分解

典型問題: 素数列挙、素因数分解、倍数・約数

## AtCoder への組み込み方

1. [LinearSieve.ts](../LinearSieve.ts) の内容をコピー
2. `InputScanner` クラスの直後、`export {}` より前に貼り付け

依存関係なし。単体で貼れる。

## 依存関係

なし

## API 一覧

| メソッド | 引数 | 戻り値 | 計算量 |
|---------|------|--------|--------|
| `getAllMPF(N)` | `number` | 長さ N+1 の MPF 配列 | O(N) |
| `getAllPrimes(N)` | `number` | N 以下の素数の昇順配列 | O(N) |
| `factorize(N, MPF)` | `number`, MPF 配列 | N の素因数（昇順・重複あり） | O(log N) |

### MPF 配列について

- `mpf[0]`, `mpf[1]` は `NaN`
- `mpf[i]`（2 ≤ i ≤ N）= i の最小素因数
- 例: `getAllMPF(10)` → `[NaN, NaN, 2, 3, 2, 5, 2, 7, 2, 3, 2]`

## 使用例

```typescript
const N = 100000;
const mpf = LinearSieve.getAllMPF(N);
const primes = LinearSieve.getAllPrimes(N);
// primes: [2, 3, 5, 7, 11, ...]

LinearSieve.factorize(12, mpf);  // [2, 2, 3]
LinearSieve.factorize(1, mpf);   // []
LinearSieve.factorize(3, mpf);   // [3]

// 複数クエリの素因数分解
function solve(x: number): void {
    const factors = LinearSieve.factorize(x, mpf);
    // factors を使って答えを計算
}
```

## 注意点

- `getAllPrimes(N)` は N < 2 のとき空配列
- `factorize(N, MPF)` は N < 2 のとき空配列
- **MPF は N 以上の数の分解には使えない**（テーブル範囲内の N のみ）
- 1 回 MPF を作れば、O(log N) で何度でも `factorize` 可能
