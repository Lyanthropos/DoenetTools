import crypto from 'crypto';

let rePlus = /\+/g;
let reSlash = /\//g;

export function createUniqueName(componentType, longNameId) {

  const hash = crypto.createHash('sha1');
  hash.update(longNameId);

  // use base64 encoding, but replace + with _ and / with -
  // so that the name is a valid CSS identifier
  let hashStringShortened = hash.digest('base64').slice(0, 10)
    .replace(rePlus, '_').replace(reSlash, '-');

  // console.log(`componentType: ${componentType}, longNameID: ${longNameId}, hashString: ${hashStringShortened}`)

  return "__" + componentType + "_" + hashStringShortened;

}

export function getUniqueIdentifierFromBase(uniqueIdentifierBase, uniqueIdentifiersUsed) {

  let postfix = 1;
  let uniqueIdentifier = uniqueIdentifierBase + postfix;

  while (uniqueIdentifiersUsed.includes(uniqueIdentifier)) {
    postfix += 1;
    uniqueIdentifier = uniqueIdentifierBase + postfix;
  }

  uniqueIdentifiersUsed.push(uniqueIdentifier);

  return uniqueIdentifier;

}

// from https://stackoverflow.com/a/7616484
function hashStringToInteger(s) {
  var hash = 0, i, chr;
  if (s.length === 0)
    return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash >>>= 0; // Convert to 32bit unsigned integer
  }
  return hash;
};