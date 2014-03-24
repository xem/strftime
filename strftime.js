// strftime
// @params: string [,date] [,locale]
// t: placeholder (temp var)
// r: placeholder (result)
// l: placeholder (length)
// s: placeholder (specifier)
strftime = function(a, b, c, t, r, l, s){

  /** Initialization **/

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
  
  /** Computing **/
  
  // result
  r = "";
  
  // loop on the chars of a
  for(i=0, l=a.length; i<l; i++){
  
    // specifiers (replacement)
    if(a[i] === "%"){
    
      // switch on the character that follows the "%"
      i++;
      s = a[i];
      switch(s){
      
        // A: full weekday name
        case "A":
          r += c.days[b.getDay()];
          break;
          
        // a: abbreviated weekday name
        case "a":
          r += c.shortDays[b.getDay()];
          break;
        
        // B: full month name
        case "B":
          r += c.months[b.getMonth()];
          break;

        // b: abbreviated month name
        // h: the same as %b (abbreviated month name)
        case "b":
        case "h":
          r += c.shortMonths[b.getMonth()];
          break;
          
        // C: AD century (year / 100), padded to 2 digits
        case "C":
          r += ("0" + ~~(b.getFullYear() / 100)).slice(-2);
          break;
        
        // D: equivalent to %m/%d/%y
        case "D":
          r += ("0" + (b.getMonth() + 1)).slice(-2) + "/" + ("0" + b.getDate()).slice(-2) + "/" + ("" + b.getFullYear()).slice(-2);
          break;
        
        // d: day of the month, padded to 2 digits (01-31)
        case "d":
          r += ("0" + b.getDate()).slice(-2);
          break;

        // e: day of the month, padded with a leading space for single digit values ( 1-31)
        case "e":
          r += (" " + b.getDate()).slice(-2);
          break;

        // F: equivalent to %Y-%m-%d
        case "F":
          r += b.getFullYear() + "-" + ("0" + (b.getMonth() + 1)).slice(-2) + "-" + ("0" + b.getDate()).slice(-2);
          break;
        
        // H: the hour (24-hour clock), padded to 2 digits (00-23)
        case "H":
          r += ("0" + b.getHours()).slice(-2);
          break;
          
        // I: the hour (12-hour clock), padded to 2 digits (01-12)
        case "I":
          r += ("0" + b.getHours() % 12).slice(-2);
          break;
          
        // j: day of the year, padded to 3 digits (001-366)
        case "j":
          r += ("00" + ~~((b-new Date(b.getFullYear(), 0, 0)/864e5))).slice(-3);
          break;
          
        // k: the hour (24-hour clock), padded with a leading space for single digit values ( 0-23)
        case "k":
          r += (" " + b.getHours()).slice(-2);
          break;
        
        // L: the milliseconds, padded to 3 digits [Ruby extension]
        case "L":
          r += ("00" + b.getMilliseconds()).slice(-3);
          break;

        // l: the hour (12-hour clock), padded with a leading space for single digit values ( 1-12)
        case "l":
          r += (" " + b.getHours() % 12).slice(-2);
          break;

        // M: the minute, padded to 2 digits (00-59)
        case "M":
          r += ("0" + b.getMinutes()).slice(-2);
          break;
        
        // m: the month, padded to 2 digits (01-12)
        case "m":
          r += ("0" + (b.getMonth() + 1)).slice(-2);
          break;

        // n: newline character
        case "n":
          r += "\n";
          break;
        
        // o: day of the month as an ordinal (without padding), e.g. 1st, 2nd, 3rd, 4th, ...
        case "o":
          t = b.getDate();
          r += t;
          if(t%10 === 1){
            r += "st";
          }
          else if(t%10 === 2){
            r += "nd";
          }
          else if(t%10 === 3){
            r += "rd";
          }
          else r+= "th";
          break;
        
        // P: "am" or "pm" in lowercase [Ruby extension]
        case "P":
          r += (b.getHours() < 12 ? c.am : c.pm);
          break;
        
        // p: "AM" or "PM"
        case "p":
          r += (b.getHours() < 12 ? c.AM : c.PM);
          break;

        // R: equivalent to %H:%M
        case "R":
          r += ("0" + b.getHours()).slice(-2) + ":" + ("0" + b.getMinutes()).slice(-2);
          break;
        
        // r: equivalent to %I:%M:%S %p
        case "r":
          r += ("0" + b.getHours() % 12).slice(-2) + ":" + ("0" + b.getMinutes()).slice(-2) + ":" + ("0" + b.getSeconds()).slice(-2) + " " + (b.getHours() < 12 ? c.AM : c.PM);
          break;
        
        // S: the second, padded to 2 digits (00-60)
        case "S":
          r += ("0" + b.getSeconds()).slice(-2);
          break;

        // s: the number of seconds since the Epoch, UTC
        case "s":
          r += ~~(b.getTime() / 1e3);
          break;

        // T: equivalent to %H:%M:%S
        case "T":
          r += ("0" + b.getHours()).slice(-2) + ":" + ("0" + b.getMinutes()).slice(-2) + ":" + ("0" + b.getSeconds()).slice(-2);
          break;
          
        // t: tab character
        case "t":
          r += "\t";
          break;
        
        // U: week number of the year, Sunday as the first day of the week, padded to 2 digits (00-53)
        case "U":
          t = new Date(b.getFullYear(), 0, 1);
          r += ("0" + Math.ceil((((b - t) / 864e5) + t.getDay()) / 7)).slice(-2);
          break;
        
        // u: the weekday, Monday as the first day of the week (1-7)
        case "u":
          t = b.getDay();
          r += t ? t+1 : 7;
          break;

        // v: equivalent to %e-%b-%Y
        case "v":
          r += (" " + b.getDate()).slice(-2) + '-' + c.shortMonths[b.getMonth()] + '-' + b.getFullYear();
          break;
        
        // W: week number of the year, Monday as the first day of the week, padded to 2 digits (00-53)
        case "W":
          t = new Date(b.getFullYear(), 0, 1);
          r += ("0" + Math.ceil((((b - t) / 864e5) + t.getDay() + 1) / 7)).slice(-2);
          break;

        // w: the weekday, Sunday as the first day of the week (0-6)
        case "w":
          r += b.getDay();
          break;
        
        // Y: the year with the century
        case "Y":
          r += b.getFullYear();
          break;

        // y: the year without the century (00-99)
        case "y":
          r += ("" + b.getFullYear()).slice(-2);
          break;
        
        // Z: the time zone name, replaced with an empty string if it is not found
        // Not found for now
        case "Z":
          break;

        // z: the time zone offset from UTC, with a leading plus sign for UTC and zones east of UTC and a minus sign for those west of UTC, hours and minutes follow each padded to 2 digits and with no delimiter between them
        case "z":
          t = -b.getTimezoneOffset();
          r += (t < 0 ? '-' : '+') + ("0" + (Math.abs(t / 60))).slice(-2) + ("0" + (t % 60)).slice(-2);
          break;
      }
    }
    
    // other chars (copy)
    else{
      r += a[i];
    }
  }
  return r;
}