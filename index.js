const dialog = require('dialog-node')

const P = 3;
const R = 1;

const getUserValue = (text, label) => {
    return new Promise((resolve, reject) => {
        dialog.entry(text, label, 0, (code, val, stderr) => {
            if(val.length > 0) resolve(val)
            else reject()
        })
    })
}

const calculateNeed = (need, maxm, allot) => {
    return need.map((el, i) => {
        return el.map((el, j) => {
            return ( maxm[i][j] - allot[i][j] )
        })
    })
}

const isSafe = (processes, avail, maxm, allot) => {
    let need = new Array(P).fill(0)
    need = need.map(el => {
        return new Array(R).fill(0)
    })
    need = calculateNeed(need, maxm, allot)
    // console.log(need)

    let finish = new Array(P).fill(0)
    let safeSeq = new Array(P).fill(0)
    let work = avail.slice()

    let count = 0
    while (count < P) {
        let found = false
        finish = finish.map((el, index) => {
            if (el == 0) {
                let checkNeedLess = need[index].filter((el, index) => {
                    return el > work[index]
                })
                if(checkNeedLess.length == 0) {
                    work = work.map((el, k) => {
                        return el + allot[index][k]
                    })
                    safeSeq[count++] = index
                    found = true
                    return 1
                } else return 0
            } 
            else return 0
        })
        if(!found) {
            console.log("not safe")
            return false
        }
    }
    console.log("safe")
    console.log(safeSeq)
    return true
}


let processes = [1, 2, 3]

let avail = [11]

let maxm = [
    [6],
    [6],
    [6]
]

let allot = [
    [3],
    [4],
    [3]
]

isSafe(processes, avail, maxm, allot)