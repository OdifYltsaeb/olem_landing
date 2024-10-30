// These 2 functions are JS alternatives to python all and any functions.
// instead of long if conditions, push conditions to an array and feed to these functions.

export const all = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i]) return false;
    }
    return true;
};

export const any = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) return true;
    }
    return false;
};
