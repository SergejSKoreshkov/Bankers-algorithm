<template>
    <div class="main">
        <div class="inside">
            <h1>Banker's algorithm Vue.js realization</h1>
            <form>
                <label>Process count 'p': </label>
                <input type='number' v-model="p">
                <hr>
                <label>System resource 't': </label>
                <input type='number' v-model="t">
                <hr>
                <div class="flex">
                    <div class="block1">
                        <p>Resource allocation 'l(i)'</p>
                        <input v-for="(el, index) in l" v-bind:key="index+'1'" type='number' v-model="l[index]">
                    </div>
                    <div class="block2">
                        <p>Maximum that a process can request 'm(i)'</p>
                        <input v-for="(el, index) in m" v-bind:key="index+'2'" type='number' v-model="m[index]">
                    </div>
                </div>
            </form>
            <p>Available resource: {{ this.a }}</p>
            <p>Remaining resource needs of each process: {{ this.c }}</p>
            <div v-show="typeof result.isSafe !== typeof undefined">
                <p>Is Safe: {{this.result.isSafe}}</p>
                <p v-show="result.safeSequence">Safe Sequence: {{ this.result.safeSequence }}</p>
            </div>
        </div>
        
    </div>
</template>

<script>

import Bankier from '../assets/Bankier'

export default {
    name: 'Main',
    data () {
        return {
            p: 0,
            t: 0,
            l: [],
            m: [],
            c: [],
            a: 0,
            result: {}
        }
    },
    methods: {
        runBankiersAlgorithm () {
            if (this.p > 0 && this.t > 0 && this.l.length == this.p && this.m.length == this.p) {
                let l = this.l.slice()
                let m = this.m.slice()
                for (let i = 0;  i < this.p; i++ )
                {
                    l[i] = l[i] ? l[i] : 0
                    m[i] = m[i] ? m[i] : 0
                }
                const bankier = new Bankier(this.p, this.t, l, m)
                this.c = bankier.calculateNeed()
                this.a = bankier.calculateAvailable()
                this.result = bankier.safetyAlgorithm()
            }
        }
    },
    watch: {
        p (newVal) {
            this.l.splice(newVal, this.l.length)
            this.l[newVal-1] = 0
            this.l.fill(0)
            this.m.splice(newVal, this.m.length)
            this.m[newVal-1] = 0
            this.m.fill(0)
            this.runBankiersAlgorithm()
        },
        t () { this.runBankiersAlgorithm() },
        l () { this.runBankiersAlgorithm() },
        m () { this.runBankiersAlgorithm() }
    }
}
</script>

<style scoped>
    .inside {
        padding: 3em;
        background: #fff;
        position: relative;
        width: 700px;
        margin: auto;
        border-radius: 5px;
        margin-top: 2em;
        box-shadow: 5px 5px 10px #777;
        text-align: left;
    }
    h1 {
        font-size: 1.45em;
        margin-bottom: 1em;
    }
    input {
        border: none;
        background-color: rgb(208, 222, 252);
        padding: 5px;
        border-radius: 3px;
    }
    .block1 {
        display: flex;
        flex-direction: column;
        width: 45%;
    }
    .block2 {
        display: flex;
        flex-direction: column;
        width: 45%;
    }
    .flex {
        display: flex;
        justify-content: space-between;
    }
    .flex input {
        margin-bottom: .5em;
    }

</style>