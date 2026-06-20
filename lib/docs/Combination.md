# Combination

二項係数 nCk を mod p で計算するクラスです。階乗・逆階乗を事前計算します。

## 概要

- nCk mod p を O(1) で取得
- コンストラクタで fact / ifact テーブルを構築

典型問題: 組合せ数 mod、パスカルの三角形、二項係数

## AtCoder への組み込み方

1. [ExtendedMath.ts](../ExtendedMath.ts)
2. [ModOps.ts](../ModOps.ts)
3. [Combination.ts](../Combination.ts)

の順に貼り付け。

## 依存関係

- **必須**: `ExtendedMath`, `ModOps`

貼り付け順: `ExtendedMath.ts` → `ModOps.ts` → `Combination.ts`

## API 一覧

### コンストラクタ

```typescript
new Combination(p: bigint, max: bigint)
```

- `p`: 法（**素数**）
- `max`: n, k の最大値
- 事前計算: O(max)

### メソッド

| メソッド    | 引数             | 戻り値    | 計算量 |
| ----------- | ---------------- | --------- | ------ |
| `get(n, k)` | `number, number` | nCk mod p | O(1)   |

- n < k または n < 0 または k < 0 → `0n`

## 使用例

```typescript
const comb = new Combination(7n, 10n);

comb.get(10, 5); // 0n  (252 mod 7 = 0)
comb.get(5, 2); // 3n  (10 mod 7 = 3)

// 998244353 mod の典型例
const C = new Combination(998244353n, 200000n);
C.get(100, 50);
```

## 注意点

- **p は素数**であること（Lucas の定理等は未実装）
- **n < p** が前提（n ≥ p のとき Lucas 等が必要な場合あり）
- `max` は問題の制約に合わせて十分大きく取る
- 事前計算コスト O(max) なので、max を必要最小限に
