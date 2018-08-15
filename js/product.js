    var fueltype = [];
 $(document).ready(function() {
     makeActiveSidebar();
     getProductTable();
    // setpagination();

    $("table")
   .tablesorter({widthFixed: true, widgets: ['zebra']})
   .tablesorterPager({container: $("#pager")});

 });

  function makeActiveSidebar(){
    document.getElementById("customerFrom").setAttribute("class", "");
    document.getElementById("productFrom").setAttribute("class", "active");
    document.getElementById("billingFrom").setAttribute("class", "");
    document.getElementById("dailyreportFrom").setAttribute("class", "");
    document.getElementById("weeklyreportFrom").setAttribute("class", "");
    document.getElementById("monthlyreportFrom").setAttribute("class", "");
}

function getProductTable(){

    var productvalues = (db1.get('product').value());
  for(var i=0;i<productvalues.length;i++) {

   var table = document.getElementById("proDTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.id = rowCount;

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);



        console.log("------fuel value s "+productvalues[i].productid)
    var element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("value",productvalues[i].productid);
    element.setAttribute("style", "text-align:left");
    element.setAttribute("class", "form-control");
    element.setAttribute("id", "PRO_ID" + i);
    element.setAttribute("readonly","true");
    cell1.appendChild(element);



    var element = document.createElement("input");
    element.setAttribute("class", "form-control");
    element.setAttribute("ondrop","return false;");
    element.setAttribute("onpaste","return false;");
    element.setAttribute("value",productvalues[i].productname);
    element.setAttribute("style", "text-align:right");
    element.setAttribute("id", "PROD_NAME" + i);
    element.setAttribute("readonly","true");
    cell2.appendChild(element);

    var element = document.createElement("input");
    element.setAttribute("class", "form-control");
    element.setAttribute("onkeypress","return isNumber(event)");
    element.setAttribute("onchange","return validateDecimal(this)");
    element.setAttribute("onblur","return calculateTotal1(this)");
    element.setAttribute("ondrop","return false;");
    element.setAttribute("onpaste","return false;");
    element.setAttribute("value",productvalues[i].mrp);
    element.setAttribute("style", "text-align:right");
    element.setAttribute("id", "PROD_MRP" + i);
    element.setAttribute("readonly","true");
    cell3.appendChild(element);

    var element = document.createElement("input");
    element.setAttribute("class", "form-control");
    element.setAttribute("onkeypress","return isNumber(event)");
    element.setAttribute("onchange","return validateDecimal(this)");
    element.setAttribute("onblur","return calculateTotal1(this)");
    element.setAttribute("ondrop","return false;");
    element.setAttribute("onpaste","return false;");
    element.setAttribute("value",productvalues[i].rate);
    element.setAttribute("style", "text-align:right");
    element.setAttribute("id", "PROD_RATE" + i);
    element.setAttribute("readonly","true");
    cell4.appendChild(element);



    }

}

