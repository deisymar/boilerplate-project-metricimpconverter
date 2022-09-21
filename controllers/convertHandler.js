function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];  
  let string = input.match(/[a-zA-Z]+/g)[0];  
  return [number[0], string];
}
function checkFraction(possibleFraction) {
  let nums = possibleFraction.split("/");
  //checked num is not error on a double-fraction ejm 2/3/2
  if (nums.length > 2) {
    return false;
  }
  return nums;
}

function ConvertHandler() {
  
  this.getNum = function(input) { 
    
    let result = numberStringSplitter(input)[0];    
    let nums = checkFraction(result);
    if (!nums) {
      return undefined;
    }
    let num1 = nums[0];
    let num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    
    const UnitOfMeasure = ['gal','lbs','mi','kg','l', 'km'];
    let cadCheck = numberStringSplitter(input)[1].toLowerCase(); 
    //checked if Is Unit Of Measure Valid
    let result = (UnitOfMeasure.includes(cadCheck)) ? cadCheck : undefined;
    if (result==='l') { 
      result='L' 
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    
    let unit = initUnit.toLowerCase();
    const UnitOfMeasureConvert = {
      gal: 'L', 
      l: 'gal',      
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs' 
    }
    let result = UnitOfMeasureConvert[unit];
    return result;
  };

  this.spellOutUnit = function(unitConvert) {
    
    let unit = unitConvert.toLowerCase();
    const UnitOfMeasureString = {
      gal: 'gallons', 
      l: 'liters',      
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
      default: "don't know" 
    }
    let result = UnitOfMeasureString[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  
    return result;
  };
  
}

module.exports = ConvertHandler;
