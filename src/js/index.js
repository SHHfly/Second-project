require(["config"], () => {
    require(["template","url","header","footer"], (template,url) => {
     
      console.log(template);
      class Index{
        constructor(){
          this.getType();
          this.bindEvent();
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
      }
      new Index();
    })
  })