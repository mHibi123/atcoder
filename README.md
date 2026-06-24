# AtCoder (TypeScript / Bun)

AtCoder 向けの TypeScript 解答リポジトリです。コンテスト回答・練習用

## ディレクトリ構成

```text
atcoder/
├── template.ts          # 雛形（直接編集しない）
├── lib/                 # 提出用ライブラリ（コピペで使う）
├── contests/            # 問題解答
│   └── {contest_id}/
│       ├── {problem}.ts
│       └── tests/
│           ├── {problem}.in
│           └── {problem}.out   # 任意
├── scripts/
│   └── new-problem.ps1
└── README.md
```

## 命名規則

| 対象         | 規則                 | 例                              |
| ------------ | -------------------- | ------------------------------- |
| 大会フォルダ | contest ID（小文字） | `abc400`, `arc200`, `typical90` |
| 問題ファイル | 問題記号（小文字）   | `a.ts`, `f.ts`, `001.ts`        |
| テスト入力   | `{問題}.in`          | `tests/a.in`                    |
| 期待出力     | `{問題}.out`（任意） | `tests/a.out`                   |

## 新規問題の作り方

### スクリプト（推奨）

```powershell
.\scripts\new-problem.ps1 -Contest abc400 -Problem a -TaskTitle "問題タイトル"
```

オプション:

- `-TaskLabel` … ヘッダの問題記号（省略時は `-Problem` を大文字化）
- `-TaskTitle` … 問題タイトル
- `-TaskUrl` … 問題 URL（省略時は AtCoder の既定 URL を生成）

### 手動

1. `[template.ts](template.ts)` を `contests/{contest_id}/{problem}.ts` にコピー
2. ヘッダの `${CONTEST_ID}` 等を置換
3. 必要な `[lib/*.ts](lib/)` を `InputScanner` 直後にコピペ（[lib/docs/README.md](lib/docs/README.md) 参照）

## ローカル実行

```powershell
Get-Content contests/abc400/tests/a.in | bun run contests/abc400/a.ts
```

## 提出

問題ファイル全体を AtCoder に貼り付けます。`lib/` は import せず、必要なコードをファイル内にコピーしてください。

## ライブラリ

詳細は [lib/docs/README.md](lib/docs/README.md) を参照。

## Git 管理

| 場面   | 推奨                                                                 |
| ------ | -------------------------------------------------------------------- |
| 未完成 | WIP コミット、または `contests/**/scratch/` に置く（gitignore 済み） |
