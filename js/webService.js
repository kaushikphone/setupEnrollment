//*********************************************************************************************************************
//                          M A C A W   M O B I L E 
//   1.Program Name             : webService.js
//   2.Description              : This javascript is used for all web service related functionalities like preparing
//									 input XML, calling WS, retrieving and parsing response XML in mobile application
//   3.Author                   : Nest Innovative Solutions
//   4.Date Written             : 28-Feb-2013
//   5.Called From              :
//   6.Calls                    :
//   7.Modification History     :
//*********************************************************************************************************************


/* -------------------------------------------------Start : Initializing environmental.xmlhttpobject--------------------------------------- */
function initializeXMLHttp() {	
	environmental.xmlhttp = null;
	if (window.XMLHttpRequest) {
		try {
			environmental.xmlhttp = new XMLHttpRequest();
		} catch (e) {
			environmental.xmlhttp = false;
		}
	} else if (window.createRequest) {
		try {
			environmental.xmlhttp= new window.createRequest();
		} catch (e) {
			environmental.xmlhttp= false;
		}
	} else if (window.ActiveXObject) {
		try {
			environmental.xmlhttp= new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				environmental.xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				environmental.xmlhttp= false;
				alert("Your browser does not support ajax request.");
			}
		}
	}
}


/*------------------------------------Three functions for creatin xml-----------------------------------------------*/


function createInitialXml(callback){
	var	xmlData1 = "<?xml version='1.0' encoding='utf-8'?>";
		xmlData1 = xmlData1 + "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' ";
		xmlData1 = xmlData1 + "xmlns:xsd='http://www.w3.org/2001/XMLSchema' ";
		xmlData1 = xmlData1 + "xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>";
		xmlData1 = xmlData1 + "<soap:Body><invokeService xmlns='http://gateway.core.cmn.sl.arc.macaw.nest.com'>";	
		xmlData1 = xmlData1 + "<strUiData><![CDATA[<map>";
		environmental.url = xmlData1;
	callback();
}

function createDataXml(x,vn,callback){
	
	var base64ImageData;
	var divIdForInput="";
		divIdForInput = x;
	var t = x.length;
	
	
	var x2=x.split(" ");
	var x1= x2[x2.length-1];
	
	var dataInputHash = {}; 
	
    $("div"+x+" input[type=radio]").each(function(){
    	if($(this).is(':checked') ){
    		dataInputHash[$(this).attr("id")] = "true";
    	} else {
    		dataInputHash[$(this).attr("id")] = "false";
    	}
	});
    
	$("div"+x+" input[type=text]").each(function(){
		
		if($(this).val() !=="" && $(this).val()!==" " && $(this).val()!==null && $(this).val()!==undefined && $(this).val()!=="undefined--undefined"){
			dataInputHash[$(this).attr("id")] = $.trim(specialCharConvertionValueToCode($(this).val()));
		}else{
			
			dataInputHash[$(this).attr("id")] = $(this).val();
		}
		if($(this).hasClass("clsForSummerNote")){
			dataInputHash[$(this).attr("id")] = $(this).summernote("code");
		}
		
		//return false;
	});
	
	$("div"+x+" input[type=Password]").each(function(){
    	dataInputHash[$(this).attr("id")] = $(this).val();	
	});
	
    if($("#trnCode").val() == "getReport"||$("#trnCode").val() == "ReportGenerator"||$("#trnCode").val() == "getDoc"||$("#trnCode").val() == "DownloadDoc"){
    	$("div"+x+" select").each(function(){
    		dataInputHash[$(this).attr("id")] = $("#"+$(this).attr("id")+" :selected").val();			
   		});
    }else{
    	$("div"+x+" select").each(function(){
	    	if(vn === null){
	    		dataInputHash[$(this).attr("id")] = $(this).val();
	    	}else{
	    		dataInputHash[$(this).attr("id")] = $("div"+x+" #"+$(this).attr("id")+" :selected").val();
	    	}			
		});
    } 
    
	$("div"+x+" textarea").each(function(){
    	dataInputHash[$(this).attr("id")] = $(this).val();			
	});
		
	$("div"+x+" input[type=file]").each(function(){
		filePath = $(this).val();
		dataInputHash.ImageName = filePath;
		dataInputHash.ImageSource = base64ImageData;
	});
	
	$("div"+x+" input[type=checkbox]").each(function(){
 		if($(this).is(':checked')){
 			dataInputHash[$(this).attr("id")] = "true";
		}else{
			dataInputHash[$(this).attr("id")] = "false";		
		}
 	});

	$("div"+x+" input[type=hidden]").each(function(){
		dataInputHash[$(this).attr("id")] = $(this).val();
	}); 
        
		
	environmental.url =environmental.url+"<entry>"
	    +"<string>"+x1.substring(1,t)+":::</string>" 	
		+"<map>";
		
	for (var name in  dataInputHash) {    
		environmental.url=environmental.url+"<entry>"
		+"<string>"+name+"</string>" 
		+"<string>"+dataInputHash[name]+"</string>" 
		+"</entry>";
	} 
	environmental.url=environmental.url+"</map>"
     	+"</entry>";
    
	callback();
}



