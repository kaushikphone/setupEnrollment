 

function redirecttoScreen(prevPage,quoteNo){
	_url = location.href;
	 quoteNo = _url.split('?');
	var qNo = quoteNo[1].split('=');
	quoteNo = qNo[1];
	  if (prevPage == "enrollmentDtls") {
			
		$.get('../pages/enrollmentDetails.html').then(function(data) {
			///alert(data);
			$("#divForAppend").html(data);
			getLandingPageData(quoteNo);
			});
		}else if (prevPage == "instruction") {
			
			$.get('../pages/setupInstuction.html').then(function(data) {
				
				$("#divForAppend").html(data);
				jscolor.installByClassName("jscolor");
				$("#summary").removeClass('activeButton');
				$("#summary").addClass('disabledButton');
				$("#setup").addClass('activeButton');
				$('.clsOffCheckbox, .census').lc_switch();
				$('.census, .emailTemplateOn').lcs_on();
				///$('.datepicker').datepicker();
				Dropzone.autoDiscover = false;
			    /*$(".dropzone").dropzone();*/
				$("#formbanner").dropzone({
			        paramName: 'file',
			        clickable: true,
			        maxFilesize: 1,
			        uploadMultiple: false,
			        autoProcessQueue: false,
			        accept: function(file){///accept: function(file, done){
			            reader = new FileReader();
			            reader.onload = handleReaderLoad;
			            reader.readAsDataURL(file);
			            function handleReaderLoad(evt) {
			            	alert(evt.target.result);
			                document.getElementById("txtBannerBase64").setAttribute('value', evt.target.result);
			               
			            }
			        }
				 });
				$("#formSponser").dropzone({
			        paramName: 'file',
			        clickable: true,
			        maxFilesize: 1,
			        uploadMultiple: false,
			        autoProcessQueue: false,
			        accept: function(file){///accept: function(file, done){
			            reader = new FileReader();
			            reader.onload = handleReaderLoad;
			            reader.readAsDataURL(file);
			            function handleReaderLoad(evt) {
			                document.getElementById("txtSponserBase64").setAttribute('value', evt.target.result);
			               
			            }
			        }
				 });
				$('.clsForSummerNote').summernote({toolbar: [
					   ['style', ['bold', 'italic', 'underline', 'clear', ]],
					   ['color', ['color']],	
					   ['fontsize', ['fontsize']],
					   ['para', ['ul', 'ol', 'paragraph']],
					   ['fontname', ['fontname']] 
					],height: 130});
				});
			}else if (prevPage == "censusInfo") {
				
				$.get('../pages/confirmCensusInfo.html').then(function(data) {
					
					$("#divForAppend").html(data);
					$("#setup").removeClass('activeButton');
					$("#setup").addClass('disabledButton');
					$("#censusInfo").addClass('activeButton');
					$('.census').lc_switch();
					$('.census').lcs_on();
					});
				}else if (prevPage == "setupEmail") {
					
					$.get('../pages/setupEmail.html').then(function(data) {
						
						$("#divForAppend").html(data);
						$("#setup").removeClass('activeButton');
						$("#setup").addClass('disabledButton');
						$("#censusInfo").addClass('activeButton');
						$('.census').lc_switch();
						$('.census').lcs_on();
						});
					}
	
}

	
function hideShowBtnText(id,hideId){
	
	var bttnTxt = $('#'+id).text();
	if(bttnTxt == 'View'){
		$('#'+id).text('Hide');
		$("#"+hideId).show();
	}
	else{
		$('#'+id).text('View');
		$("#"+hideId).hide();
		
	}
	
}
function hideShowEmailPannel(){
	alert(11);
	$('#newUserDefinedTeplate').show();
	
}
var helpTextHash={};
helpTextHash['Activity State']='State where you derive most of your revenue';

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

var numericMsg = "You can enter only number in this field.";
var alphanumericMsg = "You can enter only alphanumeric in this field.";
var alphanumericWithSpecialCharMsg = "You can enter a-z,A-Z,0-9 and  ,.;:- in this field.";
var alphanumericLnoMsg = "Invalid license number. For pending licenses  please put 0";
var alphanumericWithSpecialCharMsgForCres = "You can enter a-z,A-Z,0-9 and ,.;:-+@#$%&()|'\"/ in this field.";
var alphanumericSpecialCaseMsg = "You can enter only alphanumeric and !-*® in this field.";
var alphanumericWithSpecialCharMsgSpecialCase = "You can enter a-z,A-Z,0-9 and ,.;:-*!® in this field.";

var dFormat = "dd-mm-yy";
var dFormatEO = "mm-dd-yyyy";



function getControlType(controlId) {
	var controlType = "";
	controlType = $(controlId).prop("tagName");
	if(controlType !== undefined) {
		if(controlType == "INPUT") {
			controlType = $(controlId).prop("type");
		} else if(controlType == "SELECT") {
			if((($(controlId).attr("data-role") !== "undefined") || ($(controlId).attr("data-role") !== undefined)) && ($(controlId).attr("data-role")=="slider")) {
				controlType =  $(controlId).attr("data-role");
			} else {
				controlType = controlType.toLowerCase();
			}
		} else {
			controlType = controlType.toLowerCase();
		}
	}
	return controlType;
}

