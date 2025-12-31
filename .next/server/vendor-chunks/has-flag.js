"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-flag";
exports.ids = ["vendor-chunks/has-flag"];
exports.modules = {

/***/ "(ssr)/./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (flag) {\n  var argv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.argv;\n  var prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';\n  var position = argv.indexOf(prefix + flag);\n  var terminatorPosition = argv.indexOf('--');\n  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzLWZsYWcvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWJBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLFVBQUNDLElBQUksRUFBMEI7RUFBQSxJQUF4QkMsSUFBSSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBR0csT0FBTyxDQUFDSixJQUFJO0VBQzFDLElBQU1LLE1BQU0sR0FBR04sSUFBSSxDQUFDTyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFJUCxJQUFJLENBQUNHLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUs7RUFDM0UsSUFBTUssUUFBUSxHQUFHUCxJQUFJLENBQUNRLE9BQU8sQ0FBQ0gsTUFBTSxHQUFHTixJQUFJLENBQUM7RUFDNUMsSUFBTVUsa0JBQWtCLEdBQUdULElBQUksQ0FBQ1EsT0FBTyxDQUFDLElBQUksQ0FBQztFQUM3QyxPQUFPRCxRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUtFLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxJQUFJRixRQUFRLEdBQUdFLGtCQUFrQixDQUFDO0FBQ3ZGLENBQUMiLCJzb3VyY2VzIjpbIkM6XFx4YW1wcFxcaHRkb2NzXFxJRFhBZG1pblJlYWN0XFxub2RlX21vZHVsZXNcXGhhcy1mbGFnXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKGZsYWcsIGFyZ3YgPSBwcm9jZXNzLmFyZ3YpID0+IHtcblx0Y29uc3QgcHJlZml4ID0gZmxhZy5zdGFydHNXaXRoKCctJykgPyAnJyA6IChmbGFnLmxlbmd0aCA9PT0gMSA/ICctJyA6ICctLScpO1xuXHRjb25zdCBwb3NpdGlvbiA9IGFyZ3YuaW5kZXhPZihwcmVmaXggKyBmbGFnKTtcblx0Y29uc3QgdGVybWluYXRvclBvc2l0aW9uID0gYXJndi5pbmRleE9mKCctLScpO1xuXHRyZXR1cm4gcG9zaXRpb24gIT09IC0xICYmICh0ZXJtaW5hdG9yUG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uIDwgdGVybWluYXRvclBvc2l0aW9uKTtcbn07XG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImZsYWciLCJhcmd2IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicHJvY2VzcyIsInByZWZpeCIsInN0YXJ0c1dpdGgiLCJwb3NpdGlvbiIsImluZGV4T2YiLCJ0ZXJtaW5hdG9yUG9zaXRpb24iXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/has-flag/index.js\n");

/***/ })

};
;