function createTrnDataXml(x,vn,callback){
	var base64ImageData;
	var divIdForInput="";
	divIdForInput = x;
	var t = x.length;
	
	var x2=x.split(" ");
	var x1= x2[x2.length-1];
	
	var dataInputHash = {}; 
	$("div"+x+" input[type=radio]").each(function(){
    	if($(this).is(':checked') ){
    		dataInputHash[$(this).attr("id")] = "true";
    	} else {
    		dataInputHash[$(this).attr("id")] = "false";
    	}
	});
	
	$("div"+x+" input[type=text]").each(function(){
		dataInputHash[$(this).attr("id")] = $(this).val();
	});
		
	$("div"+x+" input[type=Password]").each(function(){
		dataInputHash[$(this).attr("id")] = $(this).val();
	});
       
	if($("#trnCode").val() == "getReport"||$("#trnCode").val() == "ReportGenerator"||$("#trnCode").val() == "getDoc"||$("#trnCode").val() == "DownloadDoc"){
		$("div"+x+" select").each(function(){
			dataInputHash[$(this).attr("id")] = $("#"+$(this).attr("id")+" :selected").val();		
   		});
	}else{
		$("div"+x+" select").each(function(){
			if(vn === null){
	    		//dataInputHash[$(this).attr("id")] = $("div"+x+" #"+$(this).attr("id")+" :selected").text();
				dataInputHash[$(this).attr("id")] = $(this).val();
	    	}else{
	    		dataInputHash[$(this).attr("id")] = $("div"+x+" #"+$(this).attr("id")+" :selected").val();
	    	}		
		});
	}
	    
	$("div"+x+" textarea").each(function(){
		dataInputHash[$(this).attr("id")] = $(this).val();
	});
		
	$("div"+x+" input[type=file]").each(function(){
		filePath = $(this).val();
		dataInputHash.ImageName = filePath;
		dataInputHash.ImageSource = base64ImageData;
	});
         
	$("div"+x+" input[type=checkbox]").each(function(){
 		if($(this).is(':checked')){
 			dataInputHash[$(this).attr("id")] = "true";
 		}else{
 			dataInputHash[$(this).attr("id")] = "false";		
 		}
 	});
         
	$("div"+x+" input[type=hidden]").each(function(){
     	dataInputHash[$(this).attr("id")] = $(this).val();
	}); 
        
	
	
	environmental.url=environmental.url+"<entry>"
		+"<string>"+x1.substring(1,t)+"</string>" 	
		+"<map>";
		
	for (var name in  dataInputHash) { 
		environmental.url=environmental.url+"<entry>"
		    +"<string>"+name+"</string>" 
		    +"<string>"+dataInputHash[name]+"</string>" 
		    +"</entry>";
	}
	
	environmental.url=environmental.url+"</map>"
	+"</entry>";
	
	callback();
}
	


