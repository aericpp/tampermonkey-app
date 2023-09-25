// ==UserScript==
// @name         cmtopdr
// @namespace    http://tampermonkey.net/
// @version      1.0
// @run-at       document-start
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @match        https://www.ximalaya.com/sound/*
// @grant        GM_log
// @grant        GM_addElement
// @grant        GM_download
// @grant        GM_addStyle
// ==/UserScript==
(function() {
    'use strict';
    /* globals jQuery, $, waitForKeyElements */
    setStyle();
    setTimeout(getSound, 3000);
})();

function getSound() {
    $('body').append('<div class="pp_btn" id="pp_plugins">下载音频</div>');
    $("#pp_plugins").css("cursor","pointer").click(downloadSound);
}

function downloadSound() {
    var pathId = parseInt(document.location.pathname.split("/").reverse()[0]);
    $.get("/revision/play/v1/audio", {ptype: 1, id: pathId}, function(data,status){
        var soundUrl = JSON.parse(data).data.src;
        let suffixUrl = soundUrl.split(".").reverse()[0];
        $.get("/revision/track/simple", {trackId: pathId}, function(title, status){
            GM_download(soundUrl, JSON.parse(title).data.trackInfo.title+"."+suffixUrl, true);
        });
    });
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