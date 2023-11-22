import moment from "moment"

export default defineEventHandler((event) => {

  const now = moment().locale('id').add(10, 'minutes').format('D-MM-yyyy HH:mm:ss');

  let data = {
    "user": {
      "id": 1,
      "name": "superadmin",
      "username": "superadmin",
      "email": null,
      "role_id": 1,
      "is_active": 1,
      "user_last_activity_id": 15844,
      "created_at": "2023-07-31T13:35:27.000+07:00",
      "updated_at": "2023-07-31T13:35:27.000+07:00",
      "deleted_at": null,
      "role": {
        "id": 1,
        "name": "Superadmin",
        "scope": "admin",
        "created_at": "2023-09-27T15:27:20.000+07:00",
        "updated_at": "2023-09-29T14:59:20.000+07:00"
      }
    },
    "token": {
      "type": "bearer",
      "token": "NTYx.TMQwE2RRqA7J2vwGYVw-CKUqKbn1Ip88amR0vIVc7p68lmlHkpTA62gD4WxS",
      "expires_at": now
    },
    "refresh_token": "AxB3laHJSYdA9QJMtLWYXZeRImSLIAgg-EQBBdVRWyub0r79N6MStGwmRlMA_aY_6cZ6tLEswwyIstMuenV9Zw.R2FEbHRIUV9tMUlnYzRILQ.Wmy8bELyL8H27qyb3NQNGOOutJ5sncwuxcj0S4vakvI"
  }

  return data
})