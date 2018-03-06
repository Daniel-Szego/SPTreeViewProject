
var ListURL = 'http://sharepoint/PoF/hr/';

$(document).ready(function () {
    loadDatafromSPMockup();
});


function getUsercodeFromURL(url)
{
    if (url.indexOf(ListURL) >= 0)
    {
        var resURL1 = url.substring(25, url.length);
        var resURL2 = resURL1.substring(resURL1.indexOf('/') + 1,resURL1.length);
        var resURL3 = resURL2.substring(0, resURL2.indexOf('/'));
        var reg = "[0-9]+";

        var results = resURL3.match(reg);
        if (results) {
            return resURL3;
        }
    }
}


function openLink(url) {
    var win = window.open(url, '_blank');
}


function loadDatafromSPMockup() {

    // Mockup data 
    // Bind the content and add to the page
    content = '<ul>\n\
      <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/House1.png\"}\' node="default">Root node 1\n\
        <ul>\n\
          <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/House2.png\"}\' id="child_node_1">Child node 1\n\
            <ul>\n\
                <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/User.png\"}\'  id=\'Mitarb 1\'> <a  href=\"#\" onlick=\'openLink(http://www.google.de);return false;\'>Mitarb 1</a> </li>\n\
                <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/User.png\"}\' ><a href="http://www.google.de" target="_blank" onclick="window.open(this.href); return false;">xxxxx</a> </li\n\
            </ul>\n\
          </li>\n\
          <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/House2.png\"}\'>Child node 2</li>\n\
          <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/House2.png\"}\' id="Li1">Child node 3</li>\n\
          <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/House2.png\"}\' >Child node 4</li>\n\
        </ul>\n\
      </li>\n\
      <li data-jstree=\'{\"icon\":\"/SiteAssets/PoF/style/House1.png\">Root node 2</li>\n\
    </ul>\n\
    ';

    // bind to div
    $('#Test_PoF_tree').html(content);


    // init tree
    $("#Test_PoF_tree").on('ready.jstree', function (e, data) {
        alert('ready');
        $('.Test_PoF_tree_link').dblclick(function () {
            var url = $(this).attr('href');
            var win = window.open(url, '_blank');
            //win.focus();
        });
    }).jstree();
    //{
    //        "types": {
    //            "default": {
    //                "icon": {
    //                    "image": "/SiteAssets/PoF/js/team.png"
    //                }
    //            },
    //            "demo": {
    //                "icon": {
    //                    "image": "/SiteAssets/PoF/js/team.png"
    //                }
    //            }
    //        },
    //        "plugins": ["types"]
    //    });

    // patch icon:

    // select node
    $.jstree.reference('#Test_PoF_tree').select_node('Mitarb 1');

    //init node types
    $('.Test_PoF_tree_link').jstree("set_type", "demo", "#Mitarb 1");
    

    // put onclick
    //$('.link').on('click', function () {
    //    var url = $(this).$('a').
    //    alert($(this));
    //});

    //$('.Test_PoF_tree_link').dblclick(function () {
    //    var url = $(this).attr('href');
    //    var win = window.open(url, '_blank');
    //    //win.focus();
    //});


    //$.delay(1000);


    //$('.jstree-icon').attr('display', 'none');
    //$('i').css('background-image', 'url(SiteAssets/PoF/style/team.png)');
    //    $('i').attr('background-image', 'url(team.jpg)');

    //$("<span>Hello world!</span>").insertBefore('a');


    $("#demo1").jstree();

        //{
        //        "types" : {
        //            "types" : {
        //                "team" : {
        //                    "icon" : {
        //                        "image": "/SiteAssets/PoF/style/team.png"
        //                    }
        //                }, 
 
        //                "iteration" : {
        //                    "icon" : {
        //                        "image": "/SiteAssets/PoF/style/team.png"
        //                    }
        //                }
        //            }
        //        },
        //        "plugins" : [ "html_data", "types", "themes" ]
        //    });
}