import {expect} from 'chai';
import 'aurelia-polyfills';
import {Glsl} from './../../../src/views/glsl/glsl';

describe('Glsl Tests', function() {
    var glsl;

    beforeEach(function() {
        glsl = new Glsl ();
    });
    
    it('constructor', function() {
        expect(glsl).to.not.be.null;
    });
})