class CaptchaContainer {
  constructor() {
    this.captchas = [];
  }
  
  add(captcha) {
    if (!captcha.id || !captcha.text) {
      return;
    }
    this.captchas.push(captcha);
  }
  
  get(id) {
    if (!id) {
      return;
    }
    if (!this.captchas.length) {
      return;
    }
    if (this.captchas.length >= 50) {
      const captcha = this.captchas.find((captcha) => captcha.id === id);
      this.clear();
      return captcha;
    }
    return this.captchas.find((captcha) => captcha.id === id);
  }
  
  remove(id) {
    this.captchas = this.captchas.filter((captcha) => captcha.id !== id);
  }
  
  clear() {
    this.captchas = [];
  }
}

export default new CaptchaContainer();
