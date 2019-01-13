const IO_REDIUS = 1;
const IO_HEIGHT = 5;
const IO_COLOR = 0xffffff;

function createIOarrow(name) {
    let io_shape = new THREE.ConeBufferGeometry(IO_REDIUS, IO_HEIGHT);
    let io_material = new THREE.MeshPhongMaterial({
        color: IO_COLOR,
        shininess: 100,
        transparent: true,
        opacity: 0.5
    });
    let IOarrow=new THREE.Mesh(io_shape, io_material);
    let textDiv = document.createElement('div');
    textDiv.className = 'label';
    textDiv.textContent = name;
    textDiv.style.marginTop = '-1em';
    let ioLabel = new THREE.CSS2DObject(textDiv);
    ioLabel.position.set(0, BUCKET_HEIGHT / 2, 0);
    IOarrow.add(ioLabel);
    return IOarrow;
}

const BUCKET_COLOR = 0x483D8B;

function createBucket(name) {
    let bucket_shape = new THREE.CylinderBufferGeometry(BUCKET_REDIUS, BUCKET_REDIUS, BUCKET_HEIGHT, 32);
    let bucket_material = new THREE.MeshPhongMaterial({
        color: BUCKET_COLOR,
        wireframe: true,
        wireframeLinewidth: 5,
        transparent: true,
        opacity: 0.5
    });
    let bucket = new THREE.Mesh(bucket_shape, bucket_material);
    let textDiv = document.createElement('div');
    textDiv.className = 'label';
    textDiv.textContent = name;
    textDiv.style.marginTop = '-1em';
    let ioLabel = new THREE.CSS2DObject(textDiv);
    ioLabel.position.set(0, BUCKET_HEIGHT / 2, 0);
    bucket.add(ioLabel);
    return bucket;
}

const WATER_COLOR = 0x66ccff;

function createBucketWater() {
    let waterGeometry = new THREE.CylinderBufferGeometry(BUCKET_REDIUS, BUCKET_REDIUS, BUCKET_HEIGHT, 32, 1, true);
    let waterMaterial = new THREE.MeshPhongMaterial({
        color: WATER_COLOR,
        shininess: 100,
        side: THREE.DoubleSide,
        clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, 1, 0), BUCKET_HEIGHT / 2)],
        clipShadows: true,
        transparent: true,
        opacity: 0.5
    });
    let water = new THREE.Mesh(waterGeometry, waterMaterial);

    let surfaceGeometry = new THREE.CircleBufferGeometry(BUCKET_REDIUS, 64);
    let surface = new THREE.Water(surfaceGeometry, {
        color: WATER_COLOR,
        scale: 4,
        flowDirection: new THREE.Vector2(1, 1),
        textureWidth: 128,
        textureHeight: 128,
    });
    surface.rotateX(-Math.PI / 2);
    /*
        var bottomGeometry = new THREE.CircleBufferGeometry(BUCKET_REDIUS, 64);
        var bottomMaterial = new THREE.MeshPhongMaterial({
                color: WATER_COLOR,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
            }
        );
        var bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
        bottom.rotateX(-Math.PI / 2);*/
    return {surface: surface, water: water};
}

function calculateCurve(t, length, points) {
    let i;
    let l0 = length * t;
    for (i = 0; i < points.length - 1; i++) {
        let l = 0;
        for (let j = 0; j < 3; j++)
            l += Math.pow(points[i + 1][j] - points[i][j], 2);
        l = Math.sqrt(l);//计算当前点和前一个点的距离
        if (l <= l0) {//如果剩余距离足够
            l0 -= l;//消耗length
        }
        else {//如果剩余距离不够
            let s = l0 / l;
            let p = [0, 0, 0];
            for (let j = 0; j < 3; j++)
                p[j] = points[i][j] + s * (points[i + 1][j] - points[i][j]);
            return new THREE.Vector3(p[0], p[1], p[2]);//则返回要找的点
        }
    }
    return new THREE.Vector3(points[i][0], points[i][1], points[i][2])
}

function calculateTubeShape(points) {
    let length = 0;
    for (let i = 0; i < points.length - 1; i++) {
        let l = 0;
        for (let j = 0; j < 3; j++)
            l += Math.pow(points[i + 1][j] - points[i][j], 2);
        length += Math.sqrt(l);
    }
    let tube_path = new THREE.Curve();
    tube_path.getPoint = function (t) {
        return calculateCurve(t, length, points);
    };
    return new THREE.TubeBufferGeometry(tube_path, Math.ceil(length / 4), 1, 8, false);
}

function createTube(points) {
    let tube_shape = calculateTubeShape(points);
    let tube_material = new THREE.MeshPhongMaterial({
        color: BUCKET_COLOR,
        wireframe: true,
        wireframeLinewidth: 50,
        transparent: true,
        opacity: 0.5
    });
    return new THREE.Mesh(tube_shape, tube_material);
}

function createTubeWater(points, v_water) {
    let tube_shape = calculateTubeShape(points);
    return new THREE.Water(tube_shape, {
        color: 0x66ccff,
        scale: 4,
        flowDirection: new THREE.Vector2(v_water, 1),
        textureWidth: 16,
        textureHeight: 4,
    });
}