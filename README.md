UPDATE
======

Here's a nice fork with npm integration and no memory-leaking cache: https://github.com/QwantResearch/strftime


strftime
========

This is a JS version of PHP's strftime(string [,date] [,locale])


Example:

    d = new Date();
    console.log(strftime("%Y/%m/%d %H:%M", d));


It's inspired by this API: https://github.com/samsonjs/strftime

Thanks to important optimizations, this version of strftime is up to 5 times faster than samsonjs' version for a single call,

and it's up to 70 times faster for repeated calls.

Here's the speed test comparing the two functions: http://jsperf.com/strftime-closure

Here's my test page (results appear in the console): http://xem.github.io/strftime


Note: the timezones are not implemented yet.
