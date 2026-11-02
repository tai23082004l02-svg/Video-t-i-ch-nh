# The Intuition Glitch

**Mẫu hiện tại đã được người dùng chốt:** `videos/intuition-glitch-birthday-paradox-dynamic-layout.mp4` và `.srt`. Đọc `docs/CURRENT_BRIEF.md` để theo đúng lựa chọn mới nhất. Các biến thể trước ở dưới là lịch sử chỉnh sửa.

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
- Friendship Paradox: vì sao bạn bè có nhiều bạn hơn theo một số cách lấy mẫu.
- Hilbert’s Hotel: khách sạn đầy vẫn nhận thêm khách.
- Coastline Paradox: thước nhỏ hơn, bờ biển dài hơn.
- Nontransitive Dice: các xúc xắc thắng nhau theo vòng.
- Secretary Problem: bài toán dừng tối ưu, với các giả định mô hình nêu rõ.

## Kiểm tra bản giao

Bản MP4 cuối khoảng 138,75 giây (2:19), H.264 1080×1920 30fps và AAC. Render hoàn tất 4162 frame, kiểm tra hình học phụ đề không báo tràn. Đã xem các khung phòng 23 người, công thức và biểu đồ với overlay vùng che giả lập; điểm 97% đã căn lại theo câu phụ đề. Đã giải mã toàn bộ MP4 bằng ffmpeg không lỗi và kiểm tra 66 cue SRT không chồng nhau, tối đa 2 dòng, gồm outro. Chưa xác minh UI trên thiết bị/nền tảng đăng thực tế.

## Điều chỉnh sau phản hồi người dùng

Bản mới: videos/intuition-glitch-birthday-paradox-centered.mp4 và -centered.srt, khoảng 137,24 giây. Hộp phụ đề căn giữa khung hình tại x540, rộng 720px (x180–900), chữ 45px, vẫn ở y1270. Giữ tối đa 2 dòng. Bỏ phần chờ dư sau câu cuối: nội dung kết thúc sau cue lời cuối 6 frame (0,2 giây); khi ghép outro bỏ 9 frame im lặng dẫn đầu. Rút tổng khoảng 1,5 giây. Nội dung và giọng outro không đổi. SRT phải dùng bản -centered để đúng các mốc outro mới. Generator đã cập nhật tạo mốc theo cách ghép mới; SRT lịch sử trong videos/ không tự ghi đè.

## Lựa chọn phụ đề cuối cùng sau thử nghiệm

Người dùng yêu cầu khôi phục đúng phụ đề video Monty Hall, không dùng thay đổi theo Gemini. Bản hiện tại: `videos/intuition-glitch-birthday-paradox-monty-captions.mp4` và `.srt`. Hộp đen phía dưới, left/right 50px, bottom 150px, chữ trắng đậm 37px, theo câu; 33 câu phần chính + 3 cue outro. Giữ đoạn nghỉ trước outro khoảng 0,2 giây và bỏ 9 frame im lặng đầu outro, thời lượng vẫn khoảng 137,24 giây. Các ghi chú safe-zone/căn giữa hộp hẹp phía trên là lịch sử đã rút lại.

## Cập nhật cân giữa nội dung chính

Theo yêu cầu tiếp theo, bản `intuition-glitch-birthday-paradox-balanced.mp4` căn giữa toàn bộ nhãn series, dòng giới thiệu, tiêu đề, khối minh họa và phần giải thích theo trục ngang x540. Tiêu đề rộng810px; khối minh họa rộng800px. Các nhãn trục bên trong biểu đồ giữ cách căn dễ đọc. Phụ đề vẫn đúng kiểu Monty Hall, timeline/audio và nhịp nối outro không đổi so với bản -monty-captions; SRT tương ứng có nội dung/thời gian giống nhau.

## Bố cục linh hoạt, ít khoảng trống

Bản mới `videos/intuition-glitch-birthday-paradox-dynamic-layout.mp4` làm lớn và hạ minh họa theo từng cảnh, gọn phần tiêu đề, bỏ vài chú thích lặp lời đọc. Cảnh product/reveal dùng chung ProbabilityBreakdown, không reset/fade cả cảnh khi chuyển ý: phân số đang nhân khớp số người n; kết quả49,3% sẵn sàng trước câu khẳng định; sau đó phép trừ,50,7% và thanh xác suất mở ra. Kết quả phụ và chính đều cân giữa. Lịch, căn phòng, mạng lưới, biểu đồ và phần chốt có kích thước thích ứng; cảnh nhiều chữ được kiểm tra riêng. Audio, thời lượng, phụ đề Monty Hall và mốc outro như bản -balanced; SRT giống nhau.

