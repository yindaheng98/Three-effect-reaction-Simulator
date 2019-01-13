<%--
  Created by IntelliJ IDEA.
  User: Howard Yin
  Date: 2018/11/17
  Time: 15:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>three.js css2d - label</title>
    <style>
        body {
            background-color: #000;
            margin: 0;
            overflow: hidden;
        }

        #info {
            position: absolute;
            top: 0px;
            width: 100%;
            color: #FFF;
            padding: 5px;
            font-family: Monospace;
            font-size: 13px;
            text-align: center;
            z-index: 1;
        }

        .label {
            color: #FFF;
            font-family: sans-serif;
            padding: 2px;
            background: rgba(0, 0, 0, .6);
        }

        .text {
            color: #000000;
        }

    </style>
    <script src="js/jquery-3.3.1.js"></script>
    <script src="js/three.js"></script>
    <script src="js/controls/OrbitControls.js"></script>
    <script src="js/objects/Reflector.js"></script>
    <script src="js/objects/Refractor.js"></script>
    <script src="js/objects/Water2.js"></script>
    <script src="js/WebGL.js"></script>
    <script src="js/renderers/CSS2DRenderer.js"></script>
    <script src="js/libs/dat.gui.min.js"></script>
    <script src="js/libs/FileSaver.min.js"></script>
</head>
<body>
<div id="info" style="width: 50%">
    <div id="init">
        <h1>模型加载中......</h1>
    </div>
    <div id="start" style="width: 50%">
        <button style="width: 50%" onclick="start_click()">开始</button>
    </div>
    <div id="table">
        <table>
            <tr>
                <th>编号</th>
                <th>气体输入速率</th>
                <th>液体输入速率</th>
                <th>压强</th>
                <th>液位</th>
            </tr>
            <tr>
                <td>一效</td>
                <td id="vp0">0</td>
                <td id="vl0">0</td>
                <td id="p0">0</td>
                <td id="h0">0</td>
            </tr>
            <tr>
                <td>二效</td>
                <td id="vp1">0</td>
                <td id="vl1">0</td>
                <td id="p1">0</td>
                <td id="h1">0</td>
            </tr>
            <tr>
                <td>三效</td>
                <td id="vp2">0</td>
                <td id="vl2">0</td>
                <td id="p2">0</td>
                <td id="h2">0</td>
            </tr>
        </table>
        <table>
            <tr>
                <th>液体回收</th>
                <th>产品输出</th>
            </tr>
            <tr>
                <td id="vout0">0</td>
                <td id="vout1">0</td>
            </tr>
        </table>
    </div>
    <div id="data">
        <button onclick="saveData()">保存</button>
        <label for="save">读取</label>
        <input type="file" onchange="handleFiles(this.files)" id="save">
    </div>
    <div id="starting">
        <h1>入料中......</h1>
    </div>
</div>
<script src="3Dvalues.js"></script>
<script src="3Dinit_func.js"></script>
<script src="3Ddata_init_func.js"></script>
<script src="3Dshape_func.js"></script>
<script src="3Danmi_func.js"></script>
<script src="3Dmain_anmi.js"></script>
<script src="3Dinit.js"></script>
<script src="3Ddata_handle.js"></script>
</body>
</html>
