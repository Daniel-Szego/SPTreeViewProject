/// <reference path="PoF_TREEVIEW.js" />
//Test Treeview


var content;
var PERSONALContent;
var AGEBERContent;
var PERSONALListname = 'Personal';
var ListURL = 'http://sharepoint/PoF/hr/';
//var KirchKreisColumn = 'Arbeitgeber:AGName';
//var KirchBereichColumn = 'Abrechnungkreis%5Fx003a%5FAbrechnungkreis-Bezichung';
var PERSONALArbeitsgeberColumn = 'Arbeitgeber_x003a_AGName';
var PERSONALKirchBereichColumn = 'Abrechnungskreis_x003a_Abrechnun';

var PERSONALMitarbeiterNameColumn = 'Name';
var PERSONALMitarbeiterVorNameColumn = 'Vorname';
var PERSONALLinkAkteColumn = 'Personalakte';
var PERSONALPersonalnummerColumn = 'Title';

var AGEBERListname = 'AGEBER';
var AGEBERNameColumn = 'LinkTitle';
var AGEBERKirchenkreisColumn = 'Kirchenkreis';


$(document).ready(function () {
    if (content == undefined)
    {
        loadDatafromSPPERSONAL();
    }
});

// Load main List information from Personal
function loadDatafromSPPERSONAL() {

    // SP Services get list items - get all for list
    var CamlQuery = "<Query>";
    CamlQuery += "<Where/>";
    CamlQuery += "<OrderBy>";
    CamlQuery += "<FieldRef Name=\'" + PERSONALArbeitsgeberColumn + "\' />";
    CamlQuery += "<FieldRef Name=\'" + PERSONALMitarbeiterNameColumn + "\' />";
    CamlQuery += "</OrderBy>";
    CamlQuery += "</Query>";


    //var CamlViewFields = "<ViewFields/>";

    var CamlViewFields = "<ViewFields>";
    CamlViewFields += "<FieldRef Name=\'" + PERSONALArbeitsgeberColumn + "\' />";
    CamlViewFields += "<FieldRef Name=\'" + PERSONALMitarbeiterNameColumn + "\' />";
    CamlViewFields += "<FieldRef Name=\'" + PERSONALMitarbeiterVorNameColumn + "\' />";
    CamlViewFields += "<FieldRef Name=\'" + PERSONALLinkAkteColumn + "\' />";
    CamlViewFields += "<FieldRef Name=\'" + PERSONALPersonalnummerColumn + "\' />";
    CamlViewFields += "</ViewFields>";

    // this let me know that the function is getting called and passed the correct parameter value
    $().SPServices({
        operation: "GetListItems",
        webURL: ListURL,
        async: false,
        listName: PERSONALListname,
        CAMLViewFields: CamlViewFields,
        CAMLQuery: CamlQuery,
        completefunc: ProcessResultPERSONAL
    });
}

function ProcessResultPERSONAL(xData, Status) {
    //alert(xData.responseText);
    //content = $('#Test_PoF_tree');
    var result = [];

    $(xData.responseXML).find("z\\:row").each(function () {
        var owsarbeitsgebercolumn = 'ows_' + PERSONALArbeitsgeberColumn;
        var owsnamecolumn = 'ows_' + PERSONALMitarbeiterNameColumn;
        var owsvornamecolumn = 'ows_' + PERSONALMitarbeiterVorNameColumn;
        var owslinktcolumn = 'ows_' + PERSONALLinkAkteColumn;
        var owspersnummercolumn = 'ows_' + PERSONALPersonalnummerColumn;

        var Arbeitsgeber = $(this).attr(owsarbeitsgebercolumn);
        var MitarbeiterName = $(this).attr(owsnamecolumn);
        var MitarbeiterVorName = $(this).attr(owsvornamecolumn);
        var LinkAkte = $(this).attr(owslinktcolumn);
        var Personalnummer = $(this).attr(owspersnummercolumn);

        result.push(
            {
                Arbeitsgeber: Arbeitsgeber,
                MitarbeiterName: MitarbeiterName,
                MitarbeiterVorName: MitarbeiterVorName,
                LinkAkte: LinkAkte,
                Personalnummer: Personalnummer
            });
   });

    PERSONALContent = result;
    loadDatafromSPAGEBER();
}



