animate();

function animate() {
    requestAnimationFrame(animate);

    updateInfo(vp, vl, vout);

    updateCubeWater(vl, vout);
    for (let i = 0; i < 3; i++) {
        let y = bucket_waters[i].position.y;
        bucket_waters[i].position.y = (y + (h[i] - BUCKET_HEIGHT / 2 - y) / 50);
    }

    renderer.localClippingEnabled = true;
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function updateCubeWater(vl, vout) {
    for (let i = 0; i < BUCKET_NUM; i++) {
        bucketCubeWater[i].material.uniforms.flowDirection.value.x = vl[i] * 10 + 2;
        cubeWater[i].material.uniforms.flowDirection.value.x = vl[i] * 10 + 2;
    }
    for (let i = 0; i < 2; i++) {
        cubeWater[i + BUCKET_NUM].material.uniforms.flowDirection.value.x = vout[i] * 10 + 2;
    }
}

function updateInfo(vp, vl, vout) {
    for (let i = 0; i < 3; i++) {
        document.getElementById("gas" + (i + 1)).innerText = vp[i];
        document.getElementById("liq" + (i + 1)).innerText = vl[i];
    }
    for (let i = 0; i < 2; i++)
        document.getElementById("out" + (i + 1)).innerText = vout[i];
}