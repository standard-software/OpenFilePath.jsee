/*----------------------------------------
st_js
--------------------------------------
ModuleName:    Base Module
FileName:      st.js
--------------------------------------
License:       MIT License
All Right Reserved:
   Name:       Standard Software
   URL:        http://standard-software.net/
--------------------------------------
Version:       2015/08/02
//----------------------------------------*/

//test();

function test() {
	test_check();

    test_strCount();

    test_isFirstStr();
    test_includeFirstStr();
    test_excludeFirstStr();
    test_isLastStr();
    test_includeLastStr();
    test_excludeLastStr();
    test_trimFirstStrs();
    test_trimLastStrs();

    test_firstStrFirstDelim();
    test_lastStrFirstDelim();
    test_replaceAll();

    test_arrayToString();
    test_stringToArray();

//    check(true, false);
    alert("finish test");
}

function check(a, b, message) {
    var undefined;
    if (a === b) {
        return true;
    } else {
        var messageText = "";
        if (message !== undefined) {messageText = "Test:" + message + "\n"};
        messageText = messageText + 
            "A != B" + "\n" + 
            "A = " + a + "\n" + 
            "B = " + b;
        alert(messageText);
        return false;
    }
}

function test_check() {
	check(true, "123" === "123");
	check(true, " 123" == 123);
	check(false, " 123" === 123);
}

//----------------------------------------
//・StrCount
//----------------------------------------
function strCount(str, subStr) {
    var result = 0;
    var index = 0;
    do {
        index = str.indexOf(subStr, index)
        if (index === -1) break;
        index = index + subStr.length;
        result++
    } while (true)
    return result;
}

function test_strCount() {
    check(3, strCount("123123123", "1"),    "A");
    check(3, strCount("123123123", "2"),    "B");
    check(3, strCount("123123123", "3"),    "C");
    check(3, strCount("123123123", "12"),   "D");
    check(2, strCount("123123123", "31"),   "E");
    check(6, strCount("AAAAAA", "A"),       "F");
    check(3, strCount("AAAAAA", "AA"),      "G");
}

//----------------------------------------
//◇First / Last
//----------------------------------------

//----------------------------------------
//・FirstStr
//----------------------------------------
function isFirstStr(str , subStr) {
    if (subStr === "") return false;
    if (str === "") return false;
    if (str.length < subStr.length) return false;

    if (str.indexOf(subStr) === 0) { 
        return true;
    } else {
        return false;
    }
}

function test_isFirstStr() {
    check(true, isFirstStr("12345", "1"), "A");
    check(true, isFirstStr("12345", "12"), "B");
    check(true, isFirstStr("12345", "123"), "C");
    check(false, isFirstStr("12345", "23"), "D");
    check(false, isFirstStr("", "34"), "E");
    check(false, isFirstStr("12345", ""), "F");
    check(false, isFirstStr("123", "1234"), "G");
}

function includeFirstStr(str, subStr) {
    if (isFirstStr(str, subStr)) {
        return str;
    } else {
        return subStr + str;
    };
}

function test_includeFirstStr() {
    check("12345", includeFirstStr("12345", "1"));
    check("12345", includeFirstStr("12345", "12"));
    check("12345", includeFirstStr("12345", "123"));
    check("2312345", includeFirstStr("12345", "23"));
}

function excludeFirstStr(str, subStr) {
    if (isFirstStr(str, subStr)) {
        return str.substring(subStr.length);
    } else {
        return str;
    };
}

function test_excludeFirstStr() {
    check("2345", excludeFirstStr("12345", "1"));
    check("345", excludeFirstStr("12345", "12"));
    check("45", excludeFirstStr("12345", "123"));
    check("12345", excludeFirstStr("12345", "23"));
}

//----------------------------------------
//・FirstText
//----------------------------------------
//   ・  大小文字を区別せずに比較する
//----------------------------------------
function isFirstText(str , subStr) {
    return isFirstStr(str.toLowerCase(), subStr.toLowerCase())
}

function includeFirstText(str , subStr) {
    if (isFirstText(str, subStr)) {
        return str;
    } else {
        return subStr + str;
    }
}

function excludeFirstText(str, subStr) {
    if (isFirstText(str, subStr)) {
        return str.substring(subStr.length);
    } else {
        return str;
    }
}

//----------------------------------------
//・LastStr
//----------------------------------------
function isLastStr(str, subStr) {
    if (subStr === "") return false;
    if (str === "") return false;
    if (str.length < subStr.length) return false;

    if (str.substring(str.length - subStr.length) === subStr) {
        return true;
    } else {
        return false;
    }
}

