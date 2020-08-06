function xuLyLayDanhSachDienThoai() {
  // Services
  layDanhSachDienThoai().then(function (result) {
    danhSachDienThoai = result.data;
    console.log(danhSachDienThoai);
    renderHTML();
  });
}
xuLyLayDanhSachDienThoai();
var danhSachDienThoai = [];

const renderHTML = function (arr) {
  arr = arr || danhSachDienThoai;
  var htmlcontent = "";
  for (var i = 0; i < arr.length; i++) {
    var dienThoai = arr[i];
    htmlcontent += `
          <li class="item">
            <div class="item__info">
              <img
                src="${dienThoai.image}"
                alt=""
              />
              <h3>
              ${dienThoai.name}
              </h3>
              <div class="price">
              ${numberWithCommas(dienThoai.price)}₫
              </div>
            </div>
            <button class="btnbuy">
              Card
            </button>
          </li>
          `;
  }
  document.getElementById("tblDanhSachDienThoai").innerHTML = htmlcontent;
};
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(".");
}
//Hàm tìm kiếm
const findMobile = function () {
  const foundedMoblie = [];
  // 1. Lấy keyword người dùng nhaao vào (dom)
  const keyword = document
    .getElementById("txtSearch")
    .value.trim()
    .toLowerCase();
  // 2. Tìm theo mã: lập for, kiểm tra từng nhân viên trong mảng, cớ nhân viên nào
  // có id giống với kywword => push NV đó vào foundedMoblie
  //3. console.log(foundedMoblie)
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    const currentMobile = danhSachDienThoai[i];
    var fullName = currentMobile.name;

    fullName = fullName.toLowerCase();
    // console.log(currentMobile.id);
    if (currentMobile.id === keyword) {
      foundedMoblie.push(currentMobile);
      break;
    }
    if (fullName.indexOf(keyword) !== -1) {
      foundedMoblie.push(currentMobile);
    }
  }
  renderHTML(foundedMoblie);
};
const selectioneBrand = function () {
  const foundedMoblie = [];
  const sltBrand = document.getElementById("brandMobile").value.toLowerCase();
  console.log(sltBrand);
  for (var i = 0; i < danhSachDienThoai.length; i++) {
    const currentMobile = danhSachDienThoai[i];
    var nameBrand = currentMobile.type;

    // console.log(currentMobile.id);
    if (sltBrand === nameBrand) {
      foundedMoblie.push(currentMobile);
    }
    if (sltBrand === "0") {
      foundedMoblie.push(currentMobile);
    }
  }
  renderHTML(foundedMoblie);
};
const sltSortBrand = function () {
  const sltBrand = document.getElementById("sortMobile").value.toLowerCase();
  var sapXepDT = [];
  sapXepDT = danhSachDienThoai;
  console.log(sltBrand);
  if(sltBrand === "0"){
    renderHTML(danhSachDienThoai);
  }
  if (sltBrand === "az") {
    sapXepDT.sort(function (a, b) {
      var nameA = a.name.toLowerCase(); // bỏ qua hoa thường
      var nameB = b.name.toLowerCase(); // bỏ qua hoa thường
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // name trùng nhau
      return 0;
    }
    )
    renderHTML(sapXepDT);
  }
  if (sltBrand === "za") {
    sapXepDT.sort(function (a, b) {
      var nameA = a.name.toLowerCase(); // bỏ qua hoa thường
      var nameB = b.name.toLowerCase(); // bỏ qua hoa thường
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // name trùng nhau
      return 0;
    }
    );
  renderHTML(sapXepDT);
  }
  if(sltBrand === "tang"){
    sapXepDT.sort(function (a, b) {
      return a.price - b.price;
    })
    renderHTML(sapXepDT);
  }
  if(sltBrand === "giam"){
    sapXepDT.sort(function (a, b) {
      return b.price - a.price;
    })
    renderHTML(sapXepDT);;
  }
};
