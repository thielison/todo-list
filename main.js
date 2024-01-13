(()=>{"use strict";function t(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function e(e){if(!(n=e,n instanceof Date||"object"==typeof n&&"[object Date]"===Object.prototype.toString.call(n)||"number"==typeof e))return!1;var n;const a=t(e);return!isNaN(Number(a))}const n={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function a(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const r={date:a({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:a({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:a({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},o={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function i(t){return(e,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):e;a=t.formattingValues[r]||t.formattingValues[e]}else{const e=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[e]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function s(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],d=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let c;return c=t.valueCallback?t.valueCallback(d):d,c=n.valueCallback?n.valueCallback(c):c,{value:c,rest:e.slice(i.length)}}}var d;const c={code:"en-US",formatDistance:(t,e,a)=>{let r;const o=n[t];return r="string"==typeof o?o:1===e?o.one:o.other.replace("{{count}}",e.toString()),a?.addSuffix?a.comparison&&a.comparison>0?"in "+r:r+" ago":r},formatLong:r,formatRelative:(t,e,n,a)=>o[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:i({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:i({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:i({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:i({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:i({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(d={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(d.matchPattern);if(!n)return null;const a=n[0],r=t.match(d.parsePattern);if(!r)return null;let o=d.valueCallback?d.valueCallback(r[0]):r[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(a.length)}}),era:s({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:s({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:s({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:s({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:s({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let u={};function l(){return u}Math.pow(10,8);const m=6048e5,h=864e5;function f(e){const n=t(e);return n.setHours(0,0,0,0),n}function g(t){const e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function w(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function y(e){const n=t(e);return function(t,e){const n=f(t),a=f(e),r=n.getTime()-g(n),o=a.getTime()-g(a);return Math.round((r-o)/h)}(n,function(e){const n=t(e),a=w(e,0);return a.setFullYear(n.getFullYear(),0,1),a.setHours(0,0,0,0),a}(n))+1}function b(e,n){const a=l(),r=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,o=t(e),i=o.getDay(),s=(i<r?7:0)+i-r;return o.setDate(o.getDate()-s),o.setHours(0,0,0,0),o}function p(t){return b(t,{weekStartsOn:1})}function v(e){const n=t(e),a=n.getFullYear(),r=w(e,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const o=p(r),i=w(e,0);i.setFullYear(a,0,4),i.setHours(0,0,0,0);const s=p(i);return n.getTime()>=o.getTime()?a+1:n.getTime()>=s.getTime()?a:a-1}function M(e){const n=t(e),a=p(n).getTime()-function(t){const e=v(t),n=w(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),p(n)}(n).getTime();return Math.round(a/m)+1}function k(e,n){const a=t(e),r=a.getFullYear(),o=l(),i=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,s=w(e,0);s.setFullYear(r+1,0,i),s.setHours(0,0,0,0);const d=b(s,n),c=w(e,0);c.setFullYear(r,0,i),c.setHours(0,0,0,0);const u=b(c,n);return a.getTime()>=d.getTime()?r+1:a.getTime()>=u.getTime()?r:r-1}function x(e,n){const a=t(e),r=b(a,n).getTime()-function(t,e){const n=l(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=k(t,e),o=w(t,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),b(o,e)}(a,n).getTime();return Math.round(r/m)+1}function D(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const E={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return D("yy"===e?a%100:a,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):D(n+1,2)},d:(t,e)=>D(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>D(t.getHours()%12||12,e.length),H:(t,e)=>D(t.getHours(),e.length),m:(t,e)=>D(t.getMinutes(),e.length),s:(t,e)=>D(t.getSeconds(),e.length),S(t,e){const n=e.length,a=t.getMilliseconds();return D(Math.floor(a*Math.pow(10,n-3)),e.length)}},S={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),a=e>0?e:1-e;return n.ordinalNumber(a,{unit:"year"})}return E.y(t,e)},Y:function(t,e,n,a){const r=k(t,a),o=r>0?r:1-r;return"YY"===e?D(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):D(o,e.length)},R:function(t,e){return D(v(t),e.length)},u:function(t,e){return D(t.getFullYear(),e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return D(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return D(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return E.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return D(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=x(t,a);return"wo"===e?n.ordinalNumber(r,{unit:"week"}):D(r,e.length)},I:function(t,e,n){const a=M(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):D(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):E.d(t,e)},D:function(t,e,n){const a=y(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):D(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return D(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return D(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return D(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return E.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):E.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):D(a,e.length)},k:function(t,e,n){let a=t.getHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):D(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):E.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):E.s(t,e)},S:function(t,e){return E.S(t,e)},X:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return T(r);case"XXXX":case"XX":return W(r);default:return W(r,":")}},x:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();switch(e){case"x":return T(r);case"xxxx":case"xx":return W(r);default:return W(r,":")}},O:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+P(r,":");default:return"GMT"+W(r,":")}},z:function(t,e,n,a){const r=(a._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+P(r,":");default:return"GMT"+W(r,":")}},t:function(t,e,n,a){const r=a._originalDate||t;return D(Math.floor(r.getTime()/1e3),e.length)},T:function(t,e,n,a){return D((a._originalDate||t).getTime(),e.length)}};function P(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.floor(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+e+D(o,2)}function T(t,e){return t%60==0?(t>0?"-":"+")+D(Math.abs(t)/60,2):W(t,e)}function W(t,e=""){const n=t>0?"-":"+",a=Math.abs(t);return n+D(Math.floor(a/60),2)+e+D(a%60,2)}const j=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},C=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},N={p:C,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return j(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",j(a,e)).replace("{{time}}",C(r,e))}},Y=["D","DD"],q=["YY","YYYY"];function L(t,e,n){if("YYYY"===t)throw new RangeError(`Use \`yyyy\` instead of \`YYYY\` (in \`${e}\`) for formatting years to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if("YY"===t)throw new RangeError(`Use \`yy\` instead of \`YY\` (in \`${e}\`) for formatting years to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if("D"===t)throw new RangeError(`Use \`d\` instead of \`D\` (in \`${e}\`) for formatting days of the month to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`);if("DD"===t)throw new RangeError(`Use \`dd\` instead of \`DD\` (in \`${e}\`) for formatting days of the month to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`)}const O=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,A=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,B=/^'([^]*?)'?$/,F=/''/g,H=/[a-zA-Z]/;function I(n,a,r){const o=l(),i=r?.locale??o.locale??c,s=r?.firstWeekContainsDate??r?.locale?.options?.firstWeekContainsDate??o.firstWeekContainsDate??o.locale?.options?.firstWeekContainsDate??1,d=r?.weekStartsOn??r?.locale?.options?.weekStartsOn??o.weekStartsOn??o.locale?.options?.weekStartsOn??0,u=t(n);if(!e(u))throw new RangeError("Invalid time value");const m={firstWeekContainsDate:s,weekStartsOn:d,locale:i,_originalDate:u};return a.match(A).map((function(t){const e=t[0];return"p"===e||"P"===e?(0,N[e])(t,i.formatLong):t})).join("").match(O).map((function(t){if("''"===t)return"'";const e=t[0];if("'"===e)return function(t){const e=t.match(B);return e?e[1].replace(F,"'"):t}(t);const o=S[e];if(o)return r?.useAdditionalWeekYearTokens||(s=t,-1===q.indexOf(s))||L(t,a,String(n)),!r?.useAdditionalDayOfYearTokens&&function(t){return-1!==Y.indexOf(t)}(t)&&L(t,a,String(n)),o(u,t,i.localize,m);var s;if(e.match(H))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return t})).join("")}let z=0;const Q=()=>{const t=document.getElementById("add-project-button"),e=document.getElementById("project-name-input-form");if("flex"===e.style.display&&"none"===t.style.display)return e.style.display="none",void(t.style.display="flex");e.style.display="flex",t.style.display="none"},G=()=>{const t=document.querySelector(".todo-input-information-container");"none"!==t.style.display?t.style.display="none":t.style.display="block"},X=()=>{const t=document.querySelector(".todo-edit-information-container");"none"!==t.style.display?t.style.display="none":t.style.display="block"},$=t=>{document.querySelector(".add-task-button").style.display=t?"block":"none"},J=t=>{const e=document.querySelectorAll(".projects li"),n=document.getElementById("add-project-button");e.forEach((e=>{t?e.classList.add("disabled"):e.classList.remove("disabled")})),t?n.classList.add("disabled"):n.classList.remove("disabled")},R=(t,e)=>{const n=document.querySelector(".projects"),a=((t,e)=>{let n=document.createElement("li");return n.textContent=t,n.setAttribute("data-index",e),n.classList.add("project"),n})(t,e);(t=>{t.addEventListener("click",(t=>{"delete-btn"!==t.target.className?(z=t.target.dataset.index,(t=>{const e=V.getProjects();document.querySelector(".tasks-container .tasks-header").textContent=e[t].projectName})(z),_(z),$(!0)):(t=>{(t=>{t.parentElement.remove();let e=document.querySelectorAll(".project");for(let t=0;t<e.length;t++)e[t].setAttribute("data-index",t)})(t.target),V.removeProject(t.target.parentElement.dataset.index)})(t)}))})(a);const r=(()=>{const t=document.createElement("span");return t.className="delete-btn",t})();a.appendChild(r),n.append(a),Q()},U=t=>{const e=t.target.checked,n=t.target.closest(".todo").dataset.index;V.toggleTodoCompletion(z,n,e)},_=t=>{const e=V.getProjects(),n=document.querySelector(".task-list");n.textContent="";const a=document.createElement("ul");for(let n=0;n<e[t].todos.length;n++){const r=document.createElement("li");r.setAttribute("data-index",n),r.className="todo";const o=document.createElement("div");o.className="todo-left-side";const i=document.createElement("div"),s=document.createElement("input");s.setAttribute("type","checkbox"),s.setAttribute("id",`todo${n}`),s.setAttribute("name","todo-checkbox"),s.addEventListener("change",U),i.append(s);const d=document.createElement("div");d.classList="todo-title-and-description-div";const c=document.createElement("label");c.setAttribute("for",`todo${n}`),c.textContent=e[t].todos[n].title;const u=document.createElement("p");u.className="todo-description",u.textContent=e[t].todos[n].description,d.append(c,u),o.append(i,d);const l=document.createElement("div");l.className="todo-right-side";const m=e[t].todos[n].dueDate,h=new Date(m.replace(/-/g,"/")),f=document.createElement("p");f.textContent=I(h,"dd-MM-yyyy");const g=document.createElement("button");g.className="edit-to-do",g.textContent="Edit";const w=document.createElement("button");w.className="delete-to-do",w.textContent="Delete",l.append(f,g,w),r.append(o,l),a.append(r)}var r;n.append(a),r=e[t].todos.length,document.getElementById("task-count").textContent=r},V=(()=>{const t=[];return{addNewProject:e=>{if(""===e)return;let n=t.length;t.push({id:n,projectName:e,todos:[]}),R(e,n)},removeProject:e=>{e>-1&&t.splice(e,1);for(let e=0;e<t.length;e++)t[e].id=e},getProjects:()=>t,addNewTodoToAProject:(e,n)=>{n<0||n>=t.length?alert("Invalid project index"):(t[n].todos.push(e),_(n))},updateTodoInfo:(e,n,a)=>{n<0||n>=t.length||a<0||a>t[n].todos.length?alert("Invalid project index"):(t[n].todos.splice(a,1,e),_(n))},deleteTodo:(e,n)=>{(e>-1||n>-1)&&t[e].todos.splice(n,1),_(e)},toggleTodoCompletion:(e,n,a)=>{t[e].todos[n].completed=a}}})();let K;const Z=(t,e)=>{t.preventDefault();const n=new FormData(document.getElementById(e));let a,r,o;switch(e){case"todo-input-form":a=n.get("title"),r=n.get("description"),o=document.getElementById("due-date").value;break;case"edit-todo-form":a=n.get("edit-title"),r=n.get("edit-description"),o=document.getElementById("edit-due-date").value;break;default:alert("Error getting info from form!")}return{title:a,description:r,dueDate:o,isCompleted:!1}},tt=()=>{document.querySelectorAll("#title, #description, #due-date").forEach((t=>{t.value=""}))};document.getElementById("add-project-button").addEventListener("click",Q),document.getElementById("project-name-input-form").addEventListener("submit",(t=>{t.preventDefault();const e=document.getElementById("project-name-input");V.addNewProject(e.value),e.value=""})),document.querySelector("#btn-cancel-project").addEventListener("click",(t=>{t.preventDefault(),Q()})),document.querySelector(".tasks-container .add-task-button").addEventListener("click",G),document.querySelector("#todo-input-form").addEventListener("submit",(t=>{t.preventDefault();const e=Z(t,"todo-input-form");V.addNewTodoToAProject(e,z),G(),tt()})),document.querySelector("#edit-todo-form").addEventListener("submit",(t=>{t.preventDefault();const e=Z(t,"edit-todo-form");V.updateTodoInfo(e,z,K),X(),$(!0),J(!1),tt()})),document.querySelector("body").addEventListener("click",(t=>{"edit-to-do"!==t.target.className?"delete-to-do"===t.target.className&&(t=>{K=t.target.closest(".todo").dataset.index,V.deleteTodo(z,K)})(t):(t=>{X(),$(!1),J(!0);const e=V.getProjects();var n;K=t.target.closest(".todo").dataset.index,n=e[z].todos[K],document.getElementById("edit-title").value=n.title,document.getElementById("edit-description").value=n.description,document.getElementById("edit-due-date").value=n.dueDate})(t)})),document.querySelector("#btn-cancel-todo").addEventListener("click",(t=>{t.preventDefault(),G(),tt()})),document.querySelector("#btn-cancel-todo-update").addEventListener("click",(t=>{t.preventDefault(),X(),$(!0),J(!1)}))})();
//# sourceMappingURL=main.js.map