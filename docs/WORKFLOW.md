# Quy trình dựng và khôi phục

## 1. Khôi phục mã nguồn

Dùng checkout hiện tại của kho, nhánh main hoặc nhánh người dùng chỉ định. Mỗi cloud task đã có không gian riêng; không tạo worktree trừ khi được yêu cầu.

Đọc AGENTS.md và PROJECT_MEMORY.md trước. Không giả định các đường dẫn cũ `/workspace/remotion-studio` và `/workspace/kokoro` tồn tại ở chat mới. Mã portable hiện nằm trong `studio/` và `tools/kokoro/` của checkout.

Không commit `node_modules`, browser binary, model weights, venv, cache, secret hoặc log vào Git. Lockfile, mã nguồn, audio cần thiết và generator đã được lưu. Các video và audio ở đây do quá trình sản xuất tạo ra; không có API key kèm theo.

## 2. Cài Remotion

Yêu cầu: Node.js 24, npm. Dùng npm ci để giữ lockfile.

```bash
cd studio
npm ci --no-audit --no-fund
NODE_USE_ENV_PROXY=1 npx --no-install remotion browser ensure
npm run studio -- --no-open
```

Studio dùng cổng 3000. Kiểm tra bằng HTTP nội bộ khi môi trường không hỗ trợ link preview; một PID/cổng mở chưa đủ. Không đưa link localhost cho người dùng nếu UI không hỗ trợ.

Font kiểm tra bằng `fc-match 'Liberation Serif'`. Khi font chưa có, cài gói Liberation của hệ điều hành hoặc nhúng font hợp lệ; không âm thầm thay font. Chrome Headless trên Linux cần thư viện hệ thống tương ứng; đọc lỗi thiếu thư viện để cài đúng. `ffmpeg`/`ffprobe` dùng để kiểm tra đầu ra.

Tất cả gói Remotion phải cùng phiên bản 4.0.539 trong bản lưu hiện tại. Không tự nâng phiên bản trong lúc khôi phục.

## 3. Cài Kokoro khi cần giọng mới

Yêu cầu: Python 3.12, uv, curl, sha256sum. Model chạy CPU, khoảng 338 MB cả model và bộ giọng. Không cần GPU hoặc API key.

```bash
bash tools/kokoro/setup.sh
```

Script tạo venv riêng, cài requirements đã pin, tải `kokoro-v1.0.onnx` và `voices-v1.0.bin` từ release `model-files-v1.1` của upstream thewh1teagle/kokoro-onnx. SHA256SUMS ghi hash các tệp upstream đã tải qua HTTPS ở lần thiết lập đầu, dùng kiểm tra tính nhất quán khi khôi phục; đây không phải chữ ký độc lập của nhà phát hành. Nếu hash khác, dừng và điều tra, không đổi hash/tắt TLS cho qua.

Giọng thử:

```bash
cd tools/kokoro
.venv/bin/python speak.py --voice am_michael --lang en-us --text "Smarter choices. A better future." --output out/test.wav
```

Các generator `make_*.py` là ví dụ đã dùng cho từng video. Mặc định xuất vào `<repo>/studio`; có thể đặt `REMOTION_PROJECT` thành đường dẫn thư mục Remotion khác. Chúng giữ model theo đường dẫn tương đối với tools/kokoro, không phụ thuộc đường dẫn cloud cũ.

**Không chạy lại generator của một video đã duyệt chỉ để xem thử**: nó sẽ ghi lại audio/cues/SRT của video đó; generator gốc chỉ tạo SRT phần nội dung chính. Nếu kiểm tra, đặt REMOTION_PROJECT tới một thư mục tạm. Muốn phụ đề cả video, nối cue outro có cộng offset phần chính. Các SRT trong videos đã có outro ở các bản dùng outro.

Kokoro runtime MIT; model Kokoro-82M Apache-2.0. Nguồn:
- https://github.com/thewh1teagle/kokoro-onnx
- https://huggingface.co/hexgrad/Kokoro-82M
- https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md

## 4. Trình tự tạo video mới

