class AccountsController {
    sortAccountStatsEntries(e){
        e.shortTermStats.sort((a, b) => b.date - a.date)
        e.longTermStats.sort((a, b) => b.date - a.date)
        return e
    }

    removeAllStatsExceptFirst(e){
        e.shortTermStats.splice(1)
        e.longTermStats.splice(1)
        return e
    }

    removeEmptiesFromBody(b){
        for (const n in b) {
            if(b[n] == "" || b[n] == null){
                delete b[n]
            }
        }
        return b
    }
}

module.exports = AccountsController