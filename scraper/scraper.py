import requests
import time
from datetime import datetime as dt

url = "http://localhost:8080/api"
long_checked = False
long_checking = False

headers={
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
}

def get_users():
    accounts = requests.get(url + "/accounts")
    return accounts.json()


def get_data(u):
    res = requests.get("https://www.instagram.com/" + u["username"] + "/?__a=1", headers=headers)
    print("yeet")
    if res.status_code == 200:
        d = res.json()
        return d
    else:
        return False


def get_post_data(d):
    timeline = d["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"]
    posts = []
    for post in timeline:
        posts.append({
            "postID": post["node"]["id"],
            "thumbnail": post["node"]["display_url"],
            "caption": post["node"]["edge_media_to_caption"]["edges"][0]["node"]["text"],
            "comments": post["node"]["edge_media_to_comment"]["count"],
            "likes": post["node"]["edge_liked_by"]["count"],
            "date": post["node"]["taken_at_timestamp"] * 1000
        })
    
    return posts


def get_stats(d):
    return {
        "followers": d["graphql"]["user"]["edge_followed_by"]["count"],
        "following": d["graphql"]["user"]["edge_follow"]["count"],
        "posts": d["graphql"]["user"]["edge_owner_to_timeline_media"]["count"]
    }


if __name__ == "__main__":
    while True:
        acc = get_users()
        
        h = dt.now().hour

        if h == 0 and long_checked == False and long_checking == False:
            long_checking = True
        elif h == 1:
            long_checked = False
        

        for user in acc:
            time.sleep(5)
            print(user["name"] + " : " + user["_id"])

            d = get_data(user)
            if d == False:
                print("No data from instagram")
                break

                
            stats = get_stats(d)
            posts_data = get_post_data(d)

            print(stats)

            r_stats = requests.put(url + "/accounts/shortstats/" + user["_id"], json=stats)

            for post_data in posts_data:
                r_data = requests.put(url + "/accounts/postsdata/" + user["_id"], json=post_data)
                print(post_data["postID"] + " : " + str(r_data.content))


            print(r_stats.json())

            profilpic = {
                "profilePicUrl": d["graphql"]["user"]["profile_pic_url"]
            }
            
            requests.put(url + "/accounts/" + user["_id"], json=profilpic)

            if(long_checking == True):
                requests.put(url + "/accounts/longstats/" + user["_id"], json=stats)


        long_checking = False
        long_checked = True

        time.sleep(300)