function createFinalXml(callback){
	environmental.url=environmental.url+"<entry>"
		+"<string>auth</string>"
		+"<map>";
	var authInputHash = {};
	authInputHash = JSON.parse(sessionStorage.getItem('authHash'));
	
	
	if(sessionStorage.getItem('authHash') === null){
		/* ******************Hard code value BIL for tenant code**************** */
		environmental.url=environmental.url+"<entry>"
	    +"<string>tenantCode</string>" 
	    +"<string>1</string>" 
	    +"</entry>";
		/* ********************************************************************** */
	}
	else{
		for (var name in  authInputHash) {
			
			if(name != "caller")
			{
				environmental.url=environmental.url+"<entry>"
			    +"<string>"+name+"</string>" 
			    +"<string>"+authInputHash[name]+"</string>" 
			    +"</entry>";
			}
			
		}
	}
    var dt = new Date();
    var timeStamp = dt.getTime();
	
    environmental.url=environmental.url+"<entry>"
    +"<string>currentTimestamp</string>"
    +"<string>"+ timeStamp +"</string>"
    +"</entry>"
    +"<entry>"//Change For HTTPS
    +"<string>caller</string>"//Change For HTTPS 
    +"<string>uiApp</string>" //Change For HTTPS
    +"</entry>";//Change For HTTPS
	
    
    
    environmental.url=environmental.url+"<entry>"
    +"<string>"+"trnCode"+"</string>" 
    +"<string>"+ $("#trnCode").val()+"</string>" 
    +"</entry>";

	
	
	environmental.url=environmental.url+"</map>"
	+"</entry>"
	+"<entry>"
	+"<string>transactionStatus</string>"
	+"<map>";
	
	var transactionInputHash = {}; 
	
   /* $("div"+"#divTranStatus"+" input[type=hidden]").each(function(){
    	transactionInputHash[$(this).attr("id")] = $(this).val();
	});*/
	if(sessionStorage.getItem('transacHash') === null || sessionStorage.getItem('transacHash')===undefined || sessionStorage.getItem('transacHash')==="null"){
		$("div"+"#divTranStatus"+" input[type=hidden]").each(function(){
	    	transactionInputHash[$(this).attr("id")] = $(this).val();
		});
	}else{
		transactionInputHash =JSON.parse(sessionStorage.getItem('transacHash'));
	}
	
    for (var name in  transactionInputHash) { 
    	if(name == "errorCode" || name == "errorMessage" || name == "errorType"){
    		environmental.url=environmental.url+"<entry>"
		    +"<string>"+name+"</string>" 
		    +"<string></string>" 
		    +"</entry>";
    	}else{
    		environmental.url=environmental.url+"<entry>"
		    +"<string>"+name+"</string>" 
		    +"<string>"+transactionInputHash[name]+"</string>" 
		    +"</entry>";
    	}
	}
	
    environmental.url=environmental.url+"</map>"
	+"</entry>"
	+"</map>";
	
    environmental.url=environmental.url+"]]>"
	+"</strUiData>" 
	+ "</invokeService></soap:Body></soap:Envelope>";
	
	
	var initialUrlStr = environmental.url.split("<strUiData><![CDATA[")[0] + "<strUiData><![CDATA[";
	var dataUrlStr = environmental.url.split("<strUiData><![CDATA[")[1].split("]]></strUiData>")[0];
	var finalUrlStr =  "]]></strUiData>" + environmental.url.split("]]></strUiData>")[1];
	
	dataUrlStr = btoa(dataUrlStr);
	environmental.url = initialUrlStr + dataUrlStr + finalUrlStr;
	//alert(url);
	
	callback();
}

