# Bộ nhớ dự án — đọc trước khi làm video

Cập nhật ngày 2026-11-01. Đây là các quyết định trong cuộc trò chuyện, không phải hướng dẫn suy đoán từ các video mẫu. Yêu cầu mới của người dùng được ưu tiên khi có thay đổi.

## Mục tiêu và ngôn ngữ

- Làm video cho khán giả Mỹ. Chủ đề đã làm: tài chính cá nhân, AI và tiêu dùng, Monty Hall, thao túng bằng cách đổi tiêu chuẩn, sunk cost.
- Trao đổi với người dùng bằng tiếng Việt; lời đọc, chữ trong video và phụ đề bằng tiếng Anh Mỹ.
- Khung đã dùng: dọc 1080 × 1920, 30 fps, MP4 H.264 + AAC. Đây là mặc định, không hạn chế người dùng yêu cầu khung khác.
- Không ép video vào 30 giây, một số cảnh cố định hay một công thức thời lượng. Độ dài phải phục vụ câu chuyện và khả năng hiểu của người xem.

## Viết kịch bản

- Người dùng muốn mở đầu mạnh, tạo tò mò hoặc thử thách trực giác. Ví dụ đã duyệt: “Want to make a stupid decision? Keep paying for something that is failing you, just because you already paid for it.”
- Mỗi câu cần dẫn tới câu sau: mở một câu hỏi, đặt người xem vào tình huống, phát triển căng thẳng, rồi giải thích rõ và đưa kết luận hữu ích.
- Người dùng thích lời có sức hút, nhưng không cần mọi câu đều lên gân. Không kéo dài chỉ để giữ bí mật hoặc nhồi khẩu hiệu.
- Không bịa tỷ lệ “thông minh hơn xx% nhân loại”, nghiên cứu, số liệu hay khẳng định tuyệt đối để giật mở đầu.
- Giải thích điều kiện của ví dụ. Monty Hall: người dẫn biết vị trí xe, luôn mở một cửa khác có dê và luôn đề nghị đổi. Ví dụ tín dụng đã dùng là khoản trả cố định, không phải công thức khoản tối thiểu của mọi ngân hàng.
- Với tâm lý: mô tả hành vi và bối cảnh, không gắn nhãn chẩn đoán cho nhân vật. Phân biệt thay đổi yêu cầu hợp lý với việc lặp lại đổi tiêu chuẩn; sunk cost không có nghĩa bỏ cuộc luôn đúng, phải xét lợi ích tương lai và chi phí đổi hướng.

## Giọng đọc và công cụ

- Remotion 4.0.539 + React 19.2.0, Node.js 24. Dựng bằng React/SVG/CSS.
- Kokoro-82M v1.0 qua kokoro-onnx 0.6.1, chạy CPU, không cần API key.
- Giọng mặc định đã chốt: **Michael — `am_michael`, `en-us`**. Không tự đổi sang giọng nữ hoặc giọng khác.
- Các generator đã dùng tốc độ 1.0–1.07; điều chỉnh theo nội dung, không nói nhanh để ép thời lượng. Audio WAV gốc 24 kHz mono PCM16; video cuối mã hóa AAC.
- Kokoro chính thức v1.0 không hỗ trợ tiếng Việt; hiện người dùng làm nội dung tiếng Anh nên không phải chướng ngại.
- Đã dùng căn phụ đề theo từng đoạn TTS. Đây là thời gian đoạn thực tế; chia từ bên trong đoạn bằng tỷ lệ không đồng nghĩa căn từng từ chính xác. Nếu cần word-level, phải căn lại và nghe/kiểm tra.

## Font và nhận diện