function showHelpText(content,labelName){
    $.each(helpTextHash, function(key, value) {		
    	if(labelName == key ){
    		if(labelName == "Opportunity Dashboard" || labelName == "Customer Dashboard" || labelName == "Quotation Dashboard" || 
    				labelName == "Policy Dashboard" || labelName == "Claim Dashboard" || labelName == "Risk Management Dashboard" || 
    				labelName == "Service Request Dashboard"){
    			$("#boxContentDash").html(value);
        		$("#spanLabelNameDash").text(key);
        		$("#helpTextAreaForDashboard").show('slow');			
        		$("#helpRightSideTextDash").hide();
    		}else{
    			$("#boxContent").html(value);
        		$("#spanLabelName").text(key);
        		$("#helpTextArea").show('slow');			
        		$("#helpRightSideText").hide();
    		}
    		
    	}
    });
}

	
//****************************************** OPEN FOR WEB APP **************************************** //
window.addEventListener("load", function() {

	 $("#loading").hide();
});



function showToastrMessage(errorType, errorMessage){
	
	  toastr.clear();
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "target" : "#divScreenHeader",
		"progressBar": false,
        "onclick": null,
        //"showDuration": "99999",
        "hideDuration": "5000",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp",
        "positionClass": "toast-top-center",
       // "title" : "Success Message",

      };

	if(errorType == "Error"){
    	toastr.error(errorMessage,{timeOut:5000});
		}else if(errorType == "Warning"){
			toastr.warning(errorMessage,{timeOut:5000});
		}else{
    		toastr.success(errorMessage,{timeOut:5000});
		}
	}




function newDetailValueToInput(parentDiv, detailInputHash) {
	
	var controlType = "";
	for(var name in detailInputHash) {
		controlType = getControlType(parentDiv +" #" + name);
		if(controlType == "select") {
			
			
			if($("#"+name + " option:contains('" + detailInputHash[name] + "')").select2("val") === undefined) {
				$("#"+name).append(new Option(detailInputHash[name], detailInputHash[name]));
			}
			if($("#"+name).data('select2')){
				if("#"+name == "#cmbLob"){
					$("#"+name).select2("val",detailInputHash[name]);
					changeProductBasedOnLOBForMyWork();
				}
				$("#"+name).select2("val",detailInputHash[name]);
				$("#"+name + " option:contains('" + detailInputHash[name] + "')").attr("selected","selected");
			}else{
				if(detailInputHash[name] !== undefined && detailInputHash[name] !== "undefined" && detailInputHash[name] !== " " && detailInputHash[name] !== ""){
					$(parentDiv +" #" + name).val(detailInputHash[name]);
				}
				
			}
			// **********************************************************************
			
			
		} else if(controlType == "slider") {
			// **********************************************************************
			
			$(parentDiv +" #" + name).val(detailInputHash[name]);
			// **********************************************************************
		} else if(controlType == "text") {
			detailInputHash[name] = $.trim(detailInputHash[name]);
			if(detailInputHash[name]!==""){
				var value = detailInputHash[name].replace('.00','');
				
					$(parentDiv +" #" + name).val(value);
				
					
				}
				
			
		} else if(controlType == "password") {
			$(parentDiv +" #" + name).val(detailInputHash[name]);
		} else if(controlType == "hidden") {
			$(parentDiv +" #" + name).val(detailInputHash[name]);
		} else if(controlType == "checkbox") {
			var btnYes="#btn"+name+"Yes";
			var btnNo="#btn"+name+"No";
			var divId="#divOpen"+name;
			if(detailInputHash[name] === "true" || detailInputHash[name] === true) {
				// **********************************************************************
				
				$(parentDiv +" #" + name).prop( "checked", true );				
				$(btnYes).removeClass('active btn-default');
				$(btnYes).addClass('active btn-success');
				
				$(btnNo).removeClass('active btn-success');
				$(btnNo).addClass('btn-default');
				$(divId).show();
				// **********************************************************************
			} else if(detailInputHash[name] === "false" || detailInputHash[name] === false) {
				// **********************************************************************
				
				$(parentDiv +" #" + name).prop( "checked", false );
				$(btnNo).removeClass('active btn-default');
				$(btnNo).addClass('active btn-success');
				
				$(btnYes).removeClass('active btn-success');
				$(btnYes).addClass('btn-default');
				$(divId).hide();
				// **********************************************************************
			}
		} else if(controlType == "radio") {
			if(detailInputHash[name] == "true") {
				// **********************************************************************
				
				$(parentDiv +" #" + name).prop( "checked", true );
				// **********************************************************************
			} else if(detailInputHash[name] == "false") {
				// **********************************************************************
				
				$(parentDiv +" #" + name).prop( "checked", false );
				// **********************************************************************
			}
		} else if(controlType == "textarea") {
			if(parentDiv == '#div1_CLAIM_DETAIL' && name == 'txtSynopsis'){
				$(parentDiv +" #" + name).val(detailInputHash[name].replace(/&apos;/g,"’").replace(/&apos;/g,"‘").replace(/&doubleapos;/g,"”").replace(/&doubleapos;/g,"“").replace(/&hyphen;/g,"–").replace(/&tripledot;/g,"…"));
			}else{
				$(parentDiv +" #" + name).val(detailInputHash[name]);
			}
			
		}
	}
}



