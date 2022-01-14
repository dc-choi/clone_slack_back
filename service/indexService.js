let mailer = require('../auth/mail');

module.exports = {
  async sendMail(params) {
    try {
      const { email }  = params;
      const checkEmail = email.indexOf('@');
      if (checkEmail === -1) {
        throw new Error('제대로된 이메일값인지 확인 바랍니다.')
      }
      const min = 111111;
      const max = 999999;
      const ranNum = Math.floor(Math.random() * (max - min - 1)) + min;

      let emailParam = {
        toEmail: email, // 수신할 이메일
        subject: `[slack_clone]인증 관련 메일 입니다`, // 메일 제목
        text: `오른쪽 숫자 6자리를 입력해주세요 : ${ranNum}` // 메일 내용
      };

      mailer.sendGmail(emailParam);

      return { ranNum }
    } catch (error) {
      console.error(error);
    }
  }
}