const arr = [1, 2, 3, 4, 5, 6, 7];

// console.log(arr);
// console.log(...arr);

const obj = {
  name: '김호준',
  status: '취함',
};

// console.log(obj);
// console.log({ ...obj });

const tetzData = {
  name: '김호준',
  age: 39,
};

const tetzInfo = {
  nickName: 'chicken head',
  status: '숙취',
};

const o = {
  ...tetzData,
  ...tetzInfo,
};

console.log(o);

const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];

const test2 = {
  name: '김호준',
  gender: 'M',
  nickName: 'Hojoon',
  email: 'ghwns107@naver.com',
};

const { name, ...restinfo } = test2;

console.log(restinfo);

const arr22 = [1, 2, 3, 4, 5, 6, 7, 7];

const [first, ...rest] = arr22;

console.log(rest);

function spread(a, b, ...rest) {
  console.log(a);
  console.log(b);
  console.log(rest);
}

spread(1, 2, 3, 4, 5, 6);
