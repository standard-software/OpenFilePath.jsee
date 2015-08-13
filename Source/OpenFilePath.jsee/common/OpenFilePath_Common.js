/*------------------------------------------------------------
OpenFilePath
----------------------------------------
ModuleName:     OpenFilePath Common Module
FileName:       OpenFilePath_Common.js
Description:    OpenFilePath �̋��ʃ��W���[��
----------------------------------------
All Right Reserved:
   Name:        Standard Software
   URL:         http://standard-software.net/
--------------------------------------
Version:        2015/08/13
// ------------------------------------------------------------*/


//----------------------------------------
//�E����������瑶�݂���t�@�C��/�t�H���_�̃p�X�𒊏o����
function textToFileListArray(str) {

    //���s�R�[�h�폜
    str = replaceAll(str, "\r", "\t");
    str = replaceAll(str, "\n", "\t");

    //�_�u���N�E�H�[�g����Ȃ�����ɂ���
    if (strCount(str, "\"") % 2 !== 0) {
        str = includeLastStr(str, "\"")
    }

    //�_�u���N�E�H�[�g�ň͂܂�Ă��Ȃ��X�y�[�X�̓^�u�ɂ���
    //status 0 = �{��
    //status 1 = �_�u���N�E�H�[�g�ň͂܂ꂽ����
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
    //�e�X�g"   ABC   DEF   "�e�X�g   ABC   DEF   "123 456" �e�X�g

    //�_�u���N�E�H�[�g���^�u�����ɂ���
    str = replaceAll(str, "\"", "\t");

    //alert(str);

    var strArray = str.split("\t");
    for (var i = strArray.length - 1 ; i >= 0 ; i--){
        //alert(i.toString() + " " + strArray[i] + " " + fso.FileExists( strArray[i] ));
        if (fso.FileExists( strArray[i] ) === false) {
            if (fso.FolderExists( strArray[i] ) === false ) {
                if (fso.FolderExists( firstStrLastDelim( strArray[i], "\\" ) ) === false) {
                    //�I��͈͂�"C:\test\test\tes"�̏ꍇ�A���݂���t�H���_���J��

                    //�����Ɉ�v���Ȃ��Ƃ��͔z��̗v�f���폜
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

//���݂���path��n���ƃe�X�g��OK�ɂȂ�֐�
function test_textToFileListArray(path) {
    //�t�@�C���̃e�X�g
    check(path, arrayToString(textToFileListArray(" "+ path + "\t")));
    //alert("test01");
    check(path+"/"+path, 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    //alert("test02");

    //�t�H���_�̃e�X�g
    path = fso.GetParentFolderName(path);
    check(path, arrayToString(textToFileListArray(" "+ path + "\t")));
    //alert("test03");
    check(path+"/"+path, 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    //alert("test04");

    //���݂��Ȃ��t�@�C�����̐e�t�H���_�̃e�X�g
    path = includeLastPathDelim(path) + "testtest.txt";
    check(fso.GetParentFolderName(path), arrayToString(textToFileListArray(" "+ path + "\t")));
    //alert("test05");
    check(fso.GetParentFolderName(path)+"/"+fso.GetParentFolderName(path), 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    //alert("test06");

    alert("test_textToFileListArray");
}
//----------------------------------------

