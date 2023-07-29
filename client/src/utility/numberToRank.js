export default function numberToRank(number) {
  let lastNumber = number[number.length - 1];
  if (lastNumber === '1') {
    return number + 'st';
  } else if (lastNumber === '2') {
    return number + 'nd';
  } else if (lastNumber === '3') {
    return number + 'rd';
  } else {
    return number + 'th';
  }
}
