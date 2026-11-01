# Chỉ dẫn hiện tại — đọc đầu tiên khi đổi chat

Đã chốt với người dùng ngày 2026-11-01. Tài liệu này tóm tắt lựa chọn hiện hành, ưu tiên hơn những ghi chú thử nghiệm cũ. Yêu cầu mới của người dùng được ưu tiên khi có thay đổi.

## Mẫu hình ảnh mới nhất đã được người dùng chấp nhận

**Birthday Paradox — bản dynamic-layout**:

- [Video](../videos/intuition-glitch-birthday-paradox-dynamic-layout.mp4)
- [Phụ đề](../videos/intuition-glitch-birthday-paradox-dynamic-layout.srt)
- [Mã dựng hiện tại](../studio/src/BirthdayParadox.tsx)
- [Kịch bản](../scripts/intuition-glitch/birthday-paradox.json)

Đây là mẫu tham chiếu hiện tại. Các bản không hậu tố, `-centered`, `-monty-captions` và `-balanced` là lịch sử chỉnh sửa, không phải mẫu mới nhất. Không cần sản xuất lại tập này khi chat mới bắt đầu.

## Những điều cần giữ cho video tiếp theo

- **Khán giả Mỹ:** tiếng Anh cho giọng đọc, chữ trong hình và SRT. Trao đổi với người dùng bằng tiếng Việt.
- **Giọng:** Kokoro Michael (`am_michael`, `en-us`).
- **Font:** Liberation Serif, không gọi nhầm là Times New Roman.
- **Khung mặc định:** dọc 1080×1920, 30fps. Nền xanh trầm, chữ kem, nhấn mint và đào.
- **Kịch bản:** hook cuốn hút, câu trước dẫn sang câu sau, có tình huống và phần giải đáp xứng đáng. Đừng ép thời lượng/số cảnh; đừng bịa dữ liệu, nghiên cứu hay tỷ lệ trí thông minh.
- **Căn giữa:** nhãn series, tiêu đề, khối minh họa và phần giải thích phải cân đối theo trục ngang của khung hình. Nhãn trục biểu đồ vẫn theo cấu trúc dễ đọc.
- **Dùng diện tích khung hình:** bố trí theo từng cảnh. Ít thông tin thì làm hình lớn hơn và hạ về giữa; nhiều thông tin mới thu gọn. Tránh nội dung dồn lên trên và bỏ trống một khoảng lớn trước phụ đề.
- **Chuyển động có ý nghĩa:** công thức phát triển thành kết quả, thanh xác suất đổi theo số liệu, đồ vật được trao, nhân vật phản ứng. Không lấp khoảng trống bằng trang trí vô nghĩa.
- **Nhân vật có chọn lọc:** dùng khi tình huống/hội thoại cần, không giữ cùng hai nhân vật xuyên suốt mọi đoạn. Các đoạn khác dùng đồ vật, ẩn dụ, sơ đồ, biểu đồ hoặc chữ ngắn.
- **Nhịp cảnh:** đủ thời gian theo dõi, không liên tục cắt/quét màu gây rối. Không có chỉ số cảnh kiểu 1/4.
- **Bỏ chữ dư:** xóa chú thích nhỏ chỉ lặp lại lời đọc/phụ đề; không tự thêm chân trang.

## Phụ đề — lựa chọn cuối, không dùng bản thử theo Gemini

Người dùng đã yêu cầu quay về đúng kiểu **Monty Hall**:

- Theo câu/đoạn lời đọc, chữ trắng đậm căn giữa trong hộp tối phía dưới.
- Với 1080×1920: left/right 50px, bottom 150px, padding 27px 32px, min-height 135px, radius 20px.
- Font Liberation Serif **37px**, line-height **1.4**, background `#091113eb`, border `1px solid #778f7755`.
- **Không tự áp lại** hộp hẹp/đặt cao ở 65–75% hoặc ép thành cụm ngắn theo thử nghiệm trước. Người dùng đã rút lại hướng đó.
- Giao SRT tiếng Anh riêng và căn đúng mốc cả outro. SRT thuần không quyết định font/vị trí của ứng dụng phát.

## Đoạn kết chung

“**Smarter choices. A better future. Follow for more.**” — giọng Michael.

Dùng `studio/src/SharedOutro.tsx`, không bịa tên/logo kênh. Nối nhanh sau câu cuối: khoảng **0,2 giây** nghỉ; bỏ phần im lặng dẫn đầu khi cần. Trong Birthday Paradox: phần chính cắt ở `narration[last].end + 6 frame`, outro bỏ 9 frame đầu ở 30fps. Không cắt mất từ; SRT phải tính theo điểm nối thực tế.

## Series và công việc tiếp theo

Series đang làm: **The Intuition Glitch** — nghịch lý toán/xác suất. Tập mới đầu tiên là Birthday Paradox; Monty Hall đã có trước đó. Danh sách ý tưởng trong [ghi chú series](series/the-intuition-glitch.md) là đề xuất, không phải yêu cầu tự sản xuất toàn bộ. Chưa có tập tiếp theo được chọn.

## Nơi tiếp tục làm

- `studio/`: Remotion, các composition, cue và audio.
- `tools/kokoro/`: công cụ TTS portable, giọng Michael, dependency pin và tải model.
- `docs/WORKFLOW.md`: cài, chạy, xuất và kiểm tra.
- `docs/PROJECT_MEMORY.md`: lịch sử và quyết định chi tiết.
- `templates/VIDEO_STYLE.md`: phong cách dựng.

Làm từ checkout hiện có; không tạo worktree nếu chưa được yêu cầu. Không trông chờ các thư mục cloud cũ tồn tại hoặc dịch vụ còn chạy.

## Kiểm tra và giao

Xem khung hình đại diện và cảnh nhiều chữ; bảo đảm hình không đè phụ đề, số liệu theo đúng thời điểm lời đọc, audio/outro không có khoảng chờ dư. Render hoàn tất và giải mã MP4 không lỗi; SRT phải đúng timeline. Không khẳng định đã nghe nếu chỉ kiểm tra metadata.

Lưu nguồn/kịch bản/cue/audio cần thiết, MP4 và SRT trên GitHub. Giao liên kết tải GitHub từ nhánh có tệp (mặc định hiện tại main); workspace links trước đây không hoạt động với người dùng. Không force-push, không tự đăng mạng xã hội hoặc xuất bản môi trường cloud.
