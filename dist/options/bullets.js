var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _jsxFileName="/Users/rip3rs/personal/react-native-carousel/src/options/bullets.js";var bullets=function bullets(props){var index=props.index,total=props.total;var dots=[];var _loop=function _loop(i){var dot=_react.default.createElement(_reactNative.TouchableOpacity,{onPress:function onPress(){return props.calcIndexHandler(i,true);},__source:{fileName:_jsxFileName,lineNumber:21}},_react.default.createElement(_reactNative.View,{style:[styles.bullets,{backgroundColor:i===index?"rgba(0,0,0,.2)":"rgba(220,220,220,.5)"}],__source:{fileName:_jsxFileName,lineNumber:22}}));dots.push(_react.default.cloneElement(dot,{key:i}));};for(var i=1;i<=total;i++){_loop(i);}return _react.default.createElement(_reactNative.View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:37}},dots);};var _default=bullets;exports.default=_default;var styles={container:{position:"absolute",bottom:5,left:0,right:0,flexDirection:"row",flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"},bullets:{width:20,height:20,borderRadius:20,margin:20}};