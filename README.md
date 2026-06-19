# Nyx UI

Monorepo cho UI library nội bộ, dùng `pnpm` workspace + `turbo`.

[![CI](https://github.com/Zyrkael/nyx-ui/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/Zyrkael/nyx-ui/actions/workflows/pr-checks.yml)
[![workspace](https://img.shields.io/badge/workspace-pnpm%20%2B%20turbo-0f766e)](./package.json)
[![ui](https://img.shields.io/badge/ui-shadcn%2Fui%20%2B%20tailwind%20v4-1d4ed8)](./packages/ui/package.json)
[![docs](https://img.shields.io/badge/docs-storybook%2010-f43f5e)](./apps/docs/package.json)

Hiện repo đã có sẵn:
- `tsup` base config dùng chung cho packages
- `Tailwind CSS v4`
- `shadcn/ui` theo mô hình monorepo
- `Storybook` để viết docs cho shared components
- `Vite playground` để test component nhanh

## Snapshot

- Trạng thái hiện tại: monorepo scaffold đã sẵn sàng để bắt đầu build shared UI library
- Shared package chính: `@nyx-ui/ui`
- Nơi thử nghiệm nhanh: `apps/playground`
- Nơi viết docs và review component: `apps/docs`

## Onboarding nhanh

Nếu đây là lần đầu vào repo, flow ngắn gọn thường là:

1. Cài dependency với `pnpm install`
2. Chạy Storybook bằng `pnpm storybook` để xem component docs hiện có
3. Chạy playground bằng `pnpm --filter @nyx-ui/playground dev` nếu cần test nhanh UI hoặc spike local
4. Khi thêm hoặc sửa component shared, chạy lại `pnpm typecheck` và `pnpm build`
5. Xem rule cho Agent và contributor tại `.agents/README.md`
6. Khi mở PR, dùng checklist có sẵn trong `.github/pull_request_template.md`
7. Commit format có thể được check bằng `pnpm commitlint`

## Yêu cầu

- Node.js `20+`
- `pnpm` `11.8.0`

## Cài đặt

```bash
pnpm install
```

## Cấu trúc repo

```text
apps/
  docs/         Storybook docs app
  playground/   Vite app để test UI nhanh

packages/
  ui/           Shared UI package cho shadcn/ui components
  core/
  form/
  grid/
  icons/
  theme/
  utils/

tsup.base.ts        Base config dùng chung cho tsup
tsconfig.base.json  Base config dùng chung cho TypeScript
turbo.json          Pipeline của monorepo
```

## Scripts ở root

```bash
pnpm build            # build toàn bộ workspace
pnpm commitlint       # check commit gần nhất theo Conventional Commits
pnpm dev              # chạy các dev task theo turbo
pnpm typecheck        # typecheck toàn repo
pnpm storybook        # chạy Storybook ở apps/docs
pnpm build-storybook  # build static Storybook
```

## Chạy từng app

### Playground

```bash
pnpm --filter @nyx-ui/playground dev
```

Playground dùng để test component trong lúc phát triển. App này import trực tiếp từ `@nyx-ui/ui`.

### Storybook docs

```bash
pnpm storybook
```

Storybook nằm ở `apps/docs` và đang đọc stories từ `packages/ui/src/**/*.stories.tsx`.

Build static docs:

```bash
pnpm build-storybook
```

Output nằm ở `apps/docs/storybook-static`.

## Shared UI package

Package dùng chung cho component library hiện tại là:

```text
packages/ui
```

Các file quan trọng:

- `packages/ui/src/components/*`: component dùng chung
- `packages/ui/src/lib/utils.ts`: utility dùng chung như `cn`
- `packages/ui/src/styles/globals.css`: theme + Tailwind CSS
- `packages/ui/components.json`: config cho `shadcn/ui` CLI

Import trong app:

```tsx
import { Button } from "@nyx-ui/ui/components/button";
import "@nyx-ui/ui/globals.css";
```

## Quy ước đặt app, package, component

- App đặt tên theo vai trò sử dụng, ví dụ `docs`, `playground`, thay vì tên mơ hồ theo công nghệ
- Workspace package dùng scope `@nyx-ui/*`
- Package name nên ngắn, mô tả đúng domain: `ui`, `form`, `grid`, `icons`, `theme`, `utils`
- Shared React component dùng `PascalCase` cho tên component và file export chính theo `kebab-case`, ví dụ `Button` trong `button.tsx`
- Utility và helper ưu tiên `kebab-case`, ví dụ `date-range.ts`, `cn.ts`, `form-schema.ts`
- Story đặt cạnh component và dùng hậu tố `.stories.tsx`
- Nếu package bắt đầu có nhiều public entry, cần thống nhất export qua `package.json` trước khi app khác import trực tiếp file nội bộ

## Khi nào nên đặt code ở đâu

- `packages/ui`: shared primitive, shadcn component, wrapper UI dùng lại giữa nhiều app
- `packages/form`, `grid`, `icons`, `theme`, `utils`: logic hoặc asset theo domain, không nhồi tất cả vào `ui`
- `apps/playground`: chỗ thử nghiệm nhanh, không nên giữ demo tạm quá lâu nếu đã ổn định
- `apps/docs`: stories, examples, docs flow phục vụ review và onboarding

## Alias đang dùng

Trong từng workspace, alias local đang dùng là:

```text
@/* -> src/*
```

Ví dụ trong `packages/ui`:

```tsx
import { cn } from "@/lib/utils";
```

Build alias cho libraries được cấu hình trong `tsup.base.ts`.

## Thêm component mới bằng shadcn/ui

Repo đã chuẩn bị sẵn `components.json` cho monorepo. Khi muốn thêm component mới, chạy lệnh từ `apps/playground`:

```bash
cd apps/playground
pnpm dlx shadcn@latest add button
```

Với cấu hình hiện tại:
- component shared sẽ được route vào `packages/ui`
- phần app-specific nếu có sẽ vào `apps/playground`

Sau khi add component, nên kiểm tra lại:

```bash
pnpm typecheck
pnpm build
pnpm build-storybook
```

## Viết docs cho component

Story nên đặt cạnh component trong `packages/ui/src`.

Ví dụ:

```text
packages/ui/src/components/button.tsx
packages/ui/src/components/button.stories.tsx
```

Mẫu story hiện tại:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
```

## Build package riêng lẻ

Ví dụ build package `ui`:

```bash
pnpm --filter @nyx-ui/ui build
```

Ví dụ typecheck package `ui`:

```bash
pnpm --filter @nyx-ui/ui typecheck
```

## Ghi chú

- `packages/ui` hiện là package shared chính cho component library.
- Các package như `core`, `form`, `grid`, `icons`, `theme`, `utils` đã có scaffold cơ bản nhưng chưa có source thật ngoài entry tối thiểu.
- Storybook hiện đang chạy tốt với React + Vite + Tailwind CSS v4.
- Nếu thêm package UI shared mới, nên cập nhật cả `exports`, `stories`, và docs flow tương ứng.
- `.github/CODEOWNERS` hiện là template an toàn; cần thay placeholder bằng GitHub user/team thật trước khi dùng để enforce review owner.

## Roadmap gần

- Hoàn thiện bộ foundation cơ bản trong `@nyx-ui/ui`: button, input, dialog, form field, feedback state
- Bổ sung guideline rõ hơn cho token/theme giữa `ui`, `theme`, và `icons`
- Mở rộng Storybook docs với usage note, do/don't, và playground snippet cho component quan trọng
- Chuẩn hóa flow tạo package mới để team thêm domain package mà không lệch convention
