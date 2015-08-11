/*------------------------------------------------------------
OpenFiilePath.js
------------------------------------------------------------*/

//�����񂩂瑶�݂���t�@�C���p�X�𒊏o����֐�
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
            //�t�@�C�������݂��Ȃ��Ȃ�z��̈�ԍŌ�̗v�f���폜
            strArray.splice(i, 1);
        }
    }
    //alert("test01 " + arrayToString(strArray));
    return strArray;
}

//���݂���path��n���ƃe�X�g��OK�ɂȂ�
function test_textToFileListArray(path) {
    check(path, arrayToString(textToFileListArray(" "+ path + "\t")));
    check(path+"/"+path, 
        arrayToString(textToFileListArray(" "+ path + "\t"+ path), "/"));
    alert("test_textToFileListArray");
}
