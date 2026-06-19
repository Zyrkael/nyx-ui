# AGENTS

Hướng dẫn mặc định cho agent khi làm việc trong repo `nyx-ui`.

## Source of truth

- Rule chi tiết nằm tại `.agents/README.md`
- Nếu có xung đột giữa chat tạm thời và tài liệu repo, ưu tiên rule đã được commit trong repo

## Working defaults

- Tôn trọng boundary giữa `apps/*` và `packages/*`
- Không import xuyên vào source nội bộ của package khác nếu chưa có `exports`
- Ưu tiên cập nhật docs hoặc story khi thay đổi shared UI public API
- Với thay đổi ảnh hưởng shared UI, ưu tiên tự verify bằng `pnpm typecheck`, `pnpm build`, và `pnpm build-storybook`

## Git defaults

- Branch format: `<type>/<scope>-<short-description>`
- Commit format: Conventional Commits, ví dụ `feat(ui): add button loading state`
- PR nên có một mục tiêu chính, nêu rõ phạm vi ảnh hưởng và cách đã verify
- Repo có `commitlint.config.cjs`; khi cần owner review theo path, cập nhật `.github/CODEOWNERS`

## Maintenance

- Khi thêm convention mới cho team, cập nhật `.agents/README.md` hoặc file liên quan trong repo
- Không để rule vận hành chỉ tồn tại trong chat
