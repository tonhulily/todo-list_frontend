# Ứng dụng Todo-list Frontend

Đây là giao diện người dùng của ứng dụng Todo-list, được xây dựng bằng ReactJS và Vite.

---

## Các tính năng chính

* Hiển thị danh sách công việc.
* Thêm, xóa và cập nhật trạng thái công việc.
* Giao diện responsive, tối ưu cho cả máy tính và điện thoại.

---

## Cấu hình Biến Môi Trường

Để kết nối với backend, ứng dụng sử dụng biến môi trường.

1.  **Chạy trên Local:**
    Tạo file `.env.development` trong thư mục gốc của dự án với nội dung:
    ```ini
    VITE_API_URL=http://localhost:8080/tasks
    ```

2.  **Triển khai trên Netlify:**
    Khi triển khai lên Netlify, bạn sẽ cấu hình biến môi trường `VITE_API_URL` với giá trị là URL đã deploy của backend.

    * **Key:** `VITE_API_URL`
    * **Value:** `https://todo-api-go-4ki3.onrender.com/tasks`

---

## Hướng dẫn Chạy trên Local

1.  Đảm bảo bạn đã cài đặt Node.js và npm.
2.  Clone repository này về máy.
3.  Mở terminal, di chuyển vào thư mục dự án và chạy các lệnh sau:
    ```bash
    npm install
    npm run dev
    ```

---

## Thông tin Triển khai

* **Link đã deploy:** `https://todo-list-frontend-1.netlify.app`

Để triển khai, bạn cần kết nối repository GitHub của bạn với Netlify và đảm bảo rằng biến môi trường `VITE_API_URL` đã được cấu hình chính xác.

## Kết nối với Backend

* Dự án Backend tương ứng được đặt tại repository: `https://github.com/tonhulily/todo-api-go`