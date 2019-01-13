hMax=BUCKET_HEIGHT;
vlMax=100.0;
vpMax=100.0;
pMax=10.0;

let data = {
    gas_in: vlMax*0.9,
    liq_in: vpMax*0.9,
    hMax:hMax,
    vlMax:vlMax,
    vpMax:vpMax,
    pMax:pMax
};

function guiInit()
{
    $("#init").hide();
    $("#starting").hide();
    $("#start").hide();
    $("#table").show();
    $("#data").show();
    let gui = new dat.GUI();
    gui.add(data, "liq_in", 0.0, vlMax, 0.1).name("液体输入速率").onChange(requestData);
    gui.add(data, "gas_in", 0.0, vpMax, 0.1).name("气体输入速率").onChange(requestData);
    requestData();
}

p = [0, 0, 0, 0];
let h = [0, 0, 0];
let vl = [0, 0, 0, 0];
let vout = [0, 0];
let vp = [0, 0, 0, 0];

function requestData()
{
    $.post("postdata", data, function (response)
    {
        updateData(response);
    });
}

function updateData(response)
{
    let result=JSON.parse(response);
    vl=result.vl;
    vp=result.vp;
    p=result.p;
    h=result.h;
    vout=result.vout;
}

function start_click()
{
    $("#init").hide();
    $("#starting").show();
    $("#start").hide();
    $("#table").show();
    $("#data").show();
    start_anmiate();
}