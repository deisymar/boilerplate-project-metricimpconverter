const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "25L";
      assert.equal(convertHandler.getNum(input), 25);
      done();
    });
    
    test("Decimal Input", function (done) {
      let input = "25.2L";
      assert.equal(convertHandler.getNum(input), 25.2);
      done();
    });
    
    test("Fractional Input", function (done) {
      let input = "25/3L";
      assert.equal(convertHandler.getNum(input), 25 / 3);
      done();
    });

    test("Fractional Input with a Decimal", function (done) {
      let input = "7/5.3L";
      assert.equal(convertHandler.getNum(input), 7 / 5.3);
      done();      
    });

    test("Invalid Input (double fraction)", function (done) {
      let input = "3/2/3L";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test("No Numerical Input", function (done) {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
});

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let unitInput = ["gal", "l", "mi", "km", "lbs", "kg",
                   "GAL", "L", "MI", "KM", "LBS", "KG"];
      let unitOutput = ["gal", "L", "mi", "km", "lbs", "kg",
                    "gal", "L", "mi", "km", "lbs", "kg"];
      unitInput.forEach(function (item, d) {
        assert.equal(convertHandler.getUnit(item), unitOutput[d]);
      });
      done();
    });
  
    test("Unknown Unit Input", function (done) {
      assert.equal(convertHandler.getUnit("75kilograms"), undefined);
      done();
    });
  
  }); 

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let unitInput = ["gal", "l", "mi", "km", "lbs", "kg"];
      let unitReturn = ["L", "gal", "km", "mi", "kg", "lbs"];
      unitInput.forEach(function (item, d) {
        assert.equal(convertHandler.getReturnUnit(item), unitReturn[d]);
      });
      done();
    });
    
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      
      let dataInput = ["gal", "l", "mi", "km", "lbs", "kg"];
      let dataExpected = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];

      dataInput.forEach(function (item, d) {
        assert.equal(convertHandler.spellOutUnit(item), dataExpected[d]);
      });
      done();
    });

  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("gal to L", function (done) {
      let input = [4, "gal"];
      let expected = 15.1416;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to gal", function (done) {
      let input = [15.14, "l"];
      let expected = 3.9996;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("mi to km", function (done) {
      let input = [0.31, "mi"];
      let expected = 0.4989;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("km to mi", function (done) {
      let input = [1/2, "km"];
      let expected = 0.3107;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("lbs to kg", function (done) {
      let input = [5.4/3, "lbs"];
      let expected = 0.8165;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("kg to lbs", function (done) {
      let input = [8, "kg"];
      let expected = 17.637;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

  });  
  
});