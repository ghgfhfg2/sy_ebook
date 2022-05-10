class Ebook {
  constructor(div,option){
    this.div = document.querySelector(div);
    this.container = this.div.querySelector('.ebook__container');
    this.imgList = this.div.querySelector('.ebook__img-list');
    this.backPage = this.div.querySelector('.ebook__page-back');
    this.list = this.imgList.querySelectorAll('li');
    this.length = this.list.length;
    this.page = 1;
    this.pageInput = this.div.querySelector(option.currentPage),
    this.totalPage = this.div.querySelector('.ebook__page-total'),
    this.btnMove = this.div.querySelector('.ebook__btn-page-move'),
    this.pageShow = option.pageShow ? option.pageShow : 2;
    this.prev = this.div.querySelector(option.prev);
    this.next = this.div.querySelector(option.next);
    this.breakPoints = option.breakPoints;
    this.zoom = 1;
    this.scaleText = this.div.querySelector('.ebook__scale-txt');
    this.zoomIn = this.div.querySelector('.ebook__scale-zoom-in');
    this.zoomOut = this.div.querySelector('.ebook__scale-zoom-out');
  }
  init(){    
    this.prev.addEventListener('click',()=>{
      this.toPrev()
    })
    this.next.addEventListener('click',()=>{
      this.toNext()
    })
    if(this.btnMove){
      this.btnMove.addEventListener('click',()=>{
        this.toPage()
      })
    }
    if(this.breakPoints){
      let winWidth = window.innerWidth;
      let size = Object.keys(this.breakPoints).sort((a,b)=>b-a);
      let curSize = size.filter(el=>el >= winWidth);
      curSize = curSize.length > 0 ? Math.min.apply(null,curSize) : null;
      if(curSize){
        let option_ = this.breakPoints[curSize];
        for(let key in option_){
          this[key] = option_[key]
        }
      }      
    }
    this.zoomIn.addEventListener('click',()=>{
      this.imgZoomIn()
    });
    this.zoomOut.addEventListener('click',()=>{
      this.imgZoomOut()
    });

    this.pageSet();
  }

  pageSet(){
    if(this.pageShow == 1){
      this.div.classList.add('single')
    }else{
      this.div.classList.add('double')
    }
    if(this.page == 1){
      this.imgList.classList.add('first');
      this.backPage.classList.add('first');
      
    }else{
      this.imgList.classList.remove('first')
      this.backPage.classList.remove('first');
    }    
    if(this.page == this.length){
      this.imgList.classList.add('last');
      this.backPage.classList.add('last');
    }else{
      this.imgList.classList.remove('last')
      this.backPage.classList.remove('last');
    }  
    this.list.forEach(el=>{
      el.classList.remove('active')
    })    
    if(this.pageShow === 1){
      this.list[this.page-1].classList.add('active')
    }
    if(this.pageShow === 2){      
      if(this.page == 1){
        this.list[0].classList.add('active');
      }else{
        this.list[this.page-1].classList.add('active');
        this.list[this.page] && this.list[this.page].classList.add('active','right');
      }
    }
    if(this.pageInput){
      this.totalPage.innerText = this.length
      this.pageInput.value = this.page
    }
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
      if(this.page == 2){
        this.page = 1
      }else{
        this.page -= this.pageShow;
      }
      this.pageSet()
    }else{
      alert('첫번째 페이지 입니다.')
    }
  }
  toNext(){    
    
    if(this.page+this.pageShow <= this.length){
      if(this.page == 1){
        this.page++;
      }else{
        this.page += this.pageShow;
      }
      this.pageSet()
    }else{
      alert('마지막 페이지 입니다.')
    }
  }

  imgZoomIn(){
    if(this.zoom < 3){
      this.zoom += 0.2;
      this.container.style = `--scale:${this.zoom}`;
      this.scaleText.innerText = `${(this.zoom*100).toFixed(0)}%`;
    }else{
      alert('최대크기 입니다.')
    }
  }
  imgZoomOut(){
    if(this.zoom > 0.6){
      this.zoom -= 0.2;
      this.container.style = `--scale:${this.zoom}`;
      this.scaleText.innerText = `${(this.zoom*100).toFixed(0)}%`
    }else{
      alert('최소크기 입니다.')
    }
  }

}