function handleFiles(files)
{
    if(files.length)
    {
        var file = files[0];
        var reader = new FileReader();
        if(file.type.indexOf('json')!==0)
        {
            reader.onload = function ()
            {
                updateData(this.result);
            };
            reader.readAsText(file);
        }
    }
}

function saveData()
{
    var fdata = {};
    fdata.vl = vl;
    fdata.vp = vp;
    fdata.p = p;
    fdata.h = h;
    fdata.vout = vout;
    var blob = new Blob([JSON.stringify(fdata)], {type: "text/json;charset=utf-8"});
    saveAs(blob, "data.json");
}