- Người dùng hỏi Times New Roman; môi trường không có font đó. Đã chốt dùng **Liberation Serif** gần giống và có sẵn.
- Không gọi Liberation Serif là Times New Roman. Chỉ dùng Times New Roman thật khi người dùng cung cấp font hoặc có nguồn hợp lệ.
- Phong cách hiện tại: nền xanh trầm/than, chữ kem, nhấn xanh mint và màu đào. SVG đơn giản, dễ đọc, đồng nhất nhưng có thể đổi không gian theo câu chuyện.
- Chưa có tên hoặc logo kênh được cung cấp. Không tự bịa tên kênh.

## Hình ảnh và nhịp dựng — điểm đã sửa nhiều lần

1. Bản đầu cắt/quét cảnh liên tục khiến người dùng thấy rối. Không lấy “nhiều cảnh” làm mục tiêu.
2. Bản ít cảnh nhưng chỉ có chữ/vật thể nhích nhẹ bị người dùng thấy quá tĩnh. “Bớt cắt cảnh” không có nghĩa “bớt hành động”.
3. Người dùng gợi ý nhân vật gặp nhau, hiện lời thoại, đưa bằng chứng, phản ứng. Bản hai nhân vật xuyên suốt lại quá cứng nhắc.
4. Quy tắc cuối: **chọn hình thức minh họa theo từng đoạn**. Nhân vật chỉ khi cần tương tác hoặc tình huống; phần khác dùng đồ vật, ẩn dụ, sơ đồ, biểu đồ hoặc câu chữ ngắn.

- Hành động phải giúp kể nội dung: bước tới, nhận/trao vật, thay yêu cầu, do dự, dừng lại, đặt giới hạn. Tránh chỉ làm chuyển động trang trí.
- Giữ bối cảnh đủ lâu, dẫn mắt bằng một hành động chính tại một thời điểm. Dùng cắt gọn hoặc chuyển nhẹ khi ý thay đổi.
- **Không hiển thị chỉ số cảnh** như 1/4, 2/4 hay 01/12. Đây là yêu cầu rõ của người dùng.

## Phụ đề — quyết định mới nhất: quay lại Monty Hall

Người dùng đã rút lại các chỉnh sửa theo đề xuất Gemini và nói rõ: **“Như cái video Monty Hall ấy.”** Đây là lựa chọn hiện tại, thay thế thử nghiệm phụ đề ngắn đặt cao và hộp hẹp căn giữa.

- Dùng đúng kiểu `studio/src/MontyHall.tsx`: hiển thị theo câu, chữ trắng đậm căn giữa, font Liberation Serif 37px, line-height 1.4.
- Hộp tối màu, left/right 50px, bottom 150px, padding 27px 32px, min-height 135px, border-radius 20px, background #091113eb, border 1px solid #778f7755 cho khung 1080×1920.
- Không tự đẩy phụ đề lên 65–75% chiều cao, thu hẹp hộp, hoặc ép thành cụm ngắn theo thử nghiệm trước. Không nhắc lại cảnh báo UI khi người dùng đã chọn cách này.
- Chỉ điều chỉnh lại nếu người dùng yêu cầu. Không tự thêm chỉ số cảnh hay chân trang.
- Vẫn cung cấp SRT theo audio, có cả outro. SRT thuần không bảo đảm font/vị trí hiển thị trong mọi ứng dụng.
- Bản Birthday Paradox mới dùng `videos/intuition-glitch-birthday-paradox-monty-captions.mp4` và `.srt`.

## Đoạn kết chung đã duyệt

> Smarter choices. A better future. Follow for more.

- Giọng Michael, nền xanh trầm, chữ kem/mint, font Liberation Serif, hiện nhẹ từng ý.
- Đã duyệt khoảng **6,37 giây — 191 frame ở 30fps**. Thêm vào thời lượng nội dung chính, không cắt mất lời đọc cuối.
- Component: `studio/src/SharedOutro.tsx`. Audio: `studio/public/audio/shared-outro-michael.wav`. Mẫu di động: `templates/shared-outro/`.
- Không có tên kênh giả, không có chỉ số cảnh. Nội dung chính đã nói CTA thì tránh lặp thêm CTA dài trước outro.

