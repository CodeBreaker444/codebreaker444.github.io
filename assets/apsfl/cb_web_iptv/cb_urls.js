url="https://cbapi.herokuapp.com/cbapi/";
var len;
function append_json(data){
  var table = document.getElementById('gable');
  var tbody = document.getElementById('gable1');
  len=Object.keys(data.Channel).length;

  var i;
  for(i=0;i<Object.keys(data.Channel).length-1;i++) {
    //var tbody = document.createElement('tbody');
    //table.appendChild(tbody);

      var tr = document.createElement('tr');
      //tbody.appendChild('tr');
      tr.innerHTML =  '<td style="text-align:center;">' + data.Channel[i].channelNo+ '</td>' +
      '<td>' + data.Channel[i].name + '</td>' +
      '<td style="text-align:center;" onclick="CopyMyLeftTd(this)">' + data.Channel[i].url + '</td>' +
      '<td style="text-align:center;">' + data.Channel[i].language + '</td>';
      tbody.appendChild(tr);
  }
}

fetch(url)
    .then(function(response){
        return response.json();

    })
    .then(function(data){
        var loader_main=document.getElementById('loader');
        loader_main.style.display="none"
        append_json(data);
    })

    function myFunction() {
      // Declare variables
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      ul = document.getElementById("gable1");
      li = ul.getElementsByTagName('tr');
    
      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < len; i++) {
        a = li[i].getElementsByTagName("td")[1];
        a_lang = li[i].getElementsByTagName("td")[3];

        console.log(a);
        txtValue = a.textContent || a.innerText;
        txtValue_lang=a_lang.textContent || a_lang.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue_lang.toUpperCase().indexOf(filter) > -1 ) {
          li[i].style.display = "";

        } else {
          li[i].style.display = "none";


        }

      }
    }
    
      function CopyMyLeftTd(txt) {
       var el = document.createElement('textarea');
       var q = document.getElementById('copied');
       var q_copy = document.getElementById('copy');
       
       q_copy.style.display="none";

       
        el.value = txt.innerHTML;
        q.innerHTML = el.value+" Copied!";

        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }