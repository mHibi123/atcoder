# BinarySearch

ソート済み配列に対する二分探索と、比較関数の定数を提供します。

## 概要

- 存在判定（binary_search）
- lower_bound / upper_bound（C++ 互換の境界探索）
- ソート用比較関数定数

典型問題: ソート済み配列の探索、答えの二分探索、座標圧縮後の検索

## AtCoder への組み込み方

1. [BinarySearch.ts](../BinarySearch.ts) の内容をコピー
2. `InputScanner` クラスの直後、`export {}` より前に貼り付け

依存関係なし。単体で貼れる。

## 依存関係

なし

## API 一覧

### 比較関数定数

| 定数 | 用途 |
|------|------|
| `COMPARE_NUMBER_ASCENDING` | 数値昇順 |
| `COMPARE_NUMBER_DESCENDING` | 数値降順 |
| `COMPARE_SORT_DEFAULT` | 文字列辞書順（Array#sort デフォルト相当） |
| `COMPARE_SORT_REVERSE` | 文字列逆順 |

### 探索メソッド

| メソッド | 説明 | 戻り値 | 計算量 |
|---------|------|--------|--------|
| `binary_search(array, target, compareFn)` | target と等しい要素があるか | `boolean` | O(log N) |
| `lower_bound(array, target, compareFn)` | target 以上の最初のインデックス | `number`（なければ length） | O(log N) |
| `upper_bound(array, target, compareFn)` | target より大きい最初のインデックス | `number`（なければ length） | O(log N) |

## 使用例

```typescript
const arr = [1, 3, 5, 7, 9];
const cmp = BinarySearch.COMPARE_NUMBER_ASCENDING;

BinarySearch.binary_search(arr, 5, cmp);  // true
BinarySearch.binary_search(arr, 4, cmp);  // false

BinarySearch.lower_bound(arr, 4, cmp);    // 2  (arr[2]=5 が最初の ≥4)
BinarySearch.upper_bound(arr, 5, cmp);    // 3  (arr[3]=7 が最初の >5)

// ソート
const a = [5, 2, 9, 1];
a.sort(BinarySearch.COMPARE_NUMBER_ASCENDING);
// [1, 2, 5, 9]

// 個数: [lower_bound, upper_bound) の幅
const count = BinarySearch.upper_bound(arr, 5, cmp)
            - BinarySearch.lower_bound(arr, 5, cmp);
// 5 の個数 = 1
```

## 注意点

- **配列は compareFn に従ってソート済み**であること
- `lower_bound` / `upper_bound` は C++ の `std::lower_bound` / `std::upper_bound` と同じ意味
- カスタム型を使う場合は独自の compareFn を渡す