function test_isLastStr() {
    check(true, isLastStr("12345", "5"));
    check(true, isLastStr("12345", "45"));
    check(true, isLastStr("12345", "345"));
    check(false, isLastStr("12345", "34"));
    check(false, isLastStr("", "34"));
    check(false, isLastStr("12345", ""));
    check(false, isLastStr("123", "1234"));
}

function includeLastStr(str, subStr) {
    if (isLastStr(str, subStr)) {
        return str;
    } else {
        return str + subStr;
    }
}

function test_includeLastStr() {
    check("12345", includeLastStr("12345", "5"));
    check("12345", includeLastStr("12345", "45"));
    check("12345", includeLastStr("12345", "345"));
    check("1234534", includeLastStr("12345", "34"));
}

function excludeLastStr(str, subStr) {
    if (isLastStr(str, subStr)) {
        return str.substring(0, str.length - subStr.length);
    } else {
        return str;
    }
}

function test_excludeLastStr() {
    check("1234", excludeLastStr("12345", "5"));
    check("123", excludeLastStr("12345", "45"));
    check("12", excludeLastStr("12345", "345"));
    check("12345", excludeLastStr("12345", "34"));
}

//----------------------------------------
//・LastText
//----------------------------------------
//   ・  大小文字を区別せずに比較する
//----------------------------------------
function isLastText(str, subStr) {
    return isLastStr(str.toLowerCase(), subStr.toLowerCase());
}

function includeLastText(str, subStr) {
    if (isLastText(str, subStr)) {
        return str;
    } else {
        return str + subStr;
    }
}

function excludeLastText(str, subStr) {
    if (isLastText(str, subStr)) {
        return str.substring(0, str.length - subStr.length);
    } else {
        return str;
    }
}

//----------------------------------------
//・BothStr
//----------------------------------------
function includeBothEndsStr(str, subStr) {
    return includeFirstStr(includeLastStr(str, subStr), subStr);
}

function excludeBothEndsStr(str, subStr) {
    return excludeFirstStr(excludeLastStr(str, subStr), subStr);
}

//----------------------------------------
//・BothText
//----------------------------------------
//   ・  大小文字を区別せずに比較する
//----------------------------------------
function includeBothEndsText(str, subStr) {
    return includeFirstText(includeLastText(str, subStr), subStr);
}

function ExcludeBothEndsText(str, subStr) {
    return excludeFirstText(excludeLastText(str, subStr), subStr);
}


//--------------------------------------
//◇Trim
//--------------------------------------
function trimFirstStrs(str, trimStrArray) {
//    Call Assert(IsArray(trimStrs), "Error:trimFirstStrs:trimStrs is not Array.")
    var result = str
    do {
        str = result;
        for (var i = 0; i <= trimStrArray.length - 1; i++) {
            result = excludeFirstStr(result, trimStrArray[i]);
        }
    } while (result !== str)
    return result
}

function test_trimFirstStrs() {
    check("123 ",       trimFirstStrs("   123 ", [" "]))
    check("\t  123 ",   trimFirstStrs("   \t  123 ", [" "]))
    check("123 ",       trimFirstStrs("   \t  123 ", [" ", "\t"]))
}

function trimLastStrs(str, trimStrArray) {
//    Call Assert(IsArray(trimStrs), "Error:trimLastStrs:trimStrs is not Array.")
    var result = str
    do {
        str = result;
        for (var i = 0; i <= trimStrArray.length - 1; i++) {
            result = excludeLastStr(result, trimStrArray[i]);
        }
    } while (result !== str)
    return result
}

function test_trimLastStrs() {
    check(" 123",       trimLastStrs(" 123   ", [" "]))
    check(" 456  \t",   trimLastStrs(" 456  \t   ", [" "]))
    check(" 789",       trimLastStrs(" 789  \t   ", [" ", "\t"]))
}

function trimBothEndsStrs(str, trimStrArray) {
    return trimFirstStrs(trimLastStrs(str, trimStrArray), trimStrArray)
}



//--------------------------------------
//FirstStrFirstDelim
//--------------------------------------
function firstStrFirstDelim(value, delimiter) {
    var result = "";
    var index = value.indexOf(delimiter);
    if (index !== -1) {
        result = value.substring(0, index);
    }
    return result;
}

function test_firstStrFirstDelim() {
    check("123", firstStrFirstDelim("123,456", ","));
    check("123", firstStrFirstDelim("123,456,789", ","));
    check("123", firstStrFirstDelim("123ttt456", "ttt"));
    check("123", firstStrFirstDelim("123ttt456", "tt"));
    check("123", firstStrFirstDelim("123ttt456", "t"));
    check("", firstStrFirstDelim("123ttt456", ","));
}

//----------------------------------------
//・LastStrFirstDelim
//----------------------------------------
function lastStrFirstDelim(value, delimiter) {
    var result = "";
    var index = value.indexOf(delimiter);
    if (index !== -1) {
        result = value.substring(index + delimiter.length, value.length);
    }
    return result;
}

