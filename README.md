# AUX4All


## REST API Endpoints
All REST API endpoints accept **only <code>POST</code> requests**.


### Connect
Call this initially when the user loads the app; this generates a unique ID for the user that can be used for future calls.
###### Endpoint
```
http://{url}/connect
```
###### Parameters
- **<code>string</code> nickname** — User's chosen nickname.
###### Return Format
- **<code>string</code> user_id** — Unique ID that's used for future API calls.

---

### Add Song
Adds song to queue.
###### Endpoint
```
http://{url}/addsong
```
###### Parameters
- **<code>string</code> user_id** — Unique user ID.
- **<code>string</code> song_id** — Unique song ID.
###### Return Format
- **None**

---

### Vote
Allows user to vote on currently-playing song.
###### Endpoint
```
http://{url}/vote
```
###### Parameters
- **<code>string</code> user_id** — Unique user ID.
- **<code>int</code> value** — Set to either <code>-1</code> for _downvotes_ or <code>1</code> for _upvotes_.
###### Return Format
- **None**

---

### Get Next Song
Starts playing next song and returns song info.
###### Endpoint
```
http://{url}/getnext
```
###### Parameters
- **None**
###### Return Format
- **<code>JSON</code> song_info** — See example for details.

---

### Get Current Status
Gets current status (including users, queue, etc)
###### Endpoint
```
http://{url}/getstatus
```
###### Parameters
- **None**
###### Return Format
- **<code>JSON</code> current_status** — See example for details.
###### Example Result
```
{
    "users": [
        {
            "id": "b2216526-c3e2-4150-a95d-262b01cdd06a",
            "nickname": "Matthew",
            "votes": 5
        },
        {
            "id": "2e2f4c21-70b0-4309-b2ee-587ecf2afe62",
            "nickname": "Solomon",
            "votes": 7
        }
    ],
    "queue": [ // Doesn't include current song
        {
            "song_id": "b69b02af-7987-4bb6-88fa-76c960af3887",
            "user_id": "2e2f4c21-70b0-4309-b2ee-587ecf2afe62"
        },
        {
            "song_id": "8c61c869-6a88-4218-a2d5-2d49cfb0819a",
            "user_id": "b2216526-c3e2-4150-a95d-262b01cdd06a"
        },
        {
            "song_id": "e08bc246-a6a2-4797-87d7-1cb0f735aea9",
            "user_id": "2e2f4c21-70b0-4309-b2ee-587ecf2afe62"
        }
    ],
    "current_song": {
        "song_id": "ef8193bf-2c0b-40f3-ae60-fe472dd696fa",
        "user_id": "b2216526-c3e2-4150-a95d-262b01cdd06a",
        "upvotes": 3,
        "downvotes": 1,
        "votes": 2, // upvotes - downvotes
        "title": "Despacito",
        "artist": "Luis Fonsi",
        "album": "Summer Anthems 2017",
        "album_cover": "https://img.discogs.com/_Ys4oxfbTXmWIRZtRdCjf2HoPnM=/fit-in/600x520/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10099368-1495223837-7850.jpeg.jpg"
    }
}
```

---

### Search
Gets current status (including users, queue, etc)
###### Endpoint
```
http://{url}/search
```
###### Parameters
- **<code>string</code> query** — User-inputted search query.
###### Return Format
- **<code>JSON</code> results** — List of search results; see example for details.
###### Example Result
```
{
    "results": [
        {
            "song_id": "b69b02af-7987-4bb6-88fa-76c960af3887",
            "title": "Despacito",
            "artist": "Luis Fonsi",
            "album": "Summer Anthems 2017",
            "album_cover": "https://img.discogs.com/_Ys4oxfbTXmWIRZtRdCjf2HoPnM=/fit-in/600x520/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10099368-1495223837-7850.jpeg.jpg"
        },
        {
            "song_id": "8c61c869-6a88-4218-a2d5-2d49cfb0819a",
            "title": "Africa",
            "artist": "Toto",
            "album": "Toto IV",
            "album_cover": "https://upload.wikimedia.org/wikipedia/en/b/bd/Toto_Toto_IV.jpg"
        }
    ]
}
```