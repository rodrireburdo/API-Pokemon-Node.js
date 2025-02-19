const to = (promise) => {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err, null]);
}

export default {
    to
};