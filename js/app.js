// =============================================
// CẤU HÌNH
// =============================================
var solanquay = 2; // Số lượt quay mỗi lần chơi

// =============================================
// POPUP CÀI ĐẶT
// =============================================
function mopopup() {
  document.getElementById("caidat").style.display = "block";
}

function tatpopup() {
  document.getElementById("caidat").style.display = "none";
}

// =============================================
// HOVER EFFECTS (jQuery)
// =============================================
$(".buttontatpopup").hover(
  function () {
    $("#popup").attr("src", "img/popup2.jpg");
  },
  function () {
    $("#popup").attr("src", "img/popup.jpg");
  }
);
$(".buttonlammoi").hover(
  function () {
    $("#popup").attr("src", "img/popup1.png");
  },
  function () {
    $("#popup").attr("src", "img/popup.jpg");
  }
);
$(".buttonnhantien").hover(
  function () {
    $(".buttonnhantien").attr("src", "img/nhantienhover.png");
  },
  function () {
    $(".buttonnhantien").attr("src", "img/nhantien.png");
  }
);
$(".lammoipopupnhantien").hover(
  function () {
    $("#popuptien").attr("src", "img/popupnhantienhover.png");
  },
  function () {
    $("#popuptien").attr("src", "img/popupnhantien.png");
  }
);

// =============================================
// KHỞI TẠO BÁNH XE (Winwheel)
// =============================================
let theWheel = new Winwheel({
  outerRadius: 220,
  innerRadius: 0,
  textFontSize: 24,
  textOrientation: "horizontal",
  textAlignment: "outer",
  numSegments: 8,
  responsive: true,
  segments: [
    {
      fillStyle: "#910f06",
      text: "Ô mất lượt",
      size: winwheelPercentToDegrees(24),
      textFontSize: 30,
      textFillStyle: "#ffffff",
    },
    {
      fillStyle: "#ab6f03",
      text: "1.000 VNĐ",
      size: winwheelPercentToDegrees(20),
      textFontSize: 28,
      textFillStyle: "#ffffff",
    },
    {
      fillStyle: "#910f06",
      text: "2.000 VNĐ",
      size: winwheelPercentToDegrees(15),
      textFontSize: 26,
      textFillStyle: "#ffffff",
    },
    {
      fillStyle: "#ab6f03",
      text: "5.000 VNĐ",
      size: winwheelPercentToDegrees(15),
      textFontSize: 24,
      textFillStyle: "#ffffff",
    },
    {
      fillStyle: "#910f06",
      text: "10.000 VNĐ",
      size: winwheelPercentToDegrees(12),
      textFontSize: 22,
      textFillStyle: "#ffffff",
    },
    {
      fillStyle: "#ab6f03",
      text: "20.000 VNĐ",
      size: winwheelPercentToDegrees(10),
      textFontSize: 20,
      textFillStyle: "#ffffff",
    },
    {
      fillStyle: "#910f06",
      text: "50.000 VNĐ",
      size: winwheelPercentToDegrees(3),
      textFontSize: 18,
      textFillStyle: "#ffffff",
    },
    {
      fillStyle: "#ab6f03",
      text: "100.000 VNĐ",
      size: winwheelPercentToDegrees(3),
      textFontSize: 16,
      textFillStyle: "#ffffff",
    },
  ],
  animation: {
    type: "spinToStop",
    duration: 6.4,
    spins: 10,
    callbackFinished: alertPrize,
    callbackSound: playSound,
    soundTrigger: "pin",
  },
  pins: {
    number: 8,
    responsive: true,
    fillStyle: "silver",
    outerRadius: 4,
  },
});

// =============================================
// BIẾN TRẠNG THÁI
// =============================================
let wheelPower = 13;
let wheelSpinning = false;
let audio = new Audio("sound/dangquay.mp3"); // Âm thanh tick khi pin đi qua con trỏ

var dem = 0; // Đếm số lần đã quay
var demnhantien = 0; // Đếm số lần click nhận tiền
var lichsulixi = "";
var tongtienlixi = 0;
var tiendalixi;

// Hiển thị số lượt quay ban đầu
document.getElementById("xuatluotquay").innerHTML = solanquay;

// Cache các element audio
var votay = document.getElementById("votay");
var matluot = document.getElementById("matluot");
var dangquay = document.getElementById("dangquay");

// =============================================
// ÂM THANH
// =============================================
function playSound() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

// =============================================
// XỬ LÝ THANH RANGE (tốc độ quay)
// =============================================
function laypower() {
  wheelPower = document.getElementById("manhornhe").value;
}

