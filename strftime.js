/**
* strftime
* @params: string [,date] [,locale]
*/

strftime = (function(){

  // every computed value (for a given timestamp) is stored in this object
  var cache = {};
  
  // this function (closure) has access to the cache object everytime strftime is called
  return function(a,b,c){
  
    /** Initialization **/
    var
    t,          // temp var
    r,          // result
    l,          // length
    s,          // specifier
    ts;         // current timestamp

    // if b is defined
    if(b){
    
      // if b is a locale
      if(b.AM){
        
        // store it in c
        c = b;
      
        // store current date in b
        b = new Date();
      }
    }
    
    // if b is undefined, use current date
    b = b || new Date();
    
    // if c is undefined, use default locale
    c = c ||
    { days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    , shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    , months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    , shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    , AM: 'AM'
    , PM: 'PM'
    , am: 'am'
    , pm: 'pm'
    };
    
    // get current timestamp
    // if there is no cache for this timestamp yet, create it
    ts = b.getTime();
    cache[ts] = cache[ts] || {};
    
    // if the whole result for this timestamp and this string is cached, return it
    if(t = cache[ts][a]){
      return t;
    }
    
    /** Computing **/
  
    // result
    r = '';
    
    // loop on the chars of a
    for(i = 0, l = a.length; i < l; i++){
    
      // detect specifiers
      if(a[i] === '%'){
      
        // switch on the character that follows the '%',
        // search the replacement string in the cache object, or, if it's not found, compute it
        i++;
        s = a[i];
        switch(s){
        
          // A: full weekday name
          case 'A':
            r += (cache[ts][s] = cache[ts][s] || c.days[b.getDay()]);
            break;

          // a: abbreviated weekday name
          case 'a':
            r += (cache[ts][s] = cache[ts][s] || c.shortDays[b.getDay()]);
            break;
          
          // B: full month name
          case 'B':
            r += (cache[ts][s] = cache[ts][s] || c.months[b.getMonth()]);
            break;

          // b: abbreviated month name
          // h: the same as %b (abbreviated month name)
          case 'b':
          case 'h':
            r += (cache[ts][s] = cache[ts][s] || c.shortMonths[b.getMonth()]);
            break;
            
          // C: AD century (year / 100), padded to 2 digits
          case 'C':
            r += (cache[ts][s] = cache[ts][s] || ('0' + ~~(b.getFullYear() / 100)).slice(-2));
            break;
          
          // D: equivalent to %m/%d/%y
          case 'D':
            r += (cache[ts][s] = cache[ts][s] || ('0' + (b.getMonth() + 1)).slice(-2) + '/' + ('0' + b.getDate()).slice(-2) + '/' + ('' + b.getFullYear()).slice(-2));
            break;
          
          // d: day of the month, padded to 2 digits (01-31)
          case 'd':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getDate()).slice(-2));
            break;

          // e: day of the month, padded with a leading space for single digit values ( 1-31)
          case 'e':
            r += (cache[ts][s] = cache[ts][s] || (' ' + b.getDate()).slice(-2));
            break;

          // F: equivalent to %Y-%m-%d
          case 'F':
            r += (cache[ts][s] = cache[ts][s] || b.getFullYear() + '-' + ('0' + (b.getMonth() + 1)).slice(-2) + '-' + ('0' + b.getDate()).slice(-2));
            break;
          
          // H: the hour (24-hour clock), padded to 2 digits (00-23)
          case 'H':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getHours()).slice(-2));
            break;
            
          // I: the hour (12-hour clock), padded to 2 digits (01-12)
          case 'I':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getHours() % 12).slice(-2));
            break;
            
          // j: day of the year, padded to 3 digits (001-366)
          case 'j':
            r += (cache[ts][s] = cache[ts][s] || ('00' + ~~((b-new Date(b.getFullYear(), 0, 0)/864e5))).slice(-3));
            break;
            
          // k: the hour (24-hour clock), padded with a leading space for single digit values ( 0-23)
          case 'k':
            r += (cache[ts][s] = cache[ts][s] || (' ' + b.getHours()).slice(-2));
            break;
          
          // L: the milliseconds, padded to 3 digits [Ruby extension]
          case 'L':
            r += (cache[ts][s] = cache[ts][s] || ('00' + b.getMilliseconds()).slice(-3));
            break;

          // l: the hour (12-hour clock), padded with a leading space for single digit values ( 1-12)
          case 'l':
            r += (cache[ts][s] = cache[ts][s] || (' ' + b.getHours() % 12).slice(-2));
            break;

          // M: the minute, padded to 2 digits (00-59)
          case 'M':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getMinutes()).slice(-2));
            break;
          
          // m: the month, padded to 2 digits (01-12)
          case 'm':
            r += (cache[ts][s] = cache[ts][s] || ('0' + (b.getMonth() + 1)).slice(-2));
            break;

          // n: newline character
          case 'n':
            r += '\n';
            break;
          
          // o: day of the month as an ordinal (without padding), e.g. 1st, 2nd, 3rd, 4th, ...
          case 'o':
            if(cache[ts][s]){
              r += cache[ts][s]
            }
            else{
              if(t%10 === 1){
                r += (cache[ts][s] = b.getDate() + 'st');
              }
              else if(t%10 === 2){
                r += (cache[ts][s] = b.getDate() + 'nd');
              }
              else if(t%10 === 3){
                r += (cache[ts][s] = b.getDate() + 'rd');
              }
              else{
                r+= (cache[ts][s] = b.getDate() + 'th');
              }
            }
            break;
          
          // P: 'am' or 'pm' in lowercase [Ruby extension]
          case 'P':
            r += (cache[ts][s] = cache[ts][s] || (b.getHours() < 12 ? c.am : c.pm));
            break;
          
          // p: 'AM' or 'PM'
          case 'p':
            r += (cache[ts][s] = cache[ts][s] || (b.getHours() < 12 ? c.AM : c.PM));
            break;

          // R: equivalent to %H:%M
          case 'R':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getHours()).slice(-2) + ':' + ('0' + b.getMinutes()).slice(-2));
            break;
          
          // r: equivalent to %I:%M:%S %p
          case 'r':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getHours() % 12).slice(-2) + ':' + ('0' + b.getMinutes()).slice(-2) + ':' + ('0' + b.getSeconds()).slice(-2) + ' ' + (b.getHours() < 12 ? c.AM : c.PM));
            break;
          
          // S: the second, padded to 2 digits (00-60)
          case 'S':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getSeconds()).slice(-2));
            break;

          // s: the number of seconds since the Epoch, UTC
          case 's':
            r += (cache[ts][s] = cache[ts][s] || ~~(b.getTime() / 1e3));
            break;

          // T: equivalent to %H:%M:%S
          case 'T':
            r += (cache[ts][s] = cache[ts][s] || ('0' + b.getHours()).slice(-2) + ':' + ('0' + b.getMinutes()).slice(-2) + ':' + ('0' + b.getSeconds()).slice(-2));
            break;
            
          // t: tab character
          case 't':
            r += '\t';
            break;
          
          // U: week number of the year, Sunday as the first day of the week, padded to 2 digits (00-53)
          case 'U':
            if(cache[ts][s]){
              r += cache[ts][s];
            }
            else{
              t = new Date(b.getFullYear(), 0, 1);
              r += ('0' + Math.ceil((((b - t) / 864e5) + t.getDay()) / 7)).slice(-2);
            }
            break;

          // u: the weekday, Monday as the first day of the week (1-7)
          case 'u':
            if(cache[ts][s]){
              r += cache[ts][s];
            }
            else{
              t = b.getDay();
              r += t ? t+1 : 7;
            }
            break;

          // v: equivalent to %e-%b-%Y
          case 'v':
            r += (cache[ts][s] = cache[ts][s] || (' ' + b.getDate()).slice(-2) + '-' + c.shortMonths[b.getMonth()] + '-' + b.getFullYear());
            break;
          
          // W: week number of the year, Monday as the first day of the week, padded to 2 digits (00-53)
          case 'W':
            if(cache[ts][s]){
              r += cache[ts][s];
            }
            else{
              t = new Date(b.getFullYear(), 0, 1);
              r += ('0' + Math.ceil((((b - t) / 864e5) + t.getDay() + 1) / 7)).slice(-2);
            }
            break;

          // w: the weekday, Sunday as the first day of the week (0-6)
          case 'w':
            r += (cache[ts][s] = cache[ts][s] || b.getDay());
            break;
          
          // Y: the year with the century
          case 'Y':
            r += (cache[ts][s] = cache[ts][s] || b.getFullYear());
            break;

          // y: the year without the century (00-99)
          case 'y':
            r += (cache[ts][s] = cache[ts][s] || ('' + b.getFullYear()).slice(-2));
            break;
          
          // Z: the time zone name, replaced with an empty string if it is not found
          // Not found for now
          case 'Z':
            break;

          // z: the time zone offset from UTC, with a leading plus sign for UTC and zones east of UTC and a minus sign for those west of UTC, hours and minutes follow each padded to 2 digits and with no delimiter between them
          case 'z':
            if(cache[ts][s]){
              r += cache[ts][s];
            }
            else{
              t = -b.getTimezoneOffset();
              r += (t < 0 ? '-' : '+') + ('0' + (Math.abs(t / 60))).slice(-2) + ('0' + (t % 60)).slice(-2);
            }
            break;
        }
      }
      
      // other chars are just copied
      else{
        r += a[i];
      }
    }
    
    // Return the result (and put it in cache)
    return cache[ts][a] = r;
  }
})();