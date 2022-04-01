window.Modernizr = (function( window, document, undefined ) {

    var version = '2.0.6',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,
    docHead = document.head || document.getElementsByTagName('head')[0],


    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,


    inputElem = document.createElement('input'),

    smile = ':)',

    toString = Object.prototype.toString,


    prefixes = ' -webkit- -moz- -o- -ms- -khtml- '.split(' '),


    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},
	@@ -73,29 +35,24 @@ window.Modernizr = (function( window, document, undefined ) {

    classes = [],

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node,
          div = document.createElement('div');

      if ( parseInt(nodes, 10) ) {

          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }


      style = ['&shy;', '<style>', rule, '</style>'].join('');
      div.id = mod;
      div.innerHTML += style;
	@@ -108,10 +65,6 @@ window.Modernizr = (function( window, document, undefined ) {

    },

    testMediaQuery = function( mq ) {

      if ( window.matchMedia ) {
	@@ -130,11 +83,6 @@ window.Modernizr = (function( window, document, undefined ) {

     },

    isEventSupported = (function() {

      var TAGNAMES = {
	@@ -148,19 +96,15 @@ window.Modernizr = (function( window, document, undefined ) {
        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        var isSupported = eventName in element;

        if ( !isSupported ) {
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');
            if ( !is(element[eventName], undefined) ) {
              element[eventName] = undefined;
            }
	@@ -174,52 +118,35 @@ window.Modernizr = (function( window, document, undefined ) {
      return isEventSupported;
    })();

    var _hasOwnProperty = ({}).hasOwnProperty, hasOwnProperty;
    if ( !is(_hasOwnProperty, undefined) && !is(_hasOwnProperty.call, undefined) ) {
      hasOwnProperty = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProperty = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], undefined));
      };
    }


    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            if ( mStyle[ props[i] ] !== undefined ) {
	@@ -229,98 +156,61 @@ window.Modernizr = (function( window, document, undefined ) {
        return false;
    }

    function testPropsAll( prop, prefixed ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
            props   = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        return testProps(props, prefixed);
    }
    var testBundle = (function( styles, tests ) {
        var style = styles.join(''),
            len = tests.length;

        injectElementWithStyles(style, function( node, rule ) {
            var style = document.styleSheets[document.styleSheets.length - 1],
                cssText = style.cssRules && style.cssRules[0] ? style.cssRules[0].cssText : style.cssText || "",
                children = node.childNodes, hash = {};

            while ( len-- ) {
                hash[children[len].id] = children[len];
            }

            Modernizr['touch'] = ('ontouchstart' in window) || hash['touch'].offsetTop === 9; 
            Modernizr['csstransforms3d'] = hash['csstransforms3d'].offsetLeft === 9;          
            Modernizr['generatedcontent'] = hash['generatedcontent'].offsetHeight >= 1;       
            Modernizr['fontface'] = /src/i.test(cssText) &&
                                                                  cssText.indexOf(rule.split(' ')[0]) === 0;        
        }, len, tests);

    })([

               '@font-face {font-family:"font";src:url("https://")}'         

                  ,['@media (',prefixes.join('touch-enabled),('),mod,')',
                                '{#touch{top:9px;position:absolute}}'].join('')           

         ,['@media (',prefixes.join('transform-3d),('),mod,')',
                                '{#csstransforms3d{left:9px;position:absolute}}'].join('')

        ,['#generatedcontent:after{content:"',smile,'";visibility:hidden}'].join('') 
    ],
      [
        'fontface'          
         ,'touch'            
        ,'csstransforms3d'  
        ,'generatedcontent' 

    ]);

    tests['flexbox'] = function() {

        function setPrefixedValueCSS( element, property, value, extra ) {
            property += ':';
            element.style.cssText = (property + prefixes.join(value + ';' + property)).slice(0, -property.length) + (extra || '');
        }


        function setPrefixedPropertyCSS( element, property, value, extra ) {
            element.style.cssText = prefixes.join(property + ':' + value + ';') + (extra || '');
        }
	@@ -342,8 +232,6 @@ window.Modernizr = (function( window, document, undefined ) {
        return ret;
    };


    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
	@@ -354,69 +242,25 @@ window.Modernizr = (function( window, document, undefined ) {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };


    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };


    tests['touch'] = function() {
        return Modernizr['touch'];
    };


    tests['geolocation'] = function() {
        return !!navigator.geolocation;
    };

    tests['postmessage'] = function() {
      return !!window.postMessage;
    };

    tests['websqldatabase'] = function() {
      var result = !!window.openDatabase;
      if (result){
	@@ -428,10 +272,7 @@ window.Modernizr = (function( window, document, undefined ) {
      return result;
    };


    tests['indexedDB'] = function() {
      for ( var i = -1, len = domPrefixes.length; ++i < len; ){
        if ( window[domPrefixes[i].toLowerCase() + 'IndexedDB'] ){
	@@ -441,17 +282,11 @@ window.Modernizr = (function( window, document, undefined ) {
      return !!window.indexedDB;
    };

    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };


    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };
	@@ -460,8 +295,7 @@ window.Modernizr = (function( window, document, undefined ) {
        return isEventSupported('dragstart') && isEventSupported('drop');
    };


    tests['websockets'] = function() {
        for ( var i = -1, len = domPrefixes.length; ++i < len; ){
          if ( window[domPrefixes[i] + 'WebSocket'] ){
	@@ -471,48 +305,29 @@ window.Modernizr = (function( window, document, undefined ) {
        return 'WebSocket' in window;
    };

    tests['rgba'] = function() {

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {

        setCss('background:url(https://),url(https://),red url(https://)');


        return /(url\s*\(.*?){3}/.test(mStyle.background);
    };



    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
	@@ -522,35 +337,21 @@ window.Modernizr = (function( window, document, undefined ) {
        return testPropsAll('borderImage');
    };

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        setCssAll('opacity:.55');
        return /^0.55$/.test(mStyle.opacity);
    };

	@@ -566,14 +367,6 @@ window.Modernizr = (function( window, document, undefined ) {


    tests['cssgradients'] = function() {
        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';
	@@ -600,14 +393,7 @@ window.Modernizr = (function( window, document, undefined ) {

        var ret = !!testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']);

        if ( ret && 'webkitPerspective' in docElement.style ) {
          ret = Modernizr['csstransforms3d'];
        }
        return ret;
	@@ -618,47 +404,29 @@ window.Modernizr = (function( window, document, undefined ) {
        return testPropsAll('transitionProperty');
    };

    tests['fontface'] = function() {
        return Modernizr['fontface'];
    };



    tests['generatedcontent'] = function() {
        return Modernizr['generatedcontent'];
    };




    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;


        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"');

                var h264 = 'video/mp4; codecs="avc1.42E01E';
                bool.h264 = elem.canPlayType(h264 + '"') || elem.canPlayType(h264 + ', mp4a.40.2"');

	@@ -680,9 +448,7 @@ window.Modernizr = (function( window, document, undefined ) {
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"');
                bool.mp3  = elem.canPlayType('audio/mpeg;');


                bool.wav  = elem.canPlayType('audio/wav; codecs="1"');
                bool.m4a  = elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;');
            }
	@@ -692,24 +458,6 @@ window.Modernizr = (function( window, document, undefined ) {
    };


    tests['localstorage'] = function() {
        try {
            return !!localStorage.getItem;
	@@ -737,65 +485,37 @@ window.Modernizr = (function( window, document, undefined ) {
    };


    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };
    tests['smil'] = function() {
        return !!document.createElementNS && /SVG/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVG/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    function webforms() {

        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern 
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';
                if ( bool ) {

                    inputElem.value         = smile;
	@@ -805,37 +525,24 @@ window.Modernizr = (function( window, document, undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else if ( /^color$/.test(inputElemType) ) {
                        docElement.appendChild(inputElem);
                        docElement.offsetWidth;
                        bool = inputElem.value != smile;
                        docElement.removeChild(inputElem);

                    } else {
                      bool = inputElem.value != smile;
                    }
                }
	@@ -847,37 +554,21 @@ window.Modernizr = (function( window, document, undefined ) {
    }


    for ( var feature in tests ) {
        if ( hasOwnProperty(tests, feature) ) {

            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }


    Modernizr.input || webforms();



     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == "object" ) {
         for ( var key in feature ) {
	@@ -890,11 +581,7 @@ window.Modernizr = (function( window, document, undefined ) {
         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {

           return; 
         }

	@@ -905,21 +592,20 @@ window.Modernizr = (function( window, document, undefined ) {

       }

       return Modernizr; 
     };



    setCss('');
    modElem = inputElem = null;


    if ( window.attachEvent && (function(){ var elem = document.createElement('div');
                                            elem.innerHTML = '<elem></elem>';
                                            return elem.childNodes.length !== 1; })() ) {


        (function(win, doc) {
          win.iepp = win.iepp || {};
          var iepp = win.iepp,
	@@ -940,7 +626,7 @@ window.Modernizr = (function( window, document, undefined ) {
          function shim(doc) {
            var a = -1;
            while (++a < elemsArrLen)

              doc.createElement(elemsArr[a]);
          }

	@@ -952,12 +638,11 @@ window.Modernizr = (function( window, document, undefined ) {
              cssTextArr = [];
            while (++a < len) {
              styleSheet = styleSheetList[a];

              if(styleSheet.disabled){continue;}
              mediaType = styleSheet.media || mediaType;
              if (printMedias.test(mediaType)) cssTextArr.push(iepp.getCSS(styleSheet.imports, mediaType), styleSheet.cssText);

              mediaType = 'all';
            }
            return cssTextArr.join('');
	@@ -967,7 +652,6 @@ window.Modernizr = (function( window, document, undefined ) {
            var cssTextArr = [],
              rule;
            while ((rule = ruleRegExp.exec(cssText)) != null){
              cssTextArr.push(( (filterReg.exec(rule[1]) ? '\n' : rule[1]) +rule[2]+rule[3]).replace(elemRegExp, '$1.iepp_$2')+rule[4]);
            }
            return cssTextArr.join('\n');
	@@ -982,48 +666,39 @@ window.Modernizr = (function( window, document, undefined ) {
                b = -1;
              while (++b < nodeListLen)
                if (nodeList[b].className.indexOf('iepp_') < 0)
                  nodeList[b].className += ' iepp_'+elemsArr[a];
            }
            docFrag.appendChild(body);
            html.appendChild(bodyElem);
            bodyElem.className = body.className;
            bodyElem.id = body.id;
            bodyElem.innerHTML = body.innerHTML.replace(tagRegExp, '<$1font');
          };


          iepp._beforePrint = function() {
            styleElem.styleSheet.cssText = iepp.parseCSS(iepp.getCSS(doc.styleSheets, 'all'));
            iepp.writeHTML();
          };

          iepp.restoreHTML = function(){
            bodyElem.innerHTML = '';
            html.removeChild(bodyElem);
            html.appendChild(body);
          };

          iepp._afterPrint = function(){
            iepp.restoreHTML();
            styleElem.styleSheet.cssText = '';
          };


          shim(doc);
          shim(docFrag);

          //
          if(iepp.disablePP){return;}

          head.insertBefore(styleElem, head.firstChild);
          styleElem.media = 'print';
          styleElem.className = 'iepp-printshim';
	@@ -1037,78 +712,32 @@ window.Modernizr = (function( window, document, undefined ) {
          );
        })(window, document);
    }
    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;

    Modernizr.mq            = testMediaQuery;   

    Modernizr.hasEvent      = isEventSupported; 

    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };        

    Modernizr.testAllProps  = testPropsAll;     


    Modernizr.testStyles    = injectElementWithStyles; 


    Modernizr.prefixed      = function(prop){
      return testPropsAll(prop, 'pfx');
    };


    docElement.className = docElement.className.replace(/\bno-js\b/, '')

                            + (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;
