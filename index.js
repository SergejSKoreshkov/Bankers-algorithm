const dialog = require('dialog-node')

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
    const P = maxm.length
    const R = maxm[0].length

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

getUserValue('Enter number of processes', 'Process count').then(processCount => {
    const processes = new Array(parseInt(processCount)).fill(0).map((el, index) => { return index+1 })
    getUserValue('Enter number of resources', 'Resources count').then(resourceCount => {
        const avail = [ resourceCount ]
        getUserValue('Enter maximum demand of each process in a system. Separate values by ";"', 'Maximum demand of each process').then(maxVal => {
            const maxm = maxVal.split(';').map(el => [ el ])
            getUserValue('Enter the number of resoursec of each type currently allocated to each process. Separate values by ";"', 'Number of allocated resources to each process').then(alloc => {
                const allot = alloc.split(';').map(el => [ el ])
                isSafe(processes, avail, maxm, allot)
            })
        })
    })
})