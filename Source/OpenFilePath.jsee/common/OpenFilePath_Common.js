/*------------------------------------------------------------
OpenFilePath
----------------------------------------
ModuleName:     OpenFilePath Common Module
FileName:       OpenFilePath_Common.js
Description:    OpenFilePath の共通モジュール
----------------------------------------
All Right Reserved:
   Name:        Standard Software
   URL:         http://standard-software.net/
--------------------------------------
Version:        2015/08/13
// ------------------------------------------------------------*/


//----------------------------------------
//・文字列内から存在するファイル/フォルダのパスを抽出する
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
            if (fso.FolderExists( strArray[i] ) === false ) {
                if (fso.FolderExists( firstStrLastDelim( strArray[i], "\\" ) ) === false) {
                    //選択範囲が"C:\test\test\tes"の場合、存在するフォルダを開く

                    //条件に一致しないときは配列の要素を削除
                    strArray.splice(i, 1);
                } else {
                    strArray[i] = firstStrLastDelim( strArray[i], "\\" );
                }
            }
        }
    }
    //alert("textToFileListArray01:" + arrayToString(strArray, "/"));
    return strArray;
}

//存在するpathを渡すとテストがOKになる関数
function test_textToFileListArray(path) {
    //ファイルのテスト
    check(path, arrayToString(textToFileListArray(" "+ path + "\t")));
    //alert("test01");
    check(path+"/"+path, 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    //alert("test02");

    //フォルダのテスト
    path = fso.GetParentFolderName(path);
    check(path, arrayToString(textToFileListArray(" "+ path + "\t")));
    //alert("test03");
    check(path+"/"+path, 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    //alert("test04");

    //存在しないファイル名の親フォルダのテスト
    path = includeLastPathDelim(path) + "testtest.txt";
    check(fso.GetParentFolderName(path), arrayToString(textToFileListArray(" "+ path + "\t")));
    //alert("test05");
    check(fso.GetParentFolderName(path)+"/"+fso.GetParentFolderName(path), 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    //alert("test06");

    alert("test_textToFileListArray");
}
//----------------------------------------

