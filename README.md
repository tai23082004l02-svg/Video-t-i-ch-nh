# Video production workspace

Kho mã và hướng dẫn tiếp tục làm video tài chính, AI, xác suất, tâm lý cho khán giả Mỹ.

**Chat mới bắt đầu từ [AGENTS.md](AGENTS.md), rồi đọc [chỉ dẫn hiện tại](docs/CURRENT_BRIEF.md), [bộ nhớ dự án](docs/PROJECT_MEMORY.md) và [quy trình dựng](docs/WORKFLOW.md).**

**Mẫu mới nhất đã chốt:** [Birthday Paradox — dynamic-layout](videos/intuition-glitch-birthday-paradox-dynamic-layout.mp4). Dùng bản này để tham chiếu bố cục; các bản trước là lịch sử chỉnh sửa.

## Các phần chính

- [`docs/PROJECT_MEMORY.md`](docs/PROJECT_MEMORY.md): quyết định đã chốt với người dùng, gồm nội dung, giọng, hình, phụ đề và vùng an toàn.
- [`docs/WORKFLOW.md`](docs/WORKFLOW.md): cài đặt, tạo audio, dựng và kiểm tra video.
- [`studio/`](studio/): mã Remotion, lockfile, các composition và audio đã dùng.
- [`tools/kokoro/`](tools/kokoro/): công cụ tạo giọng Michael, các bản kịch bản/generator và hướng dẫn tải model.
- [`templates/shared-outro/`](templates/shared-outro/): đoạn kết chung đã duyệt.
- [`templates/VIDEO_STYLE.md`](templates/VIDEO_STYLE.md): phong cách dựng và bố cục.
- [`videos/`](videos/): MP4, SRT và các kịch bản đã giao.

## Khởi động nhanh

Yêu cầu: Node.js 24, npm, Python 3.12 và uv (nếu tạo audio mới), font Liberation Serif. Xem chi tiết trong WORKFLOW.

```bash
cd studio
npm ci --no-audit --no-fund
NODE_USE_ENV_PROXY=1 npx --no-install remotion browser ensure
npm run studio -- --no-open
```

Mở lại video đã có không cần chạy Kokoro. Model AI, trình duyệt, môi trường Python và `node_modules` được cài lại khi cần; không được đưa vào Git.

## Bắt đầu một chat mới

Gắn kho mã này ở nhánh **main**, rồi gửi:

> Đọc AGENTS.md, docs/CURRENT_BRIEF.md và docs/WORKFLOW.md trong kho tai23082004l02-svg/Video-t-i-ch-nh trước khi làm video. Giữ các lựa chọn đã chốt; yêu cầu mới của tôi được ưu tiên nếu có thay đổi.

GitHub lưu tài liệu và mã nguồn; chat mới vẫn cần được cấp quyền hoặc gắn kho mã để đọc. Đây không phải cơ chế tự đồng bộ trí nhớ giữa mọi cuộc trò chuyện.

## Lưu ý về các video cũ

Các bản đã giao được giữ nguyên, kể cả bản thử. Người dùng hiện đã chọn quay lại phụ đề đúng kiểu Monty Hall; thử nghiệm safe-zone/phụ đề cụm ngắn theo Gemini đã rút lại. Đọc PROJECT_MEMORY để dùng lựa chọn mới nhất.

## Series The Intuition Glitch

Xem [kế hoạch và ghi chú tập Birthday Paradox](docs/series/the-intuition-glitch.md). Lựa chọn phụ đề mới nhất là đúng kiểu Monty Hall, theo câu ở phía dưới; các bản phụ đề ngắn/vùng an toàn là lịch sử thử nghiệm.
