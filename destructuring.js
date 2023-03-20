// // const arr = [1, 2, 3];
// // const one = arr[0];
// // const two = arr[1];
// // const three = arr[2];
// const arr = [1, 2, 3];
// const [one, two, three] = [...arr];

// // console.log(one, two, three);

// //날짜 .

// const today = new Date();

// const format = today.toISOString().substring(0, 10).replace(/-/g, '');
// const format22 = today.toISOString().substring(0, 10).split('-').join('');
// const format222 = today.toISOString().substring(0, 10).split('-');

// console.log(format);
// console.log(format22);
// const [year, month, day] = format222;
// console.log(year);
// console.log(month);
// console.log(day);

const obj = { firstName: '김', lastName: '호준' };

const { firstName, lastName } = obj;

console.log(firstName, lastName);

const person = {
  name: 'Lee',
  address: {
    zipCode: '03068',
    city: 'Seoul',
  },
};

const {
  address: { zipCode, city },
} = person;
console.log(zipCode, city);

const price = {
  apple: 1000,
  banana: 500,
  orange: 600,
  grape: 700,
};
const { apple, ...otherPrice } = price;

console.log(otherPrice);
