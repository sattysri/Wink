<script>

function get_wink_group() {
/* Get OAuth token */
var clientid = "quirky_wink_android_app";
var apiurl = "https://winkapi.quirky.com";
var clientsecret = "e749124ad386a5a35c0ab554a4f2c045";
var username = "xxx"; 
var password = "xxxx";

var sendstring = "{\"client_id\":\"" + clientid + "\",\"client_secret\":\"" + clientsecret + "\",\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"grant_type\":\"password\"}";

var token="";
var xhr = new XMLHttpRequest();
xhr.open('POST', apiurl + '/oauth2/token');
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
      if (typeof cb !== "undefined") {
         cb(this);
      } else {
         var result = this.responseText;
         obj = JSON.parse(result);
         token = obj.access_token;

         var xhr1 = new XMLHttpRequest();
         xhr1.open('GET', apiurl + '/users/me/groups');
         xhr1.setRequestHeader("Authorization","Bearer " + token);
         xhr1.onreadystatechange = function () {
         if (this.readyState == 4) {
             if (typeof cb !== "undefined") {
                 cb(this);
             } else {
                 var text = this.responseText;
                 obj = JSON.parse(text);

                 var str = JSON.stringify(obj, null, 2);
                 //document.write(str);
  
                 document.write("<html><body><form id=\"form1\"> <div id=\"table\">");               
                 for (i = 0; i < obj.data.length; i++) {
                     document.write("<div class=\"row\">");
                     document.write("<span class=\"cell\" width=\"50px\" position=\"relative\">"+obj.data[i].name+"</span>");
 
                     var state = (obj.data[i].reading_aggregation.connection.or) & 
                     (obj.data[i].reading_aggregation.connection.and) & 
                     (obj.data[i].reading_aggregation.powered.or) & 
                     (obj.data[i].reading_aggregation.powered.and);
                  
if (state) {
    var pic="https://static.wixstatic.com/media/5b68e6_d0beffeecd71465487b1c5b084c03f34.png/v1/fill/w_358,h_358,al_c,lg_1/5b68e6_d0beffeecd71465487b1c5b084c03f34.png";
 var width = 70;
 var height = 70;
} else {
    var pic="https://static.wixstatic.com/media/5b68e6_c2f0461b5a1940f48be24dcd3fae5030.png/v1/fill/w_382,h_382,al_c,usm_0.66_1.00_0.01/5b68e6_c2f0461b5a1940f48be24dcd3fae5030.png";

var width = 85;
var height = 85;
}   
document.write("<span class=\"cell\" width=\"50px\" float=\"right\" display=\"block\"><img src="+pic+" width="+width+ "height="+height+" align=\"center\"></span>");  
 document.write("</div>");
                 }
document.write("</div></form></body></html>");	
             }
         }
     };
     xhr1.send(null);
  setTimeout(continueExecution, 10000) //wait ten seconds before continuing

    }
  }
};
xhr.send(sendstring);

}

get_wink_group();

function continueExecution()
{
  location.reload();
}
</script>
