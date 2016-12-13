/**
 * Created by WangMing on 15/12/10.
 */
module.exports = function(source) {
	this.cacheable && this.cacheable();
	source = source.replace(/css!/g, "");
	this.callback(null, source);
};