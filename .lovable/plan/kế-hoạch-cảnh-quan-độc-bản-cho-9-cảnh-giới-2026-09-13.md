# Kế hoạch: Cảnh quan độc bản cho 9 Cảnh Giới

## Mục tiêu
Nâng cấp bản đồ Canvas để mỗi cảnh giới có một thế giới nhận diện rõ ngay khi nhìn, không chỉ đổi lớp màu. Giữ nguyên nhân vật, điều khiển, vật phẩm, câu hỏi, cược và nhịp tăng Tu Vi.

## Thiết kế cảnh giới
- **Luyện Khí:** rừng núi xanh tươi, suối uốn quanh, thác nước và bọt nước chuyển động.
- **Trúc Cơ:** phố cổ lát đá, mái tửu lầu, quầy phố, đèn lồng đỏ đung đưa và bóng người qua lại.
- **Kim Đan:** tông môn trên đỉnh núi, sân đá ngọc, bậc thềm, cổng môn và biển mây.
- **Nguyên Anh:** tiên đảo lơ lửng, hồ linh dịch, gợn nước, lá sen và hoa sen nở.
- **Hóa Thần:** thần điện long phượng, nền đá cổ, cột điện, hoa văn linh thú và hào quang.
- **Luyện Hư:** nền hư không sâu, tinh tú, dải ngân hà, quỹ đạo và sao lấp lánh.
- **Hợp Thể:** thiên cung bảy màu giữa mây, cầu trời, mái điện và bóng phượng hoàng bay lượn.
- **Đại Thừa:** tiên giới vàng kim, lầu vàng gác ngọc, đường sáng và quang mang chuyển động.
- **Độ Kiếp:** đỉnh thiên kiếp, mặt đá cao sơn, mây giông cuộn, chớp nhánh và chớp sáng toàn cảnh.

## Thực hiện
1. Mở rộng dữ liệu theme bằng loại cảnh quan, bảng màu phụ và cường độ hiệu ứng riêng cho từng cảnh giới.
2. Thêm bộ hàm vẽ Canvas dạng vector/pixel-art cho suối, kiến trúc, hồ sen, thần điện, ngân hà, thiên cung và thiên kiếp.
3. Phân lớp cảnh vật thành nền, mặt đất, vật thể và hiệu ứng phía trước để nhân vật vẫn rõ, va chạm không đổi.
4. Tự đổi toàn bộ cảnh quan khi đột phá; giữ hỗ trợ tham số `?tuvi=` để kiểm tra nhanh từng cảnh giới.
5. Cập nhật danh sách công việc và kiểm tra trang ở nhiều cảnh giới trên màn hình máy tính lẫn điện thoại.

## Kiểm chứng
- Biên dịch không lỗi.
- Chụp và xem trực tiếp đủ 9 cảnh giới, xác nhận mỗi nơi khác biệt rõ ràng, không che nhân vật/HUD/vật phẩm.
- Kiểm tra chuyển cảnh, joystick và popup câu hỏi vẫn hoạt động.