/*---------------------------------------------function to parse xml-----------------------------------------------------*/
var key;
function parseXml(funcName,parameter,bypassAssignValue){
	initializeXMLHttp();
	
		
	var wsClass = "MacawBPMApp/services/MacawBPMGateway";
	//Change For HTTPS 
	wsClass = "MacawInsurance/services/ServerGateway";
	
	var wsMethod = "?op=invokeService";
	var responseData = "";
	var wsCallURL = environmental.globalIP + wsClass + wsMethod;
		
	environmental.funcnm = funcName;
	environmental.pramtr = parameter;
	
	/*$.mobile.loading( "show", {
		text: "Processing...",
		textVisible: true,
		theme: "c"
	});*/
	$('.loaderImgClass').css('display', 'block');
	$("#loading").show();
	
	if(sessionStorage.getItem("keyProfilePageName")=="True"){
		//$('#loaderImgTextClass').html('Loading...');
	}else{
		//$('#loaderImgTextClass').html('Processing...');
	}
	
		
	$(".content").addClass('ui-disabled');
	$(".header-strip").addClass('ui-disabled');
	
	environmental.xmlhttp.open('POST', wsCallURL, true);
	
	environmental.xmlhttp.onreadystatechange = function() {
		if (environmental.xmlhttp.readyState == 4) {
			//alert("ready state: " + environmental.xmlhttp.readyState);alert("ready status: " + environmental.xmlhttp.status);
			if (environmental.xmlhttp.status != 200) {
				$("#loading").hide();
				$('.loaderImgClass').css('display', 'none');
				
				$(".content").removeClass('ui-disabled');
				$(".header-strip").removeClass('ui-disabled');
				if (environmental.xmlhttp.status !== 0) {
					alert('Error in connection. Please try again later.');
				}
			} else {
				$("#loading").hide();
				$('.loaderImgClass').css('display', 'none');
				
				$(".content").removeClass('ui-disabled');
				$(".header-strip").removeClass('ui-disabled');
				responseData = environmental.xmlhttp.responseText;

				var initialResponseStr = responseData.split("<ns:return>")[0] + "<ns:return>";
				var dataResponseStr = responseData.split("<ns:return>")[1].split("</ns:return>")[0];
				var finalResponseStr =  "</ns:return>" + responseData.split("</ns:return>")[1];

				dataResponseStr = base64.decode(dataResponseStr);
				dataResponseStr = specialCharConvertionCodeToValue(dataResponseStr);
				responseXML = initialResponseStr + dataResponseStr + finalResponseStr;
				responseXML = responseXML.replace(/&lt;/g, "<");
				responseXML = responseXML.replace(/&gt;/g, ">");
				
				
				var callbacks = $.Callbacks();
				callbacks.add(parseXmlToArray());
				if(bypassAssignValue == "explicit") {
					if(environmental.funcnm === null && environmental.pramtr === null){
					}else{
						if($("#trnCode").val() == "searchPolicy" 
							){
							
							
							environmental.pramtr[0] = responseXML;
						}
						window[environmental.funcnm](environmental.pramtr);
					}
				} else {
					callbacks.add( assignValueToInput('implicit'));
				}
				callbacks.fire();
			}
		}
	};
	environmental.xmlhttp.setRequestHeader("SOAPAction", "http://gateway.core.cmn.sl.arc.macaw.nest.com/invokeService");
	environmental.xmlhttp.setRequestHeader("Content-Type", "text/xml");
	environmental.xmlhttp.send(environmental.url);
}

