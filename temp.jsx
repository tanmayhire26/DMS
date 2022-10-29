let doctypefieldIdArr = ["dtfid1", "dtfid2", "dtfid3"];
let indexingInfo = { fname: "Tanmay", lname: "Hire", age: "28" };
let newIndexingInfo = {};
const oldKeysArr = Object.keys(indexingInfo);
console.log(oldKeysArr);

const valuesArr = Object.values(indexingInfo);
console.log(valuesArr);

for (let i = 0; i < valuesArr.length; i++) {
	newIndexingInfo[`${doctypefieldIdArr[i]}`] = valuesArr[i];
}
console.log(newIndexingInfo);
