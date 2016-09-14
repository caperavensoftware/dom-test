import {expect} from 'chai';
import 'aurelia-polyfills';
import {Svg} from './../../../src/views/svg/svg';

describe('Svg Tests', function() {
    var svg;

    beforeEach(function() {
        svg = new Svg ();
    });
    
    it('constructor', function() {
        expect(svg).to.not.be.null;
    });
})