export const timeAction = <T>(actionableObject: T, count: number) => (action: (o: T) => void) => {
    var hrstart = process.hrtime();
    for(var i=0;i<count;i++) {
        action(actionableObject);
    }
    var hr = process.hrtime(hrstart)
    var s = hr[0] + hr[1]/(1000*1000*1000)
    var t = count / s;
    console.info(`Got ${Math.round(t)}/s when running ${action.toString()} with ${actionableObject.constructor.name}`)
    return t/1000;
}