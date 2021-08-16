const getAverageInt = (data) => {
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
}

export default getAverageInt;