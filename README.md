# AUX4All


## REST API Endpoints
All REST API endpoints accept **only POST requests**.


#### Connect
Call this initially when the user loads the app; this generates a unique ID for the user that can be used for future calls.
###### Endpoint
```
http://{url}/connect
```
###### Parameters
- **None**
###### Return Format
- **<code>string</code> user_id** — Unique ID that's used for future API calls.


#### Add Song
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


#### Vote
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


#### Get Next Song
Starts playing next song and returns song info.
###### Endpoint
```
http://{url}/getnext
```
###### Parameters
- **None**
###### Return Format
- **<code>JSON</code> song_info**