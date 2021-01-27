// Gọi thư viện express
var express = require("express");
var app = express();
// Tạo thư mục chứa file hỗ trợ xử lý trên web
app.use(express.static("public"));
// Tạo thư mục chứa giao diện sẽ hiển thị
app.set("view engine", "ejs"); // Sử dụng ejs làm template engine
app.set("views", "./views"); // Đường dẫn chứa file giao diện, "./": đi từ gốc
//  Dựng server
var server = require("http").Server(app);
//  Kết nối socket.io đến server
var io = require("socket.io")(server);
// server lắng nghe từ port
server.listen(3000);

var mang = [];

// Lắng nghe sự kiện có người kết nối
io.on("connection", function (socket) { 
      // Mỗi người dùng connection lên server -> tạo ra 1 biến socket
      console.log("Co nguoi ket noi " + socket.id);

      // Server lắng nghe sự kiện có người gửi thông tin
      socket.on("hocvien-gui-thongtin", function (data) {
           // console.log(data.hoten); 
           // console.log(data.email); 
           // console.log(data.dienthoai);
           
           // Thêm phần tử vào mảng
           mang.push(
                  // Tạo lớp mới
                  new HocVien(data.hoten, data.email, data.dienthoai)
           );
           console.log(data.hoten);
      
           // Server phát tín hiệu về cho tất cả mọi người dùng
           io.sockets.emit("server-gui-ds", mang);
      });
      
})

// Hàm tạo lớp
function HocVien(hoten, email, sodt) {
      this.HOTEN = hoten; // Tạo thuộc tính
      this.EMAIL = email;
      this.SODT = sodt;
}

// Tạo route - đường dẫn
app.get("/", function (req, res) {
      res.render("trangchu"); // Trả về 1 file giao diện
})