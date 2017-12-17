function Matrix(V, col) {
    this.Col = col ? col : 1;
    this.V = V;
    if(V.length % col > 0)
        throw "Invalid matrix"
    
    Object.defineProperty(this,"Vals", {
        get: function () {
            return this.V;
        }
    })
}


Matrix.prototype.Mod = function (c) {
    var Vals = this.Vals;
    var fx = isNaN(c) ? c : function (v) {
        return c * v;
    };

    var New = [];

    Vals.forEach(function (v,i) {
       New.push(fx(v));
    })
    return new Matrix(New, this.Col);
}

Matrix.prototype.Mult = function (M2) {
    var V2 = M2.V;
    var R2 = Math.floor(V2.length / M2.Col);
    var C2 = M2.Col;
    var C1 = this.Col;
    if (C1 != R2)
        throw "Unmatched matrix";
    var EV = [];
    var len1 = this.V.length;
    var len2 = V2.length;
    var x1,x2,r, c, len = len1*len2,Sum = 0;
    for (var i = 0; i < len;i++) {
        x1 = Math.floor(i / len2);
        x2 = i % len2;        
        r = Math.floor(x1 / C1)
        c = x1 % C1;
        if (c == Math.floor(x2 / C2)) {
            var n = r * C2 + (x2 % C2);
            EV.length <= n ? EV.push(0) : 0;
            EV[n] += this.V[x1] * V2[x2];
        }
       
    }

    return new Matrix(EV, C2);
}

Matrix.prototype.Dims = function () {
    return [Math.floor(this.V.length/this.Col),this.Col]
}

Matrix.prototype.SumSquare = function () {    
    return this.V.reduce(function (a,b) {
        return a + b * b;
    },0)
}

Matrix.prototype.Dot = function (X) {
    var Vals = [];
    var XVals = X.Vals;
    this.Vals.forEach(function (v, i) {
        Vals.push(v * XVals[i]);
    })
    return new Matrix(Vals, this.Col);
}

Matrix.DiagMat = function (Vec) {
    var vv = Vec.Vals;
    var l = vv.length;
    var c = l;
    l *= l;
    var Vals = [];
    for (var i = 0; i < l; i++) {
        var r = Math.floor(i / c);
        var c1 = i % c;
        Vals.push(r == c1 ? vv[r] : 0);
    }
    return new Matrix(Vals, vv.length);
}

Matrix.Mult = function (A) {
    var E = A[0]
    for (var i = 1; i < A.length; i++) {
        E = E.Mult(A[i]);
    }
    return E;
}

Matrix.prototype.toString = function () {
    return this.Vals;
}

module.exports = Matrix;