## Waiting-Time / Inspection Paradox — tập mới đã triển khai

**Why You Wait Longer Than You Think — The Inspection Paradox**. Người dùng chọn chủ đề thứ ba trong danh sách đề xuất. Đây là bản mới để xem và phản hồi; chưa thay thế mẫu hình ảnh Birthday Paradox dynamic-layout đã được duyệt.

- Nội dung: vì sao trung bình khoảng cách chuyến xe 10 phút không bảo đảm chờ trung bình 5 phút.
- Mô hình minh họa luân phiên khoảng 2 và 18 phút, hành khách đến đều theo thời gian và độc lập lịch xe; mọi người lên được chuyến kế tiếp.
- P(gặp khoảng ngắn) = 2/20 = 10%; P(gặp khoảng dài) = 18/20 = 90%.
- E[chờ] = 0,1 × 1 + 0,9 × 9 = **8,2 phút**. Kiểm tra độc lập qua diện tích tam giác và 20 lượt đến ở giữa mỗi phút; không coi các khoảng xe liên tiếp là độc lập.
- Đây không phải dữ liệu đo một tuyến xe thực tế. Canh giờ theo lịch/ứng dụng thay đổi mô hình lấy mẫu.
- Kịch bản: `scripts/intuition-glitch/inspection-paradox.json`; generator: `tools/kokoro/make_inspection_paradox.py`.
- Composition: `InspectionParadox`, nguồn `studio/src/InspectionParadox.tsx`, audio và cue riêng.
- Bản giao: `videos/intuition-glitch-inspection-paradox.mp4`, `.srt`, `-script.md`.
- Giữ Michael, Liberation Serif, phụ đề theo câu kiểu Monty Hall và outro chung bỏ 9 frame im lặng đầu.

Kiểm tra bản dựng ngày 2026-11-01: render đủ **4.621 frame**, H.264 1080×1920 30fps + AAC, khoảng **154,05 giây**. Giải mã toàn bộ bằng FFmpeg không lỗi. Đã xem khung đại diện của câu hỏi, lịch đều/không đều, lấy mẫu, tính toán, biểu đồ, giả định, live tracker, kết và outro. SRT có 28 cue không chồng nhau, gồm outro. WAV 24 kHz mono có tín hiệu ở cả 25 đoạn lời đọc, không clipping. Chưa rà phát âm bằng nghe trực tiếp hoặc thử UI nền tảng đăng.

## St. Petersburg Paradox — tập tiếp theo đã triển khai

**An Infinite Average. A Finite Wallet. — The St. Petersburg Paradox**. Sau tập Inspection Paradox, người dùng yêu cầu triển khai chủ đề kế tiếp trong danh sách: St. Petersburg. Đây là bản mới chờ phản hồi, chưa thay thế mẫu Birthday Paradox dynamic-layout đã duyệt.

- Tung đồng xu công bằng, độc lập đến ngửa đầu tiên ở lần n; tiền thưởng gộp là 2^n USD. Phí vào chơi trả riêng.
- Xác suất 2^(-n) nhân tiền thưởng 2^n luôn bằng $1; tổng kỳ vọng vô hạn trong mô hình không có trần thưởng, với bên trả thưởng đủ khả năng chi trả.
- Trò chơi dừng với tiền thưởng hữu hạn với xác suất 1. Xác suất nhận tối đa $2, $4, $8 lần lượt là 1/2, 3/4, 7/8.
- Ngửa đầu tiên ở lần 20: $1.048.576, xác suất 1/1.048.576; đóng góp kỳ vọng vẫn là $1.
- Biến thể trần $1.024: E[min(2^N,1024)] = 9 × $1 + $1.024 × 1/512 = **$11**, trước phí vào chơi. Không nhầm trần tiền thưởng với cắt bỏ mọi kết quả sau lần tung 10.
- Expected utility phụ thuộc tài sản và sở thích; đường cong lõm là minh họa một loại sở thích, không áp đặt một giá vé hợp lý duy nhất hoặc khẳng định mọi hàm utility đều giải quyết nghịch lý.
- Kịch bản: `scripts/intuition-glitch/st-petersburg-paradox.json`; generator: `tools/kokoro/make_st_petersburg_paradox.py`.
- Composition `StPetersburg`: `studio/src/StPetersburg.tsx`, cue `stPetersburgData.ts`, audio riêng.
- Bản giao: `videos/intuition-glitch-st-petersburg-paradox.mp4`, `.srt`, `-script.md`. Giữ Michael, Liberation Serif, phụ đề Monty Hall và outro chung.

