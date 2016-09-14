import {expect} from 'chai';
import 'aurelia-polyfills';
import {Canvas} from './../../../src/views/canvas/canvas';

describe('Canvas Tests', function() {
    var canvas;

    beforeEach(function() {
        canvas = new Canvas ();
    });
    
    it('constructor', function() {
        expect(canvas).to.not.be.null;
    });
})