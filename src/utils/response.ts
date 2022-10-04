export default class ApiResponse {
  res = {}

  constructor(code: number, msg: string, data?: any) {
    this.res = {
      code: code,
      msg: msg,
      data: data,
    }
  }

  toJSON() {
    return this.res;
  }
}
