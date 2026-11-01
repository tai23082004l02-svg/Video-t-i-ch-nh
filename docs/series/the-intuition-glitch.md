# The Intuition Glitch

Series: Lỗi trực giác — nghịch lý toán và xác suất. Người dùng đã yêu cầu triển khai series, viết kịch bản chuyên nghiệp, câu trước khiến người xem muốn nghe câu sau. Không ép video ngắn hoặc cố định số cảnh.

## Lối kể đã thống nhất

Đặt người xem trước một câu hỏi, cho họ tự đoán, làm lộ hiểu lầm cụ thể, rồi giải thích đủ rõ bằng hình ảnh. Sức hút phải đến cả từ việc hiểu ra, không chỉ giấu đáp án. Không bịa số liệu hoặc tỷ lệ thông minh để tạo hook.

Video tiếng Anh, Michael am_michael, Liberation Serif, minh họa thay đổi theo từng đoạn, phụ đề cụm ngắn trong vùng an toàn, không chỉ số cảnh, có outro chung.

## Tập đầu của đợt triển khai này

**Only 23 People? The Birthday Paradox**

- Kịch bản/gói nội dung: scripts/intuition-glitch/birthday-paradox.json.
- Tạo lời đọc/cue/phụ đề: tools/kokoro/make_birthday_paradox.py.
- Composition: studio/src/BirthdayParadox.tsx, id BirthdayParadox.
- Audio: studio/public/audio/birthday-paradox-michael.wav.
- Cue câu, cue phụ đề, kết quả toán: studio/src/birthdayParadoxData.ts.
- Bản giao: videos/intuition-glitch-birthday-paradox.mp4, .srt và -script.md.
- Monty Hall đã được sản xuất trước khi bắt đầu series này; có thể đưa vào series sau, chưa gán lại số thứ tự phát hành cho bản cũ.

Hook: “How many strangers would you need in a room before a shared birthday becomes more likely than not? A hundred? Two hundred? Try twenty-three.”

Kết: “Your intuition counted people. The probability counted pairs.”

## Toán học và cách giải thích

Mô hình cổ điển: ngày sinh độc lập, 365 ngày có xác suất bằng nhau, bỏ qua ngày nhuận.

P(không trùng trong n người) = ∏[(365−k)/365], k=0…n−1.
P(có ít nhất một cặp trùng) = 1 − P(không trùng).

- n=23: 253 cặp có thể so sánh; P(có trùng)=0.5072972343239857.
- n=50: P(có trùng)=0.9703735795779884.
- 253 cặp giúp giải thích trực giác, không được coi sự kiện trùng của các cặp là độc lập để tính kết quả chính xác.
- Nói xác suất hơn 50% không phải hứa mọi căn phòng 23 người đều có người trùng ngày sinh.

Đã đối chiếu công thức với mô phỏng 100.000 phòng độc lập, seed 20261101: n=23 khoảng 50.840%, n=50 khoảng 97.002%. Mô phỏng chỉ kiểm tra chéo; số trên video lấy theo công thức chính xác.

## Quy trình phụ đề mới

Model Kokoro đang dùng có đầu ra duration. Generator gọi create_timed, lấy mốc âm vị và ánh xạ cụm phụ đề vào chuỗi âm vị thực tế bằng SequenceMatcher. Các cụm dùng chữ số để dễ đọc, với bản mở rộng chữ số tương ứng khi ánh xạ tiếng nói.

Đây là căn theo timing do model cung cấp, không phải bằng chứng đã được người nghe rà từng từ. Không tuyên bố đã nghe audio nếu chỉ kiểm tra dữ liệu/metadata.

Bản này có 63 cụm phụ đề phần chính, thêm 3 cụm outro trong SRT. Mỗi cụm được thiết kế tối đa 2 dòng. Hộp đặt x80..890, y1270..khoảng1423, không có footer sát đáy. Component kiểm tra hình học DOM khi render để phát hiện tràn phải, quá thấp hoặc thành 3 dòng.

Có prop uiOverlay để kiểm tra bằng vùng che giả lập (phải x≥900, dưới y≥1440, trên y<150). Đây không phải bảo đảm UI của mọi nền tảng/thiết bị.

```bash
cd studio
npm run render -- BirthdayParadox out/intuition-glitch-birthday-paradox.mp4 --concurrency=3
npx --no-install remotion still src/index.tsx BirthdayParadox out/safe-zone.png --frame=520 --props='{"uiOverlay":true}'
```

## Các chủ đề tiếp theo đã đề xuất, chưa sản xuất

Birthday Paradox là tập đang triển khai, không phải yêu cầu sản xuất cả danh sách sau:

- Medical Test / Base Rate: kết quả dương tính và tỷ lệ nền.
- Simpson’s Paradox: kết quả đảo chiều khi gộp nhóm.
- Waiting-Time / Inspection Paradox: tại sao dễ gặp khoảng chờ dài.
- St. Petersburg Paradox: kỳ vọng vô hạn và số tiền thực tế sẵn sàng trả.
- Two-Envelope Paradox: lập luận đổi phong bì mãi mãi.
- Friendship Paradox: vì sao bạn bè có nhiều bạn hơn theo một số cách lấy mẫu.
- Hilbert’s Hotel: khách sạn đầy vẫn nhận thêm khách.
- Coastline Paradox: thước nhỏ hơn, bờ biển dài hơn.
- Nontransitive Dice: các xúc xắc thắng nhau theo vòng.
- Secretary Problem: bài toán dừng tối ưu, với các giả định mô hình nêu rõ.

## Kiểm tra bản giao

Bản MP4 cuối khoảng 138,75 giây (2:19), H.264 1080×1920 30fps và AAC. Render hoàn tất 4162 frame, kiểm tra hình học phụ đề không báo tràn. Đã xem các khung phòng 23 người, công thức và biểu đồ với overlay vùng che giả lập; điểm 97% đã căn lại theo câu phụ đề. Đã giải mã toàn bộ MP4 bằng ffmpeg không lỗi và kiểm tra 66 cue SRT không chồng nhau, tối đa 2 dòng, gồm outro. Chưa xác minh UI trên thiết bị/nền tảng đăng thực tế.
