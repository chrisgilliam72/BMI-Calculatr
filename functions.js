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

  function calculateBMIMetric()
  {
    var height=Number($("#heightMetric").val())/100;
    var weight=Number($("#weightMetric").val());
    var bmi= (weight/(height*height)).toFixed(1);
    return bmi;
  }

  function calculateBMIImperial()
  {
    var heightFt=Number($("#heightImperianFt").val());
    var heightIn=Number($("#heightImperialIn").val());
    var weightSt=Number($("#weightImperialSt").val());
    var weightlb=Number($("#weightImperialLb").val());

    var height=heightFt*12+heightIn;
    var weight=weightSt*14+weightlb;
    var bmi=(weight/ (height*height) * 703).toFixed(1);
    return bmi;
  }

  function allInputFieldsCompleted()
  { 
    if (isMetric())
    {
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
  
  function showBMIResult()
  {
    $("#bmibannertext").hide();
    $("#bmiactualresult").show();
  }

  function showBannerText()
  {
    $("#bmibannertext").show();
    $("#bmiactualresult").hide();
  }