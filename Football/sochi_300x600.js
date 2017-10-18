(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.fon = function() {
	this.initialize(img.fon);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,600);


(lib.img_1 = function() {
	this.initialize(img.img_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,268,258);


(lib.img_2 = function() {
	this.initialize(img.img_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,268,258);


(lib.logo = function() {
	this.initialize(img.logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,268,258);


(lib.myach = function() {
	this.initialize(img.myach);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,369);


(lib.noga = function() {
	this.initialize(img.noga);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,162,600);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.text3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape.setTransform(59.2,37.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAuBrIAAiwIgyAAIAAA+QgBAogDAPIgFAUQgDAJgEAGQgEAHgGAEQgFAFgGACQgMAGgRAAIgRAAIAAglIAGAAQAJAAAGgEQAHgDAFgIQAFgJACgPQADgRAAgXIAAhhICEAAIAADVg");
	this.shape_1.setTransform(38.3,37.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLANgGQAKgEAWgCQAMAAAVAGQANAGALALQAIAIAFAJQAEAIACALQACAJABANIAAAbQAAAlgDANQgCALgEAIQgFAJgIAIQgLALgNAGQgVAGgMAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAIAAAIgDQAGgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgGgDQgIgDgIAAQgHAAgIADg");
	this.shape_2.setTransform(19.4,37.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhMBrIAAjVICMAAIAAAlIhjAAIAAAsIArAAQAQAAANAEQANAFAJAJQAJAIAFAMQAEANAAAOQAAAPgEAMQgFAMgJAJQgJAJgNAFQgNAFgQAAgAgjBGIApAAQAHAAAGgDQAFgCAEgEQAIgHAAgOQAAgNgIgIQgEgEgFgCQgGgCgHAAIgpAAg");
	this.shape_3.setTransform(0.4,37.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_4.setTransform(-18.4,37.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag+BrIAAglIARAAQAIAAAGgEQAGgDADgHIAFgPIhEiTIAsAAIAsBnIAohnIArAAIhLCxQgKASgHAHQgGAFgIADQgHADgJAAg");
	this.shape_5.setTransform(-35.6,37.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgUBwIAAgaQgdgDgMgEQgIgDgIgFQgGgEgGgGQgFgFgEgHIgHgPQgEgLgBgZQAAgNAFgXIAHgPQAEgHAFgFQAGgGAGgEQAIgFAIgDQAMgEAdgDIAAgVIAoAAIAAAVQAQAAAaAHQAIADAHAFQAHAEAGAGQAFAFAEAHQAEAHACAIQAGAXAAANQgCAZgEALQgCAIgEAHQgEAHgFAFQgGAGgHAEQgHAFgIADQgaAHgQAAIAAAagAAUAzQANgBAKgDQAJgEAGgHQAGgGACgKQADgJAAgNQAAgNgDgJQgCgKgGgHQgGgGgJgEQgKgDgNgBgAgqgzQgJAEgHAGQgFAHgDAKQgCAJgBANQABANACAJQADAKAFAGQAHAHAJAEQAJADANABIAAhqQgNABgJADg");
	this.shape_6.setTransform(-56.5,36.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVg");
	this.shape_7.setTransform(71.2,1.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVg");
	this.shape_8.setTransform(50,1.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhLBrIAAjVIBRAAQARAAANAFQANAFAJAKQAJAJAFAMQAFAMAAAOQAAANgFAMQgFANgJAIQgJAJgNAFQgNAFgRAAIgoAAIAABRgAgigKIAmAAQAHAAAGgCQAGgCADgEQAEgEADgFQACgGAAgGQAAgHgCgFQgDgGgEgDQgDgEgGgDQgGgCgHAAIgmAAg");
	this.shape_9.setTransform(30.8,1.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLAOgGQAJgEAWgCQAMAAAVAGQANAGALALQAIAIAFAJQAEAIACALQACAJABANIAAAbQAAAlgDANQgCALgEAIQgFAJgIAIQgLALgNAGQgVAGgMAAQgWgDgJgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAIAAAIgDQAGgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgGgDQgIgDgIAAQgHAAgIADg");
	this.shape_10.setTransform(11,1.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_11.setTransform(-7.2,1.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_12.setTransform(-24.8,1.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVg");
	this.shape_13.setTransform(-44.9,1.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAhBrIhKhvIBEhmIAyAAIhIBkIBPBxgAhTBrIAAjVIAqAAIAADVg");
	this.shape_14.setTransform(-70.7,1.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAnBrIAAhRIgjAAIgiBRIgxAAIAshZQgIgEgHgGQgHgFgFgHQgFgHgCgJQgDgJAAgKQAAgPAGgNQAEgMAKgJQAJgJANgEQANgFAQAAIBRAAIAADVgAgMhDQgGACgEAEQgEAEgCAFQgCAGAAAGQAAAHACAFQACAGAEAEQAEAEAGACQAGACAGAAIAnAAIAAg7IgnAAQgGAAgGACg");
	this.shape_15.setTransform(104.2,-34.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_16.setTransform(86.3,-34.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhLBrIAAjVIApAAIAABRIAqAAQAPAAANAEQAMAFAJAJQAKAIAFAMQAFANAAAOQgBAPgEAMQgFAMgKAJQgJAJgMAFQgNAFgPAAgAgiBGIAmAAQAHAAAGgDQAGgCAEgEQADgDADgGQACgFAAgHQAAgGgCgGQgDgFgDgEQgEgEgGgCQgGgCgHAAIgmAAg");
	this.shape_17.setTransform(68,-34.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_18.setTransform(49.3,-34.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ag9BrIAAglIAQAAQAJAAAFgEQAGgDACgHIAHgPIhFiTIAsAAIAsBnIAohnIArAAIhLCxQgKASgHAHQgGAFgIADQgHADgJAAg");
	this.shape_19.setTransform(32.1,-34.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_20.setTransform(13.1,-34.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_21.setTransform(-6.2,-34.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAJAAAGgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgGgDgJAAQgHAAgIADg");
	this.shape_22.setTransform(-25.4,-34.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAhBrIhKhvIBEhmIAyAAIhIBkIBPBxgAhTBrIAAjVIApAAIAADVg");
	this.shape_23.setTransform(-43.3,-34.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVg");
	this.shape_24.setTransform(-64.8,-34.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AhLBrIAAjVIBRAAQAQAAAOAFQANAFAJAKQAJAJAFAMQAFAMAAAOQAAANgFAMQgFANgJAIQgJAJgNAFQgOAFgQAAIgoAAIAABRgAgigKIAmAAQAHAAAGgCQAGgCADgEQAEgEADgFQACgGAAgGQAAgHgCgFQgDgGgEgDQgDgEgGgDQgGgCgHAAIgmAAg");
	this.shape_25.setTransform(-84.1,-34.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAkBrIAAiwIhHAAIAACwIgqAAIAAjVICbAAIAADVg");
	this.shape_26.setTransform(-104.5,-34.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text3_1, new cjs.Rectangle(-120.3,-56,240.7,112), null);


(lib.text3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape.setTransform(34.9,19.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_1.setTransform(15,19.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_2.setTransform(-4.8,19.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Ah6BrIAAjVIApAAIAACwIA9AAIAAiwIApAAIAACwIA9AAIAAiwIApAAIAADVg");
	this.shape_3.setTransform(-29.1,19.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAnCGIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVgAgQhcQgJgDgHgEQgGgGgFgHQgEgJAAgMIAdAAQABAKAFAEQAEAEAIAAQAIAAAGgEQAFgEAAgKIAeAAQAAAMgFAJQgEAHgHAGQgGAEgKADQgIACgJAAQgIAAgIgCg");
	this.shape_4.setTransform(111.2,-19.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLANgGQAKgEAWgCQAMAAAVAGQANAGALALQAIAIAFAJQAEAIACALQACAJABANIAAAbQAAAlgDANQgCALgEAIQgFAJgIAIQgLALgNAGQgVAGgMAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAIAAAIgDQAGgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgGgDQgIgDgIAAQgHAAgIADg");
	this.shape_5.setTransform(91,-16.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhMBrIAAjVIBUAAQAPAAANAEQAMAEAJAIQAIAIAFALQAEALAAANQAAAPgGAMQgHALgNAHQAKAFAGAGQAHAHADAJQADAJAAAMQAAANgEAMQgFALgIAIQgJAIgMAFQgMAEgPAAgAgjBGIArAAQANAAAHgIQAIgHAAgMQAAgMgIgHQgHgHgNAAIgrAAgAgjgTIAoAAQANAAAHgHQAIgHAAgLQAAgMgIgGQgHgHgNAAIgoAAg");
	this.shape_6.setTransform(71.8,-16.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_7.setTransform(52.6,-16.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIApAAIAACIIBTiIIAlAAIAADVg");
	this.shape_8.setTransform(25.5,-16.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_9.setTransform(6.4,-16.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_10.setTransform(-11.2,-16.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Ag9BrIAAglIAQAAQAIAAAGgEQAFgDADgHIAHgPIhFiTIArAAIAsBnIAphnIArAAIhLCxQgLASgGAHQgGAFgIADQgHADgJAAg");
	this.shape_11.setTransform(-29.5,-16.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAkBrIAAiwIhHAAIAACwIgqAAIAAjVICbAAIAADVg");
	this.shape_12.setTransform(-48.5,-16.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ag+BrIAAglIARAAQAJAAAFgEQAFgDADgHIAGgPIhEiTIArAAIAsBnIAphnIArAAIhMCxQgKASgGAHQgGAFgHADQgJADgIAAg");
	this.shape_13.setTransform(-67.4,-16.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_14.setTransform(-91.7,-16.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_15.setTransform(-111.5,-16.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text3, new cjs.Rectangle(-127.3,-38.1,254.7,76.3), null);


(lib.text2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgVBrIAAgtIArAAIAAAtgAgOAoIgJiSIAvAAIgKCSg");
	this.shape.setTransform(121.9,29);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIApAAIAACIIBTiIIAlAAIAADVg");
	this.shape_1.setTransform(105.6,29);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAhBrIhKhvIBEhmIAyAAIhIBkIBPBxgAhTBrIAAjVIAqAAIAADVg");
	this.shape_2.setTransform(86.8,29);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_3.setTransform(67.3,29);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag+BrIAAglIARAAQAJAAAFgEQAFgDADgHIAGgPIhEiTIArAAIAsBnIAphnIArAAIhMCxQgKASgGAHQgGAFgHADQgJADgIAAg");
	this.shape_4.setTransform(50,29);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_5.setTransform(32.3,29);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhMBrIAAjVIBUAAQAPAAANAEQAMAEAJAIQAIAIAFALQAEALAAANQAAAPgGAMQgHALgNAHQAKAFAGAGQAHAHADAJQADAJAAAMQAAANgEAMQgFALgIAIQgJAIgMAFQgMAEgPAAgAgjBGIArAAQANAAAHgIQAIgHAAgMQAAgMgIgHQgHgHgNAAIgrAAgAgjgTIAoAAQANAAAHgHQAIgHAAgLQAAgMgIgGQgHgHgNAAIgoAAg");
	this.shape_6.setTransform(6.3,29);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAnCGIAAiIIhSCIIglAAIAAjUIAqAAIAACHIBRiHIAmAAIAADUgAgQhcQgJgDgGgEQgHgFgFgJQgEgIAAgMIAdAAQABAKAFAEQAFAFAHAAQAIAAAGgFQAFgEAAgKIAeAAQgBAMgEAIQgEAJgHAFQgGAEgKADQgHACgKAAQgIAAgIgCg");
	this.shape_7.setTransform(-21.4,26.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_8.setTransform(-40.7,29);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAuBrIAAiwIgyAAIAAA+QgBAogDAPIgFAUQgDAJgEAGQgEAHgGAEQgFAFgGACQgMAGgRAAIgRAAIAAglIAGAAQAJAAAGgEQAHgDAFgIQAFgJACgPQADgRAAgXIAAhhICEAAIAADVg");
	this.shape_9.setTransform(-61.5,29);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhMBrIAAjVICMAAIAAAlIhjAAIAAAsIArAAQAQAAANAEQANAFAJAJQAJAIAFAMQAEANAAAOQAAAPgEAMQgFAMgJAJQgJAJgNAFQgNAFgQAAgAgjBGIApAAQAHAAAGgDQAFgCAEgEQAIgHAAgOQAAgNgIgIQgEgEgFgCQgGgCgHAAIgpAAg");
	this.shape_10.setTransform(-80.1,29);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Ag+BrIAAglIARAAQAIAAAGgEQAFgDADgHIAGgPIhEiTIArAAIAsBnIAphnIArAAIhMCxQgKASgGAHQgGAFgHADQgJADgIAAg");
	this.shape_11.setTransform(-99,29);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AhLBrIAAjVIBRAAQARAAANAFQANAFAJAKQAJAJAFAMQAFAMAAAOQAAANgFAMQgFANgJAIQgJAJgNAFQgNAFgRAAIgoAAIAABRgAgigKIAmAAQAHAAAGgCQAGgCADgEQAEgEADgFQACgGAAgGQAAgHgCgFQgDgGgEgDQgDgEgGgDQgGgCgHAAIgmAAg");
	this.shape_12.setTransform(-116.4,29);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AglCgQgTgGgNgNQgOgNgHgRQgJgTAAgXIAAiJQAAgXAJgTQAHgRAOgNQANgNATgGQASgGATAAQAUAAASAGQASAGAOANQAOANAHARQAJATgBAXIAACJQABAXgJATQgHARgOANQgOANgSAGQgSAGgUAAQgTAAgSgGgAgchkQgLAMAAAVIAACIQAAAUALAMQALAMARAAQASAAALgMQALgMgBgUIAAiIQABgVgLgMQgLgMgSAAQgRAAgLAMg");
	this.shape_13.setTransform(70.7,-15.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgsCeQgSgIgLgLQgOgOgGgTQgFgOgBgVIA7AAQADAUAJAKQAKALASAAQARAAAKgLQAIgIADgNQADgLAAgRIgDgZQgCgLgEgIQgGgHgHgDQgIgEgLAAQgQAAgKAHQgJAIgDALIg3AAIAAi4IC6AAIAAA2IiDAAIAABGQAGgHANgEQAOgFAOAAQAVgBAPAHQAQAGAKAJQAJAKAGALQAGAKADAKQAGASgBAcQAAAegFASQgDALgGAJQgGAKgJAJQgMALgQAIQgUAHgXAAQgYAAgUgHg");
	this.shape_14.setTransform(46,-15.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AglCgQgSgGgNgNQgPgNgIgRQgHgTAAgXIAAiJQAAgXAHgTQAIgRAPgNQANgNASgGQASgGATAAQAVAAARAGQATAGAMANQAPANAIARQAHATABAXIAACJQgBAXgHATQgIARgPANQgMANgTAGQgRAGgVAAQgTAAgSgGgAgchkQgLAMAAAVIAACIQAAAUALAMQALAMARAAQATAAAKgMQALgMgBgUIAAiIQABgVgLgMQgLgMgSAAQgRAAgLAMg");
	this.shape_15.setTransform(20.8,-15.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AhjClIAAg2IB6iNQAJgLAEgIQAEgKAAgKQAAgTgKgLQgLgMgTAAQgQAAgKAJQgGAFgDAJQgEAIAAAMIg8AAQAAgWAIgTQAHgRAOgNQAOgMASgGQASgHAUAAQAWAAASAHQASAGAOAMQANANAHARQAIATAAAVQAAAWgKARQgGANgTAWIhbBqIB+AAIAAA2g");
	this.shape_16.setTransform(-4,-15.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgfCkIAAkOIhWAAIAAg5IDrAAIAAA5IhWAAIAAEOg");
	this.shape_17.setTransform(-40.4,-15.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgwCdQgWgIgRgRQgLgMgIgOQgGgNgEgQQgEgVAAg4IABgpQABgVACgOQAEgRAGgMQAIgOALgMQARgRAWgJQAOgGAigCQATAAAfAIQAVAJARARQALAMAIAOQAGAMADARQADAOABAVIABApQAAA4gFAVQgDAQgGANQgIAOgLAMQgRARgVAIQgfAJgTAAQgigDgOgGgAgXhoQgKAFgIAIQgIALgEARQgDASAAAtQAAAuADASQAEARAIAKQAJAJAJAEQAMAFALAAQANAAALgFQAKgEAHgJQAKgKACgRQAEgTAAgtQAAgsgEgTQgCgRgKgLQgHgIgKgFQgLgEgNAAQgLAAgMAEg");
	this.shape_18.setTransform(-68.3,-15.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text2_2, new cjs.Rectangle(-128.6,-47.9,257.3,95.9), null);


(lib.text2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape.setTransform(37.6,72.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ah6BrIAAjVIApAAIAACwIA9AAIAAiwIApAAIAACwIA9AAIAAiwIApAAIAADVg");
	this.shape_1.setTransform(14.2,72.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIApAAIAACIIBSiIIAmAAIAADVg");
	this.shape_2.setTransform(-11.1,72.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUBwIAAgaQgdgDgMgEQgIgDgIgFQgGgEgGgGQgFgFgEgHIgHgPQgEgLgBgZQAAgNAFgXIAHgPQAEgHAFgFQAGgGAGgEQAIgFAIgDQAMgEAdgDIAAgVIAoAAIAAAVQAQAAAaAHQAIADAHAFQAHAEAGAGQAFAFAEAHQAEAHADAIQAFAXAAANQgCAZgDALQgDAIgEAHQgEAHgFAFQgGAGgHAEQgHAFgIADQgaAHgQAAIAAAagAAUAzQANgBAKgDQAJgEAGgHQAGgGACgKQADgJAAgNQAAgNgDgJQgCgKgGgHQgGgGgJgEQgKgDgNgBgAgrgzQgJAEgGAGQgFAHgDAKQgCAJgBANQABANACAJQADAKAFAGQAGAHAJAEQAKADAOABIAAhqQgOABgKADg");
	this.shape_3.setTransform(-33.9,72.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_4.setTransform(90.2,37.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_5.setTransform(70.3,37.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQANAAATAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgTAGgNAAQgWgDgJgDgAgOhDQgHADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAHADQAHADAHAAQAJAAAGgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgGgDgJAAQgHAAgHADg");
	this.shape_6.setTransform(50.4,37.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVg");
	this.shape_7.setTransform(30.2,37.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AA8CCIAAgvIh2AAIAAAvIgpAAIAAhUIAVAAQAGgKAFgOQAFgNADgPQAEgVACgwIAAg3ICAAAIAACwIAYAAIAABUgAgNg9QgBApgDARQgCANgDAMIgJAYIBAAAIAAiLIguAAg");
	this.shape_8.setTransform(8.8,39.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_9.setTransform(-11.1,37.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_10.setTransform(-29.2,37.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_11.setTransform(-46.7,37.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_12.setTransform(-71.8,37.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLANgGQAKgEAWgCQAMAAAVAGQANAGALALQAIAIAFAJQAEAIACALQACAJABANIAAAbQAAAlgDANQgCALgEAIQgFAJgIAIQgLALgNAGQgVAGgMAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAIAAAIgDQAGgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgGgDQgIgDgIAAQgHAAgIADg");
	this.shape_13.setTransform(-90,37.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBRiIIAmAAIAADVg");
	this.shape_14.setTransform(94.9,1.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_15.setTransform(75.7,1.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_16.setTransform(58.2,1.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAFgIQAEgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAJAAAGgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgGgDgJAAQgHAAgIADg");
	this.shape_17.setTransform(38.9,1.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_18.setTransform(19,1.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAkBrIAAiwIhHAAIAACwIgqAAIAAjVICbAAIAADVg");
	this.shape_19.setTransform(-1.6,1.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ag+BrIAAglIARAAQAIAAAGgEQAGgDADgHIAFgPIhEiTIArAAIAsBnIAphnIArAAIhMCxQgJASgHAHQgGAFgHADQgJADgIAAg");
	this.shape_20.setTransform(-20.5,1.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_21.setTransform(-37.8,1.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_22.setTransform(-55.3,1.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgOhDQgHADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAHADQAHADAHAAQAJAAAGgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgGgDgJAAQgHAAgHADg");
	this.shape_23.setTransform(-74.6,1.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AA7CCIAAgvIh1AAIAAAvIgpAAIAAhUIAVAAQAHgKAEgOQAFgNADgPQAFgVABgwIAAg3ICAAAIAACwIAYAAIAABUgAgNg9QgBApgDARQgCANgDAMIgJAYIBAAAIAAiLIguAAg");
	this.shape_24.setTransform(-95,3.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAnCGIAAiIIhSCIIglAAIAAjVIApAAIAACIIBSiIIAmAAIAADVgAgQhcQgJgCgHgFQgHgFgDgJQgFgIgBgMIAeAAQAAAJAGAGQAEADAIAAQAJAAAEgDQAGgGABgJIAdAAQgBAMgEAIQgEAJgHAFQgHAFgIACQgIACgKAAQgIAAgIgCg");
	this.shape_25.setTransform(75.3,-36.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgOhDQgHADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAHADQAHADAHAAQAJAAAGgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgGgDgJAAQgHAAgHADg");
	this.shape_26.setTransform(55,-34.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AhMBrIAAjVIBUAAQAPAAANAEQAMAEAJAIQAIAIAFALQAEALAAANQAAAPgGAMQgHALgNAHQAKAFAGAGQAHAHADAJQADAJAAAMQAAANgEAMQgFALgIAIQgJAIgMAFQgMAEgPAAgAgjBGIArAAQANAAAHgIQAIgHAAgMQAAgMgIgHQgHgHgNAAIgrAAgAgjgTIAoAAQANAAAHgHQAIgHAAgLQAAgMgIgGQgHgHgNAAIgoAAg");
	this.shape_27.setTransform(35.9,-34.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAMAAAVAGQANAGALALQAIAIAEAJQAFAIACALQACAJABANIAAAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgNAGQgVAGgMAAQgWgDgJgDgAgOhDQgHADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAHADQAHADAHAAQAIAAAHgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgHgDgIAAQgHAAgHADg");
	this.shape_28.setTransform(16,-34.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AhCBrIAAjVICFAAIAAAlIhcAAIAACwg");
	this.shape_29.setTransform(-1.1,-34.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_30.setTransform(-20,-34.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("Ah6BrIAAjVIApAAIAACwIA9AAIAAiwIApAAIAACwIA9AAIAAiwIApAAIAADVg");
	this.shape_31.setTransform(-44.3,-34.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AhMBrIAAjVIBUAAQAPAAANAEQAMAEAJAIQAIAIAFALQAEALAAANQAAAPgGAMQgHALgNAHQAKAFAGAGQAHAHADAJQADAJAAAMQAAANgEAMQgFALgIAIQgJAIgMAFQgMAEgPAAgAgjBGIArAAQANAAAHgIQAIgHAAgMQAAgMgIgHQgHgHgNAAIgrAAgAgjgTIAoAAQANAAAHgHQAIgHAAgLQAAgMgIgGQgHgHgNAAIgoAAg");
	this.shape_32.setTransform(-75.6,-34.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_33.setTransform(94.7,-69.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBRiIIAmAAIAADVg");
	this.shape_34.setTransform(74.6,-69.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_35.setTransform(53.7,-69.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_36.setTransform(33.9,-69.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AhMBrIAAjVIBUAAQAPAAANAEQAMAEAJAIQAIAIAFALQAEALAAANQAAAPgGAMQgHALgNAHQAKAFAGAGQAHAHADAJQADAJAAAMQAAANgEAMQgFALgIAIQgJAIgMAFQgMAEgPAAgAgjBGIArAAQANAAAHgIQAIgHAAgMQAAgMgIgHQgHgHgNAAIgrAAgAgjgTIAoAAQANAAAHgHQAIgHAAgLQAAgMgIgGQgHgHgNAAIgoAAg");
	this.shape_37.setTransform(14.9,-69.9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVg");
	this.shape_38.setTransform(-5.9,-69.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("ABdBrIhHhvIBAhmIAyAAIhGBkIBNBxgAgUBrIAAjVIApAAIAADVgAiOBrIBNhxIhGhkIAyAAIBBBmIhIBvg");
	this.shape_39.setTransform(-30.6,-69.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgOhDQgHADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAHADQAHADAHAAQAJAAAGgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgGgDgJAAQgHAAgHADg");
	this.shape_40.setTransform(-54.3,-69.9);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AhLBrIAAjVIBRAAQARAAANAFQANAFAJAKQAJAJAFAMQAEAMABAOQgBANgEAMQgFANgJAIQgJAJgNAFQgNAFgRAAIgoAAIAABRgAgigKIAmAAQAHAAAGgCQAFgCAEgEQAFgEACgFQACgGAAgGQAAgHgCgFQgCgGgFgDQgEgEgFgDQgGgCgHAAIgmAAg");
	this.shape_41.setTransform(-72.6,-69.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAkBrIAAiwIhHAAIAACwIgqAAIAAjVICbAAIAADVg");
	this.shape_42.setTransform(-93.1,-69.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text2_1, new cjs.Rectangle(-112.3,-91.6,224.7,183.3), null);


(lib.text2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgVA/IAAgtIArAAIAAAtgAgVgSIAAgsIArAAIAAAsg");
	this.shape.setTransform(71.6,23.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAnBrIAAhRIgjAAIgiBRIgxAAIAshZQgIgEgHgGQgHgFgFgHQgFgHgCgJQgDgJAAgKQAAgPAGgNQAEgMAKgJQAJgJANgEQANgFAQAAIBRAAIAADVgAgMhDQgGACgEAEQgEAEgCAFQgCAGAAAGQAAAHACAFQACAGAEAEQAEAEAGACQAGACAGAAIAnAAIAAg7IgnAAQgGAAgGACg");
	this.shape_1.setTransform(56.1,19.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhMBrIAAjVICMAAIAAAlIhjAAIAAAsIArAAQAQAAANAEQANAFAJAJQAJAIAFAMQAEANAAAOQAAAPgEAMQgFAMgJAJQgJAJgNAFQgNAFgQAAgAgjBGIApAAQAHAAAGgDQAFgCAEgEQAIgHAAgOQAAgNgIgIQgEgEgFgCQgGgCgHAAIgpAAg");
	this.shape_2.setTransform(37.7,19.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_3.setTransform(18.9,19.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUBrIAAiwIg4AAIAAglICZAAIAAAlIg4AAIAACwg");
	this.shape_4.setTransform(0.8,19.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAnBrIAAhRIgjAAIgiBRIgxAAIAshZQgIgEgHgGQgHgFgFgHQgFgHgCgJQgDgJAAgKQAAgPAGgNQAEgMAKgJQAJgJANgEQANgFAQAAIBRAAIAADVgAgMhDQgGACgEAEQgEAEgCAFQgCAGAAAGQAAAHACAFQACAGAEAEQAEAEAGACQAGACAGAAIAnAAIAAg7IgnAAQgGAAgGACg");
	this.shape_5.setTransform(-25.2,19.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAuBrIAAiwIgyAAIAAA+QgBAogDAPIgFAUQgDAJgEAGQgEAHgGAEQgFAFgGACQgMAGgRAAIgRAAIAAglIAGAAQAJAAAGgEQAHgDAFgIQAFgJACgPQADgRAAgXIAAhhICEAAIAADVg");
	this.shape_6.setTransform(-45.5,19.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AA8CDIAAgwIh2AAIAAAwIgpAAIAAhVIAVAAQAGgKAFgOQAFgNADgPQAEgVACgwIAAg2ICAAAIAACvIAYAAIAABVgAgNg+QgBApgDATQgCANgDAMIgJAXIBBAAIAAiKIgvAAg");
	this.shape_7.setTransform(-65.5,21.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAFAJQAEAIACALQACAJABANIAAAbQAAAlgDANQgCALgEAIQgFAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAIAAAIgDQAGgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgGgDQgIgDgIAAQgHAAgIADg");
	this.shape_8.setTransform(89.4,-16.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_9.setTransform(69.5,-16.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhLBrIAAjVIApAAIAABRIApAAQAQAAANAEQANAFAJAJQAJAIAFAMQAFANAAAOQgBAPgFAMQgEAMgJAJQgJAJgNAFQgNAFgQAAgAgiBGIAmAAQAHAAAGgDQAGgCADgEQAEgDADgGQACgFAAgHQAAgGgCgGQgDgFgEgEQgDgEgGgCQgGgCgHAAIgmAAg");
	this.shape_10.setTransform(50.6,-16.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAuBrIAAiwIgyAAIAAA+QgBAogDAPIgFAUQgDAJgEAGQgEAHgGAEQgFAFgGACQgMAGgRAAIgRAAIAAglIAGAAQAJAAAGgEQAHgDAFgIQAFgJACgPQADgRAAgXIAAhhICEAAIAADVg");
	this.shape_11.setTransform(29.1,-16.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_12.setTransform(10.3,-16.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIApAAIAACIIBSiIIAmAAIAADVg");
	this.shape_13.setTransform(-9.8,-16.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAyCCIAAgvIiLAAIAAjVIApAAIAACwIBIAAIAAiwIApAAIAACwIAZAAIAABUg");
	this.shape_14.setTransform(-30.2,-14);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_15.setTransform(-50.4,-16.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAkBrIAAiwIhHAAIAACwIgqAAIAAjVICbAAIAADVg");
	this.shape_16.setTransform(-70.2,-16.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_17.setTransform(-89.4,-16.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text2, new cjs.Rectangle(-104.6,-38.1,209.2,76.3), null);


(lib.text_b2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRBWIAAgkIAjAAIAAAkgAgLAgIgHh0IAlAAIgIB0g");
	this.shape.setTransform(93,1.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYBSQgMgEgIgJQgHgGgDgIQgEgGgBgIQgDgMAAgdIABgVIACgSQABgJAEgHQADgGAHgHQAIgJAMgEQAHgDARgCQAMAAAKADQALAEAIAHQAIAGAGAKQAGALACANIgiAAQgDgLgGgGQgEgDgFgCQgEgCgHAAQgFAAgGACQgGACgDAFQgFAGgBAJQgCAJgBAXQABAYACAKQABAIAFAHQADAEAGACQAGACAFAAQAHAAAEgCQAFgBAEgEQAGgGADgLIAiAAQgCANgGALQgGAJgIAHQgIAHgLAEQgKADgMAAQgRgCgHgDg");
	this.shape_1.setTransform(81.2,1.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AApBWIgKgfIg8AAIgKAfIgjAAIA+iqIAZAAIA/CqgAAWAbIgWg9IgUA9IAqAAg");
	this.shape_2.setTransform(65.9,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAbBWIAAhAQgZAEgSAAQgIAAgHgCQgIgDgHgFQgGgFgEgIQgDgIAAgJIAAhGIAhAAIAAA9QAAAFACAFQACADACACQAGAFAKAAQANAAASgEIAAhNIAhAAIAACqg");
	this.shape_3.setTransform(50.2,1.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAfBrIAAhsIhBBsIgeAAIAAiqIAiAAIAABtIBBhtIAeAAIAACqgAgNhKQgHgBgFgEQgGgEgDgHQgDgHgBgJIAYAAQAAAIAFADQADAEAGAAQAHAAAEgEQAEgDABgIIAXAAQAAAJgEAHQgDAHgGAEQgFAEgHABQgGACgIAAQgGAAgHgCg");
	this.shape_4.setTransform(34.2,-1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag3BWIAAiqIBvAAIAAAdIhOAAIAAApIBCAAIAAAdIhCAAIAAAoIBOAAIAAAfg");
	this.shape_5.setTransform(18.9,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgZBSQgKgEgKgJQgGgGgDgIQgEgGgCgIQgCgMAAgdIAAgVIACgSQACgJAEgHQADgGAGgHQAKgJAKgEQAIgDARgCQAMAAALADQAKAEAIAHQAIAGAGAKQAFALADANIgiAAQgDgLgHgGQgDgDgFgCQgFgCgGAAQgFAAgGACQgGACgDAFQgFAGgBAJQgCAJAAAXQAAAYACAKQABAIAFAHQADAEAGACQAGACAFAAQAGAAAFgCQAFgBADgEQAIgGACgLIAiAAQgDANgFALQgGAJgIAHQgIAHgKAEQgLADgMAAQgRgCgIgDg");
	this.shape_6.setTransform(4.1,1.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgZBSQgLgEgJgJQgGgGgEgIQgDgGgCgIQgCgMAAgdIAAgVIACgSQACgJADgHQAEgGAGgHQAJgJALgEQAIgDARgCQAKAAAQAFQALAEAJAJQAGAHAEAGQADAHACAJIACASIAAAVQAAAdgCAMQgCAIgDAGQgEAIgGAGQgJAJgLAEQgQAFgKAAQgRgCgIgDgAgLg2QgGADgEAEQgEAGgCAJQgCAJAAAXQAAAYACAKQACAJAEAFQAEAEAGACQAFADAGAAQAHAAAFgDQAGgCADgEQAFgGACgIQACgKAAgYQAAgXgCgJQgCgJgFgGQgDgEgGgDQgFgCgHAAQgGAAgFACg");
	this.shape_7.setTransform(-16.9,1.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAsBWIAAhjIggBAIgWAAIghhAIAABjIghAAIAAiqIAhAAIArBbIAthbIAgAAIAACqg");
	this.shape_8.setTransform(-34.3,1.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAfBWIAAhBIgbAAIgcBBIgnAAIAjhHQgHgDgFgFQgFgFgEgFQgEgGgCgHQgCgHAAgIQAAgMAEgKQAEgKAIgHQAHgHAKgEQALgDAMAAIBBAAIAACqgAgJg2QgFACgDAEQgDADgCAEQgCAEAAAGQAAAFACAEQACAFADADQADADAFACQAEABAFAAIAfAAIAAgvIgfAAQgFAAgEABg");
	this.shape_9.setTransform(-52.5,1.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("Ag8BWIAAiqIBBAAQANgBALAFQAKAEAHAIQAIAHAEAJQADAKAAALQAAALgDAKQgEAJgIAHQgHAHgKAEQgLAEgNAAIggAAIAABBgAgbgIIAeAAQAGAAAEgCQAFgBADgDIAFgHQACgFAAgFQAAgFgCgEQgCgFgDgDQgDgDgFgCQgEgBgGgBIgeAAg");
	this.shape_10.setTransform(-66.6,1.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAdBWIAAiNIg5AAIAACNIghAAIAAiqIB7AAIAACqg");
	this.shape_11.setTransform(-82.9,1.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text_b2, new cjs.Rectangle(-101.5,-16.6,203,33.3), null);


(lib.text_b1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAdBWIAAhIIg5AAIAABIIghAAIAAiqIAhAAIAABGIA5AAIAAhGIAhAAIAACqg");
	this.shape.setTransform(105.7,1.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAfBrIAAhsIhBBsIgeAAIAAiqIAiAAIAABtIBBhtIAeAAIAACqgAgNhKQgHgBgFgEQgGgEgDgHQgDgHgBgJIAYAAQAAAIAFADQADAEAGAAQAHAAAEgEQAEgDABgIIAXAAQAAAJgEAHQgDAHgGAEQgFAEgHABQgGACgIAAQgGAAgHgCg");
	this.shape_1.setTransform(89,-1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAoBWIgJgfIg8AAIgLAfIgjAAIA/iqIAZAAIA/CqgAAWAbIgVg9IgVA9IAqAAg");
	this.shape_2.setTransform(72.9,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAlBWIAAiNIgoAAIAAAyQgBAggCAMIgEAPQgDAHgDAGQgDAFgFAEIgJAFQgJAFgOAAIgNAAIAAgfIAFAAQAHAAAEgCQAGgDAEgGQAEgHACgNQACgNAAgSIAAhNIBpAAIAACqg");
	this.shape_3.setTransform(56.2,1.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAdBWIAAhIIg5AAIAABIIghAAIAAiqIAhAAIAABGIA5AAIAAhGIAhAAIAACqg");
	this.shape_4.setTransform(40.6,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgZBSQgLgEgJgJQgGgGgEgIQgDgGgCgIQgCgMAAgdIAAgVIACgSQACgJADgHQAEgGAGgHQAJgJALgEQAIgDARgCQAKAAAQAFQALAEAJAJQAGAHAEAGQADAHACAJIACASIAAAVQAAAdgCAMQgCAIgDAGQgEAIgGAGQgJAJgLAEQgQAFgKAAQgRgCgIgDgAgLg2QgGADgEAEQgEAGgCAJQgCAJAAAXQAAAYACAKQACAJAEAFQAEAEAGACQAFADAGAAQAHAAAFgDQAGgCADgEQAFgGACgIQACgKAAgYQAAgXgCgJQgCgJgFgGQgDgEgGgDQgFgCgHAAQgGAAgFACg");
	this.shape_5.setTransform(24.7,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAfBrIAAhsIhBBsIgeAAIAAiqIAiAAIAABtIBBhtIAeAAIAACqgAgNhKQgHgBgFgEQgGgEgDgHQgDgHgBgJIAYAAQAAAIAFADQADAEAGAAQAHAAAEgEQAEgDABgIIAXAAQAAAJgEAHQgDAHgGAEQgFAEgHABQgGACgIAAQgGAAgHgCg");
	this.shape_6.setTransform(3,-1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgxBWIAAgfIANAAQAHAAAEgCQAFgDACgFIAFgMIg3h1IAjAAIAjBSIAghSIAjAAIg9CNQgIAPgFAFQgFAEgFACQgHACgHABg");
	this.shape_7.setTransform(-12.4,1.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Ag8BWIAAiqIBBAAQANgBALAFQAKAEAHAIQAIAHAEAJQADAKAAALQAAALgDAKQgEAJgIAHQgHAHgKAEQgLAEgNAAIggAAIAABBgAgbgIIAeAAQAGAAAEgCQAFgBADgDIAFgHQACgFAAgFQAAgFgCgEQgCgFgDgDQgDgDgFgCQgEgBgGgBIgeAAg");
	this.shape_8.setTransform(-26.3,1.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAfBWIAAhtIhBBtIgeAAIAAiqIAiAAIAABsIBBhsIAeAAIAACqg");
	this.shape_9.setTransform(-42.9,1.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAdBWIAAhIIg5AAIAABIIghAAIAAiqIAhAAIAABGIA5AAIAAhGIAhAAIAACqg");
	this.shape_10.setTransform(-59.5,1.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgZBSQgLgEgJgJQgGgGgEgIQgDgGgCgIQgCgMAAgdIAAgVIACgSQACgJADgHQAEgGAGgHQAJgJALgEQAIgDARgCQAKAAAQAFQALAEAJAJQAGAHAEAGQADAHACAJIACASIAAAVQAAAdgCAMQgCAIgDAGQgEAIgGAGQgJAJgLAEQgQAFgKAAQgRgCgIgDgAgLg2QgGADgEAEQgEAGgCAJQgCAJAAAXQAAAYACAKQACAJAEAFQAEAEAGACQAFADAGAAQAHAAAFgDQAGgCADgEQAFgGACgIQACgKAAgYQAAgXgCgJQgCgJgFgGQgDgEgGgDQgFgCgHAAQgGAAgFACg");
	this.shape_11.setTransform(-75.5,1.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag8BWIAAiqIBBAAQANgBALAFQAKAEAHAIQAIAHAEAJQADAKAAALQAAALgDAKQgEAJgIAHQgHAHgKAEQgLAEgNAAIggAAIAABBgAgbgIIAeAAQAGAAAEgCQAFgBADgDIAFgHQACgFAAgFQAAgFgCgEQgCgFgDgDQgDgDgFgCQgEgBgGgBIgeAAg");
	this.shape_12.setTransform(-90.1,1.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ag9BWIAAiqIBwAAIAAAdIhOAAIAAAjIAiAAQAMAAAKAEQAKAEAIAHQAHAGAEAJQAEAKAAAMQAAAMgEAJQgEALgHAGQgHAIgLADQgKAFgMAAgAgbA3IAgAAQAFAAAFgBQAEgBADgDQAGgHAAgLQAAgKgGgHQgDgDgEgCQgFgCgFAAIggAAg");
	this.shape_13.setTransform(-105.7,1.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text_b1, new cjs.Rectangle(-115.9,-16.6,231.9,33.3), null);


(lib.Symbol8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.img_1();
	this.instance.parent = this;
	this.instance.setTransform(-134,-129);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(-134,-129,268,258), null);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.img_2();
	this.instance.parent = this;
	this.instance.setTransform(-134,-129);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(-134,-129,268,258), null);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.logo();
	this.instance.parent = this;
	this.instance.setTransform(-134,-129);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(-134,-129,268,258), null);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTBsIAAgoIApAAIAAAogAgSApIAAgJQAAgKAEgHQACgGAGgIIAWgcQAIgLAAgJQAAgLgHgHQgGgHgLAAQgLAAgGAIQgHAGABALIgnAAQAAgNAFgMQAFgLAIgIQAJgHAMgEQAKgFANAAQANAAALAEQALAEAJAIQAJAIAFALQAFALAAAOQAAALgEAKQgEAHgGAKIgXAcQgFAHAAAJIAAAGg");
	this.shape.setTransform(87.1,1.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAnBrIAAhRIgjAAIgiBRIgxAAIAshZQgIgEgHgGQgHgFgFgHQgFgHgCgJQgDgJAAgKQAAgPAGgNQAEgMAKgJQAJgJANgEQANgFAQAAIBRAAIAADVgAgMhDQgGACgEAEQgEAEgCAFQgCAGAAAGQAAAHACAFQACAGAEAEQAEAEAGACQAGACAGAAIAnAAIAAg7IgnAAQgGAAgGACg");
	this.shape_1.setTransform(68.3,1.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_2.setTransform(49,1.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAEBnQgMgGgLgLQgHgGgEgIQgFgHgCgJQgDgLgBgcIggAAIAABaIgqAAIAAjVIAqAAIAABXIAgAAQAAgYAEgNQADgJAEgGQAEgIAHgGQALgLAMgGQAKgEAXgCQAMAAAUAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgUAGgMAAQgXgDgKgDgAAVhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAIAAQAIAAAHgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgHgDgIAAQgIAAgIADg");
	this.shape_3.setTransform(25.4,1.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIApAAIAACIIBSiIIAmAAIAADVg");
	this.shape_4.setTransform(0.8,1.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgmBsIAshYQgGACgJAAQgLAAgKgEQgKgEgIgIQgIgIgFgLQgFgNAAgOQAAgPAGgNQAEgMAKgJQAJgJAMgEQAMgFANAAQAOAAANAFQAMAEAJAJQAJAIAFAMQAFANAAAPQAAAOgFAPIgNAbIgtBdgAgTg/QgDAEgCAFQgCAGAAAIQAAAHACAGQACAFADAEQAIAJALAAQAMAAAIgIQAEgEACgGQACgGAAgHQAAgIgCgGQgCgFgEgEQgIgJgMAAQgLAAgIAJg");
	this.shape_5.setTransform(-24.8,1.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhABsIAAgjIBPhcQAGgHADgGQACgGAAgHQAAgMgHgHQgGgIgNAAQgJAAgIAGQgEAEgCAFQgCAFAAAIIgnAAQAAgPAFgLQAFgMAJgIQAJgIALgEQANgFAMAAQAOAAANAFQALAEAJAIQAIAIAGAMQAEALAAAOQAAAPgGALQgEAJgMANIg8BGIBSAAIAAAjg");
	this.shape_6.setTransform(-41,1.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgtASIAAgjIBbAAIAAAjg");
	this.shape_7.setTransform(-55.6,3.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgmBsIAshYQgGACgJAAQgLAAgKgEQgKgEgIgIQgIgIgFgLQgFgNAAgOQAAgPAGgNQAEgMAKgJQAJgJAMgEQAMgFANAAQAOAAANAFQAMAEAJAJQAJAIAFAMQAFANAAAPQAAAOgFAPIgNAbIgtBdgAgTg/QgDAEgCAFQgCAGAAAIQAAAHACAGQACAFADAEQAIAJALAAQAMAAAIgIQAEgEACgGQACgGAAgHQAAgIgCgGQgCgFgEgEQgIgJgMAAQgLAAgIAJg");
	this.shape_8.setTransform(-70.1,1.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AACBrIAAirIgqAmIAAgqIAqgmIAnAAIAADVg");
	this.shape_9.setTransform(-87.3,1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(-96.5,-20.3,193.1,40.7), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBRiIIAmAAIAADVg");
	this.shape.setTransform(42,1.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAiBrIAAhQQggAFgVAAQgLAAgJgDQgKgDgIgGQgIgHgEgKQgFgJAAgNIAAhXIAqAAIAABNQAAAGACAGQACAEADADQAHAGAMAAQASAAAWgEIAAhiIApAAIAADVg");
	this.shape_1.setTransform(21.4,1.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAEAJQAFAIACALQACAJAAANIABAbQAAAlgDANQgCALgFAIQgEAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgOhDQgHADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAHADQAHADAHAAQAJAAAGgDQAHgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgHgDQgGgDgJAAQgHAAgHADg");
	this.shape_2.setTransform(2.4,1.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgfBnQgOgGgLgLQgIgIgEgJQgFgIgCgLQgDgNAAglIABgbQAAgNACgJQACgLAFgIQAEgJAIgIQALgLAOgGQAJgEAWgCQAPAAANAFQANAEALAIQAKAJAHANQAHAMADARIgrAAQgDgOgJgIQgEgEgGgCQgGgCgIAAQgHAAgHADQgHACgEAGQgGAHgDALQgCAMAAAdQAAAeACAMQADALAGAHQAEAGAHACQAHADAHAAQAIAAAGgCQAGgCAFgEQAIgIADgOIArAAQgDARgHAMQgHANgLAJQgKAIgNAEQgNAFgPAAQgWgDgJgDg");
	this.shape_3.setTransform(-16.3,1.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhMBrIAAjVIBUAAQAPAAANAEQAMAEAJAIQAIAIAFALQAEALAAANQAAAPgGAMQgHALgNAHQAKAFAGAGQAHAHADAJQADAJAAAMQAAANgEAMQgFALgIAIQgJAIgMAFQgMAEgPAAgAgjBGIArAAQANAAAHgIQAIgHAAgMQAAgMgIgHQgHgHgNAAIgrAAgAgjgTIAoAAQANAAAHgHQAIgHAAgLQAAgMgIgGQgHgHgNAAIgoAAg");
	this.shape_4.setTransform(-42.3,1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-54.6,-20.3,109.3,40.7), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAnCGIAAiIIhSCIIglAAIAAjUIAqAAIAACHIBSiHIAlAAIAADUgAgQhcQgJgDgHgEQgHgFgEgJQgEgIAAgMIAdAAQABAKAFAEQAEAFAIAAQAJAAAEgFQAGgEAAgKIAeAAQAAAMgFAIQgEAJgHAFQgGAEgJADQgJACgJAAQgIAAgIgCg");
	this.shape.setTransform(110.7,-1.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAnBrIAAiIIhSCIIglAAIAAjVIAqAAIAACIIBSiIIAlAAIAADVg");
	this.shape_1.setTransform(89.5,1.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAyCDIAAgwIiLAAIAAjUIApAAIAACvIBIAAIAAivIApAAIAACvIAZAAIAABVg");
	this.shape_2.setTransform(69.1,3.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_3.setTransform(48,1.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhMBrIAAjVIBSAAQAQAAAOAFQANAFAJAKQAJAJAFAMQAEAMAAAOQAAANgEAMQgFANgJAIQgJAJgNAFQgOAFgQAAIgoAAIAABRgAgigKIAmAAQAHAAAGgCQAFgCAFgEQAEgEACgFQACgGAAgGQAAgHgCgFQgCgGgEgDQgFgEgFgDQgGgCgHAAIgmAAg");
	this.shape_4.setTransform(29.8,1.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_5.setTransform(11,1.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AA8CDIAAgwIh2AAIAAAwIgpAAIAAhVIAVAAQAGgKAFgOQAFgNADgPQAEgVACgwIAAg2ICAAAIAACvIAYAAIAABVgAgNg+QgBAqgDASQgCANgDAMIgJAXIBBAAIAAiKIgvAAg");
	this.shape_6.setTransform(-9.3,3.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_7.setTransform(-28.3,1.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUBwIAAgaQgegDgLgEQgJgDgGgFQgIgEgFgGQgFgFgFgHIgGgPQgDgLgCgZQAAgNAFgXIAGgPQAFgHAFgFQAFgGAIgEQAGgFAJgDQALgEAegDIAAgVIApAAIAAAVQAPAAAZAHQAJADAHAFQAHAEAFAGQAGAFAEAHQAEAHACAIQAGAXAAANQgCAZgEALQgCAIgEAHQgEAHgGAFQgFAGgHAEQgHAFgJADQgZAHgPAAIAAAagAAUAzQANgBAKgDQAJgEAGgHQAGgGADgKQACgJAAgNQAAgNgCgJQgDgKgGgHQgGgGgJgEQgKgDgNgBgAgqgzQgKAEgGAGQgFAHgDAKQgDAJABANQgBANADAJQADAKAFAGQAGAHAKAEQAJADANABIAAhqQgNABgJADg");
	this.shape_8.setTransform(-49.9,1.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_9.setTransform(-72.5,1.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLANgGQAKgEAWgCQANAAATAGQAOAGALALQAIAIAFAJQAEAIACALQACAJABANIAAAbQAAAlgDANQgCALgEAIQgFAJgIAIQgLALgOAGQgTAGgNAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAIAAAIgDQAGgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgGgDQgIgDgIAAQgHAAgIADg");
	this.shape_10.setTransform(-92.4,1.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAhBrIhKhvIBEhmIAyAAIhIBkIBPBxgAhTBrIAAjVIApAAIAADVg");
	this.shape_11.setTransform(-110.3,1.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-123.3,-20.3,246.6,40.7), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAhBrIhKhvIBEhmIAyAAIhIBkIBPBxgAhTBrIAAjVIApAAIAADVg");
	this.shape.setTransform(62.4,1.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AggBnQgNgGgLgLQgIgIgFgJQgEgIgCgLQgDgNAAglIAAgbQABgNACgJQACgLAEgIQAFgJAIgIQALgLANgGQAKgEAWgCQAMAAAVAGQANAGALALQAIAIAFAJQAEAIACALQACAJABANIAAAbQAAAlgDANQgCALgEAIQgFAJgIAIQgLALgNAGQgVAGgMAAQgWgDgKgDgAgPhDQgGADgFAFQgGAHgCALQgCAMAAAdQAAAeACAMQACALAGAHQAFAFAGADQAIADAHAAQAIAAAIgDQAGgDAFgFQAGgHACgLQACgNAAgdQAAgdgCgMQgCgLgGgHQgFgFgGgDQgIgDgIAAQgHAAgIADg");
	this.shape_1.setTransform(41.8,1.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhMBrIAAjVICMAAIAAAlIhjAAIAAAsIArAAQAQAAANAEQANAFAJAJQAJAIAFAMQAEANAAAOQAAAPgEAMQgFAMgJAJQgJAJgNAFQgNAFgQAAgAgjBGIApAAQAHAAAGgDQAFgCAEgEQAIgHAAgOQAAgNgIgIQgEgEgFgCQgGgCgHAAIgpAAg");
	this.shape_2.setTransform(22.8,1.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Ag+BrIAAglIARAAQAIAAAGgEQAFgDAEgHIAFgPIhEiTIAsAAIAsBnIAohnIArAAIhMCxQgJASgHAHQgGAFgIADQgIADgIAAg");
	this.shape_3.setTransform(3.9,1.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAhBrIhKhvIBEhmIAyAAIhIBkIBPBxgAhTBrIAAjVIApAAIAADVg");
	this.shape_4.setTransform(-13.1,1.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAzBrIgNgmIhLAAIgNAmIgrAAIBNjVIAgAAIBODVgAAbAiIgahNIgaBNIA0AAg");
	this.shape_5.setTransform(-40.5,1.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAkBrIAAhaIhHAAIAABaIgqAAIAAjVIAqAAIAABXIBHAAIAAhXIAqAAIAADVg");
	this.shape_6.setTransform(-60.4,1.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-76.2,-20.3,152.4,40.7), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhLBrIAAjVIApAAIAABRIAqAAQAPAAANAEQANAFAJAJQAJAIAFAMQAFANAAAOQgBAPgFAMQgEAMgJAJQgJAJgNAFQgNAFgPAAgAgiBGIAmAAQAHAAAGgDQAGgCADgEQAEgDADgGQACgFAAgHQAAgGgCgGQgDgFgEgEQgDgEgGgCQgGgCgHAAIgmAAg");
	this.shape.setTransform(44.3,1.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ah6BrIAAjVIApAAIAACwIA9AAIAAiwIApAAIAACwIA9AAIAAiwIApAAIAADVg");
	this.shape_1.setTransform(19.3,1.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_2.setTransform(-4.1,1.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AA7CCIAAgvIh1AAIAAAvIgoAAIAAhUIAUAAQAGgKAFgOQAFgNADgPQAFgVACgwIAAg3IB/AAIAACwIAZAAIAABUgAgNg9QgBApgDARQgCANgEAMIgJAYIBCAAIAAiLIgvAAg");
	this.shape_3.setTransform(-24.4,3.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhFBrIAAjVICLAAIAAAlIhiAAIAAAyIBUAAIAAAlIhUAAIAAA0IBiAAIAAAlg");
	this.shape_4.setTransform(-43.4,1.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(-55,-20.3,110,40.7), null);


(lib.noga_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.noga();
	this.instance.parent = this;
	this.instance.setTransform(154.9,-269.4,1,1,45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.noga_1, new cjs.Rectangle(-269.4,-269.4,538.8,538.8), null);


(lib.mayz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.myach();
	this.instance.parent = this;
	this.instance.setTransform(-184.5,-184.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.mayz, new cjs.Rectangle(-184.5,-184.5,369,369), null);


(lib.flash_ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["rgba(255,255,255,0.737)","rgba(255,255,255,0)"],[0,1],0,0,0,0,0,15.5).s().p("AhsBsQgsgsAAhAQAAg+AsguQAugsA+AAQBAAAAsAsQAtAuAAA+QAABAgtAsQgsAthAAAQg+AAgugtg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.flash_, new cjs.Rectangle(-15.3,-15.3,30.6,30.6), null);


(lib.BTN = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(1,1,1,3,true).p("EgXbgu3MAu3AAAMAAABdvMgu3AAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1C45B2").s().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.text1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_14 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(14).call(this.frame_14).wait(1));

	// Layer 1
	this.instance = new lib.Symbol1();
	this.instance.parent = this;
	this.instance.setTransform(-178.9,-71.3);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:10,alpha:1},6).to({x:0},3,cjs.Ease.get(1)).wait(6));

	// ЕДЕШЬ  НА КУБОК  КОНФЕДЕРАЦИЙ  В СОЧИ  19-29 ИЮНЯ?
	this.instance_1 = new lib.Symbol2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-157.7,-35.3);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).to({x:10,alpha:1},6).to({x:0},3,cjs.Ease.get(1)).wait(5));

	// ЕДЕШЬ  НА КУБОК  КОНФЕДЕРАЦИЙ  В СОЧИ  19-29 ИЮНЯ?
	this.instance_2 = new lib.Symbol3();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-110.6,0.7);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3).to({_off:false},0).to({x:10,alpha:1},6).to({x:0},2,cjs.Ease.get(1)).wait(4));

	// ЕДЕШЬ  НА КУБОК  КОНФЕДЕРАЦИЙ  В СОЧИ  19-29 ИЮНЯ?
	this.instance_3 = new lib.Symbol4();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-179.3,35.7);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({_off:false},0).to({x:10,alpha:1},6).to({x:0},2,cjs.Ease.get(1)).wait(3));

	// ЕДЕШЬ  НА КУБОК  КОНФЕДЕРАЦИЙ  В СОЧИ  19-29 ИЮНЯ?
	this.instance_4 = new lib.Symbol5();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-137.4,71.7);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(6).to({_off:false},0).to({x:10,alpha:1},6).to({x:0},2,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233.9,-91.6,110,40.7);


(lib._img = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_4 = function() {
		this.stop()
	}
	this.frame_9 = function() {
		this.stop()
	}
	this.frame_14 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(4).call(this.frame_4).wait(5).call(this.frame_9).wait(5).call(this.frame_14).wait(1));

	// logo.jpg
	this.instance = new lib.Symbol6();
	this.instance.parent = this;
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(10).to({_off:false},0).to({alpha:1},4).wait(1));

	// img_2.jpg
	this.instance_1 = new lib.Symbol7();
	this.instance_1.parent = this;
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5).to({_off:false},0).to({alpha:1},4).wait(6));

	// img_1.jpg
	this.instance_2 = new lib.Symbol8();
	this.instance_2.parent = this;
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({alpha:1},4).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134,-129,268,258);


(lib.flash_12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHAMIAAgXIAPAAIAAAXg");

	this.instance = new lib.flash_();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.flash_12, new cjs.Rectangle(-15.3,-15.3,30.6,30.6), null);


(lib.flash = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.dg=Math.random() * (1000 - 100) + 100;
		
		this.stop();
		var _this=this;
		setTimeout(function(){_this.play()},_this.dg);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5));

	// Layer 2
	this.instance = new lib.flash_12();
	this.instance.parent = this;
	this.instance.setTransform(0,0,1.219,0.047,135);

	this.instance_1 = new lib.flash_12();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,0,1.219,0.047,45);

	this.instance_2 = new lib.flash_12();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0,0,2.284,0.088,90);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},2).to({state:[]},2).wait(1));

	// Layer 3
	this.instance_3 = new lib.flash_12();
	this.instance_3.parent = this;
	this.instance_3.setTransform(0,0,2.284,0.088);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2).to({_off:false},0).to({_off:true},2).wait(1));

	// Layer 1
	this.instance_4 = new lib.flash_12();
	this.instance_4.parent = this;
	this.instance_4.setTransform(0,0,0.567,0.567);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleX:0.99,scaleY:0.99,alpha:1},2).to({alpha:0},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.6,-8.6,17.3,17.3);


(lib.btn_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		var _this=this;
		setTimeout(function(){_this.play()},1000);
	}
	this.frame_4 = function() {
		this.stop();
		var _this=this;
		setTimeout(function(){_this.play()},1000);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(5));

	// БРОНИРУЙ ОНЛАЙН
	this.instance = new lib.text_b1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:-1,y:2.1,alpha:0.844},0).wait(1).to({y:10,alpha:0.449},0).wait(1).to({y:16.8,alpha:0.111},0).wait(1).to({regY:0,y:20,alpha:0},0).to({y:-20},1).wait(1).to({regY:-1,y:-15.5,alpha:0.273},0).wait(1).to({y:-5,alpha:0.8},0).wait(1).to({regY:0,y:0,alpha:1},0).wait(1));

	//  ПРЯМО СЕЙЧАС! 
	this.instance_1 = new lib.text_b2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,-20);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:2.9,regY:-1,x:2.9,y:-17.8,alpha:0.156},0).wait(1).to({y:-9.9,alpha:0.551},0).wait(1).to({y:-3.2,alpha:0.889},0).wait(1).to({regX:0,regY:0,x:0,y:0,alpha:1},0).wait(1).to({regX:2.9,regY:-1,x:2.9,y:2.1,alpha:0.844},0).wait(1).to({y:10,alpha:0.449},0).wait(1).to({y:16.8,alpha:0.111},0).wait(1).to({regX:0,regY:0,x:0,y:20,alpha:0},0).wait(1));

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#19AE48").s().p("Ay6FNIgMgBQhEgFAAhKIAAn5QAAhQBQAAMAl1AAAQBQAAAABQIAAH5QAABKhEAFIgMABg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(9));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129,-36.6,258.2,69.9);


(lib.fon_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.flash();
	this.instance.parent = this;
	this.instance.setTransform(-107.2,-87.7,1,1,0,0,0,0.1,-0.1);
	this.instance.compositeOperation = "lighter";

	this.instance_1 = new lib.flash();
	this.instance_1.parent = this;
	this.instance_1.setTransform(116.1,25.9,1,1,0,0,0,0.1,-0.1);
	this.instance_1.compositeOperation = "lighter";

	this.instance_2 = new lib.flash();
	this.instance_2.parent = this;
	this.instance_2.setTransform(116.1,-105,1,1,0,0,0,0.1,-0.1);
	this.instance_2.compositeOperation = "lighter";

	this.instance_3 = new lib.flash();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-89.9,25.9,1,1,0,0,0,0.1,-0.1);
	this.instance_3.compositeOperation = "lighter";

	this.instance_4 = new lib.flash();
	this.instance_4.parent = this;
	this.instance_4.setTransform(133.4,-147.7,1,1,0,0,0,0.1,-0.1);
	this.instance_4.compositeOperation = "lighter";

	this.instance_5 = new lib.flash();
	this.instance_5.parent = this;
	this.instance_5.setTransform(-123.9,43.2,1,1,0,0,0,0.1,-0.1);
	this.instance_5.compositeOperation = "lighter";

	this.instance_6 = new lib.flash();
	this.instance_6.parent = this;
	this.instance_6.setTransform(-89.9,-3.3,1,1,0,0,0,0.1,-0.1);
	this.instance_6.compositeOperation = "lighter";

	this.instance_7 = new lib.flash();
	this.instance_7.parent = this;
	this.instance_7.setTransform(121.8,-57,1,1,0,0,0,0.1,-0.1);
	this.instance_7.compositeOperation = "lighter";

	this.instance_8 = new lib.flash();
	this.instance_8.parent = this;
	this.instance_8.setTransform(-123.9,82,1,1,0,0,0,0.1,-0.1);
	this.instance_8.compositeOperation = "lighter";

	this.instance_9 = new lib.flash();
	this.instance_9.parent = this;
	this.instance_9.setTransform(121.8,82,1,1,0,0,0,0.1,-0.1);
	this.instance_9.compositeOperation = "lighter";

	this.instance_10 = new lib.flash();
	this.instance_10.parent = this;
	this.instance_10.setTransform(121.8,-8,1,1,0,0,0,0.1,-0.1);
	this.instance_10.compositeOperation = "lighter";

	this.instance_11 = new lib.flash();
	this.instance_11.parent = this;
	this.instance_11.setTransform(-141.2,18,1,1,0,0,0,0.1,-0.1);
	this.instance_11.compositeOperation = "lighter";

	this.instance_12 = new lib.flash();
	this.instance_12.parent = this;
	this.instance_12.setTransform(-124.5,-35,1,1,0,0,0,0.1,-0.1);
	this.instance_12.compositeOperation = "lighter";

	this.instance_13 = new lib.flash();
	this.instance_13.parent = this;
	this.instance_13.setTransform(-128.9,-105,1,1,0,0,0,0.1,-0.1);
	this.instance_13.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer 1
	this.instance_14 = new lib.fon();
	this.instance_14.parent = this;
	this.instance_14.setTransform(-150,-300);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

}).prototype = getMCSymbolPrototype(lib.fon_1, new cjs.Rectangle(-150,-300,300,600), null);


(lib.main = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_16 = function() {
		this.stop();
		var _this=this;
		setTimeout(function(){_this.play()},2000);
	}
	this.frame_32 = function() {
		this.stop();
		var _this=this;
		setTimeout(function(){_this.play()},2000);
	}
	this.frame_38 = function() {
		this.im.play()
		
		this.stop();
		var _this=this;
		setTimeout(function(){_this.play()},2000);
	}
	this.frame_44 = function() {
		this.im.play()
	}
	this.frame_49 = function() {
		this.stop();
		var _this=this;
		setTimeout(function(){_this.play()},5000);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(16).call(this.frame_16).wait(16).call(this.frame_32).wait(6).call(this.frame_38).wait(6).call(this.frame_44).wait(5).call(this.frame_49).wait(1));

	// mayz
	this.instance = new lib.mayz();
	this.instance.parent = this;
	this.instance.setTransform(-254.9,197.6,0.57,0.57,-64,0,0,-0.1,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:0,regY:0,rotation:-41.9,x:-182.6,y:197.5},0).wait(1).to({rotation:-26,x:-130.5,y:197.4},0).wait(1).to({rotation:-14.8,x:-93.8},0).wait(1).to({rotation:-6.9,x:-67.8},0).wait(1).to({rotation:-1.4,x:-49.5},0).wait(1).to({rotation:2.5,x:-36.7,y:197.5},0).wait(1).to({rotation:5.2,x:-28.1},0).wait(1).to({rotation:6.8,x:-22.6},0).wait(1).to({rotation:7.7,x:-19.7},0).wait(1).to({regX:-0.1,regY:0.4,rotation:8,x:-18.9,y:197.7},0).to({regX:0,regY:0.2,rotation:0,x:-34.8,y:197.6},6,cjs.Ease.get(1)).wait(5).to({regY:0,scaleX:0.6,scaleY:0.6,rotation:-0.2,x:-34.4,y:195.1},0).wait(1).to({scaleX:0.69,scaleY:0.69,rotation:-0.7,x:-32.5,y:186},0).wait(1).to({scaleX:0.91,scaleY:0.91,rotation:-2,x:-28.4,y:165.7},0).wait(1).to({scaleX:1.31,scaleY:1.31,rotation:-4.4,x:-20.9,y:128.9},0).wait(1).to({scaleX:1.88,scaleY:1.88,rotation:-7.9,x:-10,y:75.6},0).wait(1).to({regX:-0.1,regY:0.4,scaleX:2.53,scaleY:2.53,rotation:-11.8,x:2.3,y:15.8},0).to({_off:true},1).wait(23));

	// Layer 12
	this.instance_1 = new lib.text3_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,-90.1);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(44).to({_off:false},0).wait(1).to({regY:1.4,y:-87.1,alpha:0.08},0).wait(1).to({y:-82.2,alpha:0.326},0).wait(1).to({y:-75.5,alpha:0.66},0).wait(1).to({y:-70.4,alpha:0.915},0).wait(1).to({regY:0,y:-70.1,alpha:1},0).wait(1));

	// Layer 11
	this.instance_2 = new lib.text3();
	this.instance_2.parent = this;
	this.instance_2.setTransform(0,-188.2);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(44).to({_off:false},0).wait(1).to({regY:-1.2,y:-186.9,alpha:0.08},0).wait(1).to({y:-179.6,alpha:0.326},0).wait(1).to({y:-169.6,alpha:0.66},0).wait(1).to({y:-161.9,alpha:0.915},0).wait(1).to({regY:0,y:-158.2,alpha:1},0).wait(1));

	// Layer 10
	this.instance_3 = new lib.btn_1();
	this.instance_3.parent = this;
	this.instance_3.setTransform(0.4,-282.7);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(39).to({_off:false},0).wait(1).to({y:-280.3,alpha:0.08},0).wait(1).to({x:0.3,y:-273,alpha:0.322},0).wait(1).to({x:0.1,y:-263.1,alpha:0.653},0).wait(1).to({x:0,y:-255.3,alpha:0.912},0).wait(1).to({y:-252.7,alpha:1},0).wait(6));

	// Layer 6
	this.im = new lib._img();
	this.im.parent = this;
	this.im.setTransform(0,153);
	this.im._off = true;

	this.timeline.addTween(cjs.Tween.get(this.im).wait(27).to({_off:false},0).wait(23));

	// Layer 9
	this.instance_4 = new lib.text2_2();
	this.instance_4.parent = this;
	this.instance_4.setTransform(0,-161.5);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(34).to({_off:false},0).to({y:-147.5,alpha:1},4).to({alpha:0},6).wait(6));

	// text2_1
	this.instance_5 = new lib.text2_1();
	this.instance_5.parent = this;
	this.instance_5.setTransform(0,-120.8);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(27).to({_off:false},0).wait(1).to({regX:-1,regY:1.4,x:-1,y:-118.2,alpha:0.092},0).wait(1).to({y:-114.7,alpha:0.36},0).wait(1).to({y:-110.4,alpha:0.692},0).wait(1).to({y:-107.3,alpha:0.925},0).wait(1).to({regX:0,regY:0,x:0,y:-107.8,alpha:1},0).to({alpha:0},4).wait(14));

	// text2
	this.instance_6 = new lib.text2();
	this.instance_6.parent = this;
	this.instance_6.setTransform(0,-231.2);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(26).to({_off:false},0).wait(13).to({alpha:0},5).wait(6));

	// Layer 5
	this.instance_7 = new lib.text1();
	this.instance_7.parent = this;
	this.instance_7.setTransform(0,-93.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({_off:true},27).wait(23));

	// noga.png
	this.instance_8 = new lib.noga_1();
	this.instance_8.parent = this;
	this.instance_8.setTransform(186.1,-262.2,0.726,0.726,-27.7,0,0,184.2,-209.1);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(18).to({_off:false},0).to({regX:184.1,regY:-209,scaleX:1,scaleY:1,rotation:-17,x:178.5,y:-280.9},3).to({regX:184.2,regY:-209.2,scaleX:1.53,scaleY:1.53,rotation:-24.6,x:181.6,y:-405.3},4).to({_off:true},2).wait(23));

	// fon.jpg
	this.instance_9 = new lib.fon_1();
	this.instance_9.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-395.6,-311,2817.7,649.2);


// stage content:
(lib.sochi_300x600 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		if (typeof(this.stopCycle) == "undefined") {     
		    this.btnMain.addEventListener("click", function (e) {
		        var t = e.nativeEvent;
		        if (t.which == 1 || t.button == 0) {
		            window.callClick();
		        };
		    });
		    this.stopCycle = true;
		}
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer 2
	this.btnMain = new lib.BTN();
	this.btnMain.parent = this;
	this.btnMain.setTransform(150.1,300.1,1,1,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.btnMain, 0, 1, 2, false, new lib.BTN(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btnMain).wait(1));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#666666").ss(1,1,1).p("EgXbgu3MAu3AAAMAAABdvMgu3AAAg");
	this.shape.setTransform(150,300);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 4
	this.instance = new lib.main();
	this.instance.parent = this;
	this.instance.setTransform(150,300);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.6,299,546.7,639.2);
// library properties:
lib.properties = {
	width: 300,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"fon.jpg", id:"fon"},
		{src:"img_1.jpg", id:"img_1"},
		{src:"img_2.jpg", id:"img_2"},
		{src:"logo.jpg", id:"logo"},
		{src:"myach.png", id:"myach"},
		{src:"noga.png", id:"noga"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;