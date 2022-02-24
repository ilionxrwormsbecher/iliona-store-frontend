import React from 'react'
import { checkObjectIsEmpty } from "./general";


test("checkObjectIsEmpty --- Should return false when the object passed has keys", async () => {
    const result = checkObjectIsEmpty( {test: 1})
    expect(result).toBeFalsy();
});

test("checkObjectIsEmpty --- Should return true when the object passed has keys", async () => {
    const resultEmptyObject = checkObjectIsEmpty({})
    expect(resultEmptyObject).toBeTruthy();
});


