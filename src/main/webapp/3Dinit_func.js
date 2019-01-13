let camera, scene;

function sceneInit()
{

    scene = new THREE.Scene();

    let axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    //scene.fog = new THREE.Fog(0xffffff, 0.01, 100);
    let ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(100, 50, 1, 1),
        new THREE.MeshPhongMaterial({
                                        color: 0xa0adaf,
                                        shininess: 150
                                    })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.position.y = -BUCKET_HEIGHT;
    scene.add(ground);

    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('textures/cube/skybox/');
    var cubeTexture = cubeTextureLoader.load([
                                                 'px.jpg', 'nx.jpg',
                                                 'py.jpg', 'ny.jpg',
                                                 'pz.jpg', 'nz.jpg',
                                             ]);
    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = cubeTexture;

    var skyBoxMaterial = new THREE.ShaderMaterial({
                                                      fragmentShader: cubeShader.fragmentShader,
                                                      vertexShader: cubeShader.vertexShader,
                                                      uniforms: cubeShader.uniforms,
                                                      side: THREE.BackSide
                                                  });
    var skyBox = new THREE.Mesh(new THREE.BoxBufferGeometry(1000, 1000, 1000), skyBoxMaterial);
    scene.add(skyBox);

}

function lightInit()
{
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(20, 10, 40);
    camera.lookAt(scene.position);
    let controls = new THREE.OrbitControls(camera);
    scene.add(new THREE.AmbientLight(0x505050));

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set((BUCKET_REDIUS * 2 + BUCKET_DISTANCE) * 4, BUCKET_HEIGHT / 2 + TUBE_REDIUS * 2, BUCKET_REDIUS);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 3;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    var dirLight = new THREE.DirectionalLight(0x55505a, 1);
    dirLight.position.set(BUCKET_REDIUS + BUCKET_DISTANCE, BUCKET_HEIGHT / 2 + TUBE_REDIUS * 2, BUCKET_REDIUS);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;

    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
}

let bucket_waters = [];

let cubeWater = [];
let bucketCubeWater = [];

function shapeInit()
{
    for(let i = 0; i < BUCKET_NUM; i++)
    {
        let bucket = createBucket(BUCKET_NAME[i]);
        let bucket_water = createBucketWater();

        bucket.position.set(BUCKET_LOC[i][0], BUCKET_LOC[i][1], BUCKET_LOC[i][2]);
        //bucket_water.bottom.position.set(BUCKET_LOC[i][0], BUCKET_LOC[i][1] - BUCKET_HEIGHT / 2, BUCKET_LOC[i][2]);
        scene.add(bucket);
        //scene.add(bucket_water.bottom);

        bucket_water.surface.position.set(BUCKET_LOC[i][0], BUCKET_LOC[i][1] + BUCKET_HEIGHT / 2, BUCKET_LOC[i][2]);
        bucket_water.water.position.set(BUCKET_LOC[i][0], BUCKET_LOC[i][1], BUCKET_LOC[i][2]);
        let group = new THREE.Group();
        group.add(bucket_water.surface);
        group.add(bucket_water.water);
        scene.add(group);
        bucket_waters[i] = group;
        bucket_waters[i].position.y = BUCKET_LOC[i][1] - BUCKET_HEIGHT;
    }
    for(let i = 0; i < TUBES_GAS.length; i++)
        scene.add(createTube(TUBES_GAS[i]));
    for(let i = 0; i < TUBES_LIQ.length; i++)
    {
        scene.add(createTube(TUBES_LIQ[i]));
        let water = createTubeWater(TUBES_LIQ[i], 12);
        scene.add(water);
        cubeWater.push(water);
    }

    let IO_arrow;
    IO_arrow = createIOarrow("液体输入");
    IO_arrow.position.set(LIQ_IN_LOC[0], LIQ_IN_LOC[1], LIQ_IN_LOC[2]);
    IO_arrow.rotateZ(Math.PI / 2);
    scene.add(IO_arrow);

    IO_arrow = createIOarrow("气体输入");
    IO_arrow.position.set(GAS_IN_LOC[0], GAS_IN_LOC[1], GAS_IN_LOC[2]);
    IO_arrow.rotateZ(-Math.PI / 2);
    scene.add(IO_arrow);

    let p;
    IO_arrow = createIOarrow("成品");
    p = TUBES_LIQ;
    p = p[p.length - 1];
    p = p[p.length - 1];
    IO_arrow.position.set(p[0], p[1] - IO_HEIGHT / 2, p[2]);
    IO_arrow.rotateZ(Math.PI);
    scene.add(IO_arrow);

    IO_arrow = createIOarrow("回收");
    p = TUBES_LIQ;
    p = p[p.length - 2];
    p = p[p.length - 1];
    IO_arrow.position.set(p[0], p[1] - IO_HEIGHT / 2, p[2]);
    IO_arrow.rotateZ(Math.PI);
    scene.add(IO_arrow);

    for(let i = 0; i < BUCKET_LOC.length; i++)
    {
        let p = BUCKET_LOC[i];
        let l = [[p[0], p[1] + BUCKET_HEIGHT / 2, p[2]], [p[0], p[1] - BUCKET_HEIGHT / 2, p[2]]];
        let water = createTubeWater(l, 12);
        bucketCubeWater.push(water);
        scene.add(water);
    }
}

let renderer, labelRenderer;

function rendererInit()
{
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    document.body.appendChild(labelRenderer.domElement);

    renderer.localClippingEnabled = true;
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

$("#init").show();
$("#starting").hide();
$("#start").hide();
$("#table").hide();
$("#data").hide();
var t_first = 0;//用于计算时间差
var ani_init_over = false;//标记视角启动动画是否结束

function cameraInit()
{
    if(!ani_init_over)//没有结束
        requestAnimationFrame(cameraInit);//继续动画
    else
    {
        $("#init").hide();
        $("#starting").hide();
        $("#start").show();
        $("#table").hide();
        $("#data").hide();
    }
    if(t_first === 0) t_first = Date.now();
    var delta = Date.now() - t_first;
    var t = delta / 10000;
    var x = -20 - 40 * t * (t - 1);
    var y = 10 - 20 * t * (t - 1);
    var z = 40 * t ** 2 - 80 * t + 20;
    camera.position.set(x, y, z);
    //camera.position.set(-10, 15, -10);
    //camera.position.set(-20, 10, -20);
    camera.lookAt(scene.position);
    ani_init_over = t >= 1;
}