# tier2（追加候補）

デフォルトでは同梱されていない、追加可能なライブラリのメモです。

## 概要

[tier2.ts](../tier2.ts) は実装ではなく、必要になったときに [Arcane](https://github.com/AXT-Studio/Arcane) から追加する候補の一覧です。

## 追加候補一覧

| 名前                 | 用途                        |
| -------------------- | --------------------------- |
| `GraphAdjacencyList` | グラフ構築、BFS、DFS        |
| `SegmentTree`        | 区間和・区間 min/max クエリ |
| `LazySegmentTree`    | 区間更新 + 区間クエリ       |
| `UniqueID`           | 座標圧縮                    |
| `MaxFlow`            | 最大流                      |

## 追加手順

1. [Arcane リポジトリ](https://github.com/AXT-Studio/Arcane/tree/main/src) の `src/<Name>.ts` を開く
2. 内容をコピー（`import` / `export` 行は削除）
3. 提出ファイルの `InputScanner` 直後、`export {}` より前に貼り付け
4. **依存関係の順序**に注意（例: `LazySegmentTree` は `SegmentTree` の内部に依存する可能性あり）

## 依存関係

各 Tier 2 ライブラリは Arcane 側の定義に従う。追加前にソース内のコメント・参照を確認すること。

## 注意点

- このリポジトリの `lib/` には **ソース未同梱**
- Arcane のバージョンと API が異なる場合がある（本 repo は `1.0.0-alpha.7` ベース）
- 貼り付け後はローカルで `bun run` して動作確認を推奨

## 関連

- 同梱済みライブラリ: [README.md](./README.md)
- Arcane JSR: [jsr:@ayaexptech/arcane](https://jsr.io/@ayaexptech/arcane)
