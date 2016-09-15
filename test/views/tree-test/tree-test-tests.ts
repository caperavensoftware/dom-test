import {expect} from 'chai';
import 'aurelia-polyfills';
import {TreeTest} from './../../../src/views/tree-test/tree-test';

describe('TreeTest Tests', function() {
    var treeTest;

    beforeEach(function() {
        treeTest = new TreeTest ();
    });
    
    it('constructor', function() {
        expect(treeTest).to.not.be.null;
    });
})