// Check that Mocha works
var assert = require('assert');
describe('Mocha', function() {
    it('works', function() {
        assert.equal(1,1);
    });
});

////////////////////////////////////////////////////////////////////////////////
// We're supposed to import our js files here and unit test them, but there's a 
// conflict between Mocha and Babel that we don't have time to sort out. So 
// we're copying our code directly in here. We'll fix this after submission.
////////////////////////////////////////////////////////////////////////////////

// import {tally, addArrays} from About.js
////////////////////////////////////////////////////////////////////////////////
// Counts the number of times each name appears on the list
        function tally(ourList, ourNames) {
            // console.log(ourList);
            // console.log(ourNames);
            var totals = [];
            ourNames.forEach(function() {
                totals.push(0)
            });

            ourList.forEach(function(thisItem) {
                for (var thisName = 0; thisName < ourNames.length; thisName++) {
                    if (thisItem == ourNames[thisName]) {
                        totals[thisName] += 1;
                    }
                }
            });

            return totals;
        }

        // Adds two arrays element-wise
        function addArrays(array1, array2) {
            for(var index = 0; index < array1.length; index++) {
                array1[index] = array1[index] + array2[index];
            }

            return array1;
        }
////////////////////////////////////////////////////////////////////////////////

// Check that tally() exists
var assert = require('assert');
describe('tally()', function() {
    it('exists', function() {
        assert.equal(typeof tally, "function");
    });
});

// Check that tally() produces correct results
var assert = require('assert');
describe('tally()', function() {
    it('produces correct results', function() {
        assert.equal(tally([1,1,2,2,3,3], [1,2,3]).toString(), String([2,2,2]));
    });
});

// Check that tally() produces correct results
var assert = require('assert');
describe('tally()', function() {
    it('produces correct results', function() {
        assert.equal(tally(["a","b","c","a","a","b"], ["a","b","c"]).toString(), String([3,2,1]));
    });
});

// Check that tally() produces correct results
var assert = require('assert');
describe('tally()', function() {
    it('produces correct results', function() {
        assert.equal(tally([], [6,7,8,9]).toString(), String([0,0,0,0]));
    });
});

// Check that addArrays() exists
var assert = require('assert');
describe('addArrays()', function() {
    it('exists', function() {
        assert.equal(typeof addArrays, "function");
    });
});

// Check that addArray() produces correct results
var assert = require('assert');
describe('addArrays()', function() {
    it('produces correct results', function() {
        assert.equal(addArrays([1,1,1], [2,2,2]).toString(), String([3,3,3]));
    });
});

// Check that addArray() produces correct results
var assert = require('assert');
describe('addArrays()', function() {
    it('produces correct results', function() {
        assert.equal(addArrays([0], [15]).toString(), String([15]));
    });
});

// Check that addArray() produces correct results
var assert = require('assert');
describe('addArrays()', function() {
    it('produces correct results', function() {
        assert.equal(addArrays([3,4,5], [-2,-2,-2]).toString(), String([1,2,3]));
    });
});










