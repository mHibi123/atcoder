# helpers

よく使う定数と小さなユーティリティ関数を提供します。

## 概要

- 競プロで頻出の定数（`INF`, `MOD`）
- 配列生成ヘルパー（`range`, `matrix`）
- 出力ヘルパー（`println`, `print`）

典型問題: ほぼすべての問題で補助的に利用。

## AtCoder への組み込み方

1. [helpers.ts](../helpers.ts) の内容をコピー
2. `InputScanner` クラスの直後、`export {}` より前に貼り付け

依存関係なし。単体で貼れる。

## 依存関係

なし

## API 一覧

| 名前                 | 種別 | 説明                                  |
| -------------------- | ---- | ------------------------------------- |
| `INF`                | 定数 | `1e18`。距離・コストの初期値など      |
| `MOD`                | 定数 | `998244353n`。よく使われる素数 mod    |
| `range(n)`           | 関数 | `[0, 1, ..., n-1]` を返す             |
| `matrix(h, w, init)` | 関数 | `h × w` の2次元配列を `init` で初期化 |
| `println(...args)`   | 関数 | `console.log` のラッパー              |
| `print(...args)`     | 関数 | 改行なしで標準出力に書き込む          |

## 使用例

```typescript
const n = 5;
const idx = range(n); // [0, 1, 2, 3, 4]
const dist = matrix(n, n, INF); // n×n を INF で初期化
dist[0][1] = 3;

println(1, 2, 3); // "1 2 3" と出力（改行あり）
print("Yes"); // 改行なし
```

## 注意点

- `MOD` は `bigint` 型。剰余演算を `ModOps` で行う場合はそちらの法と揃える
- `matrix` は浅いコピーではなく、各行が独立した配列になる
