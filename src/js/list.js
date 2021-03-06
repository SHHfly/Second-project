require(["config"], () => {
    require(["template","url","header","footer"], (template,url) => {
      class List{
        constructor(){
          this.getType();
          this.bindEvent();
        }
        getType(){
          $.get(url.ajaxData+'cfList',data=>{
            if(data.res_code == 1){
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
      }
      new List();
      
    })
  })