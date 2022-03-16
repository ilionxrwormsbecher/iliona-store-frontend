import { waitFor } from "@testing-library/react";
import React from "react";
import { checkFileMimetype, checkObjectIsEmpty } from "./general";

test("checkObjectIsEmpty --- Should return false when the object passed has keys", async () => {
    const result = checkObjectIsEmpty({ test: 1 });
    expect(result).toBeFalsy();
});

test("checkObjectIsEmpty --- Should return true when the object passed has keys", async () => {
    const resultEmptyObject = checkObjectIsEmpty({});
    expect(resultEmptyObject).toBeTruthy();
});

// test.only("checkFileMimetype --- should return okay", async () => {
//     const file = new File([""], "test.png");
//     Object.defineProperty(file, "size", { value: 1024 * 1024 + 1 });
//     console.log(file); // 1048577

//     let error;
//     let field;

//     function mockError(input: any) {
//         error = input;
//     }

//     function mockField(input: any) {
//         field = input;
//     }

//     const result = waitFor(() => checkFileMimetype(file, mockField, mockError));
//     // console.log("result", result);
//     // expect(error).not.toBeUndefined();
// });
