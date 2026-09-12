# Kế hoạch: 9 môi trường riêng biệt cho 9 Cảnh Giới

## Mục tiêu
Mỗi khi người chơi thăng cấp cảnh giới, bản đồ game tự động đổi sang một môi trường (màu sắc + hiệu ứng nền) đặc trưng riêng, thay vì 4 nhóm theme chung như hiện nay.

## Thiết kế 9 môi trường

| # | Cảnh giới | Môi trường |
|---|-----------|------------|
| 1 | Luyện Khí | Đất xám, khô cằn, tiêu điều — cây phai màu, ít linh khí |
| 2 | Trúc Cơ | Xanh nhạt thô sơ, rừng hoang vu — cây rậm rạp tự nhiên |
| 3 | Kim Đan | Hổ phách/vàng đất — linh khí loãng bắt đầu xuất hiện (hạt sáng bay nhẹ) |
| 4 | Nguyên Anh | Xanh lá đậm — linh khí tụ hội, cây cối xanh tốt, pulse linh thạch mạnh hơn |
| 5 | Hóa Thần | Xanh ngọc bích — linh sơn, linh khí xoay quanh bí kíp, mây mờ nhẹ |
| 6 | Luyện Hư | Xanh dương sẫm — hư không huyền ảo, hạt linh khí dày, sương mờ |
| 7 | Hợp Thể | Tím huyền bí — mây mù bao phủ, hiệu ứng thiên địa giao hòa (particle + sương) |
| 8 | Đại Thừa | Vàng kim rực rỡ — tiên giới, aura ngũ sắc, trận pháp quay dưới vật phẩm |
| 9 | Độ Kiếp | Trắng sáng + lôi điện/sấm sét uy nghiêm (giữ và nâng cấp hiệu ứng sét hiện có) |

## Các thay đổi kỹ thuật

### 1. `src/lib/realm-themes.ts`
- Mở rộng `REALM_THEMES` từ 4 nhóm thành **9 entry**, mỗi entry ứng đúng 1 cảnh giới (index 0–8 khớp với `REALMS`).
- Mỗi entry định nghĩa riêng: màu phủ mặt đất, màu tô lại cây/linh thạch/bí kíp, màu hào quang, và các cờ hiệu ứng (mây mờ, hạt sáng, pulse, particle, sấm sét, lá rơi, trận pháp).
- `getRealmGroup()` đổi thành trả về trực tiếp `realmIdx` (clamp 0–8) — giữ tên hàm để không phá code đang dùng, hoặc đổi tên thành `getRealmThemeIndex` và cập nhật nơi gọi.
- `rewardMultiplier()` cập nhật theo index cảnh giới trực tiếp (ví dụ `1 + floor(realmIdx / 2)` hoặc giữ công thức theo cấp, sẽ chốt khi code — mặc định tăng dần theo cấp).

### 2. `src/lib/cultivation-data.ts`
- Bỏ/đơn giản trường `group` trên `Realm` vì không còn nhóm 4 theme (mỗi cảnh giới tự có theme).
- `getRealmThemeGroup()` trả về `realmIdx` đã clamp.

### 3. `src/components/cultivation-game.tsx`
- Cập nhật mọi chỗ lấy theme theo nhóm sang lấy theo cảnh giới hiện tại.
- Đảm bảo chuyển đổi theme tự động ngay khi đột phá (theme đọc từ `getRealmIndex(tuVi)` mỗi frame nên sẽ tự đổi — chỉ cần kiểm tra không có cache theme cũ).
- Hiệu ứng nền theo theme mới: mây trôi, hạt linh khí, sấm sét lôi điện cho Độ Kiếp, sương mù cho Hợp Thể/Luyện Hư.

## Kiểm chứng
- Build OK (sửa mọi lỗi TypeScript strict phát sinh).
- Mở Preview, dùng console/debug để nhảy Tu Vi qua từng mốc cảnh giới, chụp màn hình xác nhận mỗi cảnh giới hiển thị đúng màu/hiệu ứng mô tả.

## Không thay đổi
- Tilemap, sprite, joystick, logic câu hỏi/cược linh thạch, Tu Vi tự tăng theo thời gian — giữ nguyên.