function setpagination(){

  $(document).ready(function(){
     $('#proDTable').after('<div id="nav"></div>');
     var rowsShown = 10;
     var rowsTotal = $('#proDTable tbody tr').length;
     var numPages = rowsTotal/rowsShown;
     for(i = 0;i < numPages;i++) {
         var pageNum = i + 1;
         $('#nav').append('<font color="red"><a href="#" rel="'+i+'">'+pageNum+'</a></font> ');
     }
     $('#proDTable tbody tr').hide();
     $('#proDTable tbody tr').slice(0, rowsShown).show();
     $('#nav a:first').addClass('active');
     $('#nav a').bind('click', function(){

         $('#nav a').removeClass('active');
         $(this).addClass('active');
         var currPage = $(this).attr('rel');
         var startItem = currPage * rowsShown;
         var endItem = startItem + rowsShown;
         $('#proDTable tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
         css('display','table-row').animate({opacity:1}, 300);
     });
 });

}

function prodAddAction() {
  //document.getElementById('product').reset();
  $('#modalCompose').modal('show');
}

function addRowproduct() {
    var table = document.getElementById("dataTablePro");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.id = rowCount;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    var element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("style", "text-align:left");
    element.setAttribute("class", "form-control");
    element.setAttribute("id", "productid" + rowCount);
    cell1.appendChild(element);

    var element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("style", "text-align:right");
    element.setAttribute("class", "form-control");
    element.setAttribute("id", "productval" + rowCount);
    cell2.appendChild(element);

    var element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("style", "text-align:left");
    element.setAttribute("class", "form-control");
    element.setAttribute("id", "prodmrp" + rowCount);
    cell3.appendChild(element);

    var element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("style", "text-align:right");
    element.setAttribute("class", "form-control");
    element.setAttribute("id", "prodrate" + rowCount);
    cell4.appendChild(element);

    var element = document.createElement("button");
    element.setAttribute("style", "text-align:right;height: 30px !important;");
    //element.innerHTML="[X]";
    element.setAttribute("class", "btn btn-danger fa fa fa-remove");
    element.setAttribute("id", "prodaction" + rowCount);
    element.setAttribute("onclick","onProdremove(event)");
    cell5.appendChild(element);

}

function onProdremove(event){
    console.log('--inside on'+event);
    var index=($(event.target).parents('tr').index());
    document.getElementById("dataTablePro").deleteRow(index);
    return false;
}

function saveNewProduct(){
  if(savenewprodValidation()){
    addintoProduct();
  }
}

function savenewprodValidation(){
  var table = document.getElementById("dataTablePro");
  var rowCount = table.rows.length;
  for(var i=0;rowCount>i;i++){
    if($.trim($('#productid'+i).val())==''){
      alert('Product Id should not be Empty');
      return false;
    } else if($.trim($('#productval'+i).val())=='') {
      alert('Product value should not be Empty');
      return false;
    } else if($.trim($('#prodmrp'+i).val())=='') {
      alert('Product M.R.P should not be Empty');
      return false;
    } else if($.trim($('#prodrate'+i).val())=='') {
      alert('Product Rate should not be Empty');
      return false;
    }
  }
  return true;
}

function addintoProduct() {
  var table = document.getElementById("dataTablePro");
  var rowCount = table.rows.length;
  for(var i=0;rowCount>i;i++){
     var table1 = document.getElementById("proDTable");
     var rowCount1 = table1.rows.length;
     var row = table1.insertRow(rowCount1);
     row.id = rowCount1;

     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);
     var cell3 = row.insertCell(2);
     var cell4 = row.insertCell(3);



         console.log("------fuel value s "+$('#productid'+i).val())
     var element = document.createElement("input");
     element.setAttribute("type", "text");
     element.setAttribute("value",$('#productid'+i).val());
     element.setAttribute("style", "text-align:left");
     element.setAttribute("class", "form-control");
     element.setAttribute("id", "PRO_ID" + rowCount1);
     element.setAttribute("readonly","true");
     cell1.appendChild(element);



     var element = document.createElement("input");
     element.setAttribute("class", "form-control");
     element.setAttribute("ondrop","return false;");
     element.setAttribute("onpaste","return false;");
     element.setAttribute("value",$('#productval'+i).val());
     element.setAttribute("style", "text-align:right");
     element.setAttribute("id", "PROD_NAME" + rowCount1);
     element.setAttribute("readonly","true");
     cell2.appendChild(element);

     var element = document.createElement("input");
     element.setAttribute("class", "form-control");
     element.setAttribute("onkeypress","return isNumber(event)");
     element.setAttribute("onchange","return validateDecimal(this)");
     element.setAttribute("onblur","return calculateTotal1(this)");
     element.setAttribute("ondrop","return false;");
     element.setAttribute("onpaste","return false;");
     element.setAttribute("value",$('#prodmrp'+i).val());
     element.setAttribute("style", "text-align:right");
     element.setAttribute("id", "PROD_MRP" + rowCount1);
     element.setAttribute("readonly","true");
     cell3.appendChild(element);

     var element = document.createElement("input");
     element.setAttribute("class", "form-control");
     element.setAttribute("onkeypress","return isNumber(event)");
     element.setAttribute("onchange","return validateDecimal(this)");
     element.setAttribute("onblur","return calculateTotal1(this)");
     element.setAttribute("ondrop","return false;");
     element.setAttribute("onpaste","return false;");
     element.setAttribute("value",$('#prodrate'+i).val());
     element.setAttribute("style", "text-align:right");
     element.setAttribute("id", "PROD_RATE" + rowCount1);
     element.setAttribute("readonly","true");
     cell4.appendChild(element);

     var obj = { "productid": $('#productid'+i).val(), "productname": $('#productval'+i).val(),"mrp":$('#prodmrp'+i).val(),
   "rate":$('#prodrate'+i).val() };
     db1.get('product').push(obj).write();
  }
  $('#modalCompose').modal('hide');
}
