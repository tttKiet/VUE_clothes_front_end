export interface HangHoa {
  mssh: string;
  ten_HH: string;
  mo_ta_hh: string;
  gia: number;
  so_luong_hang: number;
  ghi_chu: number;
  hinh: HinhHH[];
}

export interface HinhHH {
  ma_hinh: string;
  ten_hinh: string;
  url: string;
  mshh: string;
}

export interface KhachHang {
  mskh: string;
  ho_ten_KH: string;
  password: string;
  dia_chi: string;
  so_dien_thoai: string;
}
