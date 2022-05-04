class Ebook {
  constructor(div){
    this.div = div
  }
  test(){
    console.log(document.querySelector(this.div))
  }
}