# Git Commit & Push Automation Script

Script này giúp bạn tự động hóa quy trình commit và push code lên Git một cách nhanh chóng, tiện lợi chỉ với một lệnh duy nhất. Phù hợp cho các dự án cá nhân hoặc nhóm muốn tiết kiệm thời gian thao tác với Git.

## Chức năng chính

- Tự động add, commit và push code lên nhánh chỉ định.
- Giảm thao tác thủ công, hạn chế sai sót khi làm việc với Git.
- Có thể tích hợp vào các workflow phát triển phần mềm.

## Cách sử dụng 🚀

1. **Clone** repository này về máy của bạn:
   ```sh
   git clone <repo-url>
   ```
2. **Cấp quyền thực thi cho script:**
   ```sh
   chmod +x git_commit_and_push.sh
   ```
3. **Chạy script với cú pháp:**

   ```sh
   ./git_commit_and_push.sh <your-branch-name> "Your commit message over here"
   ```

   - `<your-branch-name>`: Tên nhánh bạn muốn push code lên (ví dụ: `main`, `develop`, ...)
   - `"Your commit message over here"`: Nội dung commit (bắt buộc đặt trong dấu nháy kép nếu có khoảng trắng)

### Ví dụ:

```sh
./git_commit_and_push.sh develop "Sửa lỗi validate form và cập nhật UI"
```

## Lưu ý

- Đảm bảo bạn đã cài đặt Git trên hệ thống.
- Script này chỉ hoạt động trên hệ điều hành Unix/Linux hoặc MacOS (không hỗ trợ Windows CMD).
- Nếu gặp lỗi quyền, hãy kiểm tra lại quyền thực thi với `chmod +x`.
- Script sẽ tự động add tất cả thay đổi (`git add .`). Nếu muốn kiểm soát file add, hãy sửa lại script cho phù hợp.

## Tham khảo thêm

- Hướng dẫn chi tiết: [dev.to/devrx/automate-your-git-workflow-with-this-simple-bash-script-5cm5](https://dev.to/devrx/automate-your-git-workflow-with-this-simple-bash-script-5cm5)

---

_Được phát triển để giúp bạn làm việc với Git hiệu quả hơn!_
