function animate() {
    requestAnimationFrame(animate);

    updateScene();

    renderer.localClippingEnabled = true;
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

var ani_start_over = [false,false,false];//标记启动动画是否结束
function start_anmiate()
{
    if(!ani_start_over[0]||!ani_start_over[1]||!ani_start_over[2])//没有结束
        requestAnimationFrame(start_anmiate);
    else
    {
        guiInit();
    }//gui_init放在start_anmiate完成之后

    if(!ani_start_over[0])//如果第一阶段动画未完成
    {
        if(cur_h[2]<=0.1)//而且一效没东西
        {//就获取一波数据
            $.post("postdata", data, function (response)
            {
                let result=JSON.parse(response);
                vl[0]=result.vl[0];
                h[2]=result.h[2];
            });
        }
        else if(cur_h[2]>=0.499*hMax)//一效水位到一半了，动画第一阶段完成
        {
            ani_start_over[0]=true;
        }
    }
    else if(!ani_start_over[1])//如果第一阶段动画完成而第二阶段未完成
    {
        if(cur_h[0]<=0.1)//而且二效没东西
        {//就获取一波数据
            $.post("postdata", data, function (response)
            {
                let result=JSON.parse(response);
                vl[1]=result.vl[1];
                h[0]=result.h[0];
                vp[0]=result.vp[0];
                p[0]=result.p[0];
            });
        }
        else if(cur_h[0]>=0.499*hMax)//二效水位到一半了，动画第二阶段完成
        {
            ani_start_over[1]=true;
        }
    }
    else if(!ani_start_over[2])//如果第二阶段动画完成而第三阶段未完成
    {
        if(cur_h[1]<=0.1)//而且三效没东西
        {//就获取一波数据
            $.post("postdata", data, function (response)
            {
                let result=JSON.parse(response);
                vl[2]=result.vl[2];
                h[1]=result.h[1];
                vp[1]=result.vp[1];
                p[1]=result.p[1];
            });
        }
        else if(cur_h[1]>=0.499*hMax)//三效水位到一半了，动画第三阶段完成
        {
            ani_start_over[2]=true;
        }
    }
}
