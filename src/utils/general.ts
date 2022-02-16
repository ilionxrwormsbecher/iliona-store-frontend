
export function checkObjectIsEmpty(object: Object) {
    if ( object && Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        return true;
    }

    return false;
   
} 
