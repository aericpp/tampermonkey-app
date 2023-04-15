// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-start
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @match        https://www.cmtopdr.com/static/web_page/dist/index.html*
// @grant        GM_log
// @grant        GM_addElement
// @grant        GM_download
// @grant        GM_addStyle
// ==/UserScript==
(function() {
    'use strict';
    /* globals jQuery, $, waitForKeyElements */
    setStyle();
    if (document.location.hash == "#/trainingDeatil") {
        getTrainingList();
    } else if (document.location.hash == "#/trainingStudyPage") {
        getVideo();
    }
})();

function getTrainingList() {
    $("body").append("<div class='pp_btn' id='pp_plugins'></div>");
    $.post("/user/training/info", GetUrlPara(), function(data,status){
        var taskList = data.result.taskList;
        for (const t of taskList) {
            const a_tag = "<div><a href='/static/web_page/dist/index.html?taskUuid="
                + t.taskUuid
                + "&trainingUuid="
                + data.result.trainingUuid
                + "#/trainingStudyPage' target='_blank'>Day"
                + t.dayIndex + t.title
                + "</a></div>";
            GM_log(a_tag);
            $("#pp_plugins").append(a_tag);
        }
    });
}

function getVideo() {
    $("body").append("<div class='pp_btn' id='pp_plugins'></div>");
    $.post("/user/training/task/info", GetUrlPara(), function(data,status){
        GM_log(data)
        $("#pp_plugins").text("下载视频").css("cursor","pointer").click(function() {
            GM_download($("video").attr("src"), data.result.title+".mp4", true);
            alert("已下载" + data.result.title + ".mp4，请稍后");
        });
    });

}

function GetUrlPara() {
    var paramsObj = {};
    var params = document.location.search.split("?")[1].split("&");
    for (const p of params) {
        paramsObj[p.split("=")[0]] = p.split("=")[1];
    }
    GM_log(paramsObj);
    return paramsObj;
}

function setStyle() {
    var pp_btn_css = '.pp_btn { '
    + 'position: fixed;'
    + 'top: 96px;'
    + 'left: 8px;'
    + 'padding: 16px;'
    + 'width: 200px;'
    + 'background: #fff;'
    + 'font-size: 14px;'
    + 'box-shadow: 0 0 9px #666777;'
    + 'border-radius: 4px;}'
    + '.pp_btn div {'
    + 'margin-bottom: 8px;'
    + 'color: 4px;'
    + 'color: 4px;'
    + 'color: 4px;}'
    + '.pp_btn a {'
    + 'display: block;'
    + 'width: 160px;'
    + 'overflow: hidden;'
    + 'color: black;'
    + 'text-overflow: ellipsis;'
    + 'white-space: nowrap;'
    + 'text-decoration: none;}';
    GM_addStyle(pp_btn_css);
}