// Load main List information from AGEBER
function loadDatafromSPAGEBER() {

    // SP Services get list items - get all for list
    var CamlQuery = "<Query>";
    CamlQuery += "<Where/>";
    CamlQuery += "<OrderBy>";
    CamlQuery += "<FieldRef Name=\'" + AGEBERKirchenkreisColumn + "\' />";
    CamlQuery += "<FieldRef Name=\'" + AGEBERNameColumn + "\' />";
    CamlQuery += "</OrderBy>";
    CamlQuery += "</Query>";

    //var CamlViewFields = "<ViewFields/>";

    var CamlViewFields = "<ViewFields>";
    CamlViewFields += "<FieldRef Name=\'" + AGEBERNameColumn + "\' />";
    CamlViewFields += "<FieldRef Name=\'" + AGEBERKirchenkreisColumn + "\' />";
    CamlViewFields += "</ViewFields>";

    // this let me know that the function is getting called and passed the correct parameter value
    $().SPServices({
        operation: "GetListItems",
        webURL: ListURL,
        async: false,
        listName: AGEBERListname,
        CAMLViewFields: CamlViewFields,
        CAMLQuery: CamlQuery,
        completefunc: ProcessResultAGEBER
    });
}

function ProcessResultAGEBER(xData, Status) {
//    alert(xData.responseText);
//    content = $('#Test_PoF_tree');
    var result = [];

    $(xData.responseXML).find("z\\:row").each(function () {
        var owsarbeitsgebercolumn = 'ows_' + AGEBERNameColumn;
        var owskirchenkreiscolumn = 'ows_' + AGEBERKirchenkreisColumn;

        var Arbeitsgeber = $(this).attr(owsarbeitsgebercolumn);
        var Kirchenkreis = $(this).attr(owskirchenkreiscolumn);

        result.push(
            {
                Arbeitsgeber: Arbeitsgeber,
                Kirchenkreis: Kirchenkreis,
            });
    });

    AGEBERContent = result;
    renderHTML();
}



// rendering to html code
function renderHTML()
{
    content = $('#Test_PoF_tree');
    //result.sort(SortByNames);
    var resultText = "";
    resultText += "<ul>";

    var oldKirchkreis = "xx;"

    $.each(AGEBERContent, function (key, value) {
        var Kirchkreis = value.Kirchenkreis;
        var Arbeitsgeber = value.Arbeitsgeber;

        if (!(Kirchkreis == oldKirchkreis)) {
            var Kirchkreisredname = Kirchkreis.substring(Kirchkreis.indexOf('#') + 1, Kirchkreis.length);
            resultText += "<li data-jstree=\'{\"icon\":\"http://sharepoint/PoF/hr/SiteAssets/PoF/style/House1.png\"}\'>" + Kirchkreisredname;
            resultText += "<ul>";
            oldKirchkreis = Kirchkreis;

            var oldAgeber2 = "xx";

            $.each(AGEBERContent, function (key2, value2) {
                var Kirchkreis2 = value2.Kirchenkreis;
                var Arbeitsgeber2 = value2.Arbeitsgeber;

                if ((Arbeitsgeber2 != oldAgeber2) && (Kirchkreis2 != undefined) && (Arbeitsgeber2 != undefined) && (Kirchkreis == Kirchkreis2))
                {
                  //  var Kirchbereich2nurname = Kirchbereich2.substring(Kirchbereich2.indexOf('#') + 1 , Kirchbereich2.length);

                    resultText += "<li data-jstree=\'{\"icon\":\"http://sharepoint/PoF/hr/SiteAssets/PoF/style/House2.png\"}\'>" + Arbeitsgeber2;
                    resultText += "<ul>";
                    oldAgeber2 = Arbeitsgeber2;

                    $.each(PERSONALContent, function (key3, value3) {
                        var Ageber3 = value3.Arbeitsgeber;
                        var MitarbeiterName3 = value3.MitarbeiterName;
                        var MitarbeiterVorName3 = value3.MitarbeiterVorName;
                        var LinkAkte3 = value3.LinkAkte;
                        var Persnum = value3.Personalnummer;

                        var Ageber3red = Ageber3.substring(Ageber3.indexOf('#') + 1, Ageber3.length);
                       
                        if ((Ageber3red == Arbeitsgeber2) && (MitarbeiterName3 != undefined))
                        {
                            var LinkAkte3red; 
                            var MitarbCode;
                            if (LinkAkte3 != undefined)
                            {
                                LinkAkte3red = LinkAkte3.substring(0, LinkAkte3.indexOf(','));
                                MitarbCode = LinkAkte3.substring(LinkAkte3.indexOf(',') + 1, LinkAkte3.length);
                            }

                            resultText += "<li data-jstree=\'{\"icon\":\"http://sharepoint/PoF/hr/SiteAssets/PoF/style/User.png\"}\' id=\'" + Persnum + "\'> <a class=\'Test_PoF_tree_link\' href=\"" + LinkAkte3red + "\" target=\"_blank\" onclick=\"window.open(this.href); return false;\">" + MitarbeiterName3 + ", " +  MitarbeiterVorName3 + "</a></li>";
                        }
                    });
                   resultText += "</ul></li>";
                }

            });
            resultText += "</ul></li>";
        }
    });

    resultText += "</ul>";
    //alert(resultText);

    content.append(resultText);

    InitTree();
}

