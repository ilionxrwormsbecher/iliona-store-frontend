export function checkObjectIsEmpty(object: Object) {
    if (object && Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        return true;
    }
    return false;
}

export const checkFileMimetype = async (file: File, setField: any, setimageError: any) => {
    let blob = file;
    let fileReader = new FileReader();
    let type = "";

    if (file) {
        console.log("1");
        fileReader.readAsArrayBuffer(blob);
    }

    fileReader.onloadend = (e) => {
        console.log("image", e?.target?.result);
        // @ts-ignore
        const arr = new Uint8Array(e.target.result).subarray(0, 4);
        console.log("arr", arr);
        let header = "";
        for (var i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
        }

        console.log("header", header);

        //Check the file signature against known types
        switch (header) {
            case "89504e47":
                type = "image/png";
                break;
            case "47494638":
                type = "image/gif";
                break;
            case "ffd8ffe0":
            case "ffd8ffee":
            case "ffd8ffe1":
            case "ffd8ffe2":
            case "ffd8ffe3":
            case "ffd8ffe8":
                type = "image/jpeg";
                break;
            default:
                type = "not supported";
                break;
        }

        if (type === "not supported") {
            setimageError("File type not supported");
            setField(undefined);
            return;
        }

        // Check file size
        if (Math.ceil(file.size / 1024) > 50) {
            setimageError("File size too big");
            setField(undefined);
            return;
        }

        // check for the extension
        if (
            file.type.indexOf("jpg") > -1 ||
            file.type.indexOf("jpeg") > -1 ||
            file.type.indexOf("png") > -1 ||
            file.type.indexOf("gif") > -1
        ) {
            setField(file);
            setimageError("");
            return;
        } else {
            setimageError("File extention is not correct");
            setField(undefined);
            return;
        }
    };
};