1. Đọc yêu cầu mới và các lựa chọn đã chốt. Viết kịch bản tiếng Anh có nhịp dẫn rõ; không tự áp giới hạn 30 giây hoặc 4 cảnh.
2. Lập kế hoạch minh họa cho từng đoạn. Nhân vật cho tình huống/hội thoại; đồ vật, ẩn dụ và sơ đồ cho giải thích; chữ ngắn cho câu chốt. Không cố giữ cùng hai nhân vật xuyên suốt.
3. Tạo giọng Michael theo các đoạn ngắn. Đo số mẫu thật để tạo start/end frame, thêm khoảng dừng có chủ đích. Chọn mức song song vừa phải, model hiện dùng 2 thread CPU.
4. Lưu WAV trong studio/public/audio, cue trong studio/src. Thời lượng chính lấy từ audio, không đoán.
5. Theo lựa chọn mới nhất, dùng phụ đề theo câu và bố cục đúng kiểu Monty Hall. Căn mốc theo audio. Không tự áp lại thử nghiệm hộp hẹp/đặt cao theo Gemini đã bị người dùng rút lại; đọc PROJECT_MEMORY trước.
6. Dựng composition mới và đăng ký trong studio/src/index.tsx. Không sửa lại video cũ nếu chưa được yêu cầu. Dùng tương tác/hành động có ý nghĩa, chuyển cảnh nhẹ khi cần.
7. Nối SharedOutro vào cuối bằng Sequence/Series, tăng thời lượng Composition thêm SHARED_OUTRO_DURATION. Tránh để audio chính và outro chồng lời. Giữ nội dung quan trọng trong vùng an toàn, kể cả lời kêu gọi ở outro.
8. Xuất SRT riêng gồm toàn bộ phần chính và outro. Lưu kịch bản MD cùng tên video.

Monty Hall hiện là mẫu phụ đề được người dùng chỉ định: left/right 50px, bottom 150px, font 37px, hộp tối, theo câu. Chỉ sao phần phụ đề; không tự thêm chân trang hoặc chỉ số cảnh. Không cần sửa lại các video cũ khác nếu chưa được yêu cầu.

## 5. Xuất và xác minh

```bash
cd studio
npm run render -- SharedOutro out/shared-outro-check.mp4 --concurrency=2
# Video khác: thay SharedOutro và tên tệp đầu ra bằng composition muốn xuất.
npx --no-install remotion still src/index.tsx SunkCost out/layout-check.png --frame=2380
ffprobe -v error -show_entries stream=codec_name,width,height:format=duration,size -of json out/shared-outro-check.mp4
ffmpeg -v error -i out/shared-outro-check.mp4 -f null -
```

- Kiểm tra render kết thúc thành công, đủ frame, có H.264 và AAC khi dùng audio.
- Xem các khung hình đại diện, đặc biệt câu dài, biểu đồ, vật thể được trao và chuyển sang outro.
- Kiểm tra phụ đề hiển thị đầy đủ và đúng mẫu người dùng đã chọn. Người dùng đã rút lại thử nghiệm safe-zone theo Gemini; không tự thay đổi vị trí sang bố cục đó.
- Kiểm tra phát âm tên, số, pause và độ khớp phụ đề. Không mô tả “đã nghe” nếu chỉ kiểm tra metadata/biên độ.
- Không cần chạy lại mọi video cũ khi thêm một video mới. Render vẫn phải bundle được tất cả import trong entrypoint.

## 6. Giao tệp qua GitHub

Sau khi xác minh, chép MP4, SRT và kịch bản vào videos/ theo tên rõ ràng. Chỉ stage các tệp của công việc; kiểm tra git diff/status, commit và push nhánh phù hợp trong phạm vi người dùng đã cho phép. Không force-push; kiểm tra remote trước khi cập nhật main và giữ thay đổi mới từ người khác.

Giao link GitHub raw cho MP4/SRT; có thể kèm link blob cho nút Download raw file. Nếu repo riêng tư cần đăng nhập. Không dùng link localhost hoặc hứa workspace link tải được.

Không tự upload mạng xã hội, gửi tin cho người khác hoặc xuất bản môi trường cloud.

## 7. Mạng và môi trường cloud

- Dùng proxy và CA được môi trường cấp; giữ TLS/checksum verification.
- Trong phiên ban đầu, lệnh mạng trong sandbox báo không kết nối proxy nhưng chạy qua cơ chế quyền mạng phù hợp thì hoạt động. Chẩn đoán theo môi trường hiện tại, không kết luận GitHub/npm mất quyền chỉ vì GH_TOKEN trống.
- Node 24 có thể cần NODE_USE_ENV_PROXY=1 khi tải Chrome để HTTP client dùng proxy.
- Nếu dùng cloud skills, đọc runtime/network policy trước thao tác mạng và dùng trạng thái hiện tại. Không chép secret hoặc dump environment vào log/tài liệu.
- GitHub là nguồn khôi phục mã và tài liệu. Cấu hình cloud draft/snapshot, tiến trình đang chạy và dependencies không tự đi theo một chat mới chỉ vì đã push Git.
