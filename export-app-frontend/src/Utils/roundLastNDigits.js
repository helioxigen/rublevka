const roundLastNDigits = (num, digits) => {
    // making sure the variables exist, and are numbers; if *not* we quit at this point:
    if (!num || !parseInt(num, 10) || !digits || !parseInt(digits, 10)) {
        return false;
    }
    else {
        /* otherwise we:
           - divide the number by 10 raised to the number of digits
             (to shift divide the number so that those digits follow
             the decimal point), then
           - we round that number, then
           - multiply by ten raised to the number of digits (to
             recreate the same 'size' number/restoring the decimal fraction
             to an integer 'portion' */
        return Math.round(num / Math.pow(10, parseInt(digits,10))) * Math.pow(10,digits);
    }
  }

export default roundLastNDigits;