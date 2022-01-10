function getApiData(){
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', // thuộc tính đường dẫn do backend quy định
        method: 'GET', //giao thức do backend quy định
        responseType: 'json' //json: mặc định, text: Chuỗi, document: thẻ =>Dom để lấy dữ liệu
    });
    //Định nghĩa trường hợp goi Api thành công
    promise.then(function(result){
        //hàm này tự gọi khi thành công
        console.log('result', result.data);
        //gọi hàm tạo giao diện
        renderTable(result.data);
    })
    //Định nghĩa trường hợp gọi Api thất bại
    promise.catch(function(error){
        //Hàm này gọi khi thất bại
        console.log('error', error);
    })
}

getApiData();
function renderTable(mangSinhVien){
    var htmlContent = '';
    for(var i = 0; i < mangSinhVien.length; i++){
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = mangSinhVien[i];
        htmlContent += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.soDienThoai}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>${sinhVien.diemToan}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td style="width: 200px">
                    <button class="btn btn-danger" onclick="xoaSinhVien(${sinhVien.maSinhVien})">Xóa</button>
                    <button class="btn btn-primary" onclick="suaSinhVien(${sinhVien.maSinhVien})">Sửa</button>
                </td>
            </tr>
        `
    }
    document.getElementById('tblSinhVien').innerHTML = htmlContent;
}

//Thêm sinh viên
document.querySelector('#btnThemSinhVien').onclick = function(){
    //Lấy thông tin người dùng từ các thẻ input
    var sinhVien = new SinhVien(); 
     sinhVien.maSinhVien =  document.getElementById('maSinhVien').value ;
     sinhVien.tenSinhVien =  document.getElementById('tenSinhVien').value ;
     sinhVien.loaiSinhVien =  document.getElementById('loaiSinhVien').value ;
     sinhVien.email =  document.getElementById('email').value ;
     sinhVien.soDienThoai =  document.getElementById('soDienThoai').value ;
     sinhVien.diemToan =  document.getElementById('diemToan').value ;
     sinhVien.diemLy =  document.getElementById('diemLy').value ;
     sinhVien.diemHoa =  document.getElementById('diemHoa').value ;
     sinhVien.diemRenLuyen =  document.getElementById('diemRenLuyen').value ;

     //Dùng axios gọi api (request url backend)
     var promise = axios({
         url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
         method: 'POST',
         data: sinhVien // {"maSinhVien"=1,"tenSinhVien"=2}
     })

     //THành công
     promise.then(function(result){
         console.log('result', result.data)
         //Gọi lại api lấy danh sách sinh viên
         //windown.location.reload(); //reload lại trang
         getApiData();
     })
     //Thất bại
     promise.catch(function(error){
         console.log('error', error.response.data)
     })
}
//Sửa sinh viên api
function suaSinhVien(maSinhVienClick){
    //console.log(maSinhVienClick)

    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+maSinhVienClick,
        method:'GET'
    });
    //Thành công
    promise.then(function(result){
        console.log('result', result)
        var sinhVien = result.data;
        //Gán dữ liệu lên form
        document.getElementById('maSinhVien').value = sinhVien.maSinhVien;
        document.getElementById('tenSinhVien').value = sinhVien.tenSinhVien;
        document.getElementById('loaiSinhVien').value = sinhVien.loaiSinhVien;
        document.getElementById('email').value = sinhVien.email;
        document.getElementById('soDienThoai').value = sinhVien.soDienThoai;
        document.getElementById('diemToan').value = sinhVien.diemToan;
        document.getElementById('diemLy').value = sinhVien.diemLy;
        document.getElementById('diemHoa').value = sinhVien.diemHoa;
        document.getElementById('diemRenLuyen').value = sinhVien.diemRenLuyen;
        //Khóa mã sinh viên
        document.getElementById('maSinhVien').disabled = true;

    })
    //Thất bại
    promise.catch(function(err){
        console.log('error', err)
    })
}

//Xóa sinh viên api
function xoaSinhVien(maSinhVienClick){
   // console.log('masinhvienxoa', maSinhVienClick)
   var promise = axios({
       url:'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien='+maSinhVienClick,
       method: 'DELETE'
   })
   //thành công
   promise.then(function(result){
       console.log('result', result)
       //Gọi lại api lấy danh sách sinh viên
      // window.location.reload();
      getApiData();

   })
   //Thất bại
   promise.catch(function(err){
       console.log('error', err.response?.data)
   })
}

//Cập nhật
document.getElementById('btnCapNhatThongTin').onclick = function(){
    var sinhVien = new SinhVien(); 
     sinhVien.maSinhVien =  document.getElementById('maSinhVien').value ;
     sinhVien.tenSinhVien =  document.getElementById('tenSinhVien').value ;
     sinhVien.loaiSinhVien =  document.getElementById('loaiSinhVien').value ;
     sinhVien.email =  document.getElementById('email').value ;
     sinhVien.soDienThoai =  document.getElementById('soDienThoai').value ;
     sinhVien.diemToan =  document.getElementById('diemToan').value ;
     sinhVien.diemLy =  document.getElementById('diemLy').value ;
     sinhVien.diemHoa =  document.getElementById('diemHoa').value ;
     sinhVien.diemRenLuyen =  document.getElementById('diemRenLuyen').value ;
    //Gọi api cập nhật
    var promise = axios({
        url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sinhVien.maSinhVien,
        method:'PUT',
        data: sinhVien
    });
    //Thành công
    promise.then(function(result){
        console.log('result', result);
        //Thành công thì load lại table
        getApiData();
    })
    promise.catch(function(err){
        console.log('error', err.response.data)
    })
}