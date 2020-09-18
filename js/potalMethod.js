//*********************************************************************************************************************
//                         SETUP PORTAL
//   1.Program Name             : potalMethod.js
//   2.Description              : This javascript is used for all portal  transaction calling
//   3.Author                   : Nest Innovative Solutions
//   4.Date Written             : 07-Feb-2020
//   5.Called From              :
//   6.Calls                    :
//   7.Modification History     :
//*********************************************************************************************************************

//***************************This function load the enrollment details screen Start*************************
function getLandingPageData(quoteNumber){
	$('#trnData #txtQuoteNumber').val(quoteNumber);
	$("#txtQuoteSpan").text(quoteNumber);
	try{
		$("#trnCode").val("getLandingPageData");
	    var parameterArray = new Array("response", "");
	    createInitialXml(function(){
	       createDataXml("#trnData", null, function(){
	        	 createFinalXml(function(){
	        		 parseXml('getLandingPageDataAfterFunc',parameterArray);
	             });
	        });
	       
	    });
	}catch(exec){
		console.log("Landing Page ERROR >"+exec);
	} 
}

function getLandingPageDataAfterFunc(responseData){
	var ptName = dataOutputHash['trnData #txtName'];
	$("#txtNameSpan").text(ptName);
	var enrollmentStartaDate = dataOutputHash['trnData #txtEnrolStartaDate'];
	var enrollmentEndDate = dataOutputHash['trnData #txtEnrollmentEndDate'];
	var totalCount = dataOutputHash['trnData #txtTotalCount'];
	var publishStatus = dataOutputHash['trnData #txtPublishStatus'];
	$("#txtEnrolStartaDateSpan").text(enrollmentStartaDate);
	$("#txtEndDateSpan").text(enrollmentEndDate);
	$("#txtTotalCountSpan").text(totalCount);
	$("#txtPublishStatusSpan").text(publishStatus);
	
	$("#txtTotalCountDeclined").text(dataOutputHash['trnData #txtTotalCountDeclined']);
	$("#txtTotalCountWithdrawn").text(dataOutputHash['trnData #txtTotalCountWithdrawn']);
	$("#txtTotalCountNonRspnd").text(dataOutputHash['trnData #txtTotalCountNonRspnd']);
	$("#txtTotalCountForOptedout").text(dataOutputHash['trnData #txtTotalCountForOptedout']);
	
	$("#txtTotalCountForOptedIn").text(dataOutputHash['trnData #txtTotalCountForOptedIn']);
	$("#txtTotalCountForComplted").text(dataOutputHash['trnData #txtTotalCountForComplted']);
	
	var ctx = document.getElementById('myChart').getContext('2d');
	ctx.height = 300;
	var myChart = new Chart(ctx, {
	    type: 'pie',
	    data: {
	        labels: ['Opt in', 'Opt Out','Non Responder','Withdrawn','Declined'],
	        datasets: [{
	            label: '# of Votes',
	            data: [dataOutputHash['trnData #txtTotalCountForOptedIn'], dataOutputHash['trnData #txtTotalCountForOptedout'],dataOutputHash['trnData #txtTotalCountNonRspnd'], dataOutputHash['trnData #txtTotalCountWithdrawn'], dataOutputHash['trnData #txtTotalCountDeclined']],
	            backgroundColor: [
	                '#FF6384',
	                '#36A2EB',
	                '#9932CC',
	                '#8B008B'
	                
	            ]            
	        }]
	    },
	    options: {
	        responsive: true,
	        legend: {
	            position: 'right',
	        }
	    }   
	});
	
}
//***************************This function load the enrollment details screen End*************************
function getAuthKeyFromCheckBook(){
	try{
		$("#trnCode").val("getAuthKeyFromCheckBook");
	    var parameterArray = new Array("response", "");
	    createInitialXml(function(){
	       createDataXml("#trnData", null, function(){
	        	 createFinalXml(function(){
	        		 parseXml('getAuthKeyFromCheckBookAfterFunc',parameterArray);
	             });
	        });
	       
	    });
	}catch(exec){
		console.log("AU Page ERROR >"+exec);
	} 
		
}
function getAuthKeyFromCheckBookAfterFunc(responseData){
	var authKeyFromChekcBook = dataOutputHash['divForCheckBook #txtCheckbookKey'];	
	if(authKeyFromChekcBook !== "" && authKeyFromChekcBook !== " " && authKeyFromChekcBook !== undefined && authKeyFromChekcBook !== null){
		showToastrMessage("Success", "Auth key is "+authKeyFromChekcBook);	
	}else{
		showToastrMessage("Error", dataOutputHash['divForCheckBook #txtErroMessage']);	
	}
	
}
function saveSetupInstruction(){
	redirecttoScreen("censusInfo");
	/*try{
		$("#trnCode").val("saveSetupInstruction");
	    var parameterArray = new Array("response", "");
	    createInitialXml(function(){
	    	createDataXml("#divQuoteAndEnroll", null, function(){
	    		createDataXml("#divForBannerTextAndInfo", null, function(){
	    			createDataXml("#divForSponserBasicInfo", null, function(){
	    				createDataXml("#divForplanInstruction", null, function(){
	    					createDataXml("#divForBankDraft", null, function(){
	    						createDataXml("#divForplanSetup", null, function(){
	    							createFinalXml(function(){
	    								parseXml('saveSetupInstructionAfterFunc',parameterArray);
	               });
	          });
	         });
	      });
	    });
	    });
	 });
	});
	}catch(exec){
		console.log("SET UP PORTAL >"+exec);
	} */
	
}
function saveSetupInstructionAfterFunc(){
	redirecttoScreen("censusInfo");
}
function saveCensusInfo(){
	redirecttoScreen("setupEmail");
	/*$("#trnCode").val("saveSetupInstruction");
    var parameterArray = new Array("response", "");
    createInitialXml(function(){
       createDataXml("#divForCensusScreen", null, function(){
    	  
        	 createFinalXml(function(){
        		 parseXml('saveCensusInfoAfterFunc',parameterArray);
             });
        });
       });*/
   
}
function saveCensusInfoAfterFunc(responseData){
	alert(111);
	redirecttoScreen("setupEmail");
}