function getUsercodeFromURL(url) {
    if (url.indexOf(ListURL) >= 0) {
        var resURL1 = url.substring(25, url.length);
        var resURL2 = resURL1.substring(resURL1.indexOf('/') + 1, resURL1.length);
        var resURL3 = resURL2.substring(0, resURL2.indexOf('/'));
        var reg = "[0-9]+";
        
        var results = resURL3.match(reg);
        if (results) {
            return resURL3;
        }
    }
}


function openLink(url)
{
    var win = window.open(url, '_blank');
}

function InitTree()
{

    $('#Test_PoF_tree').jstree();

    // init treebind jquerq tree
    //$('#Test_PoF_tree').on('ready.jstree', function (e, data) {
    //    $('.Test_PoF_tree_link').click(function () {
    //        var url = $(this).attr('href');
    //        var win = window.open(url, '_blank');
    //        //win.focus();
    //    });
    //}).jstree();

    var url = window.location.href;
    var MitarbCode = getUsercodeFromURL(url);

    if (MitarbCode)
    {
        // open actual node
        $.jstree.reference('#Test_PoF_tree').select_node(MitarbCode);
    }

//    setTimeout(
//function () {


//    $(".Test_PoF_tree_link").dblclick(function () {
//        //        alert('click');
//        //        var url = $(this).children('a').attr('href');
//        var url = $(this).attr('href');
//        var win = window.open(url, '_blank');
//        //win.focus();
//    });

//}, 8000);



}

//This will sort your array
function SortByNames(a, b, c) {
    var aName = "x";
    var bName = "x";
    if (aName != undefined)
    {
        aName = a.Kirchkreis.toLowerCase();
    }
    if (bName != undefined) {
        bName = b.Kirchbereich.toLowerCase();
    }

    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}


    function loadDatafromSPMockup()
    {

    // Mockup data 
    // Bind the content and add to the page
    content = '<ul>\n\
      <li node="default">Root node 1\n\
        <ul>\n\
          <li id="child_node_1">Child node 1\n\
            <ul>\n\
                <li  > <a href="http://www.google.de">Mitarb 1</a> </li>\n\
                <li > <a href="http://www.google.de">Mitarb 2</a> </li\n\
            </ul>\n\
          </li>\n\
          <li>Child node 2</li>\n\
          <li id="Li1">Child node 3</li>\n\
          <li>Child node 4</li>\n\
        </ul>\n\
      </li>\n\
      <li>Root node 2</li>\n\
    </ul>\n\
    ';

    // bind to div
    $('#Test_PoF_tree').html(content);

    // init tree
    $('#Test_PoF_tree').jstree();

    $('button').on('click', function () {
        $('#jstree').jstree(true).select_node('child_node_1');
        $('#jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree').select_node('child_node_1');
    });

}


