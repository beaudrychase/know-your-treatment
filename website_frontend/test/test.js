// Check that Mocha works
var assert = require('assert');
describe('Mocha', function() {
    it('works', function() {
        assert.equal(1,1);
    });
});

// Import functions used on About page
var aboutTools = require('./../app/components/aboutTools');

// Check that tally() exists
var assert = require('assert');
describe('aboutTools.tally()', function() {
    it('exists', function() {
        assert.equal(typeof aboutTools.tally, "function");
    });
});

// Check that tally() produces correct results
var assert = require('assert');
describe('aboutTools.tally()', function() {
    it('produces correct results', function() {
        assert.equal(aboutTools.tally([1,1,2,2,3,3], [1,2,3]).toString(), String([2,2,2]));
    });
});

// Check that tally() produces correct results
var assert = require('assert');
describe('aboutTools.tally()', function() {
    it('produces correct results', function() {
        assert.equal(aboutTools.tally(["a","b","c","a","a","b"], ["a","b","c"]).toString(), String([3,2,1]));
    });
});

// Check that tally() produces correct results
var assert = require('assert');
describe('aboutTools.tally()', function() {
    it('produces correct results', function() {
        assert.equal(aboutTools.tally([], [6,7,8,9]).toString(), String([0,0,0,0]));
    });
});

// Check that addArrays() exists
var assert = require('assert');
describe('aboutTools.addArrays()', function() {
    it('exists', function() {
        assert.equal(typeof aboutTools.addArrays, "function");
    });
});

// Check that addArray() produces correct results
var assert = require('assert');
describe('aboutTools.addArrays()', function() {
    it('produces correct results', function() {
        assert.equal(aboutTools.addArrays([1,1,1], [2,2,2]).toString(), String([3,3,3]));
    });
});

// Check that addArray() produces correct results
var assert = require('assert');
describe('aboutTools.addArrays()', function() {
    it('produces correct results', function() {
        assert.equal(aboutTools.addArrays([0], [15]).toString(), String([15]));
    });
});

// Check that addArray() produces correct results
var assert = require('assert');
describe('aboutTools.addArrays()', function() {
    it('produces correct results', function() {
        assert.equal(aboutTools.addArrays([3,4,5], [-2,-2,-2]).toString(), String([1,2,3]));
    });
});


