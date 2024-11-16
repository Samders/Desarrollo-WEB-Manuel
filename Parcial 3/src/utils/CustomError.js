class CustomError extends Error {
    constructor(code = "", message = "unspecified error") {
      super(message);
      this.code = code;
      this.message = null;
      switch (code) {
        case "23503":
          this.message = "There are items depending on it";
          break;
        case "42703":
          this.message = "Internal query error";
          break;
        case "23505":
          this.message = "Some restriction violated";
          break;
        default:
          this.message = "unknown error";
      }
    }
  }
  
  export { CustomError };