## Giao tệp và GitHub

- Các liên kết workspace/sandbox trước đây không tải được với người dùng. Dùng **GitHub** để giao MP4 và SRT.
- Kho: `tai23082004l02-svg/Video-t-i-ch-nh`. Các video trước nằm trong nhánh `videos/ten-dollars-a-day`; hướng dẫn và mã nguồn hiện được đưa lên `main` để chat mới tìm thấy.
- Liên kết tải: `https://github.com/tai23082004l02-svg/Video-t-i-ch-nh/raw/refs/heads/<branch>/videos/<file>.mp4` (SRT tương tự).
- Có thể dùng trang `blob` để người dùng nhấn Download raw file. Kho riêng tư cần người dùng đăng nhập/có quyền.
- Giữ video cũ để so sánh khi dựng lại, đặt tên bản mới rõ. Không force-push, không ghi đè thay đổi của người dùng.
- Việc đẩy tệp GitHub không phải đăng video lên mạng xã hội và không phải xuất bản môi trường cloud. Không tự thực hiện hai việc sau.

## Các bản đã giao và bài học

| Chủ đề | Tệp | Ghi chú |
|---|---|---|
| $10-a-Day Habit | `videos/ten-dollars-a-day-serif.mp4` | Giọng Michael, Liberation Serif |
| Minimum Payment Trap | `videos/minimum-payment-trap-4-scenes.mp4` | Bản bớt cắt cảnh; còn bố cục phụ đề cũ |
| AI và chi tiêu | `videos/ai-changed-spending.mp4` | Không còn chỉ số cảnh |
| Monty Hall | `videos/monty-hall.mp4` | Khoảng 2:05, có outro |
| Moving the Goalposts | `videos/moving-goalposts-animated.mp4` | Bản nhân vật; người dùng sau đó yêu cầu không dùng hai nhân vật suốt mọi đoạn |
| Sunk Cost Trap | `videos/sunk-cost-trap.mp4` | Khoảng 1:39; nhân vật chỉ trong ví dụ rạp phim; đã giao SRT |
| Outro chung | `videos/shared-outro.mp4` | Đã duyệt dùng lại |

Các bản cũ đã kiểm tra giải mã MP4 và một số khung hình khi dựng; không đồng nghĩa đã kiểm tra UI thực tế trên mọi nền tảng. Chưa có video nào trong danh sách được xuất lại theo yêu cầu vùng an toàn mới nhất.

## Series đang triển khai

Người dùng đã bắt đầu The Intuition Glitch (nghịch lý toán/xác suất). Tập mới đầu tiên là Birthday Paradox; xem docs/series/the-intuition-glitch.md. Monty Hall là bản đã làm trước. Giữ kịch bản có sức dẫn, không tự ép ngắn. Birthday Paradox đã thử phụ đề cụm ngắn/vùng an toàn, nhưng lựa chọn cuối của người dùng là quay lại kiểu phụ đề Monty Hall. Giữ dữ liệu timing âm vị trong nguồn để tham khảo; hiển thị và SRT của bản mới theo câu.

## Lịch sử thử nghiệm phụ đề

Đã thử đặt cao hơn để tránh UI, rồi hộp hẹp căn giữa. Người dùng không chọn hai bản đó và yêu cầu khôi phục đúng kiểu Monty Hall. Các bản lịch sử giữ để so sánh, không phải mặc định hiện tại.

## Nhịp nối đoạn kết

Người dùng thấy khoảng chờ trước outro quá lâu. Các video mới cần nối liền mạch sau câu cuối, chỉ để khoảng nghỉ ngắn tự nhiên (khoảng 0,2 giây), bỏ phần im lặng đầu outro khi ghép nếu cần. Không cắt mất từ cuối hay thay đổi giọng/nội dung outro đã duyệt. SRT outro phải căn lại theo điểm nối thực tế.