function test_lastStrFirstDelim() {
    check("456", lastStrFirstDelim("123,456", ","));
    check("456,789", lastStrFirstDelim("123,456,789", ","));
    check("456", lastStrFirstDelim("123ttt456", "ttt"));
    check("t456", lastStrFirstDelim("123ttt456", "tt"));
    check("tt456", lastStrFirstDelim("123ttt456", "t"));
    check("", lastStrFirstDelim("123ttt456", ","));
}

//----------------------------------------
//・replaceAll
//----------------------------------------
//  ・  文字列の繰り返し置換
//----------------------------------------
function replaceAll(strBuffer, strBefore, strAfter) {
    var result = strBuffer
    do {
        strBuffer = result;
        result = strBuffer.replace(strBefore, strAfter);
    } while (strBuffer !== result);
	return result;
}

function test_replaceAll() {
	check("AAABBBAAA", replaceAll("123BBB123", "123", "AAA"));
	check("ABBBBBBBA", replaceAll("AAAAAAABBBBBBBAAAAAAA", "AA", "A"));
}



//文字列を後方から文字数指定で取得する
function lastStringCount(value, count) {
    return value.substr(value.length - count, count)
}

function format_yyyy_mm_dd(value, delimiter){
    return value.getFullYear() + delimiter + 
        lastStringCount("0" + (value.getMonth()+1), 2) + delimiter + 
        lastStringCount("0" + value.getDate(), 2);
    //return "123";
}

function format_hh_mm_dd(value, delimiter){
    return value.getHours() + delimiter + 
        lastStringCount("0" + value.getMinutes(), 2) + delimiter + 
        lastStringCount("0" + value.getSeconds(), 2);
    //return "123";
}

//年齢
function getAgeYearMonthDay(todayDate, birthDate) {

    var birthYear = birthDate.getFullYear();
    var birthMonth = birthDate.getMonth() + 1;
    var birthDay = birthDate.getDate();
    var todayYear = todayDate.getFullYear();
    var todayMonth = todayDate.getMonth() + 1;
    var todayDay = todayDate.getDate();

    //年齢計算
    var diffYear = todayYear - birthYear;
    //過去と同一日を過ぎていなければ１引く
    if (todayMonth < birthMonth) {
        diffYear = diffYear - 1;
    } else {
        if ((todayMonth === birthMonth) && (todayDay < birthDay)) {
            diffYear = diffYear - 1;
        }
    }
    //年齢の月計算
    var diffMonth = ((todayYear * 12) + todayMonth) 
        - ((birthYear * 12) + birthMonth);
    if (todayDay < birthDay) {
        diffMonth = diffMonth - 1;
    };
    //年齢の日計算
    var diffDay = todayDate.getDate() - birthDate.getDate();
    if (diffDay < 0) {
        //前月の過去日と同一日からの経過日数を計算している
        diffDay = 
            getMonthEndDay(todayDate.getYear(), todayDate.getMonth())
            - birthDate.getDate() 
            + todayDate.getDate();
    }
    return {"year": diffYear, 
            "month": diffMonth - (diffYear * 12),
            "day": diffDay};
}

//年齢
function getAgeMonthDay(todayDate, birthDate) {

    var birthYear = birthDate.getFullYear();
    var birthMonth = birthDate.getMonth() + 1;
    var birthDay = birthDate.getDate();
    var todayYear = todayDate.getFullYear();
    var todayMonth = todayDate.getMonth() + 1;
    var todayDay = todayDate.getDate();

    //年齢の月計算
    var diffMonth = ((todayYear * 12) + todayMonth) 
        - ((birthYear * 12) + birthMonth);
    if (todayDay < birthDay) {
        diffMonth = diffMonth - 1;
    };
    //年齢の日計算
    var diffDay = todayDate.getDate() - birthDate.getDate();
    if (diffDay < 0) {
        //前月の過去日と同一日からの経過日数を計算している
        diffDay = 
            getMonthEndDay(todayDate.getYear(), todayDate.getMonth())
            - birthDate.getDate() 
            + todayDate.getDate();
    }
    return {"month": diffMonth,
            "day": diffDay};
}

function getAgeDay(todayDate, birthDate) {

    var birthYear = birthDate.getFullYear();
    var birthMonth = birthDate.getMonth() + 1;
    var birthDay = birthDate.getDate();
    var todayYear = todayDate.getFullYear();
    var todayMonth = todayDate.getMonth() + 1;
    var todayDay = todayDate.getDate();

    //年齢の日計算
    var date1 = new Date(birthYear, birthMonth - 1, birthDay);
    var date2 = new Date(todayYear, todayMonth - 1, todayDay);

    var diffDay = date2 - date1;
    diffDay = diffDay / ( 24 * 60 * 60 * 1000);
    return {"day": diffDay};
}