Kiểm tra bản dựng ngày 2026-11-02: render đủ **5.275 frame**, H.264 1080×1920 30fps + AAC, khoảng **175.85 giây**. Giải mã toàn bộ MP4 bằng FFmpeg không lỗi. Đã rà 11 khung hình đại diện, gồm phép tính và outro; SRT có 28 cue không chồng nhau, gồm outro. WAV 24 kHz mono có tín hiệu ở cả 25 đoạn lời đọc và không clipping. Phép tính được kiểm tra bằng phân số chính xác. Chưa rà phát âm bằng nghe trực tiếp hoặc thử UI nền tảng đăng.

## Two-Envelope Paradox — tập tiếp theo đã triển khai

**Why Not Switch Forever? — The Two-Envelope Paradox**. Người dùng yêu cầu chủ đề kế tiếp sau St. Petersburg. Bản mới chờ phản hồi, chưa thay thế mẫu hình ảnh Birthday Paradox dynamic-layout đã duyệt.

- Một phong bì có số tiền gấp đôi phong bì kia; chọn ban đầu ngẫu nhiên, không phí đổi.
- Lập luận hấp dẫn: E[other|A] = ½ × 2A + ½ × A/2 = 1,25A. Hai trọng số ½ không tự động đúng khi đã cố định A theo số tiền vừa thấy.
- Cặp cố định $10/$20: đổi được +$10 hoặc −$10, mỗi trường hợp xác suất ½. Hai phong bì đều có kỳ vọng $15; A nhận giá trị khác nhau ở hai trường hợp.
- Mô hình hữu hạn rõ ràng: người tổ chức chọn cặp $10/$20 hoặc $20/$40, mỗi cặp xác suất ½; sau đó chọn phong bì độc lập, đều. Bốn kết quả (chosen,other) = (10,20),(20,10),(20,40),(40,20), mỗi kết quả xác suất ¼.
- Khi thấy $20: hai trường hợp còn lại đồng xác suất, E[other|A=20]=$25. Khi thấy $40: other=$20 chắc chắn, xác suất $80 bằng 0. Khi thấy $10: other=$20 chắc chắn.
- Trước khi mở, E[chosen]=E[other]=$22,50. Phân biệt kỳ vọng không điều kiện với kỳ vọng theo số tiền vừa thấy. Không kết luận đổi luôn sai hoặc luôn đúng.
- Tất cả ví dụ có kỳ vọng hữu hạn; không mở rộng kết luận sang các mô hình đuôi vô hạn với kỳ vọng không xác định.
- Kịch bản: `scripts/intuition-glitch/two-envelope-paradox.json`; generator: `tools/kokoro/make_two_envelope_paradox.py`.
- Composition `TwoEnvelope`: `studio/src/TwoEnvelope.tsx`; cue `twoEnvelopeData.ts`, WAV riêng.
- Bản giao: `videos/intuition-glitch-two-envelope-paradox.mp4`, `.srt`, `-script.md`. Giữ Michael, Liberation Serif, phụ đề Monty Hall và outro chung.

Kiểm tra bản dựng ngày 2026-11-02: render đủ **5.252 frame**, H.264 1080×1920 30fps + AAC, khoảng **175.08 giây**. Giải mã toàn bộ MP4 bằng FFmpeg không lỗi. Đã rà 12 khung hình đại diện, gồm mô hình, kỳ vọng có điều kiện và outro. SRT có 25 cue không chồng nhau, gồm outro. WAV 24 kHz mono có tín hiệu ở 22 đoạn lời đọc và không clipping. Kỳ vọng/xác suất được kiểm tra bằng phân số chính xác. Chưa rà phát âm bằng nghe trực tiếp hoặc thử UI nền tảng đăng.
