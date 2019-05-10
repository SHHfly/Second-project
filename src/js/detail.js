require(["config"], () => {
    require(["template","url","header","footer","zoom"], (template,url) => {
        class Detail{
            constructor(){
                this.init();
            }
            init(){
                $.get(url.ajaxData+'cfDetail',data=>{
                if(data.res_code == 1){
                    this.render(data.res_body[0]);
                }
                })
            }
            render(data){
                let html = template("detailContainer", { data });
                $(".mainContainer").html(html);
                this.zoom();
                this.bindEvent();
            }
            zoom () {
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                  gallery:'gal1',
                  cursor: 'pointer',
                  galleryActiveClass: 'active',
                  borderSize:'1',    
                  borderColor:'#888'
                });
            }
            bindEvent(){
                this.addBtn = $("#Jia");
                this.number = $("#number").val();
                this.reduceBtn = $("#Jan");
                this.addBtn.on("click",()=>{
                   $("#number").val(++this.number); 
                })
                this.reduceBtn.on("click",()=>{
                    if(this.number===0){
                        $("#number").val(0); 
                    }else{
                        $("#number").val(--this.number); 
                    }
                    
                 })
            }
        }
        new Detail();
    })
})