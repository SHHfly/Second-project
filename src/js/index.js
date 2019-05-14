require(["config"], () => {
    require(["template","url","swiper","header","footer"], (template,url,Swiper) => {
     
      //console.log(template);
      class Index{
        constructor(){
          this.getType();
          this.bindEvent();
          this.banner();
        }
        getType(){
          $.get(url.ajaxData+'cfIndex',data=>{
            if(data.res_code == 1){
              console.log(data.res_body);
              this.renderType(data.res_body);
            }
          })
        }
        renderType(list){
          let html = template("moduleRender", { list });
          $(".bottom").html(html);
        }
        bindEvent(){
          $(".bottom").on("click","li",function(){
            let id = $(this).attr("data-id");
            console.log(id);
            let url = '/html/detail.html?id='+id;
            window.location.href=url;
          })
        }
        banner () {
          // 首页轮播图
          var mySwiper = new Swiper ('.swiper-container', {
            autoplay: true,
            loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
            
          }

          }) 
        }
      }
      new Index();
    })
  })