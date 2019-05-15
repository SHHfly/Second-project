require(["config"], () => {
    require(["template","url","header","footer","zoom","fly"], (template,url,header) => {
        class Detail{
            constructor(){
                this.init();
                
            }
            init(){
                $.get(url.ajaxData+'cfDetail',data=>{
                    
                    let id = location.search.slice(4); //取ID
                    this.data ={ ...data.res_body[0],id};
                    
                    if(data.res_code == 1){
                        this.render(this.data);
                    }
                })
            }
            render(data){
                let html = template("detailContainer", { data });
                $(".mainContainer").html(html);
                this.zoom();
                this.bindEvent();
                this.addCart();
            }
            addCart(){

                //console.log();
                $(".addCart").on("click",e=>{

                    $(`<img src='${this.data.images[0]}' style='width:30px;height:30px'>`).fly({
                        start: {
                          left: e.clientX,
                          top: e.clientY
                        },
                        end: {
                          left: $(".cart").offset().left,
                          top: $(".cart").offset().top
                          // left: 1300,
                          // top: 300
                        },
                        onEnd: function () {
                          this.destroy(); //销毁抛物体
                          header.calcCart(); // 调用一次计算购物车数量的方法
                        }
                      });
                    
                    let cart = localStorage.getItem('cart');
                    
                    let num = parseInt($('#number').val());
                    if(cart){
                       
                        cart = JSON.parse(cart);
                        let index = -1;
                        if(cart.some((shop,i)=>{
                            index = i;
                            //console.log(shop.id,this.data.id);
                            return shop.id == this.data.id;
                        })){
                            
                            cart[index].num = cart[index].num - 0 + num;
                            cart[index].checked = true;
                            
                        }else{
                            //console.log(0);
                            cart.push({...this.data,num,checked:true});
                        }
                    }else{
                        //console.log(this.data);
                        cart = [{...this.data,num,checked:true}];
                        
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                    header.calcCart();
                })
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