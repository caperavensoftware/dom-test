import {expect} from 'chai';
import 'aurelia-polyfills';
import {Dom} from './../../../src/views/dom/dom';

describe('Dom Tests', function() {
    var dom;

    beforeEach(function() {
        dom = new Dom ();
    });
    
    it('constructor', function() {
        expect(dom).to.not.be.null;
    });
})