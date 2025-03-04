import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            relative:(d) => moment().format('LL')
        }
    }
})
