# 累積和（prefix-sum）

[implementation.md](../../../algorithms/implementation.md) の「累積和（前缀和）」に対応する練習問題です。

## 問題一覧

| # | タイトル | 学ぶこと | 難易度 |
|---|----------|----------|--------|
| [001](./problems/001/problem.md) | 区間和クエリ | 1次元累積和の構築と区間和の O(1) 取得 | ★ |
| [002](./problems/002/problem.md) | 和が K になる連続部分列の個数 | 累積和 + ハッシュマップ | ★★ |
| [003](./problems/003/problem.md) | 矩形区域の和 | 2次元累積和と包含排除 | ★★ |

## 解答

`solutions/` に [template.ts](../../../../template.ts) ベースの `001.ts`, `002.ts`, `003.ts` を配置済みです。`Main` 内にコードを書いてください。

## ローカル実行例

```powershell
Get-Content study/practice/implementation/prefix-sum/problems/001/tests/sample.in | bun run study/practice/implementation/prefix-sum/solutions/001.ts
```
