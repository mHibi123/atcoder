# 二分探索（binary-search）

[search.md](../../../algorithms/search.md) の「二分探索」に対応する練習問題です。

## 問題一覧

| # | タイトル | 学ぶこと | 難易度 |
|---|----------|----------|--------|
| [001](./problems/001/problem.md) | ソート済み配列の存在判定 | `binary_search` | ★ |
| [002](./problems/002/problem.md) | X 以上の最小位置 | `lower_bound` | ★ |
| [003](./problems/003/problem.md) | 値 X の個数 | `upper_bound - lower_bound` | ★★ |
| [004](./problems/004/problem.md) | K 分割の最小の最大和 | 答えの二分探索 + 貪欲判定 | ★★ |
| [005](./problems/005/problem.md) | K 個選ぶ最小差の最大化 | 答えの二分探索 + 貪欲判定 | ★★★ |

## 解答

`solutions/` に [template.ts](../../../../template.ts) ベースの `001.ts`〜`005.ts` を配置済みです。`Main` 内にコードを書いてください。

[BinarySearch.ts](../../../../lib/BinarySearch.ts) が必要な問題（001〜003）では、ライブラリをファイル内にコピペして使えます。

## ローカル実行例

```powershell
Get-Content study/practice/search/binary-search/problems/001/tests/sample.in | bun run study/practice/search/binary-search/solutions/001.ts
```
