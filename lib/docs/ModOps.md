# ModOps

指定した法（mod）の下で bigint 演算を行うクラスです。

## 概要

- 加算・減算・乗算・累乗の mod 演算
- 逆元・除算（mod 上）
- 負の数も正しく正規化

典型問題: mod 998244353、逆元、組合せ mod、累乗 mod

## AtCoder への組み込み方

1. [ExtendedMath.ts](../ExtendedMath.ts) を先に貼る
2. [ModOps.ts](../ModOps.ts) をその直後に貼る

## 依存関係

- **必須**: `ExtendedMath`（`inv` で `extendedGCD` を使用）

貼り付け順: `ExtendedMath.ts` → `ModOps.ts`

## API 一覧

### コンストラクタ

```typescript
new ModOps(mod: bigint)
```

- `mod`: 1 以上の整数（法）
- mod ≤ 0 で `Error`

### メソッド

| メソッド           | 説明                          | 計算量      |
| ------------------ | ----------------------------- | ----------- |
| `normalize(value)` | value mod mod（非負に正規化） | O(1)        |
| `add(a, b)`        | (a + b) mod mod               | O(1)        |
| `sum(...values)`   | 総和 mod mod                  | O(引数の数) |
| `sub(a, b)`        | (a - b) mod mod               | O(1)        |
| `mul(a, b)`        | (a × b) mod mod               | O(1)        |
| `prod(...values)`  | 総積 mod mod                  | O(引数の数) |
| `pow(a, b)`        | a^b mod mod（b ≥ 0）          | O(log b)    |
| `inv(a)`           | a の mod 逆元                 | O(log mod)  |
| `div(a, b)`        | a × inv(b) mod mod            | O(log mod)  |

## 使用例

```typescript
const mod = new ModOps(7n);

mod.add(5n, 8n); // 6n  (13 mod 7)
mod.sub(7n, 8n); // 6n
mod.mul(7n, 8n); // 6n
mod.pow(3n, 4n); // 4n  (81 mod 7)
mod.inv(3n); // 5n  (3×5 ≡ 1 mod 7)
mod.div(3n, 2n); // 5n  (3 × inv(2) mod 7)

mod.normalize(-3n); // 4n
```

## 注意点

- 内部はすべて `bigint`
- `pow` の指数 b は非負整数。負のとき `RangeError`
- `inv` / `div` は gcd(a, mod) = 1 でないと `Error`（逆元が存在しない）
- mod = 1 のとき `pow` は常に 0n