// =============================================
// BẮT ĐẦU QUAY
// =============================================
function startSpin() {
  if (wheelSpinning == false) {
    // Kiểm tra còn lượt quay không
    if (dem >= solanquay) {
      swal(
        "Hết lượt!",
        "Bạn đã hết lượt quay. Hãy nhấn Làm mới để quay tiếp!",
        "warning"
      );
      return;
    }

    theWheel.animation.spins = wheelPower;

    // Ẩn con trỏ quay
    $(".nutbatdau").css("background-image", "");

    // Bắt đầu quay
    theWheel.startAnimation();
    wheelSpinning = true;

    // Phát âm thanh đang quay
    dangquay.play();
  }
}

// =============================================
// LÀM MỚI VÒNG QUAY
// =============================================
function lammoi() {
  swal(
    {
      title: "Làm mới vòng quay!",
      text: "Làm mới vòng quay sẽ xoá hết các vòng quay còn lại.\nLịch sử và tổng tiền lì xì vẫn giữ nguyên.\nChú ý nếu tải lại trang sẽ làm mất lịch sử và tổng tiền lì xì",
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      animation: "slide-from-top",
    },
    function (isConfirm) {
      if (!isConfirm) return;

      setTimeout(function () {
        swal(
          "Làm mới thành công!",
          "Hãy đưa chiếc điện thoại cho người muốn nhận lì xì nào!",
          "success"
        );

        document.getElementById("popupnhantien").style.display = "none";

        theWheel.stopAnimation(false);
        theWheel.rotationAngle = 0;
        theWheel.draw();

        $(".nutbatdau").css("background-image", "url(img/contro.png)");
        document.getElementById("xuatluotquay").innerHTML = solanquay;

        wheelSpinning = false;
        document.getElementById("annhantien").style.display = "none";
        document.getElementById("xuatsotien").src = "";
        document.getElementById("caidat").style.display = "none";

        dem = 0;
      }, 2000);
    }
  );
}

// =============================================
// XỬ LÝ KẾT QUẢ SAU KHI QUAY XONG
// =============================================

/**
 * Helper: xử lý hiển thị kết quả quay
 */
function xulyKetQua(indicatedSegment, luotConLai) {
  var isMatLuot = indicatedSegment.text === "Ô mất lượt";

  if (isMatLuot) {
    matluot.play();
    document.getElementById("annhantien").style.display = "none";
    document.getElementById("xuatsotien").src = "";
  } else {
    votay.play();
    document.getElementById("annhantien").style.display = "";
    document.getElementById("xuatsotien").src =
      "img/" + indicatedSegment.text.replace(".000 VNĐ", "") + "k.jpg";
  }

  // Tạo thông báo
  if (isMatLuot) {
    if (luotConLai > 0) {
      swal(
        "Rất tiếc!",
        "Bạn không nhận được đồng nào\nNhưng bạn còn lại " +
          luotConLai +
          " lần quay, cố gắng lên nào!",
        "error"
      );
    } else {
      swal(
        "Rất tiếc!",
        "Bạn không nhận được đồng nào và số lượt quay đã hết!",
        "error"
      );
    }
  } else {
    if (luotConLai > 0) {
      swal(
        "Tết ấm no!",
        "Bạn nhận được " +
          indicatedSegment.text +
          "\nBạn còn lại " +
          luotConLai +
          " lần quay\nChú ý: Nếu quay tiếp bạn sẽ mất số tiền trước đó!",
        "success"
      );
    } else {
      swal(
        "Tết ấm no!",
        "Bạn nhận được " + indicatedSegment.text + "\nBạn đã hết lượt quay",
        "success"
      );
    }
  }
}

function alertPrize(indicatedSegment) {
  dem++;
  tiendalixi = indicatedSegment.text.replace(".000 VNĐ", "");
  var luotConLai = solanquay - dem;

  if (dem < solanquay) {
    // Còn lượt → reset bánh xe để quay tiếp
    theWheel.rotationAngle = 0;
    theWheel.draw();
    wheelSpinning = false;
    $(".nutbatdau").css("background-image", "url(img/contro.png)");
    document.getElementById("xuatluotquay").innerHTML = luotConLai;
  } else {
    // Hết lượt
    document.getElementById("xuatluotquay").innerHTML = "0";
    $(".nutbatdau").css("background-image", "url(img/controhetluot.png)");
  }

  xulyKetQua(indicatedSegment, luotConLai);
}

// =============================================
// NHẬN TIỀN
// =============================================
function nhantien() {
  document.getElementById("annhantien").style.display = "none";
  document.getElementById("popupnhantien").style.display = "block";
  document.getElementById("xuatsotienpopup").src =
    "img/" + tiendalixi + "kk.jpg";
  demnhantien++;
  tongtienlixi += Number(tiendalixi);
  document.getElementById("sotiendalixi").innerHTML =
    tongtienlixi + ".000 VNĐ";
  lichsulixi +=
    "Người " + demnhantien + " : " + tiendalixi + ".000 VNĐ<br/>";
  document.getElementById("lichsulixi").innerHTML = lichsulixi;
}
