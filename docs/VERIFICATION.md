# Kiểm tra bản bàn giao

Ngày 2026-11-01, trong môi trường đang dùng:

- `npm ci` thành công từ studio/package-lock.json trong bản portable.
- Chrome Headless được tải và chạy với proxy/TLS hiện có.
- `npm run render -- SharedOutro out/handoff-outro-check.mp4 --concurrency=2` hoàn tất 191/191 frame. Entry point import toàn bộ composition lịch sử, đã bundle thành công.
- MP4 mẫu có H.264 1080×1920 và AAC, dài 6,379 giây; giải mã toàn bộ bằng ffmpeg không lỗi.
- tools/kokoro/setup.sh đã tạo venv Python 3.12 riêng và cài đủ 16 dependency đã pin.
- Model/voices được tái sử dụng từ bản đã tải trong môi trường, kiểm tra SHA256SUMS thành công. Không tải lại model vào một máy độc lập trong lần bàn giao này.
- Generator make_shared_outro.py chạy từ đường dẫn trong kho, với REMOTION_PROJECT trỏ sang thư mục tạm, đã tạo audio/cues/SRT mà không sửa bản đã duyệt. WAV 24 kHz, khoảng 6,37 giây, mẫu hữu hạn và có tín hiệu.
- Đã kiểm tra cú pháp các Python generator và shell setup; git diff không có lỗi whitespace.

Không khẳng định đã thử phục hồi trên một cloud task mới hoặc kiểm tra UI thực tế trên mọi nền tảng. Không xuất lại video cũ để sửa vị trí phụ đề trong công việc bàn giao này. Các tệp kiểm thử, browser, model, venv và cache đều không đưa vào Git.
