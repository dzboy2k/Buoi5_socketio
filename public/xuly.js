// alert("Hello");

// Gọi hàm kết nối lên server
var socket = io("http://localhost:3000/");

// Lắng nghe tín hiệu từ server
socket.on("server-gui-ds", function (data) {
      // alert(data.length);
      // alert("Nhận được data");
      // alert(data[0].HOTEN);

      // Xóa danh sách đang có, mỗi lần lấy ds về là thêm mới
      $("#ds").html(""); // Thay đổi nội dung thẻ html

      // Duyệt mảng
      data.map(function (hocvien, index) { // index: chỉ số phần tử của mảng
            // alert(hocvien.HOTEN);
            // append: thêm nội dung vào thẻ html
            $("#ds").append(`
                  <div class='hocvien'>
                        <div class='hang1'>id: ` + index +` || <span>` + hocvien.HOTEN + `</span></div>
                        <div class='hang2'>` + hocvien.EMAIL + ` - ` + hocvien.SODT + `</div>
                  </div>
            `);
      });
});

// Test jquery
$(document).ready(function () {
      // alert("Hello");

      // Bắt sự kiện khi click vào send
      $("#btnRegister").click(function () { 
            // alert(1);

            // Gửi tín hiệu lên server
            socket.emit("hocvien-gui-thongtin", 
                  {hoten:$("#txtHoTen").val(), 
                  email:$("#txtEmail").val(), 
                  dienthoai:$("#txtSoDT").val()}
            ); // val(): lấy giá rị đã nhập
      });
});