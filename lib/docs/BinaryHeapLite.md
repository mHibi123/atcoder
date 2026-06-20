# BinaryHeapLite

比較関数で優先度を決める二分ヒープ（優先度付きキュー）です。

## 概要

- 最小ヒープ・最大ヒープを compareFn で定義
- push / pop / peek
- 初期値からの heapify 対応

典型問題: ダイクストラ法、K 番目に小さい値、スケジューリング

## AtCoder への組み込み方

1. [BinaryHeapLite.ts](../BinaryHeapLite.ts) の内容をコピー
2. `InputScanner` クラスの直後、`export {}` より前に貼り付け

依存関係なし。単体で貼れる。

## 依存関係

なし

## API 一覧

### コンストラクタ

```typescript
new BinaryHeapLite<T>(compareFn: (a: T, b: T) => number, initialValues?: T[])
```

- **compareFn**: a の優先度が高いなら負、b の方が高いなら正、等しければ 0
- 最小ヒープ: `(a, b) => a - b`（数値の場合）
- 最大ヒープ: `(a, b) => b - a`

### メソッド・プロパティ

| 名前          | 説明                                       | 計算量   |
| ------------- | ------------------------------------------ | -------- |
| `push(value)` | 要素を追加                                 | O(log N) |
| `pop()`       | 最優先要素を削除して返す。空なら undefined | O(log N) |
| `peek()`      | 最優先要素を参照（削除しない）             | O(1)     |
| `clear()`     | ヒープを空にする                           | O(1)     |
| `size`        | 要素数（getter）                           | O(1)     |

## 使用例

```typescript
// 最小ヒープ
const minHeap = new BinaryHeapLite<number>((a, b) => a - b);
minHeap.push(5);
minHeap.push(3);
minHeap.push(8);
minHeap.peek(); // 3
minHeap.pop(); // 3
minHeap.pop(); // 5

// 初期値から構築
const heap = new BinaryHeapLite<number>((a, b) => a - b, [5, 3, 8, 1]);
heap.pop(); // 1

// 最大ヒープ
const maxHeap = new BinaryHeapLite<number>((a, b) => b - a);

// ダイクストラの典型パターン
type State = { cost: number; node: number };
const pq = new BinaryHeapLite<State>((a, b) => a.cost - b.cost);
pq.push({ cost: 0, node: 0 });
while (pq.size > 0) {
    const { cost, node } = pq.pop()!;
    // ...
}
```

## 注意点

- compareFn の符号規約に注意（「小さい方が優先」= compareFn(a,b) < 0 で a が先）
- `pop()` / `peek()` は空のとき `undefined`
- 任意の要素の削除・ decrease-key は未対応（標準的なヒープ）
