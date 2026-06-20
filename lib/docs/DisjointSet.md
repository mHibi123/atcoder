# DisjointSet

Union-Find（素集合データ構造 / DSU）です。要素のグループ化・同一判定を高速に行います。

## 概要

- 0 〜 size-1 の要素を管理
- union（結合）、find（代表元）、connected（同一判定）
- Union by Size + 経路圧縮

典型問題: グラフの連結成分、クラスカル法、同値類の管理

## AtCoder への組み込み方

1. [DisjointSet.ts](../DisjointSet.ts) の内容をコピー
2. `InputScanner` クラスの直後、`export {}` より前に貼り付け

依存関係なし。単体で貼れる。

## 依存関係

なし

## API 一覧

### コンストラクタ

```typescript
new DisjointSet(size: number)
```

- 要素 0 〜 size-1 を size 個の独立した集合として初期化
- size ≤ 0 または非整数で `Error`

### メソッド・プロパティ

| 名前              | 説明                             | 計算量       |
| ----------------- | -------------------------------- | ------------ |
| `find(x)`         | x の属する集合の代表元（根）     | 償却 O(α(N)) |
| `union(x, y)`     | x と y の集合を結合。成功で true | 償却 O(α(N)) |
| `connected(x, y)` | 同じ集合に属するか               | 償却 O(α(N)) |
| `getGroupSize(x)` | x の属する集合のサイズ           | 償却 O(α(N)) |
| `componentCount`  | 現在の連結成分数（getter）       | O(1)         |

## 使用例

```typescript
const ds = new DisjointSet(5);
// 初期: 5 成分、各要素は独立

ds.union(0, 1); // true
ds.connected(0, 1); // true
ds.union(0, 1); // false（既に同じ集合）
ds.getGroupSize(0); // 2
ds.componentCount; // 4

const root0 = ds.find(0);
const root1 = ds.find(1);
// root0 === root1
```

## 注意点

- 要素は **0-indexed**（0 〜 size-1）
- 要素に付加データを持たせる場合は、外部で `Map<number, T>` 等を併用
- `union` が false を返すのは「既に同じ集合」のときのみ
