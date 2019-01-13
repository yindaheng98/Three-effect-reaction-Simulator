function clone(a) {
    return JSON.parse(JSON.stringify(a));
}

/**初始化桶的形状和位置*/
const BUCKET_NUM = 3;
const BUCKET_HEIGHT = 12;//桶高度
const BUCKET_REDIUS = 5;//桶半径
const BUCKET_DISTANCE = 5;//桶间距
let bucket_loc = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let bucket_liq_in = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let bucket_gas_in = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let bucket_gas_out = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let bucket_liq_out = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
for (let i = 0; i < BUCKET_NUM; i++) {
    bucket_loc[i] = [i * (BUCKET_DISTANCE + 2 * BUCKET_REDIUS), 0, 0];
    bucket_liq_in[i] = [bucket_loc[i][0], bucket_loc[i][1] + BUCKET_HEIGHT / 2, bucket_loc[i][2]];
    bucket_gas_in[i] = [bucket_loc[i][0] - BUCKET_REDIUS / 2, bucket_loc[i][1] + BUCKET_HEIGHT / 2, bucket_loc[i][2] + BUCKET_REDIUS / 2];
    bucket_gas_out[i] = [bucket_loc[i][0] + BUCKET_REDIUS / 2, bucket_loc[i][1] + BUCKET_HEIGHT / 2, bucket_loc[i][2] + BUCKET_REDIUS / 2];
    bucket_liq_out[i] = [bucket_loc[i][0], bucket_loc[i][1] - BUCKET_HEIGHT / 2, bucket_loc[i][2]];
}
const BUCKET_LOC = bucket_loc;//桶位置
const BUCKET_LIQ_IN_LOC = bucket_liq_in;//桶液体入口位置
const BUCKET_GAS_IN_LOC = bucket_gas_in;//桶气体入口位置
const BUCKET_LIQ_OUT_LOC = bucket_liq_out;//桶液体出口位置
const BUCKET_GAS_OUT_LOC = bucket_gas_out;//桶气体出口位置
const BUCKET_NAME = ["一效", "二效", "三效"];//桶名字


/**初始化管道的形状和位置*/
const TUBE_REDIUS = 2;

let p;
let tube;
//计算管道拐点用的临时变量

p = clone(BUCKET_GAS_IN_LOC[0]);
p[0] -= BUCKET_REDIUS + BUCKET_DISTANCE;
p[1] += TUBE_REDIUS;
const GAS_IN_LOC = clone(p);//气体输入点

let tubes_gas = [];
tube = [];
p = clone(GAS_IN_LOC);
tube.push(clone(p));
p[0] = BUCKET_GAS_IN_LOC[0][0];
tube.push(clone(p));
tube.push(clone(BUCKET_GAS_IN_LOC[0]));
tubes_gas.push(tube);//从输入到一效的管道
for (let i = 0; i < BUCKET_NUM - 1; i++) {
    tube = [];
    p = clone(BUCKET_GAS_OUT_LOC[i]);
    tube.push(clone(p));
    p[1] += TUBE_REDIUS;
    tube.push(clone(p));
    p[0] = BUCKET_GAS_IN_LOC[i + 1][0];
    tube.push(clone(p));
    p = clone(BUCKET_GAS_IN_LOC[i + 1]);
    tube.push(clone(p));
    tubes_gas.push(clone(tube));//从桶i到桶i+1的管道
}
const TUBES_GAS = tubes_gas;//气体管道

p = clone(BUCKET_LIQ_IN_LOC[2]);
p[0] += BUCKET_REDIUS + BUCKET_DISTANCE;
p[1] += TUBE_REDIUS;
const LIQ_IN_LOC = clone(p);//液体输入点

let tubes_liq = [];
tube = [];
p = clone(LIQ_IN_LOC);
tube.push(clone(p));
p[0] = BUCKET_LIQ_IN_LOC[2][0];
tube.push(clone(p));
tube.push(clone(BUCKET_LIQ_IN_LOC[2]));
tubes_liq.push(tube);

tube=[];
p=clone(BUCKET_LIQ_OUT_LOC[2]);
tube.push(clone(p));
p[1]-=TUBE_REDIUS;
tube.push(clone(p));
p[2]-=BUCKET_REDIUS+TUBE_REDIUS;
tube.push(clone(p));
p[0]=BUCKET_LIQ_IN_LOC[0][0];
tube.push(clone(p));
p[1]=BUCKET_LIQ_IN_LOC[0][1]+TUBE_REDIUS;
tube.push(clone(p));
p[2]=BUCKET_LIQ_IN_LOC[0][2];
tube.push(clone(p));
p=clone(BUCKET_LIQ_IN_LOC[0]);
tube.push(clone(p));
tubes_liq.push(tube);

tube=[];
p=clone(BUCKET_LIQ_OUT_LOC[0]);
tube.push(clone(p));
p[1]-=TUBE_REDIUS;
tube.push(clone(p));
p[2]+=BUCKET_REDIUS+TUBE_REDIUS;
tube.push(clone(p));
p[0]=BUCKET_LIQ_IN_LOC[1][0];
tube.push(clone(p));
p[1]=BUCKET_LIQ_IN_LOC[1][1]+TUBE_REDIUS;
tube.push(clone(p));
p[2]=BUCKET_LIQ_IN_LOC[1][2];
tube.push(clone(p));
p=clone(BUCKET_LIQ_IN_LOC[1]);
tube.push(clone(p));
tubes_liq.push(tube);

tube=[];
p=clone(BUCKET_LIQ_OUT_LOC[1]);
tube.push(clone(p));
p[1]-=TUBE_REDIUS;
tube.push(clone(p));
p[0]-=BUCKET_REDIUS;
tube.push(clone(p));
p[1]-=TUBE_REDIUS;
tube.push(clone(p));
tubes_liq.push(tube);

tube=[];
p=clone(BUCKET_LIQ_OUT_LOC[1]);
tube.push(clone(p));
p[1]-=TUBE_REDIUS;
tube.push(clone(p));
p[0]+=BUCKET_REDIUS;
tube.push(clone(p));
p[1]-=TUBE_REDIUS;
tube.push(clone(p));
tubes_liq.push(tube);

const TUBES_LIQ = tubes_liq;//液体管道