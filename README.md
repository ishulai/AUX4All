# AUX4All


## REST API Endpoints
All REST API endpoints accept **only <code>POST</code> requests**.



### Add Song
Adds song to queue.
###### Endpoint
```
http://{url}/addsong
```
###### Parameters
- **<code>string</code> user_id** — Unique user ID.
- **<code>string</code> uri** — Spotify song URI.
- **<code>string</code> pin** — Room PIN number.
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
- **<code>string</code> pin** — Room PIN number.
- **<code>int</code> value** — Set to either <code>-1</code> for _downvotes_ or <code>1</code> for _upvotes_.
###### Return Format
- **None**

---

### Create Room
Creates a new room.
###### Endpoint
```
http://{url}/createroom
```
###### Parameters
- **<code>string</code> token** — OAuth 2.0 token obtained from Spotify login.
###### Return Format
- **<code>string</code> pin** — Unique PIN number that users can enter to join the room.
- **<code>string</code> user_id** — Unique user ID that's used for future API calls.

---

### Join Room
Allows user to join a room.
###### Endpoint
```
http://{url}/joinroom
```
###### Parameters
- **<code>string</code> pin** — Room's unique PIN.
###### Return Format
- **<code>string</code> user_id** — Unique user ID that's used for future API calls.

---

### Get Current Status
Gets current status (including users, queue, etc)
###### Endpoint
```
http://{url}/getstatus
```
###### Parameters
- **<code>string</code> pin** — Room's unique PIN.
###### Return Format
- **<code>JSON</code> current_status** — See example for details.
###### Example Result
```
{
    "current_song": {
        "uri": <Spotify song URI>,
        "user_id": "b2216526-c3e2-4150-a95d-262b01cdd06a",
        "title": "Despacito",
        "artist": "Luis Fonsi",
        "album": "Summer Anthems 2017",
        "album_cover": "https://img.discogs.com/_Ys4oxfbTXmWIRZtRdCjf2HoPnM=/fit-in/600x520/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10099368-1495223837-7850.jpeg.jpg"
    },
    "next_song": {
        "uri": <Spotify song URI>,
        "user_id": "2e2f4c21-70b0-4309-b2ee-587ecf2afe62",
        "title": "Africa",
        "artist": "Toto",
        "album": "Toto IV",
        "album_cover": "https://upload.wikimedia.org/wikipedia/en/b/bd/Toto_Toto_IV.jpg"
    }
}
```

---

### Search
Searches for songs based on keywords.
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
            "title": "Despacito",
            "artist": "Luis Fonsi",
            "album": "Summer Anthems 2017",
            "album_cover": "https://img.discogs.com/_Ys4oxfbTXmWIRZtRdCjf2HoPnM=/fit-in/600x520/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10099368-1495223837-7850.jpeg.jpg",
            "uri": <Spotify song URI>
        },
        {
            "title": "Africa",
            "artist": "Toto",
            "album": "Toto IV",
            "album_cover": "https://upload.wikimedia.org/wikipedia/en/b/bd/Toto_Toto_IV.jpg",
            "uri": <Spotify song URI>
        }
    ]
}
```