function dayCount(todayDate, birthDate) {
    var diff = todayDate - birthDate;
    diff = diff / ( 24 * 60 * 60 * 1000);
    return Math.floor(diff);
}

function hoursCount(todayDate, birthDate) {
    var diff = todayDate - birthDate;
    var diff = diff / ( 60 * 60 * 1000);
    return Math.floor(diff);
}

function minutesCount(todayDate, birthDate) {
    var diff = todayDate - birthDate;
    var diff = diff / ( 60 * 1000);
    return Math.floor(diff);
}

function secondsCount(todayDate, birthDate) {
    var diff = todayDate - birthDate;
    var diff = diff / (1000);
    return Math.floor(diff);
}

/*  --------------
年月を指定して月末日を求める関数
引数：  year 年
        month 月
備考：  指定月の翌月の0日を取得して末日を求める
        monthに11(月)を指定すると
        Dateは0～11で月を表すためDate(year, 11, 0)は
        12月の0日を表すので11月末日を示すことになる
参考：
    JavaScript による日付・時刻・時間の計算・演算のまとめ - hoge256ブログ
    http://www.hoge256.net/2007/08/64.html
--------------  */
function getMonthEndDay(year, month) {
    var dt = new Date(year, month, 0);
    return dt.getDate();
}

/*----------------------------------------
    配列と文字列の相互変換
機能：	
備考：	
履歴：	
2014/07/16(水)
・	
*/ //*-----------------------------------
function arrayToString(arrayValue, delimiter) {
    var undefined;
    if (arrayValue[0] === undefined) { return ""; };
    if (delimiter === undefined) {delimiter = ""};
    var result = arrayValue[0];
    var i = 1;
    while(arrayValue[i] !== undefined) {
        result += delimiter + arrayValue[i];
        i++;
    }
    return result;
}
function test_arrayToString(){
    var array01 = new Array();
    array01[0] = "abc";
    array01[1] = "def";
    check("abc-def", arrayToString(array01, "-"));

    var array02 = new Array("123", "456");
    check("123_456", arrayToString(array02, "_"));
}

function stringToArray(value, delimiter) {
    return value.split(delimiter);
}
function test_stringToArray(){
    var array03 = stringToArray("ABC/DEF", "/");
    check("ABC", array03[0]);
    check("DEF", array03[1]);
}

//----------------------------------------*/

function getFileName(fileName) {
    return fileName.substring(fileName.lastIndexOf("/")+1,fileName.length);
}
function test_getFileName() {
    check("a.txt", getFileName("file://test/test/a.txt"));
}



//Const vbHide = 0             'ウィンドウ非表示
//Const vbNormalFocus = 1      '通常表示起動
//Const vbMinimizedFocus = 2   '最小化起動
//Const vbMaximizedFocus = 3   '最大化起動
//Const vbNormalNoFocus = 4    '通常表示起動、フォーカスなし
//Const vbMinimizedNoFocus = 6 '最小化起動、フォーカスなし
//----------------------------------------
//・ファイル指定したシェル起動
//----------------------------------------
function shellFileOpen(FilePath, Focus) {
    //assert(OrValue(Focus, Array(0, 1, 2, 3, 4, 6)), "Error:ShellFileOpen")

    wshell.Run(
        "rundll32.exe url.dll" + 
        ",FileProtocolHandler " + FilePath 
        , Focus, false)
    //ファイル起動の場合
    //第三引数のWaitはtrueにしても無視される様子
}






/*----------------------------------------
◇  ver 2014/07/18
・  作成
    lastStringCount
    format_yyyy_mm_dd
    format_hh_mm_dd(
    getAgeYearMonthDay
    getAgeMonthDay
    getAgeDay
    dayCount
    hoursCount
    minutesCount
    secondsCount
    getMonthEndDay
    arrayToString
    encodeURIComponentArrayToString
    stringToArray
    decodeURIComponentStringToArray
    getFileName
◇  ver 2015/07/02
    replaceAll
◇  ver 2015/07/31
・  firstStrFirstDelim/lastStrFirstDelim 追加
◇  ver 2015/08/02
・  追加
    isFirstStr
    includeFirstStr
    excludeFirstStr
    isFirstText
    includeFirstText
    excludeFirstText
    isLastStr
    includeLastStr
    excludeLastStr
    isLastText
    includeLastText
    excludeLastText
    includeBothEndsStr
    excludeBothEndsStr
    includeBothEndsText
    ExcludeBothEndsText
    trimFirstStrs
    trimLastStrs
    trimBothEndsStrs
    strCount
    shellFileOpen
//----------------------------------------*/
