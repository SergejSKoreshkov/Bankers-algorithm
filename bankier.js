class Bankier {
    constructor(p, t, l, m) {
            if (p > 0) this.p = p; else throw "ERROR: no processes ('p' = 0)"
            if (t > 0) this.t = t; else throw "ERROR: no resources ('t' = 0)"
            if (l.length === p) this.l = l; else throw "ERROR: 'l(i)' length not equal 'p'"
            if (m.length === p) this.m = m; else throw "ERROR: 'm(i)' length not equal 'p'"
            this.c = null
            this.a = null
            this.calculateNeed()
            this.calculateAvailable()
    }    
    showAllData () {
        console.log('Process count \'p\':', this.p)
        console.log('System resources \'t\':', this.t)
        console.log('Resources allocation \'l(i)\':', this.l)
        console.log('Maximum that a process can request \'m(i)\':', this.m)
        console.log('Remaining resource needs of each process \'c(i)\':', this.c)
        console.log('Available resource \'a\':', this.a)
    }
    calculateNeed () {
        this.c = new Array(this.m.length).fill(0).map((el, index) => this.m[index] - this.l[index])
        return this.c
    }
    calculateAvailable () {
        this.a = this.t - this.l.reduce((accumulator, a) => accumulator + a)
        return this.a
    }
    safetyAlgorithm () {
        let finish = new Array(this.p).fill(false)
        let safeSeq = new Array(this.p).fill(0)
        let work = this.a
        let count = 0
        while (count < this.p) {
            let found = false
            finish = finish.map((el, index) => {
                if (!el) {
                    if (this.c[index] <= work) {    
                        work += this.l[index]
                        safeSeq[count++] = index
                        found = true
                        return true
                    } else return false
                } else return false
            })
            if(!found) return {isSafe: false}
        }
        return {isSafe: true, safeSequence: safeSeq}
    }
}

module.exports = Bankier