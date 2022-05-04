class Ebook {
  constructor(div,option){
    this.div = document.querySelector(div);
    this.list = this.div.querySelectorAll('ul > li');
    this.length = this.list.length;
    this.page = 1;
    this.pageInput = this.div.querySelector(option.currentPage),
    this.totalPage = this.div.querySelector('.ebook--page-total'),
    this.btnMove = this.div.querySelector('.ebook--btn-page-move'),
    this.pageShow = option.pageShow ? option.pageShow : 2;
    this.prev = document.querySelector(option.prev);
    this.next = document.querySelector(option.next);
  }
  init(){
    this.prev.addEventListener('click',()=>{
      this.toPrev()
    })
    this.next.addEventListener('click',()=>{
      this.toNext()
    })
    this.btnMove.addEventListener('click',()=>{
      this.toPage()
    })

    this.pageSet();
  }

  pageSet(){
    this.list.forEach(el=>{
      el.classList.remove('active')
    })
    if(this.pageShow === 1){
      this.list[this.page-1].classList.add('active')
    }
    if(this.pageShow === 2){      
      this.list[this.page-1].classList.add('active');
      this.list[this.page] && this.list[this.page].classList.add('active');
    }
    this.totalPage.innerText = this.length
    this.pageInput.value = this.page
  }
  
  toPage(){

    let caclPage = parseInt(this.pageInput.value);
    if(caclPage > this.length){
      caclPage = this.length
    }
    if(caclPage <= 0){
      caclPage = 1;
    }
    this.page = caclPage % 2 === 0 ? caclPage-1 : caclPage;

    this.pageSet()
  }

  toPrev(){
    if(this.page > 1){
      this.page -= this.pageShow;
      this.pageSet()
    }
  }
  toNext(){
    if(this.page+this.pageShow < this.length){
      this.page += this.pageShow;
      this.pageSet()
    }
  }

  getOption(){
    console.log(this.option)
  }
}