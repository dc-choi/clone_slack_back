module.exports = {
  async addPK(str) {
    let today = new Date();
    let year = today.getFullYear().toString().substring(2);
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    const min = 100000;
    const max = 999999;
    const ranNum = Math.floor(Math.random() * (max - min - 1)) + min;

    const pk = `${str}_${year}${month}${day}_${ranNum}`;

    return pk;
  },
}