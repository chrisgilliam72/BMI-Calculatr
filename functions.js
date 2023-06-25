function isMetric() {
    return $("#metricRadio").is(":checked");
  };

  function updateUnits(isMetric) {
    if (isMetric) {
      $("#metricUnitsbox").show();
      $("#imperialUnitsBox").hide();

    }
    else {
      $("#metricUnitsbox").hide();
      $("#imperialUnitsBox").show();

    }
  }

  function calculateBMICategory(bmi){
     switch (true){
      case bmi<18.5: return " in the underweight range";
      case bmi>18.5 && bmi <25 : return " within the Healthy Weight range";
      case bmi>=25 && bmi <30 : return " within the overweight range";
      case bmi>=30 : return " in the obese range"
     }
  }
  function calculateBMIMetric(){
    var height=Number($("#heightMetric").val())/100;
    var weight=Number($("#weightMetric").val());
    var bmi= (weight/(height*height)).toFixed(1);
    return bmi;
  }

  function calculateBMIImperial(){
    var heightFt=Number($("#heightImperianFt").val());
    var heightIn=Number($("#heightImperialIn").val());
    var weightSt=Number($("#weightImperialSt").val());
    var weightlb=Number($("#weightImperialLb").val());

    var height=heightFt*12+heightIn;
    var weight=weightSt*14+weightlb;
    var bmi=(weight/ (height*height) * 703).toFixed(1);
    return bmi;
  }

  function calculateIdealWeightRange(height, bmi) {
    // Convert height from centimeters to meters
    var heightInMeters = height / 100;
  
    // Calculate the ideal weight range
    var idealWeightLower = bmi * Math.pow(heightInMeters, 2) * 0.9;
    var idealWeightUpper = bmi * Math.pow(heightInMeters, 2) * 1.1;
  
    // Return the ideal weight range as an object
    return {
      lower: idealWeightLower.toFixed(2),
      upper: idealWeightUpper.toFixed(2)
    };
  }

  function allInputFieldsCompleted(){ 
    if (isMetric()){
      var height=$("#heightMetric").val();
      var weight=$("#weightMetric").val();
      if (height && weight)
        return true;
      return false;
    }

    var heightFt=$("#heightImperianFt").val();
    var heightIn=$("#heightImperialIn").val();
    var weightSt=$("#weightImperialSt").val();
    var weightlb=$("#weightImperialLb").val();

    if (heightFt&&heightIn&& weightSt && weightlb)
      return true;
    return false;
  }

  function updateBMI()
  {
      if (isMetric())
        $("#actualbmivalue").text(calculateBMIMetric());
      else
      $("#actualbmivalue").text(calculateBMIImperial());
  }
  
  function upddateBMICategory(){
    let bmi=0.0;
    if (isMetric())
      bmi=calculateBMIMetric();
    else
      bmi=calculateBMIImperial();
    $("#bmicategory").text(calculateBMICategory(bmi))
  }

  function showBMIResult(){
    $("#bmibannertext").hide();
    $("#bmiactualresult").show();
  }

  function showBannerText(){
    $("#bmibannertext").show();
    $("#bmiactualresult").hide();
  }

  function updateIdealWeightRange(){

    if (isMetric()){
      let height=Number($("#heightMetric").val());
      let bmi=calculateBMIMetric();
      let idealWeightRange=calculateIdealWeightRange(height,bmi);
      let weightRangeString=`${idealWeightRange.lower}kgs - ${idealWeightRange.upper}kgs`;
      $('#idealweight').text(weightRangeString)
    }
    else{

      let bmi=calculateBMIImperial();
      let heightFt=$("#heightImperianFt").val();
      let heightIn=$("#heightImperialIn").val();

      let totalInches = (Number(heightFt)* 12) + Number(heightIn);
      let totalcms  = totalInches * 2.54;

      let idealWeightRange=calculateIdealWeightRange(totalcms,bmi)
      let weightRangeString=`${(idealWeightRange.lower*2.2).toFixed(2)}lbs - ${(idealWeightRange.upper*2.2).toFixed(2)}lbs`;
      $('#idealweight').text(weightRangeString)
    }
    
  }