/*------------------------------------function for parsing transaction area functions--------------------------------------------*/
function parseXmlToArray(){
	var ptyCode = "";
	var currentTime = "";
	var trCode = "";
	var key = "";
	var value = "";
	dataOutputHash = {};
	authOutputHash = {};
	transactionOutputHash = {};
	refDataOutputHash = {};
	BPMDataOutputHash = {};
	var j = 0;
	$(responseXML).find("map").each(function() {
		$(this).find("entry").each(function() {
			key = "";
			value = "";
			if($(this).find("string").text().substring(0, 17) === 'transactionStatus'){
				$(this).find("map entry").each(function() {
					$(this).find("string").each(function(){
						if(j === 0){
							key = $(this).text();
							j=1;
						}else{
							if(key == "errorType"){
								errType = $(this).text();
							}	
                            if(key == "errorMessage"){
                            	errMsg = $(this).text();
    	        			}
                            if (key == "errorCode") {
                            	errCode = $(this).text();
                            }
                            if(key == "trnLastUpdateTimestamp" ){
    	 						currentTime=$(this).text();
    	 					}
                            transactionOutputHash[key] = $(this).text();
                            j=0;
						}
					});
				});
			} 
			else if($(this).find("string").text().substring(0, 7) === 'REFData'){
				$(this).find("map entry").each(function() {
					$(this).find("string").each(function(){
						if(j === 0){
							key = $(this).text();
							j=1;
						}else{
							
							refDataOutputHash[key] = $(this).text();
	        	        	j=0;
	        	        }
					});
				});
			} else if($(this).find("string").text().substring(0, 4) === 'auth'){
				$(this).find("map entry").each(function() {
					$(this).find("string").each(function(){
						if(j === 0){
							key = $(this).text();
							j=1;
						}else{
							if(key == "trnCode"){
								trCode = $(this).text();
							}
							if(key == "userPartyCode"){
								ptyCode = $(this).text();
							}
	        	        	authOutputHash[key] = $(this).text();
	        	        	j=0;
	        	        }
					});
				});
			}else if($(this).find("string").text().search(":::") != -1){
			   j = 0;
			   var len = $(this).find("string").text().search(":::");
		        var divid = $(this).find("string").text().substring(0,len);
		        $(this).find("map entry").each(function() {
		        	$(this).find("string").each(function(){
	     	        	if(j === 0){
	     	        		key = $(this).text();
	     	        		
	     	        		
	     	        		j=1;
	     	        	}else{
	     	        		
	     						dataOutputHash[divid+" #"+key] = specialCharConvertionCodeToValue($(this).text());
	     					
	     	        		j=0;
	     	        		
	     	        		
	     	        	}
	     	        });
		        });
	        }
			
	        if($(this).find("string").text().search('CountryList') != -1 
	        		|| $(this).find("string").text().search('divDashboard') != -1 
	        		|| $(this).find("string").text().search('trnData') != -1 || $(this).find("string").text().search('AvmView') != -1){
	        	var i= 0;
	        	$(this).find("map entry").each(function() {
	        		$(this).find("string").each(function(){
	        			if(i === 0){
	        				key = $(this).text();
	        				i=1;
	        			}else{
	        				dataOutputHash[key] = $(this).text();
	        				i=0;
	        			}
	        		});
	        	});
	        }
		});
	});
	
	
	if(trCode !== "")
	{
		sessionStorage.setItem('transacHash', JSON.stringify(transactionOutputHash));
	}
	
		
	
	
}


