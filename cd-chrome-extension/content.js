var site_url = document.location.host;
function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
function getAllDataKeyCd() {
  var res = [];
  var path = "//*[@data-keycd]";
  var nodes = document.evaluate(
    path,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  );
  var result = nodes.iterateNext();
  while (result) {
    res.push(result.dataset.keycd);
    result = nodes.iterateNext();
  }
  return res;
}
function appendPopup(arrData) {
  for (let i = 0; i < arrData.length; i++) {
    var result = document.evaluate(
      "//*[@data-keycd='" + arrData[i] + "']",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    if (result) {
      result.style.border = "solid red";
      result.style.position = "relative";
      var datakey = arrData[i];
      var htmlpopup = createElementFromHTML(
        `
                <div class="${datakey}" style="border: solid 1px red;background-color: #f1f1f1;position: absolute;top: 0px; z-index: 1000;right: 0">
                    <table>
                        <tbody>
                            <tr>
                                <td class="data_redis" colspan="2"><span id="box_data_key" style="padding: 2px 0px;display: block;color: black">${datakey}</span><span id="site_host_name" style="display:None">${site_url}</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span style="cursor: pointer;background-color: #4CAF50;padding: 3px 6px;color: white;float: right;" data-cd="clone-${datakey}" onclick="cloneGetDataCd('clone-${datakey}')">Clone Data
                                    </span>
                                </td>
                                <td>
                                    <img data-cd="clone-${datakey}" src="" style="height: 20px;display: none;">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style="cursor: pointer;background-color: #4CAF50;padding: 3px 6px;color: white;float: right;" data-cd="show-${datakey}" onclick="cloneGetDataCd('show-${datakey}')">Show Data
                                    </span>
                                </td>
                                <td>
                                    <img data-cd="show-${datakey}" src="" style="height: 20px;display: none;">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style="cursor: pointer;background-color: #4CAF50;padding: 3px 6px;color: white;float: right;" data-cd="test-${datakey}" onclick="testTheData('test-${datakey}')">Test Data
                                    </span>
                                </td>
                                <td>
                                    <img data-cd="test-${datakey}" src="" style="height: 20px;display: none;">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
      );
      result.insertBefore(htmlpopup, result.childNodes[0]);
    }
  }
}
function appendPopupDetailCss() {
  var css = document.createElement("style");
  css.type = "text/css";

  var styles = `
            /* Popup container - can be anything you want */
        .popup {
            position: relative;
            display: inline-block;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 800px;
            height: 400px;
            border: solid red;
        }

        /* The actual popup */
        .popup .popuptext {
            visibility: hidden;
            width: 160px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 8px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -80px;
        }

        /* Popup arrow */
        .popup .popuptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
        }

        /* Toggle this class - hide and show the popup */
        .popup .show {
            visibility: visible;
            -webkit-animation: fadeIn 1s;
            animation: fadeIn 1s;
        }

        /* Add animation (fade in the popup) */
        @-webkit-keyframes fadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        /******* MODAL DIALOG ********/

        .ims-modal {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 9990;
        }

        .ims-modal-overlay {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }

        .ims-modal-wrapper {
            background: #fff;
            position: absolute;
            top: 30%;
            left: 40%;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
        }

        .ims-modal header {
            border-bottom: solid 1px #c8c8cc;
            color: #666;
            text-shadow: 1px 1px 1px #fff;
            padding: 8px 10px;
            position: relative;
            /* background: url(../images/modal_title_bg.png) top left repeat-x; */
            font: bold 12px Arial;
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: none;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            cursor: move;
        }

        .ims-modal header .btn_close {
            position: absolute;
            right: 4px;
            top: 50%;
            margin-top: -12px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABUUlEQVQ4T62U2UoEQQxFz4Db/JYiOjqi4ooMIiOi+D8iiPoo7juIiP/lCnIlBZlY1eND11tX3TqVTm7SoObVqJlHBA4DXeAI+OjzmLSbwKHXeuAQcA1MA4/AIvBegI6YtgXcAUvAp7QeuAvsOcATMJ+BCnYLTDjtNnAQgYrwCmg74TMwB7zZXtMiGncawZdzEUoj6CUw4y68ALP2/QCMuTOlaDXBYoRJJ+i5g2j/1dIz6mAXwBrw5fNcss0gcGY5zNVFZ50IK0WYAAPAKbAQiCfAOvCde6nK2PKZLOGrKca92STr0xJQsBtAPsutIjQHFEzVm3IkAaT11c9CI9B3S+LJKuoarejTP9DYevGCWlBFSfnKPdgD9cAdYN/9ZoSlo1x+t2xI9PSyvCezqitKMA9Vy01a8VaqWk/j6/gf40tDYsNG3e+k6WfsgmOqt2uf2D81fEgVIyFBfAAAAABJRU5ErkJggg==) center center no-repeat;
            height: 24px;
            width: 24px;
            opacity: 0.8;
            cursor: pointer;
        }

        .ims-modal header .btn_close:hover {
            opacity: 1;
        }

        .ims-modal .modal-content {
            padding: 10px;
            display: flex;
            flex-grow: 1;
            background: #fff;
        }

        .ims-modal .modal-content .message {
            font: bold 12px Arial;
            color: #666;
            width: 100%;
            display: flex;
            align-items: center;
            word-break: break-word;
        }

        .ims-modal .modal-content .message .icons {
            width: 32px;
            height: 32px;
            flex: none;
            background-image: url(../images/notify_icons.png);
            background-repeat: no-repeat;
            margin-right: 10px;
        }

        .ims-modal .modal-content .message .icons.info {
            background-position: 0px -37px;
        }
        .ims-modal .modal-content .message .icons.success {
            background-position: 0px -115px;
        }
        .ims-modal .modal-content .message .icons.error {
            background-position: 0px -151px;
        }
        .ims-modal .modal-content .message .icons.warning {
            background-position: 0px -76px;
        }
        .ims-modal .modal-content .message .icons.confirm {
            background-position: 0px 0px;
        }

        .ims-modal .modal-content input[type="text"],
        .ims-modal .modal-content input[type="email"],
        .ims-modal .modal-content input[type="datetime"],
        .ims-modal .modal-content input[type="url"],
        .ims-modal .modal-content textarea {
            border: solid 1px #dedede;
            border-radius: 3px;
            box-sizing: border-box;
        }

        .ims-modal .modal-content .ims-input input[type="text"],
        .ims-modal .modal-content .ims-input input[type="email"],
        .ims-modal .modal-content .ims-input input[type="datetime"],
        .ims-modal .modal-content .ims-input input[type="url"] {
            border: none;
        }

        .ims-modal footer {
            background: #f2f2f2;
            background: -moz-linear-gradient(top, #f2f2f2 0%, #e0e0e0 100%);
            background: -webkit-linear-gradient(top, #f2f2f2 0%, #e0e0e0 100%);
            background: linear-gradient(to bottom, #f2f2f2 0%, #e0e0e0 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f2f2f2', endColorstr='#e0e0e0', GradientType=0);
            height: 36px;
            border-top: solid 1px #ddd;
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
            flex: none;
            text-align: right;
        }

        .ims-modal footer .btn {
            background: linear-gradient(#f4f4f4, #ececec);
            border: 1px solid #ccc;
            border-radius: 3px;
            color: #333;
            padding: 5px 8px;
            white-space: nowrap;
            cursor: pointer;
            margin: 4px;
        }

        .ims-modal footer .btn:hover {
            background: linear-gradient(#ececec, #f4f4f4);
        }

        .ims-modal footer .btn-primary {
            -webkit-box-shadow: none;
            box-shadow: none;
            background-color: #4d90fe;
            background-image: -webkit-linear-gradient(top, #4d90fe, #4787ed);
            background-image: linear-gradient(top, #4d90fe, #4787ed);
            border: 1px solid #3079ed;
            color: #fff;
        }

        .ims-modal footer .btn-primary:hover {
            background-color: #357ae8;
            background-image: -webkit-linear-gradient(top, #4d90fe, #357ae8);
            background-image: linear-gradient(top, #4d90fe, #357ae8);
            border: 1px solid #2f5bb7;
            border-bottom-color: #2f5bb7;
        }

    `;

  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
}
function appendPopupDetailHtml() {
  var htmlpopup = createElementFromHTML(`
        <div class="popupShowData" id="popupShowData" style="display: none">
            <section data-reactroot="" class="ims-modal info">
                <div class="ims-modal-overlay"></div>
                <div class="ims-modal-wrapper" style="width: 900px; height: 700px; margin-left: -253px; margin-top: -136px;">
                    <header>Data<span class="btn_close" id="btnClose"></span></header>
                    <div class="modal-content">
                        <div>
                            <textarea id="txtReturnMessage" name="txtReturnMessage" placeholder="Show data" style="width: 880px; height: 630px; padding: 6px; resize: none; margin-bottom: 10px;"> xxxxx </textarea>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    `);
  var x = document.getElementsByTagName("BODY")[0].appendChild(htmlpopup);
}
function appendJavascript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `
            document.getElementById("btnClose").addEventListener('click', function () {
                document.getElementById('popupShowData').style.display = 'none';
            });

            function updateStatus(dataCd, action) {

                var result = document.evaluate("//img[@data-cd='" + dataCd + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                console.log(result)
                if (result) {
                    if (action == 'process') {

                    }
                    else if (action == 'success') {

                    }
                    else {
                        result.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4T62T3UoCURDHZ86hwk16AiOEXHbxog9vowuv9DW60KCbpAcxiEqF3sMuiui6KIJVtyCEfIKwbV3YmTiHlEVWk6VzN2fm/5szHwdh6nRse5fDsCoAigCwod3MfZDylqRs5B3nOSrBsfFQKBiG550h88E0NGoTUWvN847XB4Nvda8Bv+JrZN6bJ4747tPDYUlBNKBj21dxmVfrda35qtXiuE271ztEVTMyP8ZF/AEAknIHHdNsCiEqSQCMeIld03wDITaTAAjAVYAAhFhKAgCi4B8AudwrSJmLe8FyqaSvg3Y7droE0MOuZTUAoLrg/KfDztHJ57dFGD4l6QEyb+lFmjXKeSUg84Xlukca8JHJpIbptCp0f5FSGOAu5fvlbL/vTz6TgnwaxumspRqDVeaV0ehEiSefKZpV9QSJKsxcFERZ5SMh3gXADTK3LNd9icb/AJnEm2qQzQCHAAAAAElFTkSuQmCC";
                    }
                }
            }
            function cloneGetDataCd(dataCd) {
                updateStatus(dataCd, 'process')
                httpGet(dataCd, function (responseText) {
                    res = JSON.parse(responseText)
                    if (res ) {
                        updateStatus(dataCd, 'success')
                        document.getElementById('popupShowData').style.display = 'block';
                        document.getElementById('txtReturnMessage').value = JSON.stringify(res, null, 4)
                    }
                    else {
                        updateStatus(dataCd, 'error')
                    }
                })
            }
            function testTheData(dataCd) {
                updateStatus(dataCd, 'process')
                testGet(dataCd, function (responseText) {
                    res = JSON.parse(responseText)
                    if (res ) {
                        updateStatus(dataCd, 'success')
                        document.getElementById('popupShowData').style.display = 'block';
                        document.getElementById('txtReturnMessage').value = JSON.stringify(res, null, 4)
                    }
                    else {
                        updateStatus(dataCd, 'error')
                    }
                })
            }

            function httpGet(dataCd, cb) {
                var theUrl = 'http://10.3.11.173:8028/copy-redis';
                var _action = '';
                if (dataCd.startsWith("clone-")) {
                    _action = 'copy'
                } else {
                    _action = 'show'
                }
                var _key = dataCd.replace('clone-', '').replace('show-', '')
                var _domain = window.location.hostname.replace('http://', '').replace('https://', '')
                var data = 'domain=' + _domain + '&key=' + _key + '&action=' + _action

                var xhr = new XMLHttpRequest();
                // xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        console.log(xhr.responseText)
                        cb(xhr.responseText)
                    }
                });
                xhr.open("POST", theUrl, true);
                // xhr.setRequestHeader("token", "GmAZSiYYQYCW1KILbjvWxXcjxFXxhdPU");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(data);
            }

            function testGet(dataCD,cb){
                var vUrl = 'http://127.0.0.1:5000';
                var _site = window.location.hostname.replace('http://', '').replace('https://', '').replace('.vn', '').replace('.com', '')
                var reqUrl = vUrl+'?site=' + _site
                var _key = '[data-keycd="' + dataCD.replace('test-','') + '"]'

                var data = document.querySelectorAll(_key)[0].innerHTML

                var xhr = new XMLHttpRequest();

                xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                }
                });

                xhr.open("GET", reqUrl ,true);
                xhr.setRequestHeader("Content-Type", "text/html");
                xhr.setRequestHeader("Access-Control-Request-Method", "GET");
                xhr.setRequestHeader("Access-Control-Request-Headers", "text/html");
                console.log(data)
                xhr.send(data);
            }
        `;
  document.body.appendChild(script);
}
appendPopup(getAllDataKeyCd());
appendPopupDetailCss();
appendPopupDetailHtml();
appendJavascript();
