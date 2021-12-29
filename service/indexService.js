let mailer = require('../auth/mail');

module.exports = {
  async sendMail(params) {
    const { email }  = params;
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
  }
}