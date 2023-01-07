const { expect } = global;


function expectObjectOwnPropertyNamesToEqual(obj, expectedNames) {
    expect(Object.getOwnPropertyNames(obj).sort()).toEqual(expectedNames.slice(0).sort());
}


module.exports = {
    expect,
    expectObjectOwnPropertyNamesToEqual,
};
