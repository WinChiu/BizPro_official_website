export default function numberToRank(number) {
  let lastNum = number[number.length - 1];
  if (lastNum === '1') {
    return number + 'st';
  } else if (lastNum === '2') {
    return number + 'nd';
  } else if (lastNum === '3') {
    return number + 'rd';
  } else {
    return number + 'th';
  }
}
