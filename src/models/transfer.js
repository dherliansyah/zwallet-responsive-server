const db = require('../config/mysql')

module.exports = {
    getHistoryUser: function(id, order, offset) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT amount, receiver, photo, sender, photo_sender FROM transfer WHERE id_sender=${id} OR id_receiver=${id} ORDER BY ${order}(date) DESC`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllHistoryUser: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT amount, receiver, photo, sender, photo_sender FROM transfer WHERE id_sender=${id} OR id_receiver=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getHistoryToday: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT amount, receiver, photo, sender, photo_sender FROM transfer WHERE DATE(date) = CURRENT_DATE() AND id_sender=${id} OR id_receiver=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getHistoryByFilter: function(start, end, id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT amount, receiver, photo, sender, photo_sender FROM transfer WHERE DATE(date) BETWEEN ${start} AND ${end} AND id_receiver=${id} OR id_sender=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postTransfer: function(phone, setData) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id AS id_receiver, name AS receiver, photo FROM users WHERE phone=${phone}`, (err, result) => {
                if(!err) {
                    console.log(setData)
                    const newData = {
                        ...setData,
                        ...result[0]
                    }
                    console.log(newData)
                    db.query(`INSERT INTO transfer SET ?`, newData, (err, result) => {
                        if(!err) {
                           resolve(result)
                        } else {
                            reject(new Error(err))
                        }
                    })
                }
            })
        })
    }
}