/*------------------------------------------------------------
OpenFiilePath.js
------------------------------------------------------------*/

//文字列から存在するファイルパスを抽出する関数
function textToFileListArray(str) {

    //改行コード削除
    str = replaceAll(str, "\r", "\t");
    str = replaceAll(str, "\n", "\t");

    //ダブルクウォートが奇数個なら偶数個にする
    if (strCount(str, "\"") % 2 !== 0) {
        str = includeLastStr(str, "\"")
    }

    //ダブルクウォートで囲まれていないスペースはタブにする
    //status 0 = 本文
    //status 1 = ダブルクウォートで囲まれた文字
    var output = "";
    var status = 0;
    for (var i = 0; i <= str.length; i++) {
        if (str.charAt(i) === "\"") {
            switch (status) {
            case 0:
                status = 1;
                break;
            case 1:
                status = 0;
                break;
            }
            output += str.charAt(i);
        } else {
            switch (status) {
            case 0:
                if (str.charAt(i) === " ") {
                    output += "\t";
                } else {
                    output += str.charAt(i);
                }
                break;
            case 1:
                output += str.charAt(i);
                break;
            }
        }
    }
    str = output;
    //テスト"   ABC   DEF   "テスト   ABC   DEF   "123 456" テスト

    //ダブルクウォートをタブ文字にする
    str = replaceAll(str, "\"", "\t");

    //alert(str);

    var strArray = str.split("\t");
    for (var i = strArray.length - 1 ; i >= 0 ; i--){
        //alert(i.toString() + " " + strArray[i] + " " + fso.FileExists( strArray[i] ));
        if (fso.FileExists( strArray[i] ) === false) {
            //ファイルが存在しないなら配列の一番最後の要素を削除
            strArray.splice(i, 1);
        }
    }
    //alert("test01 " + arrayToString(strArray));
    return strArray;
}

//存在するpathを渡すとテストがOKになる
function test_textToFileListArray(path) {
    check(path, arrayToString(textToFileListArray(" "+ path + "\t")));
    check(path+"/"+path, 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    alert("test_textToFileListArray");
}
