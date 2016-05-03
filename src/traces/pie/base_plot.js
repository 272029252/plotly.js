/**
* Copyright 2012-2016, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Plots = require('../../plots/plots');


exports.name = 'pie';

// exports.attr = 'geo';
// exports.idRoot = 'geo';
// exports.idRegex = /^geo([2-9]|[1-9][0-9]+)?$/;
// exports.attrRegex = /^geo([2-9]|[1-9][0-9]+)?$/;

exports.plot = function(gd) {
    var Pie = Plots.getModule('pie');
    var cdPie = getCdModule(gd.calcdata, Pie);

    if(cdPie.length) Pie.plot(gd, cdPie);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    if(oldFullLayout._hasPie && !newFullLayout._hasPie) {
        oldFullLayout._pielayer.selectAll('g.trace').remove();
    }
};

function getCdModule(calcdata, _module) {
    var cdModule = [];

    for(var i = 0; i < calcdata.length; i++) {
        var cd = calcdata[i];
        var trace = cd[0].trace;

        if((trace._module === _module) && (trace.visible === true)) {
            cdModule.push(cd);
        }
    }

    return cdModule;
}
