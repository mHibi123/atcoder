# Deque

双方向キュー（Double-Ended Queue）です。両端への O(1) 追加・削除が可能です。

## 概要

- 先頭・末尾への push / pop
- 添字アクセス（get / set）
- JavaScript 配列の `shift()` より効率的な BFS 等

典型問題: 0-1 BFS、スライディングウィンドウ、両端操作

## AtCoder への組み込み方

1. [Deque.ts](../Deque.ts) の内容をコピー
2. `InputScanner` クラスの直後、`export {}` より前に貼り付け

依存関係なし。単体で貼れる。

## 依存関係

なし

## API 一覧

### コンストラクタ

```typescript
new Deque<T>(initialValues?: Iterable<T>)
```

- 初期値を渡すと先頭から順に末尾側へ追加

### メソッド・プロパティ

| 名前 | 説明 | 計算量 |
|------|------|--------|
| `unshift(value)` | 先頭に追加 | 償却 O(1) |
| `push(value)` | 末尾に追加 | 償却 O(1) |
| `shift()` | 先頭を削除して返す。空なら undefined | 償却 O(1) |
| `pop()` | 末尾を削除して返す。空なら undefined | 償却 O(1) |
| `first()` | 先頭を参照（削除しない） | 償却 O(1) |
| `last()` | 末尾を参照（削除しない） | 償却 O(1) |
| `get(i)` | 先頭から i 番目（0-indexed） | O(1) |
| `set(i, value)` | i 番目を置換 | O(1) |
| `isEmpty()` | 空かどうか | O(1) |
| `toArray()` | 配列として取得 | O(N) |
| `size` | 要素数（getter） | O(1) |

## 使用例

```typescript
const dq = new Deque<number>([1, 2, 3]);

dq.unshift(0);
dq.push(4);
// [0, 1, 2, 3, 4]

dq.shift();  // 0
dq.pop();    // 4
dq.first();  // 1
dq.last();   // 3
dq.get(1);   // 2

// BFS の典型パターン
const queue = new Deque<[number, number]>();
queue.push([0, 0]);
while (!queue.isEmpty()) {
    const [x, y] = queue.shift()!;
    // ...
}
```

## 注意点

- `get(i)` / `set(i, value)` で範囲外の i は `undefined` / `RangeError`
- `shift()` / `pop()` は空のとき `undefined`（非 null アサーション `!` で受け取るかチェックを推奨）
- 真ん中への挿入・削除は想定していない
