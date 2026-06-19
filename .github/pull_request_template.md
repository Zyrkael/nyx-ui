## Summary

Mô tả ngắn gọn thay đổi chính của PR này.

## Scope

- Workspace/package/app bị ảnh hưởng:
- Có thay đổi public API không:
- Có thay đổi docs hoặc story không:

## Verification

- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] `pnpm build-storybook`
- [ ] Đã test thủ công ở `apps/playground` nếu phù hợp

## Checklist

- [ ] Branch và commit message theo convention của repo
- [ ] Không import bypass qua file nội bộ của package khác
- [ ] Nếu thêm component shared, đã cập nhật export path cần thiết
- [ ] Nếu đổi hành vi UI, đã cập nhật story hoặc docs tương ứng
- [ ] Không commit file generated/build output không cần thiết

## Notes for reviewers

Điểm nào reviewer nên tập trung xem kỹ nhất?
