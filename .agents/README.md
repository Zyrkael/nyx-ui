# Nyx UI Agent Rules

Tài liệu này là rule mặc định cho Agent khi làm việc trong repo `nyx-ui`.

## Mục tiêu

- Giữ monorepo dễ mở rộng, dễ review, và dễ onboarding
- Ưu tiên shared API rõ ràng thay vì import tắt qua file nội bộ
- Mọi thay đổi phải đủ an toàn để app `playground`, docs `storybook`, và package shared cùng tiến hóa được

## Code Rules

### 1. Ưu tiên đúng boundary của monorepo

- UI dùng lại nhiều nơi đặt ở `packages/ui`
- Logic hoặc asset theo domain đặt ở package tương ứng như `form`, `grid`, `icons`, `theme`, `utils`
- Demo tạm, spike, hoặc kiểm tra nhanh chỉ đặt ở `apps/playground`
- Docs, stories, usage example đặt ở `apps/docs` hoặc cạnh component trong `packages/ui/src`

### 2. Không bypass public API khi import

- App nên import qua package name như `@nyx-ui/ui`
- Chỉ import subpath đã được khai báo trong `exports`
- Nếu cần dùng file nội bộ từ package khác, phải mở public export trước rồi mới dùng

Ví dụ ưu tiên:

```tsx
import { Button } from "@nyx-ui/ui/components/button";
import "@nyx-ui/ui/globals.css";
```

Ví dụ tránh:

```tsx
import { Button } from "../../../packages/ui/src/components/button";
```

### 3. Naming convention

- React component: `PascalCase`
- File component: `kebab-case.tsx`
- Story file: `*.stories.tsx`
- Utility/helper: `kebab-case.ts`
- Package workspace: `@nyx-ui/<domain>`
- App folder: đặt theo vai trò như `docs`, `playground`

### 4. Tổ chức file trong `packages/ui`

- `src/components/*`: component dùng lại
- `src/lib/*`: helper hoặc shared utility cho package
- `src/styles/*`: global style, token bridge, Tailwind entry
- `src/index.ts`: chỉ export những gì đã sẵn sàng làm public API

### 5. Khi thêm component mới

- Ưu tiên thêm bằng `shadcn/ui` flow đã cấu hình sẵn
- Story đặt cạnh component nếu component là shared
- Nếu component cần style hoặc helper chung, gom vào `lib` hoặc `styles`, không để logic dàn trải trong story
- Nếu thêm public component mới, cập nhật lại export entry liên quan

### 6. Chất lượng thay đổi

- Không đổi tên hoặc di chuyển package nếu chưa có lý do rõ ràng
- Tránh thêm dependency mới cho root nếu chỉ một package cần dùng
- Tránh duplicate utility đã có như `cn`
- Với thay đổi có ảnh hưởng shared UI, ưu tiên chạy:
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm build-storybook`

## Git Convention

### 1. Branch naming

- Format khuyến nghị: `<type>/<scope>-<short-description>`
- Các `type` nên dùng: `feat`, `fix`, `refactor`, `docs`, `chore`

Ví dụ:

- `feat/ui-button-loading-state`
- `fix/docs-storybook-build`
- `docs/readme-onboarding`

### 2. Commit message

- Dùng Conventional Commits: `<type>(<scope>): <summary>`
- Summary ngắn, ở thì hiện tại, mô tả đúng thay đổi
- Scope nên bám vào workspace hoặc domain bị ảnh hưởng
- Scope nên dùng `kebab-case`

Ví dụ:

- `feat(ui): add button loading state`
- `fix(docs): resolve storybook path issue`
- `docs(readme): add onboarding and roadmap`
- `chore(repo): align workspace scripts`

Repo có chuẩn bị sẵn `commitlint.config.cjs` cho format này.

### 3. Pull request expectation

- Một PR nên có một mục tiêu chính
- PR title nên bám commit style để dễ scan changelog
- Mô tả PR nên có:
  - thay đổi gì
  - ảnh hưởng package/app nào
  - đã tự verify bằng lệnh nào

### 4. Trước khi merge

- Đảm bảo không commit build output hoặc file generated không cần thiết
- Nếu thay đổi public API, cập nhật docs hoặc story tương ứng
- Nếu thêm component shared, kiểm tra import path mà consumer sẽ dùng có rõ ràng hay chưa
- Nếu đã cài dependency mới, có thể tự check commit gần nhất bằng `pnpm commitlint`

## Decision Defaults cho Agent

- Nếu chưa chắc code nên vào `app` hay `package`, ưu tiên hỏi: code này có được tái sử dụng ngoài một app không
- Nếu câu trả lời là có, ưu tiên đưa vào package
- Nếu thay đổi chỉ phục vụ test nhanh hoặc demo local, giữ ở `apps/playground`
- Nếu thêm rule mới cho team, cập nhật cả tài liệu này hoặc `README.md` để tránh knowledge nằm trong chat
