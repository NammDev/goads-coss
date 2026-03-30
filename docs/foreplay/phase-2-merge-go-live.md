# Phase 2: Merge & Go Live

> Xem chi tiết merge checklist tại [`changelog.md`](./changelog.md)

## Điều kiện
- Tất cả pages trong `(foreplay)` đã code xong
- Trang đã approve design
- Test responsive + không lỗi build

## Các bước
1. Rename `(marketing)` → `(marketing-legacy)`
2. Rename `(foreplay)` → `(marketing)`
3. Promote `.foreplay` CSS tokens lên `:root`
4. Update root layout font (Inter thay Geist cho marketing)
5. Verify tất cả routes + auth + admin/portal
6. Xóa `(marketing-legacy)` sau 1 sprint

## Rollback
Rename ngược lại trong 1 commit nếu có vấn đề.
