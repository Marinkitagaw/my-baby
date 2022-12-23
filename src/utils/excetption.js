export default function subStringException(errormessage) {
  return errormessage.substring(errormessage.lastIndexOf('Exception:') + 'Exception:'.length);
}
