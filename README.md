# Mystic Path Quest

Hãy tạo cho tôi một Web Game Tu Tiên 2D Top-down RPG bằng HTML5 Canvas:

1. Nhân vật & Điều khiển:
   - Một nhân vật hình người Tu Tiên ở giữa bản đồ.
   - Cung cấp Virtual Joystick (cần điều khiển) góc dưới màn hình để di chuyển nhân vật tự do.

2. Cảnh quan & Tài nguyên:
   - Bối cảnh đồ họa tiên cảnh 2D (cây cối, đường đi, núi đá).
   - Rải rác các đối tượng phát sáng: "Nguyên Thạch" và "Bí Kíp Tu Tập".

3. Cơ chế Trắc nghiệm & Tu Vi:
   - Khi nhân vật di chuyển lại gần/va chạm vào Nguyên Thạch hoặc Bí Kíp, tự động mở bảng câu hỏi trắc nghiệm tiếng Việt (4 lựa chọn).
   - Trả lời đúng: +1 Tu Vi, tài nguyên biến mất, nhân vật phát sáng hiệu ứng.
   - Trả lời sai: -1 Tu Vi.
   - Khi đạt 10/10 Tu Vi: Thăng cấp môi trường mới (từ Tân Thủ Thôn lên Bí Cảnh) và chuyển màu bối cảnh.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://soul-ascension-game.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/964118e7-e74f-4f2c-9fe6-8a0982d1cacb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
