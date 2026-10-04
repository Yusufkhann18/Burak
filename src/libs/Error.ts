export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
  SOMETHING_WENT_WRONG = "Kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.",
  NO_DATA_FOUND = "So‘ralgan ma’lumot topilmadi.",
  CREATE_FAILED = "Yaratish amalga oshmadi. Iltimos, ma’lumotlarni tekshiring.",
  UPDATE_FAILED = "Ma’lumotlarni yangilab bo‘lmadi. Iltimos, qayta urinib ko‘ring.",
  NO_MEMBER_NICK = "Bu foydalanuvchi nomi bilan hisob topilmadi.",
  USED_NICK_PHONE = "Bu foydalanuvchi nomi yoki telefon raqami avval ro‘yxatdan o‘tgan.",
  WRONG_PASSWORD = "Parol noto‘g‘ri. Iltimos, qayta kiriting.",
  NOT_AUTHENTICATED = "Davom etish uchun avval hisobingizga kiring.",
}

class Errors extends Error {
  public code: HttpCode;
  public message: Message;
  static standard = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG,
  };

  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    this.code = statusCode;
    this.message = statusMessage;
  }
}

export default Errors;