function assignValueToInput(x){
	var controlType = "";
	var sourceStr = ""; //ARITRA FOR #4162
	var unexpectedData = "'";//ARITRA FOR #4162
	if(errType == "Info"){
		for (var name in  dataOutputHash) {
			controlType = getControlType("#"+name);
			if(controlType == "select") {
				if($("#"+name).data('select2')){
					if($("#"+name + " option:contains('" + dataOutputHash[name] + "')").select2("val") === undefined) {	
						$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
					}
					$("#"+name).select2("val",dataOutputHash[name]);
					$("#"+name + " option:contains('" + dataOutputHash[name] + "')").attr("selected","selected");
				}else{
					//ARITRA FOR #4162
					sourceStr = dataOutputHash[name];
					if(sourceStr.indexOf(unexpectedData) != -1){
						if($("#"+name+" option[value=\""+dataOutputHash[name]+"\"]").length > 0 !== true) {
							$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
						}//ARITRA FOR #4162
					}else{
						if($("#"+name+" option[value='"+dataOutputHash[name]+"']").length > 0 !== true) {
							$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
						}
					}

					$("#"+name).val(dataOutputHash[name]).prop('selected', true);
					$("#"+name + " option:contains('" + dataOutputHash[name] + "')").attr("selected","selected");
					
				}
				
				
				
				//$("#"+name).selectmenu("refresh");
			} else if(controlType == "slider") {
				if($("#"+name + " option[value='" + dataOutputHash[name] + "']").length > 0) {
					
				} else {
					$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
				}
				$("#"+name).val(dataOutputHash[name]);
				if(sessionStorage.getItem("KeyAggPage")== "true"){
					 $("#"+name).removeAttr("disabled");
				}else{
					//$("#"+name).attr('disabled','disabled');
				}
				//$("#"+name).slider("refresh");
			} else if(controlType == "text") {
				//alert(name);
				//alert(dataOutputHash[name]);
				$("#"+name).val(dataOutputHash[name]);
				
				/*alert(name);
				alert(dataOutputHash[name]);*/
				
				if(sessionStorage.getItem("KeyAggPage")== "true"){
					$("#"+name).removeAttr("disabled");
				}else{
					//$("#"+name).attr('disabled','disabled');
				}
			} else if(controlType == "password") {
				$("#"+name).val(dataOutputHash[name]);
				
				if(sessionStorage.getItem("KeyAggPage")== "true"){
					$("#"+name).removeAttr("disabled");
				}else{
					//$("#"+name).attr('disabled','disabled');
				}
			} else if(controlType == "hidden") {
				$("#"+name).val(dataOutputHash[name]);
				
				if(sessionStorage.getItem("KeyAggPage")== "true"){
					$("#"+name).removeAttr("disabled");
				}else{
					//$("#"+name).attr('disabled','disabled');
				}
			} else if(controlType == "checkbox") {
				if(dataOutputHash[name] == "true") {
					//$("#"+name).prop( "checked", true ).checkboxradio( "refresh" );
					$("#"+name).prop( "checked", true );
				} else if(dataOutputHash[name] == "false") {
					//$("#"+name).prop( "checked", false ).checkboxradio( "refresh" );
					$("#"+name).prop( "checked", false );
				}
			} else if(controlType == "radio") {
				if(dataOutputHash[name] == "true") {
					//$("#"+name).prop( "checked", true ).checkboxradio( "refresh" );
					$("#"+name).prop( "checked", true );
				} else if(dataOutputHash[name] == "false") {
					//$("#"+name).prop( "checked", false ).checkboxradio( "refresh" );
					$("#"+name).prop( "checked", false );
				}
			} else if(controlType == "textarea") {
				$("#"+name).val(dataOutputHash[name]);
			}
			
		}
		
		for (var name in  transactionOutputHash) { 
			$("#"+name).val(transactionOutputHash[name]);
			if(sessionStorage.getItem("KeyAggPage")== "true"){
				$("#"+name).removeAttr("disabled");
			}else{
				//$("#"+name).attr('disabled','disabled');
			}
		}
			
		var Trcode = "";
        for (var name in  authOutputHash) {
        	if(name == "trnCode"){
        		Trcode = authOutputHash[name];
			}
   		}
		
        if(x == 'implicit'){
			if(environmental.funcnm === null && environmental.pramtr === null){
				//do nothing
			}else{	
				window[environmental.funcnm](environmental.pramtr);
			}
		}	
	}else if(errType == "Warning" ){
		if(errCode == "MCW-410028"){
			//------------------------------------------- Open for app in web -------------------------------------------------->
				deactivatePreviousSession();
			//------------------------------------------- Open for app in web -------------------------------------------------->
			
			//------------------------------------------- block for app in web -------------------------------------------------->
			/*navigator.notification.confirm(errMsg, onConfirm, 'Confirmation','Yes ,No' );
			function onConfirm(buttonIndex) {

				if (buttonIndex == 1) {
					deactivatePreviousSession();
				} else cancelLogin();
			}*/
			//------------------------------------------- block for app in web -------------------------------------------------->
		}else{

			for (var name in  dataOutputHash) {
				controlType = getControlType("#"+name);
				if(controlType == "select") {
					if($("#"+name).data('select2')){
						if($("#"+name + " option:contains('" + dataOutputHash[name] + "')").select2("val") == undefined) {	
							$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
						}
						$("#"+name).select2("val",dataOutputHash[name]);
						$("#"+name + " option:contains('" + dataOutputHash[name] + "')").attr("selected","selected");
					}else{
						//ARITRA FOR #4162
						sourceStr = dataOutputHash[name];
						if(sourceStr.indexOf(unexpectedData) != -1){
							if($("#"+name+" option[value=\""+dataOutputHash[name]+"\"]").length > 0 != true) {
								$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
							}//ARITRA FOR #4162
						}else{
							if($("#"+name+" option[value='"+dataOutputHash[name]+"']").length > 0 != true) {
								$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
							}
						}

						$("#"+name).val(dataOutputHash[name]).prop('selected', true);
						$("#"+name + " option:contains('" + dataOutputHash[name] + "')").attr("selected","selected");
						
					}
					
					
					
					//$("#"+name).selectmenu("refresh");
				} else if(controlType == "slider") {
					if($("#"+name + " option[value='" + dataOutputHash[name] + "']").length > 0) {
						
					} else {
						$("#"+name).append(new Option(dataOutputHash[name], dataOutputHash[name]));
					}
					$("#"+name).val(dataOutputHash[name]);
					if(sessionStorage.getItem("KeyAggPage")== "true"){
						 $("#"+name).removeAttr("disabled");
					}else{
						//$("#"+name).attr('disabled','disabled');
					}
					//$("#"+name).slider("refresh");
				} else if(controlType == "text") {
					//alert(name);
					//alert(dataOutputHash[name]);
					$("#"+name).val(dataOutputHash[name]);
					
					/*alert(name);
					alert(dataOutputHash[name]);*/
					
					if(sessionStorage.getItem("KeyAggPage")== "true"){
						$("#"+name).removeAttr("disabled");
					}else{
						//$("#"+name).attr('disabled','disabled');
					}
				} else if(controlType == "password") {
					$("#"+name).val(dataOutputHash[name]);
					
					if(sessionStorage.getItem("KeyAggPage")== "true"){
						$("#"+name).removeAttr("disabled");
					}else{
						//$("#"+name).attr('disabled','disabled');
					}
				} else if(controlType == "hidden") {
					$("#"+name).val(dataOutputHash[name]);
					
					if(sessionStorage.getItem("KeyAggPage")== "true"){
						$("#"+name).removeAttr("disabled");
					}else{
						//$("#"+name).attr('disabled','disabled');
					}
				} else if(controlType == "checkbox") {
					if(dataOutputHash[name] == "true") {
						//$("#"+name).prop( "checked", true ).checkboxradio( "refresh" );
						$("#"+name).prop( "checked", true );
					} else if(dataOutputHash[name] == "false") {
						//$("#"+name).prop( "checked", false ).checkboxradio( "refresh" );
						$("#"+name).prop( "checked", false );
					}
				} else if(controlType == "radio") {
					if(dataOutputHash[name] == "true") {
						//$("#"+name).prop( "checked", true ).checkboxradio( "refresh" );
						$("#"+name).prop( "checked", true );
					} else if(dataOutputHash[name] == "false") {
						//$("#"+name).prop( "checked", false ).checkboxradio( "refresh" );
						$("#"+name).prop( "checked", false );
					}
				} else if(controlType == "textarea") {
					$("#"+name).val(dataOutputHash[name]);
				}
				
			}
			
			for (var name in  transactionOutputHash) { 
				$("#"+name).val(transactionOutputHash[name]);
				if(sessionStorage.getItem("KeyAggPage")== "true"){
					$("#"+name).removeAttr("disabled");
				}else{
					//$("#"+name).attr('disabled','disabled');
				}
			}
				
			var Trcode = "";
	        for (var name in  authOutputHash) {
	        	if(name == "trnCode"){
	        		Trcode = authOutputHash[name];
				}
	   		}
			
	        if(x == 'implicit'){
				if(environmental.funcnm == null && environmental.pramtr == null){
					//do nothing
				}else{	
					window[environmental.funcnm](environmental.pramtr);
				}
			}
		
		}
	}else{
		
			
    }
}

