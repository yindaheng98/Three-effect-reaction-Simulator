function updateScene()
{
    updateInfo(vp, vl, vout);
    updateCubeWater(vl, vout);
    updateHP(h,p);
}

let cur_h=[0,0,0];
let cur_p=[0,0,0];
function updateHP(h,p)
{
    for (let i = 0; i < 3; i++) {
        let y = bucket_waters[i].position.y;
        bucket_waters[i].position.y = (y + (h[i] - BUCKET_HEIGHT - y) / 100);
        cur_h[i]=BUCKET_HEIGHT + y;
        cur_p[i]=cur_p[i]+(p[i]-cur_p[i])/100;
    }
}

function updateCubeWater(vl, vout) {
    bucketCubeWater[0].material.uniforms.flowDirection.value.x = vl[1];
    bucketCubeWater[1].material.uniforms.flowDirection.value.x = vl[2];
    bucketCubeWater[2].material.uniforms.flowDirection.value.x = vl[0];
    //桶内水流
    for (let i = 0; i < cubeWater.length; i++) {//水管水流vl
        cubeWater[i].material.uniforms.flowDirection.value.x = vl[i];
    }
    for (let i = 0; i < 2; i++) {//输出水流vout
        cubeWater[i + BUCKET_NUM].material.uniforms.flowDirection.value.x = vout[i];
    }
}

function updateInfo(vp, vl, vout) {
    for (let i = 0; i < 3; i++) {
        document.getElementById("vp" + i).innerText = vp[i];
        document.getElementById("vl" + i).innerText = vl[i];
        document.getElementById("p" + i).innerText = cur_p[i];
        document.getElementById("h" + i).innerText = cur_h[i];
    }
    for (let i = 0; i < 2; i++)
        document.getElementById("vout" + i).innerText = vout[i];
}