function specialCharConvertionCodeToValue(value){
	value=value.replace(/&amp;lt;/g, "<").replace(/&lt;/g, "<").replace(/&amp;gt;/g, ">").replace(/&gt;/g, ">").replace(/&#8482;/g, "�").replace(/&amp;/g,"&").replace(/&apos;/g,"'").replace(/&hyphen;/g,"–").replace(/&apos;/g,"‘").replace(/&doubleapos;/g,'"').replace(/&tripledot;/g,'...');
	return value;
}
function specialCharConvertionValueToCode(value){
	value=value.replace(/</g, "&amp;lt;").replace(/</g, "&lt;").replace(/>/g, "&amp;gt;").replace(/>/g, "&gt;").replace(/�/g, "&#8482;");
	return value;
}




var base64 = {};
base64.PADCHAR = '=';
base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

base64.makeDOMException = function() {
    // sadly in FF,Safari,Chrome you can't make a DOMException
    var e, tmp;

    try {
        return new DOMException(DOMException.INVALID_CHARACTER_ERR);
    } catch (tmp) {
        // not available, just passback a duck-typed equiv
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error/prototype
        var ex = new Error("DOM Exception 5");

        // ex.number and ex.description is IE-specific.
        ex.code = ex.number = 5;
        ex.name = ex.description = "INVALID_CHARACTER_ERR";

        // Safari/Chrome output format
        ex.toString = function() { return 'Error: ' + ex.name + ': ' + ex.message; };
        return ex;
    }
}

base64.getbyte64 = function(s,i) {
    // This is oddly fast, except on Chrome/V8.
    //  Minimal or no improvement in performance by using a
    //   object with properties mapping chars to value (eg. 'A': 0)
    var idx = base64.ALPHA.indexOf(s.charAt(i));
    if (idx === -1) {//alert(i + "\n" + idx + "\n" + s.substring(0,i+1));
        throw base64.makeDOMException();
    }
    return idx;
}

base64.decode = function(s) {
    // convert to string
    s = '' + s;
    var getbyte64 = base64.getbyte64;
    var pads, i, b10;
    var imax = s.length
    if (imax === 0) {
        return s;
    }

    if (imax % 4 !== 0) {
        throw base64.makeDOMException();
    }

    pads = 0;
    if (s.charAt(imax - 1) === base64.PADCHAR) {
        pads = 1;
        if (s.charAt(imax - 2) === base64.PADCHAR) {
            pads = 2;
        }
        // either way, we want to ignore this last block
        imax -= 4;
    }

    var x = [];
    for (i = 0; i < imax; i += 4) {
        b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) |
            (getbyte64(s,i+2) << 6) | getbyte64(s,i+3);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
    }

    switch (pads) {
    case 1:
        b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
        break;
    case 2:
        b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12);
        x.push(String.fromCharCode(b10 >> 16));
        break;
    }
    return x.join('');
}

base64.getbyte = function(s,i) {
    var x = s.charCodeAt(i);
    if (x > 255) {
        throw base64.makeDOMException();
    }
    return x;
}

base64.encode = function(s) {
    if (arguments.length !== 1) {
        throw new SyntaxError("Not enough arguments");
    }
    var padchar = base64.PADCHAR;
    var alpha   = base64.ALPHA;
    var getbyte = base64.getbyte;

    var i, b10;
    var x = [];

    // convert to string
    s = '' + s;

    var imax = s.length - s.length % 3;

    if (s.length === 0) {
        return s;
    }
    for (i = 0; i < imax; i += 3) {
        b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8) | getbyte(s,i+2);
        x.push(alpha.charAt(b10 >> 18));
        x.push(alpha.charAt((b10 >> 12) & 0x3F));
        x.push(alpha.charAt((b10 >> 6) & 0x3f));
        x.push(alpha.charAt(b10 & 0x3f));
    }
    switch (s.length - imax) {
    case 1:
        b10 = getbyte(s,i) << 16;
        x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
               padchar + padchar);
        break;
    case 2:
        b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8);
        x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
               alpha.charAt((b10 >> 6) & 0x3f) + padchar);
        break;
    }
    